import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        padding: "20px 0",
        marginTop: "auto",
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
        <p style={{ fontSize: "12px", color: "#666" }}>
          &copy; {new Date().getFullYear()} AI Engineer Portfolio. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555" }}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555" }}
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#555" }}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

