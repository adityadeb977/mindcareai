import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Trash2, Calendar, MessageCircle, Brain, AlertTriangle, Search, Filter, ChevronDown, Eye, CheckCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

// Function to format AI response text
const formatAIResponse = (text) => {
  if (!text) return '';
  
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
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-800">
            <span className="font-semibold">{bulletText.split(':')[0]}:</span>
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
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
          <span className="text-gray-800">{bulletText}</span>
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
        <p key={i} className="mb-2 text-gray-800">{line}</p>
      );
    }
    // Handle empty lines (spacing)
    else {
      formattedLines.push(<div key={i} className="mb-2"></div>);
    }
  }
  
  return formattedLines;
};

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/chat/history');
      setHistoryData(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
    setLoading(false);
  };

  const deleteHistoryItem = async (id) => {
    try {
      await axios.delete(`/chat/history/${id}`);
      setHistoryData(prev => prev.filter(item => item._id !== id));
      setShowDeleteModal(null);
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const continueChat = (item) => {
    // Restore the entire conversation from all messages in the session
    const conversation = [];
    
    // If the item has a messages array, restore all messages
    if (item.messages && item.messages.length > 0) {
      item.messages.forEach((msg, index) => {
        // Add user message
        conversation.push({
          id: Date.now() - (item.messages.length * 2) + (index * 2),
          text: msg.prompt,
          sender: 'user',
          timestamp: new Date(msg.timestamp || item.createdAt)
        });
        // Add AI response
        conversation.push({
          id: Date.now() - (item.messages.length * 2) + (index * 2) + 1,
          text: msg.response,
          sender: 'ai',
          timestamp: new Date(msg.timestamp || item.createdAt)
        });
      });
    } else {
      // Fallback: restore single message pair if messages array doesn't exist
      conversation.push({
        id: Date.now() - 1,
        text: item.prompt,
        sender: 'user',
        timestamp: new Date(item.createdAt)
      });
      conversation.push({
        id: Date.now(),
        text: item.response,
        sender: 'ai',
        timestamp: new Date(item.createdAt)
      });
    }

    // Save conversation, analysis, and sessionId to localStorage
    localStorage.setItem(`conversation_${user.id}`, JSON.stringify(conversation));
    
    if (item.analysis) {
      localStorage.setItem(`analysis_${user.id}`, JSON.stringify(item.analysis));
    }

    if (item.sessionId) {
      localStorage.setItem(`sessionId_${user.id}`, item.sessionId);
    }

    // Navigate to home page
    navigate('/');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const filteredHistory = historyData
    .filter(item => {
      const matchesSearch = item.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.response.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.analysis?.mainConcern || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'high' && item.analysis?.severity === 'high') ||
                           (filterBy === 'moderate' && item.analysis?.severity === 'moderate') ||
                           (filterBy === 'low' && item.analysis?.severity === 'low');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <HistoryIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Conversation History</h1>
            <p className="text-gray-600">Review your previous mental health conversations and insights</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter by Severity */}
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severity Levels</option>
                <option value="high">High Severity</option>
                <option value="moderate">Moderate Severity</option>
                <option value="low">Low Severity</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {historyData.length === 0 ? 'No conversations yet' : 'No matching conversations'}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {historyData.length === 0 
              ? "Start a conversation with MindCare AI to see your history here."
              : "Try adjusting your search terms or filters to find what you're looking for."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredHistory.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString()} at{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => continueChat(item)}
                      className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Continue this conversation"
                    >
                      <ArrowRight className="h-3 w-3" />
                      <span>Continue</span>
                    </button>
                    <button
                      onClick={() => setSelectedItem(selectedItem === item._id ? null : item._id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(item._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Conversation Preview */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {item.messages && item.messages.length > 1 
                      ? `Conversation (${item.messages.length} messages)` 
                      : 'Your Message'}
                  </h3>
                  <p className="text-gray-800 bg-blue-50 p-3 rounded-lg text-sm">
                    {item.prompt.length > 150 
                      ? `${item.prompt.substring(0, 150)}...` 
                      : item.prompt
                    }
                  </p>
                  {item.messages && item.messages.length > 1 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Click "Continue" to see all {item.messages.length} messages in this conversation
                    </p>
                  )}
                </div>

                {/* Analysis Summary */}
                {item.analysis && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <h3 className="text-sm font-medium text-gray-700">Analysis Summary</h3>
                      </div>
                      <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getSeverityColor(item.analysis.severity)}`}>
                        {item.analysis.severity} severity
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-700 capitalize">
                        Main concern: {item.analysis.mainConcern}
                      </span>
                    </div>
                  </div>
                )}

                {/* Expandable Full Conversation and Analysis */}
                {selectedItem === item._id && (
                  <div className="mt-4 border-t border-gray-200 pt-4 space-y-6">
                    {/* Full Conversation */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        {item.messages && item.messages.length > 1 
                          ? `Full Conversation (${item.messages.length} exchanges)` 
                          : 'Conversation'}
                      </h3>
                      <div className="space-y-4">
                        {item.messages && item.messages.length > 0 ? (
                          item.messages.map((msg, index) => (
                            <div key={index} className="space-y-3">
                              {/* User Message */}
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-xs font-medium text-blue-600 mb-2">You:</p>
                                <p className="text-sm text-gray-800">{msg.prompt}</p>
                              </div>
                              {/* AI Response */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs font-medium text-purple-600 mb-2">MindCare AI:</p>
                                <div className="text-sm space-y-1">
                                  {formatAIResponse(msg.response)}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="space-y-3">
                            {/* Fallback for old format */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-xs font-medium text-blue-600 mb-2">You:</p>
                              <p className="text-sm text-gray-800">{item.prompt}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-xs font-medium text-purple-600 mb-2">MindCare AI:</p>
                              <div className="text-sm space-y-1">
                                {formatAIResponse(item.response)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Full Analysis */}
                    {item.analysis && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-4">
                          <Brain className="h-5 w-5 text-blue-600" />
                          <h3 className="text-base font-semibold text-blue-900">Detailed Analysis</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          {/* Main Concern */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Main Concern</h4>
                            <div className={`px-3 py-2 rounded-lg border ${getSeverityColor(item.analysis.severity)}`}>
                              <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="font-medium capitalize">{item.analysis.mainConcern}</span>
                              </div>
                            </div>
                          </div>

                          {/* Severity Level */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Severity Level</h4>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                item.analysis.severity === 'high' ? 'bg-red-500' :
                                item.analysis.severity === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}></div>
                              <span className="text-sm capitalize font-medium">{item.analysis.severity}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Related Symptoms */}
                        {item.analysis.relatedSymptoms && item.analysis.relatedSymptoms.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Related Symptoms</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.analysis.relatedSymptoms.map((symptom, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full capitalize"
                                >
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recommendations */}
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Recommendations</span>
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>Consider speaking with a mental health professional</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>Practice mindfulness and relaxation techniques</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>Maintain a regular sleep schedule</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>Stay connected with supportive friends and family</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Conversation</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteHistoryItem(showDeleteModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;