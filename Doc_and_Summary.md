# 📌 Voice Bot - Documentation & Summary of Findings

## 📖 Project Overview
This project is a **real-time voice assistant** built using **Next.js (Frontend) and Express.js (Backend)** with OpenAI APIs. It enables users to:
✅ **Speak a question** → Converts voice to text  
✅ **Chat with AI** → Sends queries to the backend (GPT-4)  
✅ **Hear bot responses** → Converts AI replies into speech  

### 🚀 **Tech Stack**
- **Frontend:** Next.js, React, Web Speech API, Tailwind CSS, Socket.io Client
- **Backend:** Node.js, Express, OpenAI API (GPT-4, Whisper, TTS), Socket.io Server

---

## 🔎 **Summary of Findings**

### **Challenges Faced & Solutions**
| **Issue** | **Solution Implemented** |
|-----------|--------------------------|
| Speech Recognition misinterpreted "Samrudh" | Added phonetic cues and corrected responses |
| Responses lacked natural flow | Allowed free conversation while keeping focus on Samrudh |
| WebSockets didn’t work on HTTP | Ensured HTTPS deployment for backend |
| Text-to-Speech pronunciation issues | Adjusted context to improve spoken output |
| Needed proper personal assistant behavior | Refined prompts for more dynamic answers |

### **Key Takeaways**
- Web Speech API's accuracy improves with **phonetic hints in prompts**.
- Text-to-Speech works best when responses are structured for natural speech.
- WebSockets require **HTTPS** when running in production.
- AI responses feel **more human** when they are **flexible rather than scripted**.

---

## 📖 **Project Structure**
```
/voice-bot
│── /backend    # Express + Socket.io Backend
│── /frontend   # Next.js Frontend
│── README.md   # Main project documentation
│── Doc_and_Summary.md  # This file
```

---

## 🔧 **Setup & Deployment**

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

### **3️⃣ Start Backend**
```sh
cd backend
npm start
```

### **4️⃣ Start Frontend**
```sh
cd frontend
npm run dev
```

---

## 📡 **Live Deployment**
✅ **Frontend:** [Live on Vercel](https://voice-bot-frontend-sepia.vercel.app/)  
✅ **Backend:** [Live on Render](https://voice-bot-backend-50e5.onrender.com)  

---

## 🎯 **Future Improvements**
- Improve **TTS pronunciation** by tweaking phonetic spellings.
- Enhance **real-time conversation handling**.
- Add **multilingual support** for broader accessibility.

---

