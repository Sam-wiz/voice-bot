"use client"

import { useState } from "react"
import { Play, Pause } from "lucide-react"

interface ChatMessageProps {
  message: {
    sender: "user" | "bot"
    text: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playMessage = () => {
    if (message.sender !== "bot") return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    const speech = new SpeechSynthesisUtterance(message.text)
    speech.lang = "en-US"

    speech.onend = () => {
      setIsPlaying(false)
    }

    window.speechSynthesis.speak(speech)
  }

  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`relative max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
          message.sender === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm md:text-base">{message.text}</p>

        {message.sender === "bot" && (
          <button
            onClick={playMessage}
            className="absolute -bottom-3 -right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isPlaying ? "Pause speech" : "Play speech"}
          >
            {isPlaying ? <Pause size={16} className="text-blue-500" /> : <Play size={16} className="text-blue-500" />}
          </button>
        )}
      </div>
    </div>
  )
}

