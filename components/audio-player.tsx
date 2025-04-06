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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 初期チェック
    checkIfMobile()

    // リサイズイベントのリスナーを追加
    window.addEventListener("resize", checkIfMobile)

    // クリーンアップ
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

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
        bottom: isMobile ? "15px" : "20px",
        left: isMobile ? "15px" : "20px",
        zIndex: 9999, // z-indexを大幅に上げる
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.9)", // 背景の不透明度を上げる
        backdropFilter: "blur(10px)",
        padding: isMobile ? "8px 12px" : "8px 12px",
        borderRadius: "30px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // シャドウを強調
        transition: "all 0.3s ease",
        pointerEvents: "auto", // ポインターイベントを明示的に有効化
      }}
      onMouseEnter={() => setShowVolumeControl(true)}
      onMouseLeave={() => setShowVolumeControl(false)}
      onTouchStart={() => setShowVolumeControl(true)}
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
          width: isMobile ? "44px" : "36px", // モバイルでのタッチ領域を拡大
          height: isMobile ? "44px" : "36px",
          borderRadius: "50%",
          backgroundColor: isPlaying ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
          pointerEvents: "auto", // ポインターイベントを明示的に有効化
        }}
        aria-label={isPlaying ? "音楽を一時停止" : "音楽を再生"}
      >
        {isPlaying ? <Pause size={isMobile ? 22 : 18} color="#333" /> : <Play size={isMobile ? 22 : 18} color="#333" />}
      </button>

      {/* 音量コントロール */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflow: "hidden",
          width: showVolumeControl ? (isMobile ? "110px" : "120px") : isMobile ? "44px" : "36px",
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
            width: isMobile ? "44px" : "36px", // モバイルでのタッチ領域を拡大
            height: isMobile ? "44px" : "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            flexShrink: 0,
            transition: "all 0.2s ease",
            pointerEvents: "auto", // ポインターイベントを明示的に有効化
          }}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={isMobile ? 22 : 18} color="#333" />
          ) : (
            <Volume2 size={isMobile ? 22 : 18} color="#333" />
          )}
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
            height: isMobile ? "30px" : "auto", // モバイルでタッチしやすく
            pointerEvents: showVolumeControl ? "auto" : "none", // 表示時のみイベントを有効化
          }}
          aria-label="音量"
        />
      </div>
    </div>
  )
}

