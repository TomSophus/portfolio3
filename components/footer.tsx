"use client"
import { Github, Twitter, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
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
    <footer
      style={{
        borderTop: "1px solid #ddd",
        padding: "20px 0",
        marginTop: "auto",
        background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "center" : "center",
          gap: isMobile ? "15px" : "0",
        }}
      >
        <p style={{ fontSize: "12px", color: "#666", textAlign: isMobile ? "center" : "left" }}>
          &copy; {new Date().getFullYear()} AI Engineer Portfolio. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "10px" : "0",
            }}
            aria-label="GitHub"
          >
            <Github size={isMobile ? 20 : 18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "10px" : "0",
            }}
            aria-label="Twitter"
          >
            <Twitter size={isMobile ? 20 : 18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "10px" : "0",
            }}
            aria-label="LinkedIn"
          >
            <Linkedin size={isMobile ? 20 : 18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

