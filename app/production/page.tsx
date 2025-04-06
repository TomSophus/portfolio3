"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function ProductionPage() {
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
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 30px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Production</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>開発したAIプロダクトとソリューション</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "240px",
                  width: isMobile ? "100%" : "40%",
                }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="感情分析AIシステム"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    自然言語処理
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    感情分析
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    ビジネスインテリジェンス
                  </span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>感情分析AIシステム</h2>
                <p style={{ color: "#666", marginBottom: "16px" }}>
                  顧客フィードバックやSNSの投稿から感情を分析し、ビジネスインサイトを提供するAIシステム。BERTベースの最新モデルを使用し、日本語と英語に対応。
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

          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "240px",
                  width: isMobile ? "100%" : "40%",
                }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="画像認識APIサービス"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    コンピュータビジョン
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    API
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "9999px",
                    }}
                  >
                    クラウドサービス
                  </span>
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>画像認識APIサービス</h2>
                <p style={{ color: "#666", marginBottom: "16px" }}>
                  高精度な画像認識機能をAPIとして提供するクラウドサービス。物体検出、顔認識、テキスト抽出などの機能を簡単に自社サービスに組み込むことが可能。
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
    </div>
  )
}

