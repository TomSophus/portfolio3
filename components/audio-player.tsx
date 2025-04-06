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
  const [isVolumeChanging, setIsVolumeChanging] = useState(false)

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

  // 再生/一時停止の切り替え - タッチイベントとクリックイベントの両方を処理
  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // デフォルトの動作を防止
    e.stopPropagation() // イベントの伝播を停止
    setIsPlaying(!isPlaying)
  }

  // ミュート切り替え - タッチイベントとクリックイベントの両方を処理
  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // デフォルトの動作を防止
    e.stopPropagation() // イベントの伝播を停止
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

  // 音量スライダーの操作開始
  const handleVolumeChangeStart = () => {
    setIsVolumeChanging(true)
  }

  // 音量スライダーの操作終了
  const handleVolumeChangeEnd = () => {
    // 少し遅延を入れて、タッチイベントが完全に終了するのを待つ
    setTimeout(() => {
      setIsVolumeChanging(false)
    }, 100)
  }

  return (
    <div
      ref={playerRef}
      className="audio-player"
      style={{
        position: "fixed",
        bottom: isMobile ? "15px" : "20px",
        right: isMobile ? "15px" : "20px",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        padding: isMobile ? "10px 14px" : "8px 12px",
        borderRadius: "30px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        pointerEvents: "auto", // 明示的にポインターイベントを有効化
      }}
      onMouseEnter={() => !isVolumeChanging && setShowVolumeControl(true)}
      onMouseLeave={() => !isVolumeChanging && setShowVolumeControl(false)}
    >
      {/* 再生/一時停止ボタン */}
      <button
        onClick={togglePlay}
        onTouchEnd={togglePlay} // タッチイベントを明示的に処理
        disabled={!isLoaded}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "48px" : "36px",
          height: isMobile ? "48px" : "36px",
          borderRadius: "50%",
          backgroundColor: isPlaying ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.15)",
          transition: "all 0.2s ease",
          WebkitTapHighlightColor: "transparent",
          pointerEvents: "auto", // 明示的にポインターイベントを有効化
          touchAction: "manipulation", // タッチアクションを最適化
          position: "relative", // z-indexを有効にするために必要
          zIndex: 100000, // 最前面に表示
        }}
        aria-label={isPlaying ? "音楽を一時停止" : "音楽を再生"}
      >
        {isPlaying ? <Pause size={isMobile ? 24 : 18} color="#333" /> : <Play size={isMobile ? 24 : 18} color="#333" />}
      </button>

      {/* 音量コントロール - 常に表示するように変更 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflow: "hidden",
          width: isMobile ? "120px" : "120px", // 常に表示
          transition: "width 0.3s ease",
        }}
      >
        <button
          onClick={toggleMute}
          onTouchEnd={toggleMute} // タッチイベントを明示的に処理
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "48px" : "36px",
            height: isMobile ? "48px" : "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            flexShrink: 0,
            transition: "all 0.2s ease",
            WebkitTapHighlightColor: "transparent",
            pointerEvents: "auto", // 明示的にポインターイベントを有効化
            touchAction: "manipulation", // タッチアクションを最適化
            position: "relative", // z-indexを有効にするために必要
            zIndex: 100000, // 最前面に表示
          }}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={isMobile ? 24 : 18} color="#333" />
          ) : (
            <Volume2 size={isMobile ? 24 : 18} color="#333" />
          )}
        </button>

        {/* 音量スライダー - 常に表示 */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          onMouseDown={handleVolumeChangeStart}
          onMouseUp={handleVolumeChangeEnd}
          onTouchStart={handleVolumeChangeStart}
          onTouchEnd={handleVolumeChangeEnd}
          style={{
            width: "100%",
            opacity: 1, // 常に表示
            accentColor: "#333",
            height: isMobile ? "36px" : "auto",
            pointerEvents: "auto", // 明示的にポインターイベントを有効化
            touchAction: "manipulation", // タッチアクションを最適化
            position: "relative", // z-indexを有効にするために必要
            zIndex: 100000, // 最前面に表示
          }}
          aria-label="音量"
        />
      </div>
    </div>
  )
}

