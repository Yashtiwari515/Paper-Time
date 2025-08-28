import { useState } from "react";

function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const API = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API}/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    const botMessage = {
      role: "bot",
      content: data.reply,
      papers: data.papers || [],
    };

    setMessages([...newMessages, botMessage]);
    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#d97706",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "450px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#d97706",
              color: "#fff",
              padding: "10px",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>📚 PaperBot</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.role === "user" ? "right" : "left",
                  margin: "8px 0",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: msg.role === "user" ? "#d97706" : "#f1f1f1",
                    color: msg.role === "user" ? "#fff" : "#000",
                  }}
                >
                  {msg.content}
                </div>

                {/* Show PDF links if available */}
                {msg.papers && msg.papers.length > 0 && (
                  <div style={{ marginTop: "6px" }}>
                    {msg.papers.map((pdf, i) => (
                      <a
                        key={i}
                        href={pdf}
                        download={`Paper_${i + 1}.pdf`} // 🔹 Forces download
                        style={{
                          display: "block",
                          color: "#d97706",
                          textDecoration: "underline",
                          marginTop: "4px",
                        }}
                      >
                        📄 Download Paper {i + 1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a paper..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 15px",
                border: "none",
                background: "#d97706",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotWidget;
