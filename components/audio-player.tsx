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
  const [isActive, setIsActive] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    // オーディオ要素の作成 - 新しいファイル名に更新
    const audio = new Audio("/audio/maou_bgm_healing17.mp3")
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

  // 非アクティブ状態を管理するタイマー
  useEffect(() => {
    const startInactivityTimer = () => {
      // 既存のタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // 新しいタイマーを設定（3秒後に非アクティブ状態に）
      timeoutRef.current = setTimeout(() => {
        setIsActive(false)
      }, 3000)
    }

    // 初期タイマーを開始
    startInactivityTimer()

    // マウス移動やタッチでタイマーをリセット
    const handleActivity = () => {
      setIsActive(true)
      startInactivityTimer()
    }

    // イベントリスナーを追加
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("touchstart", handleActivity)
    window.addEventListener("click", handleActivity)

    // クリーンアップ
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("touchstart", handleActivity)
      window.removeEventListener("click", handleActivity)
    }
  }, [])

  // 再生/一時停止の切り替え - タッチイベントとクリックイベントの両方を処理
  const togglePlay = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // デフォルトの動作を防止
    e.stopPropagation() // イベントの伝播を停止
    setIsPlaying(!isPlaying)
    setIsActive(true) // 操作時にアクティブ状態に

    // 非アクティブタイマーをリセット
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, 3000)
  }

  // ミュート切り替え - タッチイベントとクリックイベントの両方を処理
  const toggleMute = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault() // デフォルトの動作を防止
    e.stopPropagation() // イベントの伝播を停止
    setIsMuted(!isMuted)
    setIsActive(true) // 操作時にアクティブ状態に

    // 非アクティブタイマーをリセット
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, 3000)
  }

  // 音量変更
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
    setIsActive(true) // 操作時にアクティブ状態に
  }

  // 音量スライダーの操作開始
  const handleVolumeChangeStart = () => {
    setIsVolumeChanging(true)
    setIsActive(true) // 操作時にアクティブ状態に
  }

  // 音量スライダーの操作終了
  const handleVolumeChangeEnd = () => {
    // 少し遅延を入れて、タッチイベントが完全に終了するのを待つ
    setTimeout(() => {
      setIsVolumeChanging(false)

      // 非アクティブタイマーをリセット
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setIsActive(false)
      }, 3000)
    }, 100)
  }

  // プレーヤーにマウスが乗ったときの処理
  const handlePlayerHover = () => {
    setIsActive(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // プレーヤーからマウスが離れたときの処理
  const handlePlayerLeave = () => {
    if (!isVolumeChanging) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(false)
      }, 1000) // マウスが離れたら1秒後に非アクティブに
    }
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
        background: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(10px)",
        padding: isMobile ? "10px 14px" : "8px 12px",
        borderRadius: "30px",
        boxShadow: isActive ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease, opacity 0.5s ease, transform 0.3s ease",
        pointerEvents: "auto",
        opacity: isActive ? 1 : 0.5,
        transform: isActive ? "scale(1)" : "scale(0.9)",
      }}
      onMouseEnter={handlePlayerHover}
      onMouseLeave={handlePlayerLeave}
      onTouchStart={handlePlayerHover}
    >
      {/* 再生/一時停止ボタン */}
      <button
        onClick={togglePlay}
        onTouchEnd={togglePlay}
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
          pointerEvents: "auto",
          touchAction: "manipulation",
          position: "relative",
          zIndex: 100000,
        }}
        aria-label={isPlaying ? "音楽を一時停止" : "音楽を再生"}
      >
        {isPlaying ? <Pause size={isMobile ? 24 : 18} color="#333" /> : <Play size={isMobile ? 24 : 18} color="#333" />}
      </button>

      {/* 音量コントロール - アクティブ時のみ表示 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflow: "hidden",
          width: isActive ? (isMobile ? "120px" : "120px") : "0px",
          opacity: isActive ? 1 : 0,
          transition: "width 0.3s ease, opacity 0.3s ease",
        }}
      >
        <button
          onClick={toggleMute}
          onTouchEnd={toggleMute}
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
            pointerEvents: "auto",
            touchAction: "manipulation",
            position: "relative",
            zIndex: 100000,
            opacity: isActive ? 1 : 0,
          }}
          aria-label={isMuted ? "ミュート解除" : "ミュート"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={isMobile ? 24 : 18} color="#333" />
          ) : (
            <Volume2 size={isMobile ? 24 : 18} color="#333" />
          )}
        </button>

        {/* 音量スライダー - アクティブ時のみ表示 */}
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
            opacity: isActive ? 1 : 0,
            accentColor: "#333",
            height: isMobile ? "36px" : "auto",
            pointerEvents: isActive ? "auto" : "none",
            touchAction: "manipulation",
            position: "relative",
            zIndex: 100000,
            transition: "opacity 0.3s ease",
          }}
          aria-label="音量"
        />
      </div>
    </div>
  )
}

