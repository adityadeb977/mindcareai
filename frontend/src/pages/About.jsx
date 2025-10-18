import React from 'react';
import { Brain, Heart, Shield, Users, Sparkles, Target, Award, TrendingUp } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced facial emotion recognition using Google's Gemini AI to provide accurate mental health insights."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Compassionate Support",
      description: "24/7 empathetic AI companion designed to listen, understand, and provide personalized mental health guidance."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your conversations and data are encrypted and secure. We prioritize your privacy and confidentiality."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Local Resources",
      description: "Get connected to nearby mental health clinics and professionals based on your location."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Availability" },
    { number: "50+", label: "Countries" }
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "To make mental health support accessible, affordable, and stigma-free for everyone, everywhere."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Our Vision",
      description: "A world where seeking mental health support is as natural as caring for physical health."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Our Goal",
      description: "Empower individuals with AI-driven insights and connect them to professional care when needed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              About MindCare AI
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Your trusted AI companion for mental wellness, combining cutting-edge technology 
              with compassionate care to support your mental health journey.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {stat.number}
              </div>
              <div className="text-gray-600 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transforming Mental Health Care with AI
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              MindCare AI was born from a simple yet powerful belief: mental health support 
              should be accessible to everyone, anytime, anywhere. We leverage the latest 
              advancements in artificial intelligence to provide immediate, personalized, 
              and compassionate mental health support.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform combines advanced facial emotion recognition, natural language 
              processing, and a deep understanding of mental health to create a supportive 
              environment where you can explore your feelings, get insights, and find the 
              help you need.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">Empathy Driven</p>
                  </div>
                  <div className="text-center">
                    <Brain className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">AI Powered</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">Secure & Private</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium">Community Focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MindCare AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine technology and compassion to deliver exceptional mental health support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-purple-600 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-xl text-gray-600">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center text-purple-600 mb-4">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Mental Wellness Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who trust MindCare AI for their mental health support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Started Free
            </a>
            <a 
              href="/home"
              className="bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-800 transition-colors duration-300 border-2 border-white/30"
            >
              Try Face Analysis
            </a>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">Note:</span> MindCare AI is designed to provide support and guidance. 
            For serious mental health concerns, please consult with a licensed professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
