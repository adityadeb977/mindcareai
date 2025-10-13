import React from 'react';
import { Brain, Heart, Shield, Users, Zap, Award, CheckCircle, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms provide personalized mental health insights and recommendations.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your conversations are encrypted and secure. We prioritize your privacy and confidentiality.'
    },
    {
      icon: Heart,
      title: '24/7 Support',
      description: 'Access mental health support anytime, anywhere. Our AI is always available when you need it.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with input from mental health professionals and real user experiences.'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get immediate analysis and feedback to better understand your mental health patterns.'
    },
    {
      icon: Award,
      title: 'Evidence-Based',
      description: 'Our recommendations are based on proven therapeutic approaches and scientific research.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Users Helped' },
    { number: '50K+', label: 'Conversations' },
    { number: '95%', label: 'User Satisfaction' },
    { number: '24/7', label: 'Availability' }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Psychologist',
      description: 'Leading mental health expert with 15+ years of experience in cognitive behavioral therapy.'
    },
    {
      name: 'Alex Chen',
      role: 'AI Engineer',
      description: 'Specialist in natural language processing and machine learning for healthcare applications.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'UX Designer',
      description: 'Expert in creating compassionate and accessible digital health experiences.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
            <Brain className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About MindCare AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering individuals on their mental wellness journey through compassionate AI technology 
          and evidence-based support. Your mental health matters, and we're here to help.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At MindCare AI, we believe that mental health support should be accessible, immediate, and personalized. 
            Our mission is to bridge the gap between traditional therapy and everyday mental wellness needs by 
            providing intelligent, compassionate AI assistance that helps individuals understand their mental health 
            patterns and develop coping strategies.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose MindCare AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          How MindCare AI Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Share Your Thoughts',
                description: 'Express what\'s on your mind in a safe, judgment-free environment. Our AI listens with empathy and understanding.'
              },
              {
                step: 2,
                title: 'Receive Intelligent Analysis',
                description: 'Our AI analyzes your message using advanced natural language processing to identify patterns and concerns.'
              },
              {
                step: 3,
                title: 'Get Personalized Insights',
                description: 'Receive tailored feedback, coping strategies, and recommendations based on evidence-based therapeutic approaches.'
              },
              {
                step: 4,
                title: 'Track Your Progress',
                description: 'Monitor your mental health journey over time with detailed conversation history and progress tracking.'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Ethics */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Safety & Ethics First
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Data Privacy</span>
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>HIPAA compliant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No data selling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Anonymous processing</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Ethical AI</span>
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Bias-free algorithms</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Transparent processes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Human oversight</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Continuous monitoring</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-16">
        <div className="flex items-start space-x-3">
          <div className="bg-yellow-100 p-2 rounded-full">
            <Shield className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-700 text-sm">
              MindCare AI is designed to provide supportive guidance and insights, but it is not a substitute 
              for professional mental health treatment. If you are experiencing a mental health crisis or 
              suicidal thoughts, please contact a mental health professional, your local emergency services, 
              or a crisis hotline immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-blue-100 mb-6">
          Take the first step towards better mental health with MindCare AI
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start Conversation
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;