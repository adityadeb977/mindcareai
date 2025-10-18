import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Send, Bot, User, AlertTriangle, Heart, Brain, Clock, Loader, Sparkles, Plus, RotateCcw, Phone, MapPin } from 'lucide-react';
import axios from 'axios';

// Function to format AI response text
const formatAIResponse = (text) => {
  if (!text) return text;
  
  // Split text into lines
  const lines = text.split('\n');
  const formattedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Handle bullet points starting with * **text**
    if (line.trim().startsWith('* **') && line.includes('**')) {
      const bulletText = line.replace(/^\s*\*\s*\*\*(.*?)\*\*(.*)/, '$1$2');
      formattedLines.push(
        <div key={i} className="flex items-start space-x-2 mb-2">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
          <span>
            <span className="font-medium">{bulletText.split(':')[0]}:</span>
            {bulletText.includes(':') ? bulletText.substring(bulletText.indexOf(':') + 1) : ''}
          </span>
        </div>
      );
    }
    // Handle regular bullets starting with *
    else if (line.trim().startsWith('*') && !line.includes('**')) {
      const bulletText = line.replace(/^\s*\*\s*/, '');
      formattedLines.push(
        <div key={i} className="flex items-start space-x-2 mb-2">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
          <span>{bulletText}</span>
        </div>
      );
    }
    // Handle bold text **text**
    else if (line.includes('**')) {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedLines.push(
        <p key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }}></p>
      );
    }
    // Handle regular paragraphs
    else if (line.trim()) {
      formattedLines.push(
        <p key={i} className="mb-2">{line}</p>
      );
    }
    // Handle empty lines (spacing)
    else {
      formattedLines.push(<div key={i} className="mb-1"></div>);
    }
  }
  
  return <div className="space-y-1">{formattedLines}</div>;
};

