"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Production", href: "/production" },
  { name: "Publication", href: "/publication" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
    <header
      style={{
        borderBottom: "1px solid #ddd",
        padding: "15px 0",
        marginBottom: "40px",
        background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              width: isMobile ? "160px" : "210px",
              height: isMobile ? "45px" : "60px",
            }}
          >
            <Image src="/images/TomSophus.png" alt="TomSophus" fill style={{ objectFit: "contain" }} priority />
          </div>
        </Link>

        {/* デスクトップナビゲーション */}
        {!isMobile && (
          <nav>
            <ul
              style={{
                display: "flex",
                gap: "35px",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "500",
                      padding: "8px 0",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* モバイルメニューボタン */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* モバイルメニュー */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 40,
            padding: "20px 0",
            animation: "slideDown 0.3s ease-out forwards",
          }}
        >
          <nav>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "500",
                      padding: "12px 30px",
                      display: "block",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.05)"
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

