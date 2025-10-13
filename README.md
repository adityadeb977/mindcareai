# 🧠 MindCare AI

<div align="center">

![MindCare AI Logo](https://img.shields.io/badge/MindCare-AI-blue?style=for-the-badge&logo=react)

**An AI-powered mental health companion built with the MERN stack and Google Gemini AI**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://mindcareai-five.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend-API-informational?style=for-the-badge)](https://mindcareai-backend.onrender.com/healthz)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

MindCare AI is a compassionate mental health support application that leverages Google's Gemini AI to provide empathetic conversations, mental health insights, and personalized support. The application maintains conversation history and analyzes user sentiment to offer tailored assistance.

### 🎯 Key Objectives

- Provide accessible mental health support through AI-powered conversations
- Analyze and track mental health patterns over time
- Offer a safe, judgment-free space for users to express their feelings
- Maintain conversation history for personalized insights

---

## ✨ Features

### 🤖 AI-Powered Conversations
- Real-time chat interface with Google Gemini AI
- Context-aware responses tailored to mental health support
- Empathetic and non-judgmental conversation flow

### 📊 Mental Health Analysis
- Automatic sentiment detection (positive, neutral, negative)
- Severity assessment (low, moderate, high)
- Identification of mental health topics discussed
- Suggested coping strategies based on conversation

### 📝 Conversation History
- Persistent storage of all conversations
- Easy access to past interactions
- Delete conversations for privacy control
- Searchable history for tracking progress

### 🔐 Secure Authentication
- JWT-based authentication
- Bcrypt password hashing
- Protected API routes
- Secure session management

### 🎨 Modern UI/UX
- Responsive design for all devices
- Clean and intuitive interface
- Real-time loading states
- Error handling with user feedback
- Markdown support in chat responses

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### AI & Authentication
- **Google Gemini AI** - Generative AI model
- **JWT** - JSON Web Tokens for auth
- **Bcrypt** - Password hashing

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

---

## 🏗️ Architecture

```
┌─────────────────┐
│   React Client  │
│    (Vercel)     │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Express API    │
│   (Render)      │
└────┬─────┬──────┘
     │     │
     │     └──────────┐
     ▼                ▼
┌──────────┐   ┌────────────┐
│ MongoDB  │   │ Gemini AI  │
│  Atlas   │   │  API       │
└──────────┘   └────────────┘
```

### Data Flow

1. **User Authentication**: Client → Backend → MongoDB
2. **Chat Message**: Client → Backend → Gemini AI → Backend → MongoDB → Client
3. **History Retrieval**: Client → Backend → MongoDB → Client

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityadeb977/mindcareai.git
   cd mindcareai
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_MODEL=gemini-1.5-flash
   FRONTEND_ORIGIN=http://localhost:5173
   ```

   Start backend:
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   Start frontend:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`
   - Health Check: `http://localhost:5000/healthz`

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` or `development` |
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mindcare` |
| `JWT_SECRET` | Secret key for JWT | Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `GEMINI_API_KEY` | Google Gemini API key | Get from [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `GEMINI_MODEL` | Gemini model version | `gemini-1.5-flash` or `gemini-2.5-flash` |
| `FRONTEND_ORIGIN` | Allowed frontend URLs | `https://yourdomain.vercel.app,http://localhost:5173` |

### Frontend (`.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

---

## 🌐 Deployment

### Quick Deploy

This project is configured for easy deployment to Vercel (frontend) and Render (backend).

### Deploy Backend to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - New → Web Service
   - Connect your GitHub repo
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Add Environment Variables** (in Render dashboard)
   ```
   NODE_ENV=production
   MONGO_URI=<your-atlas-connection-string>
   JWT_SECRET=<generate-strong-secret>
   GEMINI_API_KEY=<your-gemini-key>
   GEMINI_MODEL=gemini-1.5-flash
   FRONTEND_ORIGIN=https://your-app.vercel.app
   ```

4. **Deploy** and copy your backend URL

### Deploy Frontend to Vercel

1. **Update production config**
   
   Edit `frontend/.env.production`:
   ```env
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   ```

   Commit and push:
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repo
   - **Root Directory**: `frontend`
   - **Framework**: Vite (auto-detected)
   - Add environment variable:
     - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api`
   - Deploy

3. **Update Backend CORS**
   - Go back to Render → Environment
   - Update `FRONTEND_ORIGIN` to your Vercel URL
   - Save (auto-redeploys)

### Deployment Checklist

- ✅ MongoDB Atlas cluster created with database user
- ✅ IP whitelist set to `0.0.0.0/0` in Atlas
- ✅ Backend deployed on Render with all env variables
- ✅ Frontend deployed on Vercel with API URL
- ✅ CORS updated in backend to allow frontend URL
- ✅ Test `/healthz` endpoint
- ✅ Test registration and login
- ✅ Test chat functionality

---

## 📚 API Documentation

### Base URL
```
Production: https://mindcareai-backend.onrender.com/api
Development: http://localhost:5000/api
```

### Endpoints

#### Authentication

**Register User**
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login User**
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Chat

**Send Message** (Protected)
```http
POST /chat
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "I'm feeling anxious today"
}
```

**Get Conversation History** (Protected)
```http
GET /chat/history
Authorization: Bearer <jwt_token>
```

**Delete Conversation** (Protected)
```http
DELETE /chat/history/:id
Authorization: Bearer <jwt_token>
```

### Response Formats

**Success Response**
```json
{
  "message": "AI response here",
  "analysis": {
    "sentiment": "negative",
    "severity": "moderate",
    "topics": ["anxiety", "stress"],
    "suggestions": ["Deep breathing exercises", "Talk to a professional"]
  }
}
```

**Error Response**
```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and structure
- Write clear commit messages
- Test your changes locally before submitting
- Update documentation as needed
- Add comments for complex logic

---

## 📝 Project Structure

```
mindcareai/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── chatController.js     # Chat & Gemini AI logic
│   │   └── userController.js     # User authentication
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── historyModel.js       # Conversation schema
│   │   └── userModel.js          # User schema
│   ├── routes/
│   │   ├── chatRoutes.js         # Chat endpoints
│   │   └── userRoutes.js         # Auth endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express server
│   └── package.json
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── pages/
│   │   │   ├── History.jsx       # Conversation history
│   │   │   ├── Home.jsx          # Chat interface
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env.example              # Environment template
│   ├── .env.production           # Production config
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

---

## 🔧 Troubleshooting

### Common Issues

**CORS Errors**
- Ensure `FRONTEND_ORIGIN` in backend matches your frontend URL exactly
- No trailing slashes in URLs
- Wait 2-3 minutes after updating Render environment variables

**MongoDB Connection Failed**
- Check if your IP is whitelisted in MongoDB Atlas
- Verify connection string format and credentials
- Ensure database name is specified in connection string

**Gemini API Errors**
- Verify API key is valid and has quota remaining
- Check model name is correct (`gemini-1.5-flash` or `gemini-2.5-flash`)
- Review API usage limits

**Build Failures**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (≥18)
- Verify all environment variables are set

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Aditya Deb**
- GitHub: [@adityadeb977](https://github.com/adityadeb977)
- Project Link: [https://github.com/adityadeb977/mindcareai](https://github.com/adityadeb977/mindcareai)
- Live Demo: [https://mindcareai-five.vercel.app](https://mindcareai-five.vercel.app)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the powerful language model
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com) for frontend hosting
- [Render](https://render.com) for backend hosting
- The open-source community for amazing tools and libraries

---

## ⚠️ Disclaimer

**MindCare AI is not a substitute for professional mental health care.** If you're experiencing a mental health crisis or emergency, please contact:

- **Emergency Services**: 911 (US) or your local emergency number
- **National Suicide Prevention Lifeline**: 988 (US)
- **Crisis Text Line**: Text HOME to 741741 (US)
- **International Association for Suicide Prevention**: [https://www.iasp.info/resources/Crisis_Centres/](https://www.iasp.info/resources/Crisis_Centres/)

This application is designed to provide supportive conversation and should be used as a complement to, not a replacement for, professional mental health services.

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ and AI

</div>
