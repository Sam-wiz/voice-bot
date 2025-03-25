import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import VoiceLoader from "@/components/VoiceLoader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samrudh's Assistant",
  description: "I am Samrudh's Representative"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VoiceLoader />
        {children}
      </body>
    </html>
  )
}



import './globals.css'