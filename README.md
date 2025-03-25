# 🎙️ Voice Bot - Full Stack (Next.js + Express + WebSockets)

This is a **real-time voice assistant** built with **Next.js (Frontend) and Express.js (Backend)** using **OpenAI APIs**. It allows users to:
✅ **Speak a question** → Converts voice to text  
✅ **Chat with AI** → Sends queries to the backend (GPT-4)  
✅ **Hear bot responses** → Converts AI replies into speech  

---

### Demo & Deployed Link

[Demo Video](https://drive.google.com/file/d/1SNnp1EAEMhf77uDtcI53f4bGaoYHVbO9/view?usp=sharing)  
[Deployed Link](https://voice-bot-frontend-sepia.vercel.app/)  
(If it says failed to connect then render have might spin down my server)

---

## 🚀 Tech Stack
### **Frontend (Client)**
- **Next.js (React Framework)**
- **Socket.io Client** (WebSockets)
- **Tailwind CSS** (for UI)
- **Web Speech API** (Speech-to-Text)
- **Speech Synthesis API** (Text-to-Speech)

### **Backend (Server)**
- **Node.js & Express** (Backend API)
- **Socket.io** (Real-time Communication)
- **OpenAI APIs** (GPT-4, Whisper, TTS)
- **Winston** (Logging)
- **CORS & Multer** (File handling)

---

## 🔧 Setup & Installation
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/voice-bot.git
cd voice-bot
```

### **2️⃣ Install Dependencies**
```sh
# Install backend & frontend dependencies
cd backend && npm install
cd ../frontend && npm install
```

### **3️⃣ Add Environment Variables**
Create a `.env` file inside **backend/**:
```sh
OPENAI_API_KEY=your_openai_api_key
PORT=6000
```

### **4️⃣ Start the Backend**
```sh
cd backend
npm start
```
Backend will run at **`http://localhost:6000`**.

### **5️⃣ Start the Frontend**
```sh
cd frontend
npm run dev
```
Frontend will run at **`http://localhost:3000`**.

---

## 📡 Deploying the Project
### **🚀 Deployed Links**
✅ **Frontend:** [Live on Vercel](https://voice-bot-frontend-sepia.vercel.app/)  
✅ **Backend:** [Live on Render](https://voice-bot-backend-50e5.onrender.com)  

---

## 🎨 UI Components
- **`components/VoiceRecorder.tsx`** → Handles **speech recording & AI chat**
- **`pages/index.tsx`** → Main page UI
- **`utils/speechToText.ts`** → Speech recognition (STT)

---

## 🛠 Troubleshooting
- **CORS Issues?** Ensure backend allows requests from frontend.
- **Speech Recognition Not Working?** Ensure **Web Speech API** is supported in your browser.
- **WebSockets Not Connecting?** Ensure backend runs on **HTTPS (Railway/Render).**

---
