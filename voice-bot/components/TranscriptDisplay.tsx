"use client"

import { useEffect, useRef } from "react"

interface TranscriptDisplayProps {
  messages: { sender: "user" | "bot"; text: string }[]
}

export default function TranscriptDisplay({ messages }: TranscriptDisplayProps) {
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      ref={transcriptRef}
      className="absolute bottom-24 left-0 right-0 bg-gray-900 bg-opacity-80 text-white p-4 rounded-lg max-h-80 overflow-y-auto backdrop-blur-sm"
    >
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No conversation yet. Start by clicking the microphone.</p>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="font-semibold text-xs text-gray-400 mb-1">
              {message.sender === "user" ? "You" : "Assistant"}
            </div>
            <div className={`${message.sender === "user" ? "text-blue-300" : "text-white"}`}>{message.text}</div>
          </div>
        ))
      )}
    </div>
  )
}

