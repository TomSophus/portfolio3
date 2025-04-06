"use client"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

type AudioContextType = {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  volume: number
  setVolume: (volume: number) => void
  isMuted: boolean
  setIsMuted: (muted: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const isInitializedRef = useRef(false)

  // ローカルストレージから設定を読み込む
  useEffect(() => {
    if (typeof window === "undefined" || isInitializedRef.current) return

    try {
      const savedVolume = localStorage.getItem("audioVolume")
      const savedMuted = localStorage.getItem("audioMuted")

      if (savedVolume !== null) {
        setVolume(Number.parseFloat(savedVolume))
      }

      if (savedMuted !== null) {
        setIsMuted(savedMuted === "true")
      }

      isInitializedRef.current = true
    } catch (error) {
      console.error("Failed to load audio settings from localStorage:", error)
    }
  }, [])

  // 設定をローカルストレージに保存
  useEffect(() => {
    if (typeof window === "undefined" || !isInitializedRef.current) return

    try {
      localStorage.setItem("audioVolume", volume.toString())
      localStorage.setItem("audioMuted", isMuted.toString())
    } catch (error) {
      console.error("Failed to save audio settings to localStorage:", error)
    }
  }, [volume, isMuted])

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

