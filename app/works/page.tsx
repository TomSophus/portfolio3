"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function WorksPage() {
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

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Works</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>これまでに手がけたプロジェクトとポートフォリオ</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="医療画像診断AI"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  医療AI
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  画像診断
                </span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>医療画像診断AI</h2>
              <p style={{ color: "#666", marginBottom: "16px" }}>
                X線画像から肺炎を高精度で検出するAIシステム。医師の診断をサポートし、早期発見率を向上。
              </p>
              <Link
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                詳細を見る
                <ArrowRight style={{ marginLeft: "4px", height: "16px", width: "16px" }} />
              </Link>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="自然言語要約システム"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  NLP
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  テキスト要約
                </span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>自然言語要約システム</h2>
              <p style={{ color: "#666", marginBottom: "16px" }}>
                長文テキストを自動で要約するAIシステム。ニュース記事や学術論文の効率的な理解をサポート。
              </p>
              <Link
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                詳細を見る
                <ArrowRight style={{ marginLeft: "4px", height: "16px", width: "16px" }} />
              </Link>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div style={{ position: "relative", height: "200px" }}>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="異常検知システム"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  異常検知
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    borderRadius: "9999px",
                  }}
                >
                  時系列分析
                </span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>異常検知システム</h2>
              <p style={{ color: "#666", marginBottom: "16px" }}>
                工場の機械センサーデータからリアルタイムで異常を検知するシステム。予防保守による稼働率向上に貢献。
              </p>
              <Link
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                詳細を見る
                <ArrowRight style={{ marginLeft: "4px", height: "16px", width: "16px" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

