"use client"

import type React from "react"
import { useState, useEffect } from "react"

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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }}>Contact</h1>
          <p style={{ fontSize: "18px", color: "#666" }}>お問い合わせやプロジェクトのご相談はこちらから</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "40px",
          }}
        >
          <div>
            <div style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#999" }}
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,6 12,13 2,6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: "500", marginBottom: "4px" }}>メール</h3>
                  <p style={{ color: "#666" }}>contact@ai-engineer.example.com</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#999" }}
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: "500", marginBottom: "4px" }}>電話</h3>
                  <p style={{ color: "#666" }}>03-1234-5678</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: "#999" }}
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: "500", marginBottom: "4px" }}>所在地</h3>
                  <p style={{ color: "#666" }}>
                    〒100-0001
                    <br />
                    東京都千代田区千代田1-1
                    <br />
                    AIビル 5階
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>お問い合わせ内容</h3>
              <ul style={{ paddingLeft: "20px", color: "#666" }}>
                <li style={{ marginBottom: "8px" }}>AIプロジェクトの相談・見積もり</li>
                <li style={{ marginBottom: "8px" }}>技術顧問・コンサルティング</li>
                <li style={{ marginBottom: "8px" }}>講演・セミナーのご依頼</li>
                <li style={{ marginBottom: "8px" }}>採用・キャリアに関するお問い合わせ</li>
                <li>その他のご質問・ご相談</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "30px",
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
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
                      padding: "10px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
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
                      padding: "10px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
                    }}
                  />
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
                      padding: "10px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
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
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      borderRadius: "5px",
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
                    padding: "12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "500",
                    opacity: isSubmitting ? 0.7 : 1,
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

