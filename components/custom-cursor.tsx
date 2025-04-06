"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // タッチデバイスの検出（参照用に残しておくが、カーソルは常に表示する）
    const checkTouchDevice = () => {
      const isTouchCapable =
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
      setIsTouchDevice(isTouchCapable)
      // タッチデバイスでもカーソルを表示するため、ここでは何もしない
    }

    checkTouchDevice()

    // マウスの位置を追跡
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    // タッチ位置の追跡（タッチデバイス用）
    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
        setHidden(false)
      }
    }

    // マウスクリック状態を追跡
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    // タッチ開始・終了の追跡
    const handleTouchStart = () => setClicked(true)
    const handleTouchEnd = () => setClicked(false)

    // リンクやボタンにホバーした時の状態を追跡
    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    // マウスが画面外に出た時の処理
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("touchmove", updateTouchPosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // リンクとボタンにイベントリスナーを追加
    const links = document.querySelectorAll("a, button, [role=button]")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverStart)
      link.addEventListener("mouseleave", handleLinkHoverEnd)
      link.addEventListener("touchstart", handleLinkHoverStart)
      link.addEventListener("touchend", handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("touchmove", updateTouchPosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
        link.removeEventListener("touchstart", handleLinkHoverStart)
        link.removeEventListener("touchend", handleLinkHoverEnd)
      })
    }
  }, [])

  // 実際のカーソルを非表示にするためのスタイルを追加
  useEffect(() => {
    // すべてのデバイスでカーソルを非表示にする
    document.body.style.cursor = "none"

    // クリーンアップ関数
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      {/* メインカーソル（小さい円） */}
      <div
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: clicked ? "8px" : "10px",
          height: clicked ? "8px" : "10px",
          backgroundColor: linkHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.2s, height 0.2s, background-color 0.2s, transform 0.01s",
          opacity: hidden ? 0 : 1,
        }}
      />

      {/* 外側のリング（大きい円） */}
      <div
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate(${position.x - (linkHovered ? 15 : 20)}px, ${position.y - (linkHovered ? 15 : 20)}px)`,
          width: linkHovered ? "30px" : "40px",
          height: linkHovered ? "30px" : "40px",
          border: `1px solid ${linkHovered ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.3)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.3s, height 0.3s, border 0.3s, transform 0.15s ease-out",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  )
}

