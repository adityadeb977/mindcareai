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
  const { prompt, sessionId, location } = req.body;
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

    // Get nearby mental health helplines based on severity
    const helplines = (analysis.severity === 'high' || analysis.severity === 'moderate') 
      ? await getNearbyHelplines(location) 
      : [];

    res.status(201).json({
      _id: history._id,
      sessionId: history.sessionId,
      user: history.user,
      prompt: history.prompt,
      response: analysis.cleanedResponse, // Return cleaned response to frontend
      analysis: analysis,
      helplines: helplines,
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

/**
 * @desc    Analyze facial expression from image
 * @route   POST /api/chat/analyze-face
 * @access  Private
 */
const analyzeFace = async (req, res) => {
  console.log('analyzeFace endpoint hit');
  const { image, location } = req.body;
  const userId = req.user._id;

  console.log('Image received:', image ? 'Yes' : 'No');
  console.log('User ID:', userId);

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  try {
    // Extract base64 data from data URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Convert to the format Gemini expects
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    const preferredModels = [
      (process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim(),
      'gemini-2.5-flash',
      'gemini-2.0-flash'
    ];

    const prompt = `
      You are an expert mental health AI assistant. Analyze this person's facial expression in the image.
      
      Based on their facial features, micro-expressions, and overall demeanor, provide:
      1. The primary emotion detected (e.g., happiness, sadness, anxiety, stress, neutral, anger, fear)
      2. Overall sentiment (positive, negative, or neutral)
      3. Severity level of any negative emotions (low, moderate, high)
      4. A brief description of what you observe
      5. 3-5 helpful suggestions for emotional wellbeing
      
      Respond in this exact JSON format:
      {
        "emotion": "primary emotion here",
        "sentiment": "positive/negative/neutral",
        "severity": "low/moderate/high",
        "description": "your observation here",
        "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
      }
      
      Be compassionate and supportive. Do NOT provide medical diagnosis.
    `;

    let aiResponse;
    let lastErr;
    for (const modelName of preferredModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([prompt, imagePart]);
        aiResponse = await result.response.text();
        break;
      } catch (err) {
        lastErr = err;
        const status = err?.status;
        const msg = err?.message || '';
        if (status === 404 || /not found|not supported/i.test(msg)) {
          continue;
        }
        throw err;
      }
    }

    if (!aiResponse) {
      throw lastErr || new Error('All models failed to process the image');
    }

    // Parse JSON response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = aiResponse.replace(/```json\n?|\n?```/g, '').trim();
      analysis = JSON.parse(cleanedResponse);
    } catch (parseErr) {
      // Fallback if JSON parsing fails
      analysis = {
        emotion: 'Unable to determine',
        sentiment: 'neutral',
        severity: 'low',
        description: aiResponse,
        suggestions: ['Take deep breaths', 'Practice mindfulness', 'Talk to someone you trust']
      };
    }

    // Get nearby mental health helplines based on location
    const helplines = await getNearbyHelplines(location);

    // Save to history
    const newHistory = new History({
      user: userId,
      prompt: 'Face Analysis',
      response: `Emotion: ${analysis.emotion}\n${analysis.description}`,
      analysis: {
        sentiment: analysis.sentiment,
        severity: analysis.severity,
        topics: [analysis.emotion],
        suggestions: analysis.suggestions
      },
      type: 'face-analysis'
    });

    await newHistory.save();

    res.json({
      analysis,
      helplines,
      message: 'Face analysis completed successfully'
    });

  } catch (error) {
    console.error('Face analysis error:', error);
    res.status(500).json({ 
      message: 'Failed to analyze face',
      error: error.message 
    });
  }
};

/**
 * Get nearby mental health helplines based on user location
 * @param {Object} location - { latitude, longitude }
 * @returns {Array} Array of helpline objects
 */
const getNearbyHelplines = async (location) => {
  // Default helplines (US-based)
  const defaultHelplines = [
    {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      address: 'Available 24/7 nationwide',
      type: 'crisis'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      address: 'Available 24/7 nationwide',
      type: 'crisis'
    },
    {
      name: 'SAMHSA National Helpline',
      phone: '1-800-662-4357',
      address: 'Treatment referral and information',
      type: 'general'
    },
    {
      name: 'NAMI Helpline',
      phone: '1-800-950-6264',
      address: 'Mental health support and resources',
      type: 'general'
    }
  ];

  // If location is provided, fetch nearby mental health clinics using Google Places API
  if (location && location.latitude && location.longitude) {
    try {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp' });

      // Use Gemini to search for mental health clinics based on location
      const prompt = `Find 3-5 real mental health clinics, counseling centers, or psychiatric facilities near coordinates ${location.latitude}, ${location.longitude}. 

For each clinic, provide:
- name: Full name of the facility
- phone: Phone number (if available, otherwise use "Call 411 for local directory")
- address: Full street address with city and state
- distance: Approximate distance from the given coordinates

Return ONLY a valid JSON array with this exact structure:
[
  {
    "name": "Example Mental Health Center",
    "phone": "555-123-4567",
    "address": "123 Main St, City, State ZIP",
    "distance": "0.5 miles",
    "type": "local"
  }
]

Important: Return ONLY the JSON array, no other text.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const nearbyFacilities = JSON.parse(jsonMatch[0]);
        
        // Combine nearby facilities with national helplines
        return [...nearbyFacilities, ...defaultHelplines];
      }
    } catch (error) {
      console.error('Error fetching nearby facilities:', error);
      // Fall back to default helplines on error
    }
  }

  return defaultHelplines;
};

module.exports = { generateResponse, getHistory, deleteHistory, analyzeFace };