"use client"

import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import { startSpeechRecognition } from "@/utils/speechToText"
import { Mic, X, AlertCircle } from "lucide-react"
import TranscriptDisplay from "./TranscriptDisplay"

// Initialize socket connection
let socket: any

export default function VoiceAssistant() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTranscript, setShowTranscript] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize socket connection
  useEffect(() => {
    socket = io("https://voice-bot-backend-50e5.onrender.com")

    socket.on("connect", () => {
      setIsConnected(true)
      setError(null)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      setError("Connection lost. Please try again.")
    })

    socket.on("connect_error", () => {
      setError("Failed to connect to server")
    })

    socket.on("bot_response", (response: string) => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }])
      speakWithBetterVoice(response)
    })

    return () => {
      socket.off("bot_response")
      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
      socket.disconnect()
    }
  }, [])

  // Function to speak with a better voice
  const speakWithBetterVoice = (text: string) => {
    if (!window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Get available voices
    const voices = window.speechSynthesis.getVoices()

    // Try to find a good quality male voice
    // Prefer these voices in order: Google UK English Male, Microsoft David, any en-GB male voice
    const preferredVoices = [
      voices.find((voice) => voice.name === "Google UK English Male"),
      voices.find((voice) => voice.name === "Microsoft David Desktop"),
      voices.find((voice) => voice.name.includes("Male") && voice.lang.includes("en-GB")),
      voices.find((voice) => voice.name.includes("Male") && voice.lang.includes("en-US")),
      voices.find((voice) => voice.lang.includes("en")),
    ]

    // Use the first available preferred voice
    const selectedVoice = preferredVoices.find((voice) => voice !== undefined)
    if (selectedVoice) utterance.voice = selectedVoice

    // Adjust speech parameters for better quality
    utterance.rate = 1.0 // Normal speed
    utterance.pitch = 0.9 
    utterance.volume = 1.0 // Full volume

    window.speechSynthesis.speak(utterance)
  }

  async function sendQuestion(question: string) {
    if (!question.trim()) return

    setMessages((prev) => [...prev, { sender: "user", text: question }])

    if (socket && isConnected) {
      socket.emit("user_question", question)
    } else {
      setError("Not connected to server. Please try again.")
      setTimeout(() => setError(null), 3000)
    }
  }

  function toggleRecording() {
    if (isRecording) {
      setIsRecording(false)
      return
    }

    setIsRecording(true)
    setError(null)

    const recognition = startSpeechRecognition(
      (text) => {
        setIsRecording(false)
        sendQuestion(text)
      },
      (error) => {
        setIsRecording(false)
        setError(`${error}. Please try again.`)
      },
    )

    if (recognition) recognition.start()
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md">
      {/* Error message */}
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white p-3 rounded-md flex items-center justify-center mb-8">
          <AlertCircle size={18} className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {/* Assistant avatar */}
      <div
        className={`w-32 h-32 rounded-full bg-gradient-to-b from-sky-200 to-blue-500 flex items-center justify-center mb-8 ${isRecording ? "animate-pulse" : ""}`}
      >
        {isRecording && (
          <div className="absolute w-40 h-40 rounded-full border-4 border-blue-300 animate-ping opacity-75"></div>
        )}
      </div>

      {/* Transcript overlay */}
      {showTranscript && <TranscriptDisplay messages={messages} />}

      {/* Control buttons */}
      <div className="flex space-x-4">
        <button
          onClick={toggleRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-gray-800 hover:bg-gray-700"
          }`}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          <Mic size={24} className="text-white" />
        </button>

        <button
          onClick={() => setMessages([])}
          className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
          aria-label="Clear conversation"
        >
          <X size={24} className="text-white" />
        </button>
      </div>
    </div>
  )
}

