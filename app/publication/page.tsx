"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Award, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function PublicationPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [expandedPapers, setExpandedPapers] = useState<{ [key: string]: boolean }>({
    paper1: false,
    paper2: false,
  })

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

  const togglePaper = (paperId: string) => {
    setExpandedPapers((prev) => ({
      ...prev,
      [paperId]: !prev[paperId],
    }))
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 30px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", color: "#000" }}>Publication</h1>
          <p style={{ fontSize: "18px", color: "#444" }}>発表した論文と研究成果</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "#000" }}>学術論文</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* 1つ目の論文 */}
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  onClick={() => togglePaper("paper1")}
                  style={{
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: expandedPapers.paper1
                      ? "linear-gradient(135deg, rgba(245, 245, 245, 0.8) 0%, rgba(240, 240, 240, 0.8) 100%)"
                      : "white",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                      Sub-terahertz photoacoustic effect enabling broadband ultrasound generation for underwater
                      communication.
                    </h3>
                    <p style={{ color: "#444", margin: "0" }}>APL Photonics 8.9 | 2023年</p>
                  </div>
                  <div style={{ marginLeft: "16px", flexShrink: 0 }}>
                    {expandedPapers.paper1 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedPapers.paper1 && (
                  <div style={{ padding: "0 24px 24px 24px" }}>
                    <div
                      style={{ display: "flex", gap: "8px", marginBottom: "16px", marginTop: "8px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        超音波
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        音響信号処理
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        無線通信
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        光音響効果
                      </span>
                    </div>
                    <p style={{ marginBottom: "16px", color: "#222" }}>
                      水がサブテラヘルツ帯域において高い吸収特性を持つことに着目し、光音響効果による広帯域な超音波の生成と、それによる情報伝送の可能性を実証しました。従来の超音波トランスデューサによる超音波生成においては帯域制限や接触必要性などの課題がありましたが、それを克服する可能性を秘めた技術となります。また、OOK変調による水中通信と水中ドローン制御のデモンストレーションを行うことで、例えば生体内機器の制御への応用も期待できる技術を開発しました。掲載先のAPL（Applied Physics Letters）では、Editor's Pickに選出され、科学的重要性、革新性、潜在的なインパクト等が評価されました。
                    </p>

                    <div style={{ marginBottom: "16px", width: "100%", display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "50%", // 幅を50%に変更
                          paddingTop: "28.125%", // アスペクト比を維持 (56.25% ÷ 2)
                        }}
                      >
                        <Image
                          src="/images/APL.jpeg"
                          alt="論文サムネイル"
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          style={{
                            objectFit: "contain",
                            borderRadius: "4px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                        />
                      </div>
                    </div>

                    <Link
                      href="https://pubs.aip.org/aip/app/article/8/9/096106/2911671"
                      target="_blank"
                      rel="noopener noreferrer"
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
                )}
              </div>

              {/* 2つ目の論文 */}
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  onClick={() => togglePaper("paper2")}
                  style={{
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: expandedPapers.paper2
                      ? "linear-gradient(135deg, rgba(245, 245, 245, 0.8) 0%, rgba(240, 240, 240, 0.8) 100%)"
                      : "white",
                    transition: "background 0.3s ease",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                      ウェアラブル・テレプレゼンスシステム“T-Leap”を用いた東京・渋谷での検証結果と今後の課題
                    </h3>
                    <p style={{ color: "#444", margin: "0" }}>第26回日本バーチャルリアリティー学会大会論文集 | 2021年</p>
                  </div>
                  <div style={{ marginLeft: "16px", flexShrink: 0 }}>
                    {expandedPapers.paper2 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedPapers.paper2 && (
                  <div style={{ padding: "0 24px 24px 24px" }}>
                    <div
                      style={{ display: "flex", gap: "8px", marginBottom: "16px", marginTop: "8px", flexWrap: "wrap" }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        テレプレゼンス
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        ウェアラブル
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                          color: "#333",
                        }}
                      >
                        WebRTC
                      </span>
                    </div>
                    <p style={{ marginBottom: "16px", color: "#222" }}>
                      リアルタイムで遠隔の人々を接続し、双方向のコミュニケーションを実現するテレプレゼンスシステム“T-Leap”に対して、通信・画像処理能力の改良を施し、多くの商業施設や人々が密集する渋谷を舞台に実証実験を行いました。実証の中で、T-Leapがもたらす特有の経験を確認し、それによる新たなコミュニケーションの形を模索しました。
                    </p>

                    <div style={{ marginBottom: "16px", width: "100%", display: "flex", justifyContent: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "50%", // 幅を50%に変更
                          paddingTop: "28.125%", // アスペクト比を維持 (56.25% ÷ 2)
                        }}
                      >
                        <Image
                          src="/images/T-Leap.png"
                          alt="論文サムネイル"
                          fill
                          sizes="(max-width: 768px) 50vw, 600px"
                          style={{
                            objectFit: "contain",
                            borderRadius: "4px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                          }}
                        />
                      </div>
                    </div>

                    <Link
                      href="https://conference.vrsj.org/ac2021/program/doc/1D2-5.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
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
                )}
              </div>
            </div>
          </div>

          {/* 受賞歴セクション */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "#000" }}>受賞歴</h2>

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
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      minWidth: isMobile ? "auto" : "60px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Award size={40} style={{ color: "#D4AF37" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "4px", color: "#111" }}>
                      第39回センシングフォーラム研究奨励賞　
                    </h3>
                    <p style={{ color: "#444", marginBottom: "12px" }}>2022年度</p>
                    <p style={{ marginBottom: "16px", color: "#222" }}>
                      「連続変調テラヘルツ波による光音響効果の情報伝送への応用に関する検討」の研究発表により、研究奨励賞を受賞いたしました。本研究における革新的な通信手法の提案と実証実験が高く評価されたものです。
                    </p>
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

