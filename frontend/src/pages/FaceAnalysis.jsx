import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Camera, CameraOff, Brain, AlertTriangle, MapPin, Phone, RefreshCw, Loader, MessageSquare, Upload } from 'lucide-react';
import axios from 'axios';

const FaceAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [helplines, setHelplines] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load saved face analysis from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedImage = localStorage.getItem(`faceAnalysis_image_${user.id}`);
      const savedAnalysis = localStorage.getItem(`faceAnalysis_analysis_${user.id}`);
      const savedHelplines = localStorage.getItem(`faceAnalysis_helplines_${user.id}`);
      
      if (savedImage) {
        setCapturedImage(savedImage);
      }
      if (savedAnalysis) {
        try {
          setAnalysis(JSON.parse(savedAnalysis));
        } catch (e) {
          console.error('Error parsing saved analysis:', e);
        }
      }
      if (savedHelplines) {
        try {
          setHelplines(JSON.parse(savedHelplines));
        } catch (e) {
          console.error('Error parsing saved helplines:', e);
        }
      }
    }
  }, [user]);

  // Save face analysis to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      if (capturedImage) {
        localStorage.setItem(`faceAnalysis_image_${user.id}`, capturedImage);
      }
      if (analysis) {
        localStorage.setItem(`faceAnalysis_analysis_${user.id}`, JSON.stringify(analysis));
      }
      if (helplines.length > 0) {
        localStorage.setItem(`faceAnalysis_helplines_${user.id}`, JSON.stringify(helplines));
      }
    }
  }, [capturedImage, analysis, helplines, user]);

  // Start camera
  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraOn(false);
    }
  };

  // Capture image
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPEG, etc.)');
      return;
    }

    // Validate file size (max 10MB for original file)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file size should be less than 10MB');
      return;
    }

    setError('');
    
    // Stop camera if it's on
    if (isCameraOn) {
      stopCamera();
    }

    // Read file and compress it
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize/compress image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (max 1920x1080)
        let width = img.width;
        let height = img.height;
        const maxWidth = 1920;
        const maxHeight = 1080;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression (0.7 quality for JPEG)
        const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
        setCapturedImage(compressedImage);
      };
      img.onerror = () => {
        setError('Failed to load image. Please try another file.');
      };
      img.src = e.target?.result;
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Get user location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(loc);
          resolve(loc);
        },
        (error) => {
          console.error('Location error:', error);
          reject(error);
        }
      );
    });
  };

  // Analyze facial expression
  const analyzeFace = async () => {
    if (!capturedImage) {
      setError('Please capture an image first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Get user location
      let userLocation = location;
      if (!userLocation) {
        try {
          userLocation = await getUserLocation();
        } catch (err) {
          console.log('Location unavailable, continuing without it');
        }
      }

      // Send image to backend for analysis
      console.log('Sending request to:', axios.defaults.baseURL + '/chat/analyze-face');
      const response = await axios.post('/chat/analyze-face', {
        image: capturedImage,
        location: userLocation
      });

      console.log('Analysis response:', response.data);
      setAnalysis(response.data.analysis);
      setHelplines(response.data.helplines || []);
    } catch (err) {
      console.error('Analysis error:', err);
      console.error('Error details:', err.response);
      setError(err.response?.data?.message || 'Failed to analyze. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset and retake
  const resetCapture = () => {
    setCapturedImage(null);
    setAnalysis(null);
    setHelplines([]);
    setError('');
    
    // Clear localStorage
    if (user) {
      localStorage.removeItem(`faceAnalysis_image_${user.id}`);
      localStorage.removeItem(`faceAnalysis_analysis_${user.id}`);
      localStorage.removeItem(`faceAnalysis_helplines_${user.id}`);
    }
    
    startCamera();
  };

  // Continue conversation in chat
  const continueInChat = () => {
    if (analysis && user) {
      // Save face analysis context for chat
      const chatContext = {
        type: 'face-analysis',
        emotion: analysis.emotion,
        sentiment: analysis.sentiment,
        severity: analysis.severity,
        description: analysis.description,
        suggestions: analysis.suggestions,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`chatContext_${user.id}`, JSON.stringify(chatContext));
      
      // Navigate to chat
      navigate('/home');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Face Analysis</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Let AI analyze your facial expressions to understand your emotional state
          </p>
        </div>

        {/* Camera/Image Section - Now at Top */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Camera className="w-6 h-6 mr-2 text-purple-600" />
            Camera
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video/Image Display */}
            <div className="lg:col-span-2">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                {!capturedImage ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
                    />
                    {!isCameraOn && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-center text-gray-400">
                          <CameraOff className="w-16 h-16 mx-auto mb-2" />
                          <p>Camera is off</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Camera Controls */}
              <div className="space-y-3">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <div className="flex gap-3">
                  {!capturedImage ? (
                    <>
                      {!isCameraOn ? (
                        <>
                          <button
                            onClick={startCamera}
                            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium"
                          >
                            <Camera className="w-5 h-5" />
                            Start Camera
                          </button>
                          <button
                            onClick={triggerFileUpload}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
                          >
                            <Upload className="w-5 h-5" />
                            Upload Image
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={captureImage}
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-medium"
                          >
                            <Camera className="w-5 h-5" />
                            Capture Photo
                          </button>
                          <button
                            onClick={stopCamera}
                            className="px-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 font-medium"
                          >
                            <CameraOff className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={analyzeFace}
                        disabled={isAnalyzing}
                        className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="w-5 h-5" />
                            Analyze Face
                          </>
                        )}
                      </button>
                      <button
                        onClick={resetCapture}
                        className="px-6 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 font-medium"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 h-full">
                <h3 className="font-semibold text-blue-900 mb-3">Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• <strong>Capture:</strong> Use camera for live photo</li>
                  <li>• <strong>Upload:</strong> Select existing image file</li>
                  <li>• Ensure good lighting on face</li>
                  <li>• Face should be clearly visible</li>
                  <li>• Maintain a neutral expression</li>
                  <li>• Max file size: 10MB (auto-compressed)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results Section - Now Below Camera */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            Analysis Results
          </h2>

          {!analysis ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <Brain className="w-16 h-16 mx-auto mb-3 opacity-50" />
                <p>Capture and analyze your photo to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Emotional State */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Detected Emotional State</h3>
                <p className="text-2xl font-bold text-purple-600">{analysis.emotion}</p>
              </div>

              {/* Sentiment & Severity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Sentiment</h3>
                  <p className="text-lg font-bold capitalize text-blue-600">{analysis.sentiment}</p>
                </div>
                <div className={`rounded-lg p-4 ${
                  analysis.severity === 'high' ? 'bg-red-50' :
                  analysis.severity === 'moderate' ? 'bg-orange-50' : 'bg-green-50'
                }`}>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Severity</h3>
                  <p className={`text-lg font-bold capitalize ${
                    analysis.severity === 'high' ? 'text-red-600' :
                    analysis.severity === 'moderate' ? 'text-orange-600' : 'text-green-600'
                  }`}>{analysis.severity}</p>
                </div>
              </div>

              {/* Analysis Description */}
              {analysis.description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Analysis</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{analysis.description}</p>
                </div>
              )}

              {/* Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Suggestions</h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Helplines */}
              {helplines.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                    {helplines.some(h => h.type === 'local') ? 'Nearby Mental Health Clinics' : 'Mental Health Resources'}
                  </h3>
                  <div className="space-y-3">
                    {helplines.map((helpline, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 border border-purple-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{helpline.name}</h4>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${helpline.phone}`} className="text-purple-600 hover:underline">
                                {helpline.phone}
                              </a>
                            </div>
                            {helpline.address && (
                              <div className="flex items-start gap-2 mt-1">
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                <p className="text-xs text-gray-500">{helpline.address}</p>
                              </div>
                            )}
                            {helpline.distance && (
                              <p className="text-xs text-blue-600 mt-1">📍 {helpline.distance} away</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue in Chat Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={continueInChat}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MessageSquare className="w-6 h-6" />
                  Continue in Chat
                </button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Discuss your analysis with our AI companion
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Important Disclaimer</p>
              <p>
                This AI-powered face analysis is for educational and supportive purposes only. 
                It is NOT a substitute for professional mental health diagnosis or treatment. 
                If you're experiencing a mental health crisis, please contact emergency services or a mental health professional immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceAnalysis;
