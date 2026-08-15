import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: "bot",
    text: "Hello! I am G2.ai, an AI assistant designed to help you find the best solutions for your business needs.",
    time: new Date(),
  },
  {
    id: 2,
    from: "bot",
    text: "How can I help you today?",
    time: new Date(),
  },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);

  const sendMessage = (text) => {
    const msg = text || input.trim();

    if (!msg) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "user",
        text: msg,
        time: new Date(),
      },
    ]);

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          text: `Thanks for your question! I'm analyzing the best options for "${msg}". Based on thousands of verified reviews on G2, I can help you find the perfect solution. What specific features matter most to you?`,
          time: new Date(),
        },
      ]);
    }, 1400);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* ========================================
           MAIN CHAT WINDOW
        ======================================== */

        .g2-chat-panel {
          position: fixed;
          right: 36px;
          bottom: 18px;

          width: 600px;
          height: 560px;

          background: #ffffff;

          border: 1px solid #e5e5e5;
          border-radius: 20px;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          z-index: 99999;

          box-shadow:
            0 12px 35px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04);

          font-family:
            "Figtree",
            "Inter",
            Arial,
            sans-serif;
        }


        /* ========================================
           HEADER
        ======================================== */

        .g2-chat-header {
          height: 84px;
          min-height: 84px;

          padding: 0 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: #ffffff;
        }


        /* BRAND */

        .g2-brand {
          display: flex;
          align-items: center;
          gap: 9px;
        }


        /* G2 LOGO */

        .g2-logo {
          width: 40px;
          height: 40px;
          min-width: 40px;

          border-radius: 50%;

          background: #ff492c;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
        }

        .g2-logo svg {
          width: 29px;
          height: 29px;
          display: block;
        }


        /* G2.AI */

        .g2-brand-name {
          font-size: 19px;
          line-height: 1;

          font-weight: 500;

          color: #27384b;

          letter-spacing: -0.25px;
        }


        /* HEADER BUTTONS */

        .g2-header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .g2-header-button {
          width: 25px;
          height: 25px;

          padding: 0;
          margin: 0;

          border: 0;
          outline: none;

          background: transparent;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          color: #111111;
        }

        .g2-header-button:hover {
          opacity: 0.65;
        }


        /* ========================================
           CHAT BODY
        ======================================== */

        .g2-chat-body {
          flex: 1;

          min-height: 0;

          position: relative;

          background: #ffffff;

          overflow-y: auto;

          padding: 22px 33px 20px 15px;

          scrollbar-width: auto;
          scrollbar-color: #8f8f8f transparent;
        }


        /* SCROLLBAR */

        .g2-chat-body::-webkit-scrollbar {
          width: 13px;
        }

        .g2-chat-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .g2-chat-body::-webkit-scrollbar-thumb {
          background: #8d8d8d;

          border-radius: 10px;

          border: 3px solid #ffffff;
        }


        /* ========================================
           MESSAGE
        ======================================== */

        .g2-message {
          width: 100%;

          display: flex;

          margin: 0;
        }

        .g2-message.bot {
          justify-content: flex-start;
        }

        .g2-message.user {
          justify-content: flex-end;

          margin-top: 12px;
        }


        /* MESSAGE CARD */

        .g2-message-card {
          width: 100%;

          padding: 16px 16px 17px 16px;

          border-radius: 20px;

          font-size: 15px;

          line-height: 1.5;

          letter-spacing: -0.2px;

          color: #30435a;

          white-space: pre-line;
        }


        /* BOT MESSAGE */

        .g2-message.bot .g2-message-card {
          background: #f8f8f8;
        }


        /* USER MESSAGE */

        .g2-message.user .g2-message-card {
          width: auto;

          max-width: 78%;

          background: #5746b2;

          color: #ffffff;

          border-radius: 18px;

          padding: 12px 16px;

          font-size: 14px;
        }


        /* MESSAGE GAP */

        .g2-message + .g2-message {
          margin-top: 18px;
        }


        /* ========================================
           TYPING INDICATOR
        ======================================== */

        .g2-typing {
          display: flex;
          align-items: center;

          margin-top: 15px;
        }

        .g2-typing-box {
          display: flex;
          align-items: center;

          gap: 5px;

          padding: 13px 17px;

          border-radius: 18px;

          background: #f8f8f8;
        }

        .g2-typing-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #8c8c8c;

          animation: g2Typing 1s infinite ease-in-out;
        }

        .g2-typing-dot:nth-child(2) {
          animation-delay: 0.15s;
        }

        .g2-typing-dot:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes g2Typing {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }

          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }


        /* ========================================
           FOOTER
        ======================================== */

        .g2-chat-footer {
          height: 80px;
          min-height: 80px;

          padding: 10px 15px 16px 15px;

          background: #ffffff;

          display: flex;
          align-items: center;

          gap: 14px;
        }


        /* ========================================
           MESSAGE INPUT
        ======================================== */

        .g2-input-wrapper {
          flex: 1;

          height: 52px;

          border: 1px solid #bfc2c8;

          border-radius: 10px;

          background: #ffffff;

          display: flex;
          align-items: center;

          padding: 0 15px;
        }

        .g2-input {
          width: 100%;
          height: 100%;

          border: none;
          outline: none;

          background: transparent;

          font-family:
            "Figtree",
            "Inter",
            Arial,
            sans-serif;

          font-size: 15px;

          color: #26394f;

          letter-spacing: -0.2px;
        }

        .g2-input::placeholder {
          color: #65758a;

          opacity: 1;
        }

        .g2-input:focus {
          outline: none;
        }


        /* ========================================
           MICROPHONE
        ======================================== */

        .g2-mic-button {
          width: 52px;
          height: 52px;
          min-width: 52px;

          border-radius: 50%;

          border: 1px solid #dedede;

          background: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          color: #111111;

          transition: background 0.15s ease;
        }

        .g2-mic-button:hover {
          background: #f7f7f7;
        }


        /* ========================================
           SEND BUTTON
        ======================================== */

        .g2-send-button {
          width: 52px;
          height: 52px;
          min-width: 52px;

          border: none;

          border-radius: 50%;

          background: #b7a9df;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          transition:
            transform 0.15s ease,
            background 0.15s ease;
        }

        .g2-send-button:hover {
          transform: scale(1.04);

          background: #a998d7;
        }

        .g2-send-button:disabled {
          cursor: default;

          opacity: 1;
        }


        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 850px) {

          .g2-chat-panel {
            right: 18px;
            left: 18px;

            bottom: 18px;

            width: auto;

            height: calc(100vh - 36px);

            max-height: 540px;
          }
        }


        @media (max-width: 600px) {

          .g2-chat-panel {
            right: 10px;
            left: 10px;

            bottom: 10px;

            height: calc(100vh - 20px);

            border-radius: 18px;
          }


          .g2-chat-header {
            height: 72px;
            min-height: 72px;
          }


          .g2-chat-body {
            padding-left: 15px;
            padding-right: 25px;
          }


          .g2-message-card {
            font-size: 17px;
          }


          .g2-chat-footer {
            height: 76px;
            min-height: 76px;

            padding-left: 12px;
            padding-right: 12px;

            gap: 8px;
          }


          .g2-input {
            font-size: 16px;
          }


          .g2-mic-button,
          .g2-send-button {
            width: 48px;
            height: 48px;
            min-width: 48px;
          }
        }
      `}</style>


      {/* ==========================================
          CHAT PANEL
      ========================================== */}

      {open && (
        <div className="g2-chat-panel">


          {/* ========================================
              HEADER
          ======================================== */}

          <div className="g2-chat-header">

            <div className="g2-brand">


              {/* G2 LOGO */}

              <div className="g2-logo">

                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="M16.02 6.5C10.28 6.5 6.5 10.2 6.5 16c0 5.72 3.74 9.5 9.52 9.5 2.95 0 5.37-.93 7.08-2.67l-3.06-3.06c-.98.96-2.25 1.47-3.9 1.47-2.68 0-4.55-1.77-4.55-5.24 0-3.46 1.87-5.24 4.55-5.24 1.46 0 2.57.46 3.49 1.37l2.9-3.15C20.9 7.38 18.77 6.5 16.02 6.5Z"
                    fill="white"
                  />

                  <path
                    d="M18.8 15.18h6.7v3.7h-6.7v-3.7Z"
                    fill="#FF492C"
                  />

                  <path
                    d="M21.3 7.5l5.3 5.3-2.65 2.65-5.3-5.3L21.3 7.5Z"
                    fill="white"
                  />

                  <path
                    d="M23.4 5.2l1.05 2.45 2.45 1.05-2.45 1.05-1.05 2.45-1.05-2.45-2.45-1.05 2.45-1.05L23.4 5.2Z"
                    fill="white"
                  />

                </svg>

              </div>


              <span className="g2-brand-name">
                G2.ai
              </span>

            </div>


            {/* HEADER ACTIONS */}

            <div className="g2-header-actions">


              {/* EXPAND BUTTON */}

              <button
                className="g2-header-button"
                aria-label="Expand"
                type="button"
              >

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >

                  <path d="M14 4h6v6" />

                  <path d="M20 4l-7 7" />

                  <path d="M10 20H4v-6" />

                  <path d="M4 20l7-7" />

                </svg>

              </button>


              {/* MINIMIZE BUTTON */}

              <button
                className="g2-header-button"
                onClick={() => setOpen(false)}
                aria-label="Minimize"
                type="button"
              >

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >

                  <path d="M5 12H19" />

                </svg>

              </button>

            </div>

          </div>


          {/* ========================================
              CHAT BODY
          ======================================== */}

          <div className="g2-chat-body">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`g2-message ${msg.from}`}
              >

                <div className="g2-message-card">

                  {msg.text}

                </div>

              </div>

            ))}


            {/* TYPING INDICATOR */}

            {typing && (

              <div className="g2-typing">

                <div className="g2-typing-box">

                  <span className="g2-typing-dot"></span>

                  <span className="g2-typing-dot"></span>

                  <span className="g2-typing-dot"></span>

                </div>

              </div>

            )}


            <div ref={messagesEndRef} />

          </div>


          {/* ========================================
              BOTTOM SEARCH / MESSAGE SECTION
          ======================================== */}

          <div className="g2-chat-footer">


            {/* MESSAGE INPUT */}

            <div className="g2-input-wrapper">

              <input
                ref={inputRef}
                type="text"
                className="g2-input"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />

            </div>


            {/* MICROPHONE */}

            <button
              className="g2-mic-button"
              aria-label="Voice input"
              type="button"
            >

              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111111"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <rect
                  x="9"
                  y="2.5"
                  width="6"
                  height="12"
                  rx="3"
                />

                <path
                  d="M5.5 11.5a6.5 6.5 0 0 0 13 0"
                />

                <line
                  x1="12"
                  y1="18"
                  x2="12"
                  y2="21"
                />

                <line
                  x1="9"
                  y1="21"
                  x2="15"
                  y2="21"
                />

              </svg>

            </button>


            {/* SEND BUTTON */}

            <button
              className="g2-send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              aria-label="Send message"
              type="button"
            >

              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M21.5 3.5L10.8 14.2"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M21.5 3.5L14.7 21L10.8 14.2L3 10.5L21.5 3.5Z"
                  fill="white"
                />

              </svg>

            </button>

          </div>

        </div>
      )}


      {/* ==========================================
          OPEN CHAT BUTTON AFTER MINIMIZE
      ========================================== */}

      {!open && (

        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: "28px",
            bottom: "28px",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            border: "none",
            background: "#FF492C",
            color: "#fff",
            cursor: "pointer",
            zIndex: 99999,
            boxShadow:
              "0 6px 24px rgba(255,79,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Open G2.ai chat"
          type="button"
        >

          <svg
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
          >

            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="white"
            />

            <path
              d="M19 15L19.7 17.3L22 18L19.7 18.7L19 21L18.3 18.7L16 18L18.3 17.3L19 15Z"
              fill="white"
            />

          </svg>

        </button>

      )}

    </>
  );
}
