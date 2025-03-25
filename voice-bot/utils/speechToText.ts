export function startSpeechRecognition(onResult: (text: string) => void, onError: (error: string) => void) {
  if (typeof window === "undefined") {
    onError("Speech recognition is not available on the server.")
    return null
  }

  // @ts-ignore - TypeScript doesn't know about these browser-specific APIs
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    onError("Speech recognition is not supported in this browser.")
    return null
  }

  const recognition = new SpeechRecognition()
  recognition.lang = "en-US"
  recognition.interimResults = false
  recognition.continuous = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript
    onResult(transcript)
  }

  recognition.onerror = (event: any) => {
    console.error("Speech Recognition Error:", event.error)
    onError(event.error)
  }

  return recognition
}

