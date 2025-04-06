"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Pause, Play } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"

export default function AudioPlayer() {
  const { isPlaying, setIsPlaying, volume, setVolume, isMuted, setIsMuted } = useAudio()
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // オーディオ要素の作成
    const audio = new Audio("/audio/ambient-bgm.mp3")
    audio.loop = true
    audio.volume = isMuted ? 0 : volume
    audioRef.current = audio

    // オーディオの読み込み完了イベント
    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true)
    })

    // クリーンアップ
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  // 再生状態の変更を処理
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      // ユーザーインタラクション後に再生を試みる
      const playPromise = audioRef.current.play()

      // play()はPromiseを返すので、エラーハンドリングを行う
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback failed:", error)
          setIsPlaying(false)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, setIsPlaying])

  // 音量変更を処理
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // 再生/一時停止の切り替え
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // ミュート切り替え
  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  // 音量変更
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div
      className="audio-player"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        padding: "8px 12px",
        borderRadius: "30px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setShowVolumeControl(true)}
      onMouseLeave={() => setShowVolumeControl(false)}
    >
      {/* 再生/一時停止ボタン */}
      <button
        onClick={togglePlay}
        disabled={!isLoaded}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: isPlaying ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
        }}
        aria-label={isPlaying ? "音楽を一時停止" : "音楽を再生"}
      >
        {isPlaying ? <Pause size={18} color="#333" /> : <Play size={18} color="#333" />}
      </button>

      {/* 音量コントロール */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflow: "hidden",
          width: showVolumeControl ? "120px" : "36px",
          transition: "width 0.3s ease",
        }}
      >
        <button
          onClick={toggleMute}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted || volume === 0 ? <VolumeX size={18} color="#333" /> : <Volume2 size={18} color="#333" />}
        </button>

        {/* 音量スライダー */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            width: "100%",
            opacity: showVolumeControl ? 1 : 0,
            transition: "opacity 0.3s ease",
            accentColor: "#333",
          }}
          aria-label="音量"
        />
      </div>
    </div>
  )
}

