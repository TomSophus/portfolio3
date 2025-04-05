"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

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

  return (
    <header
      style={{
        borderBottom: "1px solid #ddd",
        padding: "15px 0",
        marginBottom: "40px",
        background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              width: "210px", // 140px * 1.5
              height: "60px", // 40px * 1.5
            }}
          >
            <Image src="/images/TomSophus.png" alt="TomSophus" fill style={{ objectFit: "contain" }} priority />
          </div>
        </Link>

        <nav>
          <ul
            style={{
              display: "flex",
              gap: "30px",
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
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

