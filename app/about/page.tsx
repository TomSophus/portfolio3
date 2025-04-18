"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [introVisible, setIntroVisible] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 初期チェック
    checkIfMobile()
    setMounted(true)

    // アニメーション開始
    setTimeout(() => {
      setIntroVisible(true)
    }, 300)

    // リサイズイベントのリスナーを追加
    window.addEventListener("resize", checkIfMobile)

    // クリーンアップ
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // mountedとisMobileを使用する例
  const displayMode = mounted ? (isMobile ? "モバイル表示" : "デスクトップ表示") : ""

  return (
    // 外側のコンテナの幅を調整
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 30px" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "16px",
              position: "relative",
              display: "inline-block",
              color: "#000", // 文字色を濃くする
            }}
          >
            About
            {mounted && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: "linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent)",
                  opacity: 0.3,
                }}
              ></span>
            )}
          </h1>
          <p style={{ fontSize: "18px", color: "#333" }}>
            {/* アニメーション付きの自己紹介文 */}
            <span
              style={{
                display: "block",
                fontSize: "24px", // より大きなフォントサイズ
                fontWeight: "500",
                marginBottom: "20px", // 下の文章との間隔
                opacity: introVisible ? 1 : 0,
                transform: introVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                color: "#000", // 文字色を濃くする
              }}
            >
              はじめまして、TomSophusと申します。
            </span>
            研究でのプログラミング経験(Fortran90, MATLAB)を活かし、個人的な興味から趣味で深層学習を実装しています。
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <p style={{ marginBottom: "16px", lineHeight: "1.8", color: "#222", fontSize: "17px" }}>
              E資格取得を通じて深層学習の実装基礎を固め、その後は物体検出技術を中心に最先端技術を活用したアプリケーション開発に注力しています。アカデミアの深遠な研究とビジネスの即応的応用の間に位置する領域で、最新の研究成果を実際のビジネス課題へと橋渡しすることに情熱を注いでいます。理論と実践のバランスを大切にしながら、両者の強みを活かした価値創出を目指しています。
            </p>
            <p style={{ marginBottom: "16px", lineHeight: "1.8", color: "#222", fontSize: "17px" }}>
              また、大手通信インフラ企業において、大規模案件のプロジェクトマネージャーを務めさせていただきました。技術的な専門知識だけでなく、人間との有機的な関係性の中でプロジェクトを進めていくための質的なスキルも備えています。
            </p>
          </div>

          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "24px",
                position: "relative",
                display: "inline-block",
                color: "#000", // 文字色を濃くする
              }}
            >
              経歴
              {mounted && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent)",
                    opacity: 0.3,
                  }}
                ></span>
              )}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#444" }} // アイコン色を濃くする
                  >
                    <path
                      d="M22 9L12 5L2 9L12 13L22 9ZM22 9V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 11.5V16.5C6 16.5 8 18.5 12 18.5C16 18.5 18 16.5 18 16.5V11.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                    東北大学 理学部
                  </h3>
                  <p style={{ color: "#555", marginBottom: "8px" }}>化学科 | 2017年 - 2020年</p>
                  <p style={{ lineHeight: "1.7", color: "#222", fontSize: "16px" }}>
                    物理化学の理論と分子動力学計算の基礎を学び、卒業研究ではFortran90を用いた界面張力計算の実装及び解析に取り組む。
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#444" }} // アイコン色を濃くする
                  >
                    <path
                      d="M22 9L12 5L2 9L12 13L22 9ZM22 9V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 11.5V16.5C6 16.5 8 18.5 12 18.5C16 18.5 18 16.5 18 16.5V11.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                    東京大学大学院 情報理工学系研究科
                  </h3>
                  <p style={{ color: "#555", marginBottom: "8px" }}>システム情報学専攻 | 2021年 - 2022年</p>
                  <p style={{ lineHeight: "1.7", color: "#222", fontSize: "16px" }}>
                    MATLABを用いた実機(レーザーやオシロスコープ)制御、通信システムの構築を実施。修士論文では光音響効果を用いた新たな通信を提案した。
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#444" }} // アイコン色を濃くする
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                    インフラエンジニア
                  </h3>
                  <p style={{ color: "#555", marginBottom: "8px" }}>西日本電信電話株式会社 | 2023年 - 現在</p>
                  <p style={{ lineHeight: "1.7", color: "#222", fontSize: "16px" }}>
                    入社年(2023年)より、インフラエンジニアとして工事の実施設計(積算・図面作成)、契約、施工管理業務等を一貫して実施。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "24px",
                position: "relative",
                display: "inline-block",
                color: "#000", // 文字色を濃くする
              }}
            >
              スキル
              {mounted && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent)",
                    opacity: 0.3,
                  }}
                ></span>
              )}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <h3 style={{ fontWeight: "500", marginBottom: "8px", color: "#111" }}>プログラミング言語</h3>
                <p style={{ color: "#444" }}>Fortran90, Python, MATLAB</p>
              </div>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <h3 style={{ fontWeight: "500", marginBottom: "8px", color: "#111" }}>機械学習フレームワーク</h3>
                <p style={{ color: "#444" }}>TensorFlow, PyTorch, scikit-learn</p>
              </div>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <h3 style={{ fontWeight: "500", marginBottom: "8px", color: "#111" }}>プロジェクト管理</h3>
                <p style={{ color: "#444" }}>アジャイル開発, スクラム, ガントチャート</p>
              </div>
            </div>
          </div>

          {/* 保有資格セクションを追加 */}
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "24px",
                position: "relative",
                display: "inline-block",
                color: "#000",
              }}
            >
              保有資格
              {mounted && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent)",
                    opacity: 0.3,
                  }}
                ></span>
              )}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: "20px",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                  background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.08)"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: isMobile ? "100%" : "200px",
                    height: "100px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/engineer2025.png"
                    alt="E資格ロゴ"
                    fill
                    style={{
                      objectFit: "contain",
                      objectPosition: "left center",
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px", color: "#111" }}>
                    E資格（JDLA Deep Learning for ENGINEER）
                  </h3>
                  <p style={{ color: "#444", lineHeight: "1.6" }}>
                    日本ディープラーニング協会が認定する、ディープラーニングを実装するエンジニアの能力を認定する資格です。
                    ディープラーニングの理論から実装まで、幅広い知識と技術を証明します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

