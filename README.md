# 🧠 MindCare AI

<div align="center">

![MindCare AI](https://img.shields.io/badge/MindCare-AI-blueviolet?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

**An AI-powered mental health companion built with the MERN stack and Google Gemini AI**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-success?style=for-the-badge)](https://mindcareai-five.vercel.app)
[![Backend API](https://img.shields.io/badge/🔗_API-Explore-informational?style=for-the-badge)](https://mindcareai-backend.onrender.com/healthz)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [API Docs](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running Locally](#running-locally)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
  - [Frontend (Vercel)](#frontend-deployment-vercel)
  - [Backend (Render)](#backend-deployment-render)
  - [Database (MongoDB Atlas)](#database-mongodb-atlas)
- [Features Deep Dive](#-features-deep-dive)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**MindCare AI** is a comprehensive mental health support application that leverages cutting-edge AI technology to provide empathetic, personalized mental wellness assistance. The platform combines real-time chat support, facial emotion analysis, and location-based mental health resources to offer a holistic approach to mental health care.

### 🎯 Mission

To make mental health support accessible, affordable, and stigma-free through AI-powered technology while complementing traditional therapy and professional care.

### ✨ What Makes MindCare AI Special?

- 🤖 **Advanced AI Analysis** - Powered by Google Gemini 2.5 Flash for nuanced emotional understanding
- 📸 **Facial Emotion Detection** - Analyze emotions through facial expressions using camera or uploaded images
- 🗺️ **Location-Based Resources** - Find nearby mental health clinics and services instantly
- 💬 **Contextual Conversations** - Seamlessly transition from face analysis to supportive chat
- 📊 **Progress Tracking** - Maintain conversation history to monitor emotional patterns
- 🔒 **Privacy-First Design** - End-to-end encryption and secure data handling
- 🌍 **24/7 Availability** - Always-on support whenever you need it

---

## ✨ Features

### 🤖 AI-Powered Chat Support

- **Real-time Conversations**: Engage in natural, empathetic dialogues with Gemini AI
- **Context Awareness**: AI maintains conversation context for personalized responses
- **Emotional Intelligence**: Understands and responds to emotional nuances
- **Mental Health Expertise**: Trained responses focused on mental wellness support
- **Markdown Support**: Rich text formatting for clear, organized responses

### 📸 Face Analysis Feature

- **Camera Capture**: Use your device camera for real-time facial analysis
- **Image Upload**: Upload existing photos (up to 10MB, auto-compressed)
- **Emotion Detection**: Identifies emotional states from facial expressions
- **Severity Assessment**: Categorizes emotional intensity (low, moderate, high)
- **Detailed Insights**: Provides comprehensive analysis with:
  - Detected emotion (happy, sad, anxious, stressed, neutral, etc.)
  - Sentiment classification (positive, neutral, negative)
  - Severity level
  - Detailed description
  - Personalized coping suggestions
- **Persistent Results**: Analysis saved across navigation
- **Continue in Chat**: Seamlessly discuss analysis results with AI

### 🗺️ Location-Based Mental Health Resources

- **Nearby Clinics Finder**: Discovers 3-5 mental health facilities near you
- **Smart Detection**: Automatically fetches clinics when moderate/high severity detected
- **Real Clinic Information**: 
  - Facility names and types
  - Phone numbers (clickable for direct calling)
  - Full addresses with distance indicators
  - Operating status
- **National Helplines**: Always displays 988, Crisis Text Line, SAMHSA, and NAMI
- **Privacy Protected**: Location used only for resource search, not stored

### 📊 Conversation History

- **Persistent Storage**: All chat and face analysis sessions saved
- **Easy Access**: View past interactions organized by date
- **Searchable Archive**: Track your emotional journey over time
- **Delete Control**: Remove conversations for privacy
- **Session Types**: Distinguishes between chat and face-analysis sessions

### 🔐 Secure Authentication

- **JWT-Based**: JSON Web Token authentication for secure sessions
- **Password Encryption**: Bcrypt hashing with salt rounds
- **Protected Routes**: Middleware-based route protection
- **Token Refresh**: Automatic session management
- **User Sessions**: Maintain logged-in state across tabs

### 🎨 Modern User Interface

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme Ready**: Easy on the eyes with purple-blue gradient scheme
- **Intuitive Navigation**: Clear, user-friendly interface
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful error messages with recovery options
- **Accessibility**: WCAG 2.1 compliant design

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.3.1 |
| **Vite** | Build Tool & Dev Server | 5.4.1 |
| **React Router** | Client-side Routing | 6.26.1 |
| **Axios** | HTTP Client | 1.7.7 |
| **React Markdown** | Markdown Rendering | 9.0.1 |
| **Lucide React** | Icon Library | 0.441.0 |
| **Context API** | State Management | Built-in |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 18+ |
| **Express.js** | Web Framework | 5.1.0 |
| **MongoDB** | NoSQL Database | 8.19.1 |
| **Mongoose** | MongoDB ODM | 8.19.1 |

### AI & Authentication

| Technology | Purpose |
|------------|---------|
| **Google Gemini AI** | Generative AI Model (gemini-2.5-flash) |
| **JWT** | JSON Web Tokens for Authentication |
| **Bcrypt.js** | Password Hashing & Salting |

### Deployment & Hosting

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Vercel** | Frontend Hosting | ✅ Yes |
| **Render** | Backend Hosting | ✅ Yes (750hrs/month) |
| **MongoDB Atlas** | Database Hosting | ✅ Yes (512MB) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                    │
│                    Hosted on Vercel                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Chat UI    │  │ Face Analysis│  │   History    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          │    HTTPS/REST API (Axios)          │
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────┐
│              SERVER (Express.js + Node.js)                   │
│                   Hosted on Render                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Middleware Layer                        │   │
│  │  • CORS Handler  • JWT Auth  • Error Handler        │   │
│  └──────────────────┬───────────────────────────────────┘   │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │              Route Handlers                          │   │
│  │  • /api/users/*  • /api/chat/*  • /healthz         │   │
│  └──────────────────┬───────────────────────────────────┘   │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │              Controllers                             │   │
│  │  • User Auth  • Chat Logic  • Face Analysis         │   │
│  └──────┬───────────────────────────────────┬───────────┘   │
└─────────┼───────────────────────────────────┼───────────────┘
          │                                   │
    ┌─────▼──────┐                     ┌─────▼────────┐
    │  MongoDB   │                     │  Gemini AI   │
    │   Atlas    │                     │     API      │
    │            │                     │              │
    │ • Users    │                     │ • Chat       │
    │ • History  │                     │ • Face Emoji │
    │            │                     │ • Resources  │
    └────────────┘                     └──────────────┘
```

### Data Flow Examples

#### 1. Chat Message Flow
```
User Types Message → Frontend
  → POST /api/chat (with message + location)
    → Backend validates JWT
      → Extracts user from token
        → Calls Gemini AI API
          → AI generates response
            → Extracts mental health info
              → Generates location-based helplines (if needed)
                → Saves to MongoDB (History)
                  → Returns response to Frontend
                    → UI displays message + analysis + helplines
```

#### 2. Face Analysis Flow
```
User Captures/Uploads Image → Frontend
  → Compresses image (max 1920x1080, 70% JPEG quality)
    → Converts to base64
      → POST /api/chat/analyze-face (with image + location)
        → Backend validates JWT
          → Calls Gemini AI with vision prompt
            → AI analyzes facial expressions
              → Extracts emotion, sentiment, severity
                → Generates location-based clinics (if needed)
                  → Saves to MongoDB (History)
                    → Returns analysis to Frontend
                      → UI displays results + helplines + "Continue in Chat" button
```

#### 3. Authentication Flow
```
User Registers/Logs In → Frontend
  → POST /api/users/register or /login
    → Backend hashes password (bcrypt)
      → Saves to MongoDB (register) or validates (login)
        → Generates JWT token
          → Returns token + user data to Frontend
            → Frontend stores in localStorage
              → Sets Axios default Authorization header
                → All subsequent requests include JWT
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  ```bash
  node --version  # Should be >= 18.0.0
  ```
- **npm** (v9.0.0 or higher)
  ```bash
  npm --version   # Should be >= 9.0.0
  ```
- **Git** (for cloning the repository)
  ```bash
  git --version
  ```
- **MongoDB Account** (MongoDB Atlas - free tier available)
  - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Google AI Studio API Key** (Gemini API)
  - Get yours at [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/adityadeb977/mindcareai.git
cd mindcareai
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

**Backend Dependencies:**
- express (5.1.0) - Web framework
- mongoose (8.19.1) - MongoDB ODM
- bcryptjs (3.0.2) - Password hashing
- jsonwebtoken (9.0.2) - JWT authentication
- cors (2.8.5) - Cross-origin resource sharing
- dotenv (17.2.3) - Environment variables
- @google/generative-ai (0.24.1) - Gemini AI SDK

#### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Frontend Dependencies:**
- react (18.3.1) - UI library
- react-dom (18.3.1) - React DOM renderer
- react-router-dom (6.26.1) - Routing
- axios (1.7.7) - HTTP client
- react-markdown (9.0.1) - Markdown renderer
- lucide-react (0.441.0) - Icon library

### Environment Setup

#### Backend Environment Variables

Create a [`backend/.env`](backend/.env ) file:

```bash
cd backend
cp .env.example .env
```

Edit [`backend/.env`](backend/.env ) with your actual values:

```env
# Node Environment
NODE_ENV=development

# Server Port
PORT=5000

# MongoDB Connection String
# Get this from MongoDB Atlas: https://cloud.mongodb.com
# Format: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/mindcare?retryWrites=true&w=majority

# JWT Secret Key (use a strong random string)
# Generate one using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Google Gemini API Configuration
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Frontend Origin (comma-separated for multiple origins)
# For local development
FRONTEND_ORIGIN=http://localhost:5173
# For production, add: ,https://your-vercel-app.vercel.app
```

**🔐 Generating a Strong JWT Secret:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**📝 MongoDB Atlas Setup:**

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with username and password
3. Whitelist your IP or use `0.0.0.0/0` (all IPs) for development
4. Get connection string from "Connect" → "Connect your application"
5. Replace `<username>`, `<password>`, and database name in the connection string

**🤖 Google Gemini API Key:**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" → "Create API Key"
4. Copy the API key to your [`backend/.env`](backend/.env ) file

#### Frontend Environment Variables

Create a [`frontend/.env.local`](frontend/.env.local ) file:

```bash
cd frontend
cp .env.example .env.local
```

Edit [`frontend/.env.local`](frontend/.env.local ):

```env
# Backend API URL for local development
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** For production deployment, create [`frontend/.env.production`](frontend/.env.production ):

```env
# Backend API URL for production
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### Running Locally

#### Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: cluster0-xxxxx.mongodb.net
```

**Backend Health Check:**
Visit [http://localhost:5000/healthz](http://localhost:5000/healthz)

Expected Response:
```json
{
  "status": "ok",
  "timestamp": "2025-10-18T12:00:00.000Z"
}
```

#### Start the Frontend Development Server

Open a **new terminal** and run:

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v5.4.1  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.x:5173/
  ➜  press h to show help
```

#### Access the Application

Open your browser and navigate to:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 📁 Project Structure

```
mindcareai/
├── backend/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   ├── controllers/
│   │   ├── chatController.js         # Chat & Gemini AI logic, face analysis
│   │   └── userController.js         # User authentication (register, login)
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification middleware
│   │   └── errorMiddleware.js        # Global error handler
│   ├── models/
│   │   ├── historyModel.js           # Conversation history schema
│   │   └── userModel.js              # User schema with password hashing
│   ├── routes/
│   │   ├── chatRoutes.js             # Chat endpoints (/chat, /analyze-face, /history)
│   │   └── userRoutes.js             # Auth endpoints (/register, /login)
│   ├── utils/
│   │   └── generateToken.js          # JWT token generation utility
│   ├── .env                          # Environment variables (not in git)
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Backend dependencies
│   ├── render.yaml                   # Render deployment config
│   └── server.js                     # Express server entry point
│
├── frontend/                         # Frontend (React + Vite)
│   ├── public/                       # Static assets
│   │   └── vite.svg                  # Vite logo
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── ErrorBoundary.jsx     # Error boundary wrapper
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   └── ProtectedRoute.jsx    # Route protection HOC
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx       # Authentication state management
│   │   ├── pages/                    # Page components
│   │   │   ├── About.jsx             # About page with mission, values
│   │   │   ├── FaceAnalysis.jsx      # Face analysis page (camera + upload)
│   │   │   ├── History.jsx           # Conversation history page
│   │   │   ├── Home.jsx              # Main chat interface
│   │   │   ├── Login.jsx             # Login page
│   │   │   └── Register.jsx          # Registration page
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # React app entry point
│   ├── .env.local                    # Local environment variables (not in git)
│   ├── .env.production               # Production environment variables
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   └── vercel.json                   # Vercel deployment config
│
├── .gitignore                        # Root-level git ignore
├── DEPLOYMENT.md                     # Deployment guide
├── FEATURE_SUMMARY.md                # Feature documentation
├── LOCAL_DEVELOPMENT.md              # Local development guide
└── README.md                         # This file
```

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:5000/api
Production:  https://mindcareai-backend.onrender.com/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

### Endpoints

#### **Health Check**

```http
GET /healthz
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-18T12:00:00.000Z"
}
```

---

#### **User Authentication**

##### Register User

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "_id": "6507f1b2c5d4e3f4a5b6c7d8",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400 Bad Request):**
```json
{
  "message": "User already exists"
}
```

##### Login User

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "_id": "6507f1b2c5d4e3f4a5b6c7d8",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

---

#### **Chat**

##### Send Chat Message

```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "I'm feeling anxious about work today",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

**Response (200 OK):**
```json
{
  "message": "I understand that work anxiety can be overwhelming. It's completely normal to feel this way...",
  "analysis": {
    "sentiment": "negative",
    "severity": "moderate",
    "topics": ["anxiety", "work stress"],
    "suggestions": [
      "Practice deep breathing exercises",
      "Take short breaks during work",
      "Talk to a supervisor about workload"
    ]
  },
  "helplines": [
    {
      "type": "local",
      "name": "San Francisco Mental Health Center",
      "phone": "(415) 555-0123",
      "address": "123 Market St, San Francisco, CA 94102",
      "distance": "0.5 miles"
    },
    {
      "type": "national",
      "name": "National Suicide Prevention Lifeline",
      "phone": "988",
      "description": "Available 24/7 nationwide"
    }
  ]
}
```

---

##### Analyze Face

```http
POST /api/chat/analyze-face
Authorization: Bearer <token>
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD...",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

**Response (200 OK):**
```json
{
  "analysis": {
    "emotion": "anxious",
    "sentiment": "negative",
    "severity": "moderate",
    "description": "You appear to be experiencing moderate anxiety, with tension visible in your facial features and a concerned expression.",
    "suggestions": [
      "Practice progressive muscle relaxation",
      "Try the 4-7-8 breathing technique",
      "Consider journaling your thoughts",
      "Engage in light physical activity"
    ]
  },
  "helplines": [
    {
      "type": "local",
      "name": "Community Mental Health Services",
      "phone": "(415) 555-0456",
      "address": "456 Mission St, San Francisco, CA 94103",
      "distance": "1.2 miles"
    }
  ]
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Image is required for face analysis"
}
```

---

##### Get Conversation History

```http
GET /api/chat/history
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "6507f3a1c5d4e3f4a5b6c7d9",
    "user": "6507f1b2c5d4e3f4a5b6c7d8",
    "type": "chat",
    "message": "I'm feeling anxious",
    "response": "I understand that anxiety can be challenging...",
    "analysis": {
      "sentiment": "negative",
      "severity": "moderate",
      "topics": ["anxiety"]
    },
    "createdAt": "2025-10-18T10:30:00.000Z"
  },
  {
    "_id": "6507f4b2c5d4e3f4a5b6c7e0",
    "user": "6507f1b2c5d4e3f4a5b6c7d8",
    "type": "face-analysis",
    "analysis": {
      "emotion": "happy",
      "sentiment": "positive",
      "severity": "low"
    },
    "createdAt": "2025-10-18T11:00:00.000Z"
  }
]
```

---

##### Delete Conversation

```http
DELETE /api/chat/history/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "History entry deleted successfully"
}
```

**Error (404 Not Found):**
```json
{
  "message": "History entry not found"
}
```

---

### Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

**Common HTTP Status Codes:**
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or failed
- `404 Not Found` - Resource not found
- `413 Payload Too Large` - Request body exceeds size limit
- `500 Internal Server Error` - Server error

---

## 🌐 Deployment

### Prerequisites for Deployment

1. **GitHub Account** - To host your code repository
2. **Vercel Account** - For frontend hosting (free tier available)
3. **Render Account** - For backend hosting (free tier: 750 hours/month)
4. **MongoDB Atlas Account** - For database hosting (free tier: 512MB)

### Database (MongoDB Atlas)

#### 1. Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **M0 (Free)** tier
5. Select a cloud provider and region (closest to your users)
6. Name your cluster (e.g., `mindcare-cluster`)
7. Click **"Create Cluster"** (takes 3-5 minutes)

#### 2. Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username and password (save these!)
5. Set user privileges to **"Read and write to any database"**
6. Click **"Add User"**

#### 3. Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For production, restrict to specific IPs for better security
4. Click **"Confirm"**

#### 4. Get Connection String

1. Go back to **"Database"** → Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<username>` and `<password>` with your database user credentials
5. Add database name: `...mongodb.net/mindcare?retryWrites...`

**Final Connection String:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/mindcare?retryWrites=true&w=majority
```

---

### Backend Deployment (Render)

#### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/mindcareai.git
git branch -M main
git push -u origin main
```

#### 2. Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select your `mindcareai` repository
5. Configure the service:

| Setting | Value |
|---------|-------|
| Name | `mindcare-backend` |
| Region | Choose closest to your users |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | `Free` |

#### 3. Add Environment Variables

In the **Environment** section, add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (or leave empty, Render sets this) |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GEMINI_MODEL` | `gemini-2.5-flash` |
| `FRONTEND_ORIGIN` | `http://localhost:5173` (add Vercel URL later) |

#### 4. Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Once "Live", you'll get a URL like: `https://mindcare-backend.onrender.com`
4. Test it: Visit `https://your-backend-url.onrender.com/healthz`

**Expected Response:**
```json
{"status":"ok","timestamp":"..."}
```

---

### Frontend Deployment (Vercel)

#### 1. Update Production Environment

Create [`frontend/.env.production`](frontend/.env.production ):

```env
VITE_API_BASE_URL=https://mindcare-backend.onrender.com/api
```

Replace with your actual Render backend URL.

Commit and push:
```bash
git add frontend/.env.production
git commit -m "Add production environment config"
git push
```

#### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/log in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your `mindcareai` repository
5. Configure the project:

| Setting | Value |
|---------|-------|
| Project Name | `mindcareai` |
| Framework Preset | `Vite` (auto-detected) |
| Root Directory | `frontend` ⚠️ **Important!** |
| Build Command | `npm run build` (auto) |
| Output Directory | `dist` (auto) |

6. Add Environment Variable:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://mindcare-backend.onrender.com/api`

7. Click **"Deploy"**

#### 3. Get Your Vercel URL

After deployment (2-3 minutes), you'll get a URL like:
```
https://mindcareai-xxx.vercel.app
```

---

### Final Step: Update Backend CORS

1. Go back to **Render** → Your backend service
2. Navigate to **"Environment"** tab
3. Find `FRONTEND_ORIGIN` variable
4. Update its value to include your Vercel URL:
   ```
   http://localhost:5173,https://mindcareai-xxx.vercel.app
   ```
5. Click **"Save Changes"**
6. Wait for auto-redeploy (2-3 minutes)

---

### Deployment Checklist

- ✅ MongoDB Atlas cluster created with database user
- ✅ Network access configured (0.0.0.0/0 or specific IPs)
- ✅ Connection string tested locally
- ✅ Backend deployed on Render with all environment variables
- ✅ Backend health check returns `200 OK`
- ✅ Frontend deployed on Vercel with correct API URL
- ✅ CORS configured on backend to allow Vercel URL
- ✅ Test registration, login, chat, and face analysis on production
- ✅ Verify location-based helplines work
- ✅ Check conversation history is saved

---

## 🎯 Features Deep Dive

### Face Analysis Implementation

The face analysis feature uses Google Gemini's vision capabilities to analyze emotions from facial expressions.

**Technical Flow:**

1. **Image Capture/Upload**
   - User captures photo via webcam or uploads existing image
   - Frontend validates file type and size (max 10MB)
   - Image compressed if larger than 1920x1080 pixels
   - Converted to base64 JPEG at 70% quality

2. **AI Analysis**
   - Base64 image sent to backend via POST `/api/chat/analyze-face`
   - Backend calls Gemini AI with specialized vision prompt:
     ```javascript
     const prompt = `Analyze this person's facial expression and emotional state...`;
     const result = await model.generateContent([prompt, imagePart]);
     ```
   - AI returns structured JSON with emotion, sentiment, severity, description, suggestions

3. **Location-Based Resources**
   - If severity is moderate/high, backend calls `getNearbyHelplines()`
   - Uses Gemini AI to search for mental health facilities near GPS coordinates
   - Returns 3-5 local clinics with names, phones, addresses, distances

4. **State Persistence**
   - Results saved to MongoDB (History collection)
   - Also saved to localStorage for client-side persistence
   - User can navigate away and return without losing results

**Code Example (Backend - Face Analysis):**

```javascript
// backend/controllers/chatController.js
const analyzeFace = async (req, res) => {
  try {
    const { image, location } = req.body;
    
    // Validate image
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Prepare image for Gemini AI
    const base64Data = image.split(',')[1];
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: 'image/jpeg'
      }
    };

    // Call Gemini AI
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
    const prompt = `Analyze this person's facial expression...`;
    const result = await model.generateContent([prompt, imagePart]);
    
    // Extract analysis
    const analysis = extractMentalHealthInfo(result.response.text());
    
    // Get location-based resources
    let helplines = [];
    if (analysis.severity === 'moderate' || analysis.severity === 'high') {
      helplines = await getNearbyHelplines(location);
    }

    // Save to database
    await History.create({
      user: req.user._id,
      type: 'face-analysis',
      analysis,
      helplines
    });

    res.json({ analysis, helplines });
  } catch (error) {
    res.status(500).json({ message: 'Analysis failed' });
  }
};
```

---

### Location-Based Resources

The app uses Gemini AI to find nearby mental health facilities instead of traditional APIs like Google Places.

**Why Gemini AI for Location Search?**

- ✅ No additional API keys required
- ✅ Returns natural language descriptions
- ✅ Can filter by mental health specialization
- ✅ Provides contextual information
- ✅ Works globally without regional API restrictions

**Implementation:**

```javascript
// backend/controllers/chatController.js
const getNearbyHelplines = async (location) => {
  if (!location || !location.latitude || !location.longitude) {
    return getNationalHelplines(); // Fallback
  }

  const { latitude, longitude } = location;
  
  const prompt = `Find 3-5 mental health clinics, counseling centers, or 
  therapy services near coordinates ${latitude}, ${longitude}. 
  For each facility, provide: name, phone, address, approximate distance.
  Return ONLY valid JSON array.`;

  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Parse JSON response
    const match = response.match(/\[[\s\S]*\]/);
    const localClinics = match ? JSON.parse(match[0]) : [];
    
    // Combine with national helplines
    return [...localClinics, ...getNationalHelplines()];
  } catch (error) {
    return getNationalHelplines();
  }
};
```

---

### Continue in Chat Feature

Seamlessly transition from face analysis to a supportive conversation.

**User Flow:**

1. User completes face analysis
2. Clicks "Continue in Chat" button
3. Redirected to chat page with pre-filled message
4. Message includes analysis context for AI
5. User sends message and receives personalized support

**Implementation:**

```javascript
// frontend/src/pages/FaceAnalysis.jsx
const continueInChat = () => {
  // Save analysis context to localStorage
  const context = {
    emotion: analysisResult.emotion,
    sentiment: analysisResult.sentiment,
    severity: analysisResult.severity,
    description: analysisResult.description,
    suggestions: analysisResult.suggestions,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(`faceAnalysisContext_${user.id}`, JSON.stringify(context));
  navigate('/'); // Redirect to chat
};

// frontend/src/pages/Home.jsx
useEffect(() => {
  // Check for face analysis context
  const contextKey = `faceAnalysisContext_${user?.id}`;
  const savedContext = localStorage.getItem(contextKey);
  
  if (savedContext) {
    const context = JSON.parse(savedContext);
    
    // Pre-fill message input with analysis summary
    setMessage(`I just completed a face analysis that detected my emotional 
    state as "${context.emotion}" with ${context.severity} severity. 
    ${context.description} Can you help me understand this better and 
    provide guidance?`);
    
    // Clear context after use
    localStorage.removeItem(contextKey);
  }
}, [user]);
```

---

## 🔒 Security

### Authentication & Authorization

- **Password Security**: Bcrypt hashing with 10 salt rounds
- **JWT Tokens**: Signed with strong secret, 30-day expiration
- **Protected Routes**: Middleware validates JWT on every request
- **User Sessions**: Token stored in localStorage, sent in Authorization header

### Data Privacy

- **HTTPS Only**: All production traffic encrypted with TLS/SSL
- **CORS Protection**: Strict origin policy, only allows whitelisted domains
- **Input Validation**: Server-side validation of all user inputs
- **XSS Prevention**: React's built-in escaping, CSP headers
- **No Sensitive Logging**: Passwords and tokens never logged

### API Security

- **Rate Limiting**: Prevents abuse (can be added with `express-rate-limit`)
- **Body Size Limits**: Max 50MB to prevent DoS attacks
- **Error Handling**: Generic error messages to prevent information leakage
- **Environment Variables**: Secrets stored in `.env`, never committed to git

### MongoDB Security

- **Authentication Required**: Database user with password
- **Network Access Control**: IP whitelist configuration
- **Connection String Encryption**: Stored as environment variable
- **Parameterized Queries**: Mongoose prevents NoSQL injection

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors in Production

**Symptom:** Frontend can't connect to backend, console shows CORS error

**Solution:**
1. Check `FRONTEND_ORIGIN` in Render environment variables
2. Ensure it includes your exact Vercel URL (no trailing slash)
3. Example: `http://localhost:5173,https://mindcareai-five.vercel.app`
4. Wait 2-3 minutes for Render to redeploy

#### 2. MongoDB Connection Failed

**Symptoms:**
- Backend crashes on startup
- Error: "MongooseServerSelectionError"

**Solutions:**
- Verify connection string format in [`backend/.env`](backend/.env )
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Ensure database user exists with correct password
- Test connection string locally first

#### 3. 413 Payload Too Large (Face Analysis)

**Symptom:** Face analysis fails with 413 error

**Solutions:**
- Verify [`backend/server.js`](backend/server.js ) has `express.json({ limit: '50mb' })`
- Ensure frontend compresses images before upload
- Check Render service logs for actual error
- Try with smaller image (under 5MB)

#### 4. Gemini API Errors

**Symptoms:**
- Chat responses fail
- Face analysis returns "Analysis failed"

**Solutions:**
- Verify `GEMINI_API_KEY` is valid and has quota
- Check API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Ensure `GEMINI_MODEL` is set to `gemini-2.5-flash` or valid model
- Review Render logs for specific API error messages

#### 5. Login/Registration Not Working

**Symptoms:**
- "User already exists" error
- "Invalid token" after login

**Solutions:**
- Check if `JWT_SECRET` is set in backend environment
- Verify MongoDB is connected (check backend logs)
- Clear browser localStorage and try again
- Ensure backend URL is correct in frontend `.env`

#### 6. Face Analysis State Not Persisting

**Symptom:** Results disappear after navigating away

**Solution:**
- Check browser console for localStorage errors
- Ensure user is logged in (state saved with user ID)
- Clear browser cache and try again
- Verify [`frontend/src/pages/FaceAnalysis.jsx`](frontend/src/pages/FaceAnalysis.jsx ) has `useEffect` for saving/loading

#### 7. Location-Based Resources Not Showing

**Symptoms:**
- Only national helplines shown
- No nearby clinics displayed

**Solutions:**
- Grant location permission in browser
- Check browser console for geolocation errors
- Ensure severity is moderate or high (low severity doesn't trigger)
- Verify Gemini AI API is working (check backend logs)

---

### Debugging Tips

#### Check Backend Logs (Render)

1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab
4. Look for error messages (red text)

#### Check Frontend Console

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for red errors
4. Check "Network" tab for failed requests

#### Test API Endpoints Directly

```bash
# Health check
curl https://mindcareai-backend.onrender.com/healthz

# Test login (replace with your credentials)
curl -X POST https://mindcareai-backend.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

#### Clear All Data (Fresh Start)

```javascript
// Run in browser console (F12)
localStorage.clear();
sessionStorage.clear();
window.location.reload();
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report Bugs**: Open an issue with reproduction steps
- 💡 **Suggest Features**: Share your ideas in discussions
- 📝 **Improve Documentation**: Fix typos, add examples
- 🔧 **Submit Code**: Fix bugs or implement features
- 🎨 **Improve UI/UX**: Design enhancements and accessibility
- 🌍 **Translations**: Help make the app multilingual

### Development Workflow

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/your-username/mindcareai.git
   cd mindcareai
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes locally

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Describe your changes clearly

### Code Style Guidelines

- **JavaScript**: Use ES6+ syntax, async/await over promises
- **React**: Functional components with hooks
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: Explain why, not what
- **File Structure**: Follow existing organization

### Testing Your Changes

Before submitting:

```bash
# Backend
cd backend
npm start
# Ensure no errors, test affected endpoints

# Frontend
cd frontend
npm run dev
# Test UI changes in browser

# Both
# Test the full user flow (register, login, chat, face analysis)
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Aditya Deb

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Aditya Deb**

- GitHub: [@adityadeb977](https://github.com/adityadeb977)
- LinkedIn: [Connect on LinkedIn](https://linkedin.com/in/adityadeb977)
- Email: adityadeb977@gmail.com
- Portfolio: [Your Portfolio](https://yourportfolio.com)

---

## 🙏 Acknowledgments

### Technologies & Services

- [Google Gemini AI](https://ai.google.dev/) - Powerful generative AI for chat and vision analysis
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Scalable cloud database solution
- [Vercel](https://vercel.com) - Lightning-fast frontend hosting
- [Render](https://render.com) - Reliable backend hosting
- [React](https://react.dev/) - Modern UI library
- [Express.js](https://expressjs.com/) - Minimalist web framework
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [Lucide Icons](https://lucide.dev/) - Beautiful open-source icons

### Inspiration & Resources

- **Mental Health Organizations**:
  - [NAMI](https://www.nami.org/) - National Alliance on Mental Illness
  - [SAMHSA](https://www.samhsa.gov/) - Substance Abuse and Mental Health Services
  - [988 Lifeline](https://988lifeline.org/) - National Suicide Prevention Lifeline

- **Open Source Community**:
  - All contributors who submitted PRs
  - Stack Overflow community for troubleshooting help
  - React and Node.js documentation teams

---

## ⚠️ Important Disclaimer

**MindCare AI is NOT a substitute for professional mental health care.**

This application is designed to provide:
- ✅ Supportive conversation and emotional support
- ✅ Mental health education and coping strategies
- ✅ Resources and referrals to professional services
- ✅ A safe space for self-reflection

This application is NOT designed to:
- ❌ Diagnose mental health conditions
- ❌ Prescribe treatment or medication
- ❌ Replace therapy or counseling
- ❌ Provide crisis intervention

### When to Seek Professional Help

**If you are experiencing a mental health crisis or emergency, please contact:**

#### United States
- **Emergency Services**: 911
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357

#### International
- **International Association for Suicide Prevention**: [IASP Resources](https://www.iasp.info/resources/Crisis_Centres/)
- **Befrienders Worldwide**: [Find Local Help](https://www.befrienders.org/)

#### Additional Resources
- **NAMI Helpline**: 1-800-950-6264 (Monday-Friday, 10am-10pm ET)
- **Trevor Project** (LGBTQ+ Youth): 1-866-488-7386
- **Veterans Crisis Line**: 988 then press 1

### Data Privacy Notice

- Your conversations are encrypted and stored securely
- Face analysis images are processed in real-time and not permanently stored
- Location data is used only for resource matching, never sold or shared
- You can delete your conversation history at any time
- We comply with data protection regulations (GDPR, CCPA)

**For detailed privacy practices, see our [Privacy Policy](https://mindcareai-five.vercel.app/privacy)** *(create this page)*

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/adityadeb977/mindcareai?style=social)
![GitHub forks](https://img.shields.io/github/forks/adityadeb977/mindcareai?style=social)
![GitHub issues](https://img.shields.io/github/issues/adityadeb977/mindcareai)
![GitHub pull requests](https://img.shields.io/github/issues-pr/adityadeb977/mindcareai)
![GitHub last commit](https://img.shields.io/github/last-commit/adityadeb977/mindcareai)
![GitHub repo size](https://img.shields.io/github/repo-size/adityadeb977/mindcareai)

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Multi-language Support** - Support for Spanish, French, Hindi, and more
- [ ] **Voice Chat** - Speak with the AI instead of typing
- [ ] **Mobile App** - Native iOS and Android applications
- [ ] **Mood Tracking** - Daily mood journal with trend analysis
- [ ] **Group Support** - Anonymous peer support communities
- [ ] **Therapist Finder** - Direct booking with licensed professionals
- [ ] **Crisis Detection** - Enhanced algorithms for identifying crisis situations
- [ ] **Meditation & Exercises** - Guided mindfulness and relaxation techniques
- [ ] **Export Data** - Download your conversation history as PDF
- [ ] **AI Customization** - Adjust AI personality and response style
- [ ] **Notifications** - Reminders for self-care and check-ins
- [ ] **Accessibility** - Screen reader support, high contrast mode

### Version History

**v1.0.0** - October 2025
- ✅ Initial release with chat, face analysis, and location-based resources

---

## 💬 Support

Need help? Have questions? Reach out!

- **GitHub Issues**: [Open an issue](https://github.com/adityadeb977/mindcareai/issues)
- **Discussions**: [Join the conversation](https://github.com/adityadeb977/mindcareai/discussions)
- **Email**: adityadeb977@gmail.com
- **Twitter**: [@your-twitter-handle](https://twitter.com/your-handle)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ and AI for better mental health**

[Report Bug](https://github.com/adityadeb977/mindcareai/issues) • [Request Feature](https://github.com/adityadeb977/mindcareai/issues) • [Contribute](https://github.com/adityadeb977/mindcareai/pulls)

---

**© 2025 MindCare AI. All Rights Reserved.**

</div>
