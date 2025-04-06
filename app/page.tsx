"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [titleLetters, setTitleLetters] = useState<{ char: string; visible: boolean; opacity: number }[]>([])
  const titleText = "Welocome to TomSophus's Portfolio"

  useEffect(() => {
    setMounted(true)

    // タイトルアニメーションの準備
    const letters = titleText.split("").map((char) => ({
      char,
      visible: false,
      opacity: 0,
    }))
    setTitleLetters(letters)

    // アニメーション開始のタイミングを少し遅らせる
    setTimeout(() => {
      setTitleVisible(true)

      // ランダムな順序で文字を表示する
      const indices = Array.from({ length: titleText.length }, (_, i) => i)
      shuffleArray(indices)

      // 文字をランダムな順序で表示
      indices.forEach((index, i) => {
        setTimeout(
          () => {
            setTitleLetters((prev) => {
              const newLetters = [...prev]
              newLetters[index] = {
                ...newLetters[index],
                visible: true,
                opacity: 0.4 + Math.random() * 0.6, // ランダムな透明度で表示
              }
              return newLetters
            })

            // 少し遅れて完全に表示
            setTimeout(
              () => {
                setTitleLetters((prev) => {
                  const newLetters = [...prev]
                  newLetters[index] = {
                    ...newLetters[index],
                    opacity: 1,
                  }
                  return newLetters
                })
              },
              300 + Math.random() * 200,
            )
          },
          i * (1500 / titleText.length),
        ) // 文字数に応じて表示間隔を調整
      })

      // 最後に全ての文字を完全に表示
      setTimeout(() => {
        setTitleLetters((prev) =>
          prev.map((letter) => ({
            ...letter,
            visible: true,
            opacity: 1,
          })),
        )
      }, 2000)
    }, 300)
  }, [titleText])

  // 配列をシャッフルする関数
  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 30px",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          marginBottom: "150px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "80px",
            fontWeight: "700",
            letterSpacing: "0.05em",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            lineHeight: "1.4",
            position: "relative",
            display: "inline-block",
            minHeight: "60px", // タイトルの高さを確保
          }}
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            {titleLetters.map((letter, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  opacity: letter.visible ? letter.opacity : 0,
                  transform: letter.visible
                    ? `translateY(0) scale(1)`
                    : `translateY(${Math.random() * 20 - 10}px) scale(0.8)`,
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  color: letter.visible ? "#000" : "#999",
                  textShadow: letter.visible ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none",
                  filter: letter.visible ? "blur(0px)" : "blur(2px)",
                }}
              >
                {letter.char === " " ? "\u00A0" : letter.char}
              </span>
            ))}
          </span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginBottom: "100px",
            maxWidth: "800px", // 幅を広げる
            margin: "0 auto 100px",
            lineHeight: "2.0",
            color: "#222", // 文字色を濃くする
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1.5s, transform 1s ease 1.5s",
          }}
        >
          アカデミアとビジネスの狭間で。
          <br />
          アカデミアの根本的革新性とビジネスの実践性を架橋し、最先端の研究成果を実社会の価値創造へと転換することで、学術界と産業界の間に新たな対話を生み出すことを目指しています。
        </p>

        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            marginBottom: "60px",
            flexWrap: "wrap",
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1.8s, transform 1s ease 1.8s",
          }}
        >
          <Link
            href="/works"
            style={{
              display: "inline-block",
              padding: "16px 36px",
              background: "linear-gradient(135deg, #000 0%, #333 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
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
              padding: "16px 36px",
              background: "transparent",
              color: "black",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
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
          gap: "40px",
          maxWidth: "1200px", // 幅を広げる
          margin: "0 auto 80px",
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 2.1s, transform 1s ease 2.1s",
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
              color: "#333",
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
              color: "#111", // 文字色を濃くする
            }}
          >
            最新論文
          </h3>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "15px",
              lineHeight: "1.8",
              color: "#333", // 文字色を濃くする
            }}
          >
            &ldquo;Sub-terahertz photoacoustic effect enabling broadband ultrasound generation for underwater
            communication&rdquo;
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

