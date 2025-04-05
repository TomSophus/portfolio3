"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  // mountedを使用するように修正
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // mountedを使用する例（条件付きレンダリングなど）
    if (mounted) {
      // コンソールログを追加して変数を使用
      console.log("Component is mounted")
    }
  }, [mounted]) // mountedを依存配列に追加

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 20px",
        marginTop: "80px", // 上部の余白をさらに増やす
      }}
    >
      <div
        style={{
          marginBottom: "150px", // セクション間の余白をさらに増やす
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "40px", // フォントサイズをさらに大きく
            marginBottom: "80px", // 見出しと段落の間の余白を大幅に増やす
            fontWeight: "700",
            letterSpacing: "0.05em",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            lineHeight: "1.4",
          }}
        >
          Welocome to TomSophus&apos;s Portfolio
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "100px", // 段落とボタンの間の余白を大幅に増やす
            maxWidth: "650px",
            margin: "0 auto 100px", // 下部マージンを大幅に増やす
            lineHeight: "2.0",
            color: "#333",
          }}
        >
          アカデミアとビジネスの狭間で。
          <br />
          アカデミアの根本的革新性とビジネスの実践性を架橋し、最先端の研究成果を実社会の価値創造へと転換することで、学術界と産業界の間に新たな対話を生み出すことを目指しています。
        </p>

        <div
          style={{
            display: "flex",
            gap: "30px", // ボタン間の余白をさらに増やす
            justifyContent: "center",
            marginBottom: "60px", // ボタン下の余白を大幅に増やす
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/works"
            style={{
              display: "inline-block",
              padding: "16px 36px", // ボタンの内部余白をさらに増やす
              background: "linear-gradient(135deg, #000 0%, #333 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px", // フォントサイズをさらに大きく
              fontWeight: "500",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              border: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            プロジェクトを見る
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "16px 36px", // ボタンの内部余白をさらに増やす
              background: "transparent",
              color: "black",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px", // フォントサイズをさらに大きく
              fontWeight: "500",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              border: "1px solid rgba(0, 0, 0, 0.2)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)"
              e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.4)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.05)"
              e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)"
            }}
          >
            お問い合わせ
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px", // カード間の余白
          maxWidth: "800px",
          margin: "0 auto 80px", // 下部マージンをさらに増やす
        }}
      >
        <div
          style={{
            padding: "35px",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)"
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)"
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)"
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              marginBottom: "16px",
              fontWeight: "600",
              color: "#111",
            }}
          >
            最新プロジェクト
          </h3>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "15px",
              lineHeight: "1.8",
              color: "#444",
            }}
          >
            自然言語処理を活用した感情分析システム
          </p>
          <Link
            href="/works"
            style={{
              color: "#000",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              paddingBottom: "2px",
              transition: "all 0.3s ease",
              marginTop: "10px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.paddingLeft = "4px"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.paddingLeft = "0"
            }}
          >
            詳細を見る →
          </Link>
        </div>
        <div
          style={{
            padding: "35px",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)"
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)"
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.05)"
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.1)"
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              marginBottom: "16px",
              fontWeight: "600",
              color: "#111",
            }}
          >
            最新論文
          </h3>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "15px",
              lineHeight: "1.8",
              color: "#444",
            }}
          >
            &ldquo;深層学習を用いた画像認識の新手法&rdquo;
          </p>
          <Link
            href="/publication"
            style={{
              color: "#000",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              position: "relative",
              paddingBottom: "2px",
              transition: "all 0.3s ease",
              marginTop: "10px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.paddingLeft = "4px"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.paddingLeft = "0"
            }}
          >
            詳細を見る →
          </Link>
        </div>
      </div>
    </div>
  )
}

