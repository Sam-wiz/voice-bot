export default function RecordingIndicator() {
  return (
    <div className="flex items-center space-x-2 text-red-500 font-medium animate-pulse">
      <div className="relative">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>
      <span>Listening...</span>
    </div>
  )
}

