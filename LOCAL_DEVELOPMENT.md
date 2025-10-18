# 🚀 Local Development Guide

## Quick Start

### 1. Start Backend (Terminal 1)
```powershell
cd backend
node server.js
```
**Backend will run on:** http://localhost:5000

### 2. Start Frontend (Terminal 2)
```powershell
cd frontend
npm run dev
```
**Frontend will run on:** http://localhost:5173

### 3. Open Browser
Navigate to: **http://localhost:5173**

---

## Configuration Files

### Backend (.env)
Located at: `backend/.env`
```env
MONGO_URI=mongodb+srv://... (Already configured ✅)
JWT_SECRET=thisisareallylongandsecretstringforjwt
GEMINI_API_KEY=AIzaSyCG0Spw8J1dB2DaLFf6469qMIkb_RQW6lU
GEMINI_MODEL=gemini-2.5-flash
FRONTEND_ORIGIN=http://localhost:5173
```

### Frontend (.env.local)
Located at: `frontend/.env.local`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## First Time Setup

If you haven't installed dependencies yet:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Testing Endpoints

### Backend Health Check
Open: http://localhost:5000/healthz
Should return: `{"status":"ok","timestamp":"..."}`

### Backend API Root
Open: http://localhost:5000
Should return: "Hello! The Mental Health Companion API is running."

---

## Common Issues & Solutions

### Port 5173 Already in Use
If you see: "Port 5173 is in use"
- Vite will automatically use port 5174 or another available port
- Use the URL shown in the terminal

### Backend Not Connecting
- Check if MongoDB Atlas is accessible
- Verify `.env` file exists in `backend/` folder
- Check console for errors

### CORS Errors
- Ensure backend is running first
- Check `FRONTEND_ORIGIN` in backend/.env matches your frontend port
- Restart backend after changing .env

### Changes Not Reflecting
- Frontend: Changes auto-reload (just save the file)
- Backend: Press Ctrl+C and restart with `node server.js`

---

## Development Workflow

1. **Start both servers** (backend and frontend)
2. **Make your changes**
   - Frontend files in `frontend/src/`
   - Backend files in `backend/`
3. **Test in browser** at http://localhost:5173
4. **Commit changes** when ready
   ```powershell
   git add .
   git commit -m "Your change description"
   git push
   ```

---

## Stop Servers

Press **Ctrl+C** in each terminal window to stop the servers.

---

## Need Help?

- Backend logs appear in the backend terminal
- Frontend logs appear in browser console (F12)
- Check `DEPLOYMENT.md` for production deployment

**Happy coding! 🎉**