const Home = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [helplines, setHelplines] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied or unavailable:', error);
        }
      );
    }
  }, []);

  // Load conversation from localStorage on component mount
  useEffect(() => {
    const savedConversation = localStorage.getItem(`conversation_${user?.id}`);
    const savedAnalysis = localStorage.getItem(`analysis_${user?.id}`);
    const savedSessionId = localStorage.getItem(`sessionId_${user?.id}`);
    const chatContext = localStorage.getItem(`chatContext_${user?.id}`);
    
    if (savedConversation) {
      try {
        const parsedConversation = JSON.parse(savedConversation);
        // Convert timestamp strings back to Date objects and ensure proper format
        const restoredConversation = parsedConversation.map(msg => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
          // Ensure consistent message format
          sender: msg.sender || (msg.isUser ? 'user' : 'ai')
        }));
        setConversation(restoredConversation);
      } catch (error) {
        console.error('Error loading conversation:', error);
        // Clear corrupted data
        localStorage.removeItem(`conversation_${user?.id}`);
      }
    }
    
    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis));
      } catch (error) {
        console.error('Error loading analysis:', error);
        // Clear corrupted data
        localStorage.removeItem(`analysis_${user?.id}`);
      }
    }

    if (savedSessionId) {
      setSessionId(savedSessionId);
    }

    // Check for face analysis context and pre-fill message
    if (chatContext) {
      try {
        const context = JSON.parse(chatContext);
        if (context.type === 'face-analysis') {
          // Create initial message from face analysis
          const contextMessage = `I just completed a face analysis that detected my emotional state as "${context.emotion}" with ${context.severity} severity. ${context.description ? context.description : ''} Can you help me understand this better and provide guidance?`;
          
          // Pre-fill the message input
          setMessage(contextMessage);
          
          // Clear the context
          localStorage.removeItem(`chatContext_${user?.id}`);
        }
      } catch (error) {
        console.error('Error processing chat context:', error);
        localStorage.removeItem(`chatContext_${user?.id}`);
      }
    }
  }, [user?.id]);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && conversation.length > 0) {
      localStorage.setItem(`conversation_${user.id}`, JSON.stringify(conversation));
    }
  }, [conversation, user?.id]);

  // Save analysis to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && analysis) {
      localStorage.setItem(`analysis_${user.id}`, JSON.stringify(analysis));
    }
  }, [analysis, user?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to top on component mount and stay there
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      // Generate sessionId if not exists
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = `session_${Date.now()}_${user.id}`;
        setSessionId(currentSessionId);
        localStorage.setItem(`sessionId_${user.id}`, currentSessionId);
      }

      const response = await axios.post('/chat/', {
        prompt: message,
        sessionId: currentSessionId,
        location: location // Send user location for nearby helplines
      });

      // Use the analysis and cleaned response from backend
      setAnalysis(response.data.analysis);
      
      // Set helplines if provided
      if (response.data.helplines && response.data.helplines.length > 0) {
        setHelplines(response.data.helplines);
      }

      const aiResponse = {
        id: Date.now() + 1,
        text: response.data.response, // Backend now returns cleaned response
        sender: 'ai',
        timestamp: new Date()
      };

      setConversation(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `I apologize, but I'm having trouble connecting right now. ${error.response?.data?.message || 'Please try again in a moment.'}`,
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      setConversation(prev => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const handleNewChatClick = () => {
    setShowNewChatModal(true);
  };

  const confirmNewChat = () => {
    setConversation([]);
    setAnalysis(null);
    setMessage('');
    setSessionId(null);
    setShowNewChatModal(false);
    
    // Clear saved conversation, analysis, and sessionId
    if (user?.id) {
      localStorage.removeItem(`conversation_${user.id}`);
      localStorage.removeItem(`analysis_${user.id}`);
      localStorage.removeItem(`sessionId_${user.id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        
        {/* Main Chat Area */}
        <div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl border border-white/20 shadow-lg">
                    <Brain className="h-6 w-6 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">MindCare AI Assistant</h1>
                    <p className="text-blue-100 text-sm">Your personal mental health companion</p>
                  </div>
                </div>
                
                {/* New Chat Button - Only show if there's a conversation */}
                {conversation.length > 0 && (
                  <button
                    onClick={handleNewChatClick}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 transition-all duration-200 text-white text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Chat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Chat Messages */}
                        {/* Messages Area */}
            <div className={`h-96 p-6 space-y-4 ${conversation.length > 0 ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
              {conversation.length === 0 ? (
                <div className="text-center py-8 pt-12">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome, {user?.name}!
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-4">
                    I'm here to help you with your mental health concerns. 
                    Feel free to share what's on your mind, and I'll provide personalized insights and support.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
                    <button
                      onClick={() => setMessage("I've been feeling anxious lately")}
                      className="text-left p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-xs text-blue-700 transition-colors"
                    >
                      "I've been feeling anxious lately"
                    </button>
                    <button
                      onClick={() => setMessage("I'm having trouble sleeping")}
                      className="text-left p-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-xs text-purple-700 transition-colors"
                    >
                      "I'm having trouble sleeping"
                    </button>
                    <button
                      onClick={() => setMessage("I feel overwhelmed at work")}
                      className="text-left p-2 bg-green-50 hover:bg-green-100 rounded-lg text-xs text-green-700 transition-colors"
                    >
                      "I feel overwhelmed at work"
                    </button>
                  </div>
                </div>
              ) : (
                conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                      <div className={`flex-shrink-0 ${msg.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.sender === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : msg.isError 
                            ? 'bg-red-100 text-red-600'
                            : 'bg-purple-100 text-purple-600'
                        }`}>
                          {msg.sender === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : msg.isError
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div className="text-sm">
                          {msg.sender === 'user' ? (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          ) : (
                            formatAIResponse(msg.text)
                          )}
                        </div>
                        <p className="text-xs mt-1 opacity-70">
                          {(msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp || Date.now())).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin text-gray-500" />
                        <span className="text-sm text-gray-600">Analyzing your message...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share what's on your mind..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !message.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Analysis Panel - Moved below chat */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Concern */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Main Concern</h3>
                <div className={`px-3 py-2 rounded-lg ${getSeverityColor(analysis.severity)}`}>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium capitalize">{analysis.mainConcern}</span>
                  </div>
                </div>
              </div>

              {/* Severity */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Severity Level</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    analysis.severity === 'high' ? 'bg-red-500' :
                    analysis.severity === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="text-sm capitalize">{analysis.severity}</span>
                </div>
              </div>

              {/* Timestamp */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Last Updated</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Related Symptoms */}
            {analysis.relatedSymptoms.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Related Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.relatedSymptoms.slice(0, 8).map((symptom, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full capitalize">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-medium text-blue-900">Recommendations</h3>
              </div>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Consider speaking with a mental health professional</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Practice mindfulness and relaxation techniques</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Maintain a regular sleep schedule</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Stay connected with supportive friends and family</span>
                </li>
              </ul>
            </div>

            {/* Mental Health Helplines */}
            {helplines.length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-medium text-purple-900">
                    {helplines.some(h => h.type === 'local') ? 'Nearby Mental Health Clinics' : 'Mental Health Resources'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {helplines.map((helpline, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-purple-200">
                      <h4 className="font-semibold text-gray-800 text-sm">{helpline.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-purple-600" />
                        <a href={`tel:${helpline.phone}`} className="text-purple-600 hover:underline font-medium">
                          {helpline.phone}
                        </a>
                      </div>
                      {helpline.address && (
                        <div className="flex items-start gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-500">{helpline.address}</p>
                        </div>
                      )}
                      {helpline.distance && (
                        <p className="text-xs text-blue-600 mt-1 font-medium">📍 {helpline.distance} away</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* New Chat Confirmation Modal */}
        {showNewChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Start New Chat?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to start a new chat? This will clear your current conversation and analysis. 
                You can still view this conversation in your history.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmNewChat}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;