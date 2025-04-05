"use client"

import { useEffect, useRef } from "react"

export default function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const numberOfNodes = 40
    const connectionDistance = 150
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

          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.25})` // 透明度を上げる
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
  }, [])

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
        opacity: 0.7, // 透明度を上げる
      }}
      aria-hidden="true"
    />
  )
}

