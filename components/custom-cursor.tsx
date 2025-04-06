"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // デフォルトでtrueに設定

  useEffect(() => {
    // タッチデバイスの検出
    const checkTouchDevice = () => {
      const isTouchCapable =
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0
      setIsTouchDevice(isTouchCapable)
    }

    checkTouchDevice()

    // マウスの位置を追跡
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    // マウスクリック状態を追跡
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    // マウスが画面外に出た時の処理
    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    // イベントリスナーの追加（タッチデバイスでない場合のみ）
    if (!isTouchDevice) {
      window.addEventListener("mousemove", updatePosition)
      window.addEventListener("mousedown", handleMouseDown)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("mouseleave", handleMouseLeave)
      window.addEventListener("mouseenter", handleMouseEnter)

      // リンクとボタンにイベントリスナーを追加
      const addLinkListeners = () => {
        const links = document.querySelectorAll("a, button, [role=button]")
        links.forEach((link) => {
          link.addEventListener("mouseenter", () => setLinkHovered(true))
          link.addEventListener("mouseleave", () => setLinkHovered(false))
        })
      }

      // 初期リスナー追加
      addLinkListeners()

      // DOMの変更を監視して新しい要素にもリスナーを追加
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            addLinkListeners()
          }
        })
      })

      observer.observe(document.body, { childList: true, subtree: true })
    }

    // クリーンアップ
    return () => {
      if (!isTouchDevice) {
        window.removeEventListener("mousemove", updatePosition)
        window.removeEventListener("mousedown", handleMouseDown)
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("mouseleave", handleMouseLeave)
        window.removeEventListener("mouseenter", handleMouseEnter)
      }
    }
  }, [isTouchDevice])

  // 実際のカーソルを非表示にするためのスタイルを追加（タッチデバイスでない場合のみ）
  useEffect(() => {
    if (!isTouchDevice) {
      document.body.style.cursor = "none"
    } else {
      document.body.style.cursor = "auto"
    }

    // クリーンアップ関数
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [isTouchDevice])

  // タッチデバイスでは表示しない
  if (isTouchDevice) return null

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
          zIndex: 9990,
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
          zIndex: 9989,
          transition: "width 0.3s, height 0.3s, border 0.3s, transform 0.15s ease-out",
          opacity: hidden ? 0 : 1,
        }}
      />
    </>
  )
}

