"use client"

import { useEffect, useRef, useState } from "react"

export default function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // ウィンドウサイズの変更を監視
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 初期サイズを設定
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスをウィンドウサイズに合わせる
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // 初期化時とリサイズ時にキャンバスサイズを調整
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // ノードとエッジの設定
    const nodes: Node[] = []

    // 画面サイズに応じてノード数を調整
    // 基本のノード数を設定（デスクトップ用）
    const baseNodeCount = 40

    // 画面の面積に基づいてノード数を調整
    const screenArea = window.innerWidth * window.innerHeight
    const referenceArea = 1920 * 1080 // 参照となる標準的なデスクトップサイズ

    // 面積比に基づいてノード数を計算（最小値を設定）
    const numberOfNodes = Math.max(15, Math.floor(baseNodeCount * (screenArea / referenceArea)))

    const connectionDistance = Math.min(150, window.innerWidth * 0.15) // 画面幅に応じて接続距離も調整
    const nodeSize = 3 // ノードサイズを大きくする

    // ノードクラス
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      connections: Node[]

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.connections = []
      }

      update() {
        // 位置の更新
        this.x += this.vx
        this.y += this.vy

        // 画面端での反射
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy
      }

      draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)" // 透明度を上げる
        ctx.beginPath()
        ctx.arc(this.x, this.y, nodeSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // 他のノードとの接続を確認
      findConnections(nodes: Node[]) {
        this.connections = []
        for (const node of nodes) {
          if (node === this) continue
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < connectionDistance) {
            this.connections.push(node)
          }
        }
      }

      // 接続を描画
      drawConnections() {
        for (const node of this.connections) {
          const dx = this.x - node.x
          const dy = this.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const opacity = 1 - distance / connectionDistance

          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.3})` // 透明度を調整
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(node.x, node.y)
          ctx.stroke()
        }
      }
    }

    // ノードの初期化
    const initNodes = () => {
      nodes.length = 0 // 既存のノードをクリア
      for (let i = 0; i < numberOfNodes; i++) {
        nodes.push(new Node())
      }
    }

    // アニメーションループ
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // ノードの更新と描画
      for (const node of nodes) {
        node.update()
        node.findConnections(nodes)
      }

      // 接続の描画
      for (const node of nodes) {
        node.drawConnections()
      }

      // ノードの描画
      for (const node of nodes) {
        node.draw()
      }

      requestAnimationFrame(animate)
    }

    // アニメーションの開始
    initNodes()
    animate()

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [windowSize]) // windowSizeが変更されたときに再実行

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.5, // 透明度を調整
      }}
      aria-hidden="true"
    />
  )
}

