"use client"

import { Mic, Square } from "lucide-react"

interface MicrophoneButtonProps {
  isRecording: boolean
  onClick: () => void
}

export default function MicrophoneButton({ isRecording, onClick }: MicrophoneButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={false}
      className={`
        relative flex items-center justify-center
        w-16 h-16 rounded-full shadow-lg transition-all duration-300
        ${isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"}
      `}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      <div
        className="absolute inset-0 rounded-full opacity-20 bg-white animate-ping"
        style={{ display: isRecording ? "block" : "none" }}
      ></div>

      {isRecording ? <Square size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
    </button>
  )
}

