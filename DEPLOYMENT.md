# MindCare AI - Deployment Guide

## 🚀 Deploying to Vercel (Frontend) + Render (Backend)

### Prerequisites
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier)
- [Render](https://render.com/) account (free tier)
- [Vercel](https://vercel.com/) account (free tier)
- [Google AI Studio](https://makersuite.google.com/app/apikey) API key for Gemini
- GitHub account (to push your code)

---

## 📋 Step-by-Step Deployment

### 1️⃣ Setup MongoDB Atlas

1. **Create a MongoDB cluster:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new project
   - Build a free M0 cluster (select a region close to you)

2. **Create database user:**
   - Database Access → Add New Database User
   - Choose Password authentication
   - Save username and password

3. **Whitelist IP addresses:**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for Render

4. **Get connection string:**
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<username>`, `<password>`, and add database name
   - Example: `mongodb+srv://user:pass@cluster.mongodb.net/mindcare?retryWrites=true&w=majority`

---

### 2️⃣ Push Code to GitHub

```bash
# Initialize git (if not already done)
cd "d:\MindCare AI"
git init
git add .
git commit -m "Initial commit - MindCare AI"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/mindcare-ai.git
git branch -M main
git push -u origin main
```

---

### 3️⃣ Deploy Backend on Render

1. **Create a new Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your `mindcare-ai` repository

2. **Configure the service:**
   - **Name:** `mindcare-backend` (or any name you prefer)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

3. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:

   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mindcare?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-generate-a-strong-one
   GEMINI_API_KEY=your-gemini-api-key-here
   GEMINI_MODEL=gemini-1.5-flash
   FRONTEND_ORIGIN=https://your-app.vercel.app
   ```

   **Generate a strong JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes for first deploy)
   - Copy your backend URL: `https://mindcare-backend.onrender.com`

5. **Test the backend:**
   - Visit: `https://mindcare-backend.onrender.com/healthz`
   - Should return: `{"status":"ok","timestamp":"..."}`

---

### 4️⃣ Deploy Frontend on Vercel

1. **Update production environment file:**
   - Open `frontend/.env.production`
   - Replace with your Render backend URL:
   ```
   VITE_API_BASE_URL=https://mindcare-backend.onrender.com/api
   ```

2. **Commit and push changes:**
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push
   ```

3. **Deploy on Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build` (auto-detected)
     - **Output Directory:** `dist` (auto-detected)

4. **Add Environment Variables:**
   - Settings → Environment Variables
   - Add:
     ```
     VITE_API_BASE_URL=https://mindcare-backend.onrender.com/api
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at: `https://your-app.vercel.app`

---

### 5️⃣ Update Backend CORS Settings

1. **Go back to Render:**
   - Environment → Edit `FRONTEND_ORIGIN`
   - Update with your Vercel URL:
   ```
   FRONTEND_ORIGIN=https://your-app.vercel.app
   ```

2. **Save and redeploy** (Render will auto-redeploy)

---

## ✅ Testing Your Deployment

1. **Visit your Vercel app:** `https://your-app.vercel.app`
2. **Register a new account**
3. **Login**
4. **Test the chat** - ask Gemini something like "I'm feeling stressed"
5. **Check history page** - verify conversations are saved

---

## 🔧 Troubleshooting

### Backend Issues

**CORS errors:**
- Verify `FRONTEND_ORIGIN` in Render matches your Vercel URL exactly
- Check browser console for the exact origin being blocked

**MongoDB connection fails:**
- Verify connection string is correct
- Check MongoDB Atlas → Network Access allows 0.0.0.0/0
- Check database user credentials

**Gemini API errors:**
- Verify API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check backend logs in Render for specific error messages

### Frontend Issues

**API calls fail:**
- Check `VITE_API_BASE_URL` in Vercel environment variables
- Verify backend is running: visit `/healthz` endpoint
- Check browser console for network errors

**Build fails:**
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Try building locally: `npm run build`

---

## 📊 Monitoring & Logs

### Render Logs
- Dashboard → Your Service → Logs tab
- See real-time server logs

### Vercel Logs
- Dashboard → Your Project → Deployments → Click deployment → Function Logs

### MongoDB Atlas
- Metrics → View connection and query metrics
- Database Access → Check authentication issues

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - they're in `.gitignore`
2. **Use strong JWT secrets** - at least 64 characters
3. **Rotate API keys regularly**
4. **Enable 2FA** on all services
5. **Use environment variables** for all secrets
6. **Review Render/Vercel logs** regularly

---

## 💰 Free Tier Limits

### Render (Free Tier)
- 750 hours/month
- Spins down after 15 min of inactivity (cold starts)
- 512 MB RAM
- Upgrade to paid tier ($7/mo) for always-on

### Vercel (Free Tier)
- 100 GB bandwidth/month
- Unlimited deployments
- Built-in SSL
- Serverless functions

### MongoDB Atlas (Free Tier)
- 512 MB storage
- Shared RAM
- Usually enough for small to medium apps

---

## 🚀 Next Steps

- **Custom Domain:** Add your domain in Vercel settings
- **SSL Certificate:** Automatically provided by Vercel
- **Monitoring:** Set up uptime monitoring (UptimeRobot, etc.)
- **Analytics:** Add Google Analytics or Vercel Analytics
- **Error Tracking:** Consider Sentry for error monitoring

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render and Vercel logs
3. Verify all environment variables are set correctly
4. Test each service independently (backend healthz, frontend build locally)

---

**🎉 Congratulations! Your MindCare AI app is now live!**
