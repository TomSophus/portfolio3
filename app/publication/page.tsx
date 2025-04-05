"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function PublicationPage() {
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
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Publication</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>発表した論文と研究成果</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px" }}>学術論文</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px" }}>
                      深層学習を用いた画像認識の新手法
                    </h3>
                    <p style={{ color: "#666", marginBottom: "12px" }}>国際人工知能学会誌 | 2023年</p>
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
                        深層学習
                      </span>
                    </div>
                    <p style={{ marginBottom: "16px" }}>
                      画像認識タスクにおける精度と効率を向上させる新しい深層学習アーキテクチャを提案。従来手法と比較して15%の精度向上と30%の計算コスト削減を実現。
                    </p>

                    <div style={{ marginBottom: "16px", position: "relative", width: "100%", height: "200px" }}>
                      <Image
                        src="/images/paper-thumbnail.jpg"
                        alt="論文サムネイル"
                        fill
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                    </div>

                    <Link
                      href="#"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#000",
                        fontWeight: "500",
                        textDecoration: "underline",
                      }}
                    >
                      論文を読む
                      <ArrowUpRight style={{ marginLeft: "4px", height: "16px", width: "16px" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px" }}>技術記事・ブログ</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px" }}>
                      最新の大規模言語モデルを解説：GPT-4からの進化
                    </h3>
                    <p style={{ color: "#666", marginBottom: "12px" }}>AI技術ブログ | 2023年10月</p>
                    <p style={{ marginBottom: "16px" }}>
                      GPT-4以降の大規模言語モデルの進化と技術的特徴を解説。モデルアーキテクチャ、訓練方法、応用例について詳細に分析しています。
                    </p>

                    <Link
                      href="#"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#000",
                        fontWeight: "500",
                        textDecoration: "underline",
                      }}
                    >
                      記事を読む
                      <ArrowUpRight style={{ marginLeft: "4px", height: "16px", width: "16px" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

