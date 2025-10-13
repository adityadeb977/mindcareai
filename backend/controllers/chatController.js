const { GoogleGenerativeAI } = require('@google/generative-ai');
const History = require('../models/historyModel');

// Function to extract mental health analysis from AI response
const extractMentalHealthInfo = (response) => {
  // Clean the response first to remove formatting
  const cleanedResponse = response.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
  
  // Extract key mental health information from the AI response
  const disorders = [
    'depression', 'anxiety', 'bipolar', 'ptsd', 'ocd', 'adhd', 'panic disorder',
    'social anxiety', 'generalized anxiety', 'major depression', 'schizophrenia',
    'eating disorder', 'anorexia', 'bulimia', 'binge eating', 'borderline personality',
    'antisocial personality', 'narcissistic personality', 'avoidant personality', 'stress',
    'sleep', 'insomnia'
  ];

  const symptoms = [
    'sadness', 'hopelessness', 'fatigue', 'insomnia', 'anxiety', 'panic attacks',
    'mood swings', 'irritability', 'loss of interest', 'difficulty concentrating',
    'suicidal thoughts', 'hallucinations', 'delusions', 'paranoia', 'worry', 'overwhelm',
    'tired', 'restless', 'nervous'
  ];

  const foundDisorders = disorders.filter(disorder => 
    cleanedResponse.toLowerCase().includes(disorder)
  );

  const foundSymptoms = symptoms.filter(symptom =>
    cleanedResponse.toLowerCase().includes(symptom)
  );

  return {
    mainConcern: foundDisorders[0] || 'General mental health',
    relatedSymptoms: foundSymptoms,
    severity: cleanedResponse.toLowerCase().includes('severe') ? 'high' :
              cleanedResponse.toLowerCase().includes('mild') ? 'low' : 'moderate',
    cleanedResponse: cleanedResponse
  };
};

// Initialize the Google Generative AI client with the API key from .env
// Support either GEMINI_API_KEY or GOOGLE_API_KEY and trim to avoid hidden whitespace
const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
if (!apiKey) {
  // Fail fast at startup if the API key is missing
  console.error('[Startup] Missing GEMINI_API_KEY/GOOGLE_API_KEY in environment. Set it in backend/.env');
}
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * @desc    Generate response from AI and save history
 * @route   POST /api/chat
 * @access  Private
 */
const generateResponse = async (req, res) => {
  const { prompt, sessionId } = req.body;
  const userId = req.user._id; // Get user ID from the protect middleware

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    // Use the correct model names available for your API key (from ListModels)
    const preferredModels = [
      (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim(),
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-2.5-pro'
    ];
    
    // A pre-prompt to guide the AI's persona and response format
    const fullPrompt = `
      You are a compassionate and supportive AI mental health companion. 
      Your goal is to help users understand their feelings. 
      Analyze the following user's statement, identify potential mental health concerns (like stress, anxiety, depression), and provide gentle, supportive suggestions. 
      Do NOT provide a medical diagnosis. 
      Suggest seeking professional help as a primary course of action for serious issues. 
      User's statement: "${prompt}"
    `;

    let aiResponse;
    let lastErr;
    for (const modelName of preferredModels) {
      try {
        // Try without forcing API version first (let SDK choose), then fallback to v1
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(fullPrompt);
        aiResponse = await result.response.text();
        break; // success
      } catch (err) {
        lastErr = err;
        const status = err?.status;
        const msg = err?.message || '';
        // 404 or unsupported -> try next model
        if (status === 404 || /not found|not supported/i.test(msg)) {
          continue;
        }
        // Other errors are not retriable across models
        throw err;
      }
    }

    if (!aiResponse) {
      // If we get here, all model attempts failed; throw the last error to be handled below
      throw lastErr || new Error('All AI model attempts failed.');
    }

    // Generate analysis from the AI response
    const analysis = extractMentalHealthInfo(aiResponse);

    // Check if we have an existing session or create a new one
    let history;
    if (sessionId) {
      // Try to find existing session
      history = await History.findOne({ user: userId, sessionId });
      
      if (history) {
        // Add to existing session
        history.messages.push({
          prompt,
          response: aiResponse,
          analysis: analysis,
          timestamp: new Date()
        });
        // Update the root level with the latest message
        history.prompt = prompt;
        history.response = aiResponse;
        history.analysis = analysis;
        await history.save();
      } else {
        // Create new session with this sessionId
        history = await History.create({
          user: userId,
          sessionId,
          prompt,
          response: aiResponse,
          analysis: analysis,
          messages: [{
            prompt,
            response: aiResponse,
            analysis: analysis,
            timestamp: new Date()
          }]
        });
      }
    } else {
      // No sessionId provided, create a new session
      const newSessionId = `session_${Date.now()}_${userId}`;
      history = await History.create({
        user: userId,
        sessionId: newSessionId,
        prompt,
        response: aiResponse,
        analysis: analysis,
        messages: [{
          prompt,
          response: aiResponse,
          analysis: analysis,
          timestamp: new Date()
        }]
      });
    }

    res.status(201).json({
      _id: history._id,
      sessionId: history.sessionId,
      user: history.user,
      prompt: history.prompt,
      response: analysis.cleanedResponse, // Return cleaned response to frontend
      analysis: analysis,
      createdAt: history.createdAt,
      updatedAt: history.updatedAt
    });
  } catch (error) {
    // Improve diagnostics without leaking secrets
    const errInfo = {
      status: error?.status,
      statusText: error?.statusText,
      reason: Array.isArray(error?.errorDetails) ? error.errorDetails[0]?.reason : undefined,
      message: Array.isArray(error?.errorDetails) ? error.errorDetails[1]?.message : error?.message,
    };
    console.error('Error generating response from Gemini:', errInfo);

    // Specific guidance for invalid API key
    if (errInfo.reason === 'API_KEY_INVALID' || /API key not valid/i.test(errInfo.message || '')) {
      return res.status(502).json({
        message: 'AI provider rejected the API key. Verify GEMINI_API_KEY is correct and the Generative Language API is enabled for your Google Cloud project.'
      });
    }

    res.status(500).json({ message: 'Failed to get response from AI' });
  }
};

/**
 * @desc    Get user's chat history
 * @route   GET /api/chat/history
 * @access  Private
 */
const getHistory = async (req, res) => {
  try {
    // Find all history entries for the logged-in user and sort them by creation date
    const history = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve history' });
  }
};

/**
 * @desc    Delete a specific chat history item
 * @route   DELETE /api/chat/history/:id
 * @access  Private
 */
const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the history item, but only if it belongs to the current user
    const deletedItem = await History.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!deletedItem) {
      return res.status(404).json({ message: 'History item not found' });
    }

    res.json({ message: 'History item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete history item' });
  }
};

module.exports = { generateResponse, getHistory, deleteHistory };