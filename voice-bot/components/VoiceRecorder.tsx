"use client"

import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import { startSpeechRecognition } from "../utils/speechToText"
import ChatMessage from "./ChatMessage"
import MicrophoneButton from "./MicrophoneButton"
import RecordingIndicator from "./RecordingIndicator"
import { Bot } from "lucide-react"

// Initialize socket connection
let socket: any

export default function VoiceRecorder() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize socket connection
  useEffect(() => {
    // Initialize socket connection
    socket = io("https://voice-bot-backend-50e5.onrender.com")

    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("bot_response", (response: string) => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }])
    })

    // Clean up on component unmount
    return () => {
      socket.off("bot_response")
      socket.disconnect()
    }
  }, [])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function sendQuestion(question: string) {
    if (!question.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text: question }])

    if (socket && isConnected) {
      socket.emit("user_question", question)
    } else {
      // Fallback if socket is not connected
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I'm sorry, I'm not connected to the server right now. Please try again later.",
          },
        ])
      }, 1000)
    }
  }

  function toggleRecording() {
    if (isRecording) {
      // Stop recording logic would go here if needed
      setIsRecording(false)
      return
    }

    setIsRecording(true)
    const recognition = startSpeechRecognition(
      (text) => {
        setIsRecording(false)
        sendQuestion(text)
      },
      (error) => {
        setIsRecording(false)
        setMessages((prev) => [...prev, { sender: "bot", text: `Error: ${error}. Please try again.` }])
      },
    )

    if (recognition) recognition.start()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot size={24} />
          <h1 className="text-xl font-bold">Voice Assistant</h1>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${isConnected ? "bg-green-400" : "bg-red-500"}`}
          ></span>
          <span className="text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bot size={48} className="mb-4 text-blue-300" />
            <p className="text-center">Start a conversation by clicking the microphone button below.</p>
          </div>
        ) : (
          messages.map((message, index) => <ChatMessage key={index} message={message} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="p-2 bg-white border-t border-gray-200 flex justify-center">
          <RecordingIndicator />
        </div>
      )}

      {/* Footer with Mic Button */}
      <div className="p-4 bg-white border-t border-gray-200 flex justify-center">
        <MicrophoneButton isRecording={isRecording} onClick={toggleRecording} />
      </div>
    </div>
  )
}

