"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // ここで実際のフォーム送信処理を行う
    // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formState) })

    // 送信完了を模擬（実際の実装では適切なエラーハンドリングを行う）
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 30px" }}>
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "50px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Contact</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>お問い合わせやプロジェクトのご相談はこちらから</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: "60px",
          }}
        >
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <Mail size={24} color="#555" />
                </div>
                <div>
                  <h3 style={{ fontWeight: "500", marginBottom: "4px" }}>メール</h3>
                  <p style={{ color: "#666" }}>tomsophus@gmail.com</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>お問い合わせ内容</h3>
              <ul style={{ paddingLeft: "20px", color: "#666" }}>
                <li style={{ marginBottom: "8px" }}>AIプロジェクトの相談・見積もり</li>
                <li style={{ marginBottom: "8px" }}>技術顧問・コンサルティング</li>
                <li style={{ marginBottom: "8px" }}>講演・セミナーのご依頼</li>
                <li>その他のご質問・ご相談</li>
              </ul>
            </div>

            {/* SNSリン   セクション - 横並びに変更 */}
            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "20px" }}>SNSでつながる</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                <a
                  href="https://github.com/tomsophus"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                    textDecoration: "none",
                    color: "#333",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.4) 0%, rgba(220, 220, 220, 0.3) 100%)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)"
                  }}
                >
                  <Github size={20} style={{ marginRight: "12px" }} />
                  <span style={{ fontWeight: "500" }}>GitHub</span>
                  <ExternalLink size={16} style={{ marginLeft: "auto" }} />
                </a>

                <a
                  href="https://www.linkedin.com/in/tom-sophus-5b0a9835a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                    textDecoration: "none",
                    color: "#333",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.4) 0%, rgba(220, 220, 220, 0.3) 100%)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)"
                  }}
                >
                  <Linkedin size={20} style={{ marginRight: "12px" }} />
                  <span style={{ fontWeight: "500" }}>LinkedIn</span>
                  <ExternalLink size={16} style={{ marginLeft: "auto" }} />
                </a>

                <a
                  href="https://twitter.com/tomsophus"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)",
                    textDecoration: "none",
                    color: "#333",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.4) 0%, rgba(220, 220, 220, 0.3) 100%)"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(220, 220, 220, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)"
                  }}
                >
                  <Twitter size={20} style={{ marginRight: "12px" }} />
                  <span style={{ fontWeight: "500" }}>Twitter</span>
                  <ExternalLink size={16} style={{ marginLeft: "auto" }} />
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "40px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            }}
          >
            {isSubmitted ? (
              <div
                style={{
                  padding: "32px",
                  borderRadius: "8px",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#e6f7e6",
                    marginBottom: "16px",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#4caf50" }}
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "500", marginBottom: "8px" }}>
                  お問い合わせありがとうございます
                </h3>
                <p style={{ color: "#666", marginBottom: "24px" }}>内容を確認次第、担当者より返信いたします。</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  新しいお問い合わせ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label
                      htmlFor="name"
                      style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
                    >
                      お名前 <span style={{ color: "#e53e3e" }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
                    >
                      メールアドレス <span style={{ color: "#e53e3e" }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        borderRadius: "5px",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
                  >
                    件名 <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}
                  >
                    メッセージ <span style={{ color: "#e53e3e" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                      fontSize: "16px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "16px",
                    opacity: isSubmitting ? 0.7 : 1,
                    marginTop: "10px",
                  }}
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

