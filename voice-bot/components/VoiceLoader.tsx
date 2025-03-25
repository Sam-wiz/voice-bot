"use client"

import { useEffect } from "react"

export default function VoiceLoader() {
  useEffect(() => {
    // This forces the browser to load available voices
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()

        // Speak a silent message to fully initialize the speech system
        const silentUtterance = new SpeechSynthesisUtterance("")
        silentUtterance.volume = 0

        // Try to find and set a male voice
        const maleVoice = voices.find(
          (voice) => voice.name.includes("Male") || voice.name.includes("David") || voice.name.includes("Daniel"),
        )

        if (maleVoice) {
          silentUtterance.voice = maleVoice
        }

        window.speechSynthesis.speak(silentUtterance)
      }

      // Load voices immediately
      loadVoices()

      // Also load when voices change
      window.speechSynthesis.onvoiceschanged = loadVoices

      return () => {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  return null
}

