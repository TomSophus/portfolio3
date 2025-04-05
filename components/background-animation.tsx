"use client"

import { useEffect, useRef } from "react"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // キャンバスをウィンドウサイズに合わせる
    const resizeCanvas = () => {
      if (!canvas) return // ここでnullチェックを追加
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // 初期化時とリサイズ時にキャンバスサイズを調整
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // パーティクルの設定
    const particlesArray: Particle[] = []
    const numberOfParticles = 50

    // パーティクルクラス
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        // canvasがnullでないことを確認
        this.x = Math.random() * (canvas?.width || window.innerWidth)
        this.y = Math.random() * (canvas?.height || window.innerHeight)
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 0.2 - 0.1
        this.speedY = Math.random() * 0.2 - 0.1
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // 画面外に出たら反対側から再登場
        if (!canvas) return // nullチェックを追加
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return // nullチェックを追加
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    // パーティクルの初期化
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    // パーティクルの更新と描画
    const animate = () => {
      if (!ctx || !canvas) return // nullチェックを追加
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // パーティクル同士を線で結ぶ
      connectParticles()

      requestAnimationFrame(animate)
    }

    // 近くのパーティクル同士を線で結ぶ
    const connectParticles = () => {
      if (!ctx) return // nullチェックを追加
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 0.1 - distance / 1000
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // アニメーションの開始
    init()
    animate()

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="background-animation" aria-hidden="true" />
}