import type React from "react"
import type { Metadata } from "next"
import { Shippori_Mincho } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NeuralNetworkAnimation from "@/components/neural-network-animation"
import CustomCursor from "@/components/custom-cursor"
import CursorEffectsProvider from "@/components/cursor-effects-provider"
import AudioPlayer from "@/components/audio-player"
import { AudioProvider } from "@/contexts/audio-context"

// minchoを使用するように修正
const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "TomSophus - AI Engineer Portfolio",
  description: "AIエンジニアのポートフォリオサイト",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={mincho.className}>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Shippori Mincho', serif",
          color: "#000",
          backgroundColor: "#fff",
          lineHeight: "1.6",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <AudioProvider>
          <CustomCursor />
          <CursorEffectsProvider />
          <NeuralNetworkAnimation />
          <Header />
          <main
            style={{
              flex: "1 0 auto",
              paddingBottom: "60px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {children}
          </main>
          <Footer />
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  )
}

