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
  const playerRef = useRef<HTMLDivElement>(null)

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
  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPlaying(!isPlaying)
  }

  // ミュート切り替え
  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
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

  // タッチイベントの処理を改善
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (playerRef.current && playerRef.current.contains(e.target as Node)) {
        // プレーヤー内のタッチイベントは伝播を止める
        e.stopPropagation()
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: false })

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
    }
  }, [])

  return (
    <div
      ref={playerRef}
      className="audio-player"
      style={{
        position: "fixed",
        bottom: isMobile ? "15px" : "20px",
        right: isMobile ? "15px" : "20px", // 左から右に変更
        zIndex: 99999, // z-indexをさらに上げる
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.95)", // 背景の不透明度をさらに上げる
        backdropFilter: "blur(10px)",
        padding: isMobile ? "10px 14px" : "8px 12px", // パディングを増やしてタッチ領域を拡大
        borderRadius: "30px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // シャドウを強調
        transition: "all 0.3s ease",
        pointerEvents: "auto", // ポインターイベントを明示的に有効化
        touchAction: "auto", // タッチアクションを明示的に有効化
      }}
      onMouseEnter={() => setShowVolumeControl(true)}
      onMouseLeave={() => setShowVolumeControl(false)}
      onTouchStart={() => setShowVolumeControl(true)}
    >
      {/* 再生/一時停止ボタン */}
      <button
        onClick={togglePlay}
        onTouchStart={togglePlay} // タッチイベントも明示的に処理
        disabled={!isLoaded}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "48px" : "36px", // タッチ領域をさらに拡大
          height: isMobile ? "48px" : "36px",
          borderRadius: "50%",
          backgroundColor: isPlaying ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.15)", // コントラストを上げる
          transition: "all 0.2s ease",
          pointerEvents: "auto", // ポインターイベントを明示的に有効化
          touchAction: "manipulation", // タッチアクションを最適化
          WebkitTapHighlightColor: "transparent", // タップ時のハイライトを無効化
        }}
        aria-label={isPlaying ? "音楽を一時停止" : "音楽を再生"}
      >
        {isPlaying ? <Pause size={isMobile ? 24 : 18} color="#333" /> : <Play size={isMobile ? 24 : 18} color="#333" />}
      </button>

      {/* 音量コントロール */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflow: "hidden",
          width: showVolumeControl ? (isMobile ? "120px" : "120px") : isMobile ? "48px" : "36px",
          transition: "width 0.3s ease",
        }}
      >
        <button
          onClick={toggleMute}
          onTouchStart={toggleMute} // タッチイベントも明示的に処理
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "48px" : "36px", // タッチ領域をさらに拡大
            height: isMobile ? "48px" : "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            flexShrink: 0,
            transition: "all 0.2s ease",
            pointerEvents: "auto", // ポインターイベントを明示的に有効化
            touchAction: "manipulation", // タッチアクションを最適化
            WebkitTapHighlightColor: "transparent", // タップ時のハイライトを無効化
          }}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={isMobile ? 24 : 18} color="#333" />
          ) : (
            <Volume2 size={isMobile ? 24 : 18} color="#333" />
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
            height: isMobile ? "36px" : "auto", // タッチしやすさをさらに向上
            pointerEvents: showVolumeControl ? "auto" : "none", // 表示時のみイベントを有効化
            touchAction: "manipulation", // タッチアクションを最適化
          }}
          aria-label="音量"
        />
      </div>
    </div>
  )
}

