# 📌 Approach & Design Decisions

## 🎯 **Objective**
The goal was to build a **real-time voice assistant** using **Next.js (Frontend) and Express.js (Backend)** that can:  
✅ **Convert speech to text** using the Web Speech API  
✅ **Communicate with AI** via OpenAI’s GPT-3.5
✅ **Respond with spoken audio** using the Speech Synthesis API  
✅ **Provide dynamic yet structured responses**  

---

## 🏗️ **Architectural Design**

### **1️⃣ Frontend (Next.js)**
- **Next.js with App Router**: Enables modern React features & better performance.
- **Web Speech API (STT)**: Captures user speech and converts it to text.
- **Speech Synthesis API (TTS)**: Converts bot replies into speech.
- **Socket.io Client**: Enables real-time communication with the backend.
- **Tailwind CSS**: Used for styling and a modern UI.

### **2️⃣ Backend (Express.js)**
- **Express with Socket.io**: Handles real-time interactions.
- **OpenAI GPT-4**: Provides intelligent responses based on the user's query.
- **Whisper API**: (Planned for future updates) for more accurate STT.
- **Text-to-Speech API**: Improves bot's spoken responses.

---

## 🔍 **Key Design Decisions**

### **1️⃣ Real-time Communication with WebSockets**
- **Why?** WebSockets provide a more **interactive and seamless** user experience compared to REST APIs.
- **How?** Integrated **Socket.io** on both **frontend and backend** for instant message exchange.

### **2️⃣ Personalization with Dynamic Responses**
- **Why?** AI should feel **natural, not scripted**.
- **How?** Responses are **context-aware** with flexibility to adjust phrasing while keeping meaning intact.

### **3️⃣ Handling Speech Recognition Errors**
- **Problem:** Speech API misinterpreted "Samrudh" as "Some Road" or "Some Rude."
- **Solution:** Added **phonetic cues** and **context correction** to assume misheard names refer to Samrudh.

### **4️⃣ Deployment with HTTPS Support**
- **Problem:** WebSockets require **HTTPS** for production use.
- **Solution:** Deployed **frontend on Vercel** and **backend on Render** to ensure proper security.

### **5️⃣ Seamless Text-to-Speech Output**
- **Problem:** Bot responses should feel natural, not robotic.
- **Solution:** Used **Speech Synthesis API** and **structured replies for fluid speech output**.

---

## 📡 **Deployment Details**
✅ **Frontend:** [Live on Vercel](https://voice-bot-frontend-sepia.vercel.app/)  
✅ **Backend:** [Live on Render](https://voice-bot-backend-50e5.onrender.com)  

---

## 🚀 **Future Improvements**
- Enhance **TTS pronunciation** with phonetic spelling adjustments.
- Add **multi-language support** for broader accessibility.
- Improve **speech recognition accuracy** using Whisper API.

---

