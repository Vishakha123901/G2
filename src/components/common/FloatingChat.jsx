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
  const [open, setOpen] = useState(false);
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
      {open && (
        <div className="fixed right-[36px] bottom-[18px] z-[99999] flex h-[560px] w-[600px] flex-col overflow-hidden rounded-[20px] border border-[#e5e5e5] bg-white font-['Figtree','Inter',Arial,sans-serif] shadow-[0_12px_35px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] max-[850px]:right-[18px] max-[850px]:left-[18px] max-[850px]:bottom-[18px] max-[850px]:h-[calc(100vh-36px)] max-[850px]:w-auto max-[850px]:max-h-[540px] max-[600px]:right-[10px] max-[600px]:left-[10px] max-[600px]:bottom-[10px] max-[600px]:h-[calc(100vh-20px)] max-[600px]:rounded-[18px]">
          <div className="flex h-[84px] min-h-[84px] items-center justify-between bg-white px-[18px] max-[600px]:h-[72px] max-[600px]:min-h-[72px]">
            <div className="flex items-center gap-[9px]">
              <div className="flex h-[40px] min-w-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-[#ff492c]">
                <svg
                  className="block h-[29px] w-[29px]"
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

              <span className="text-[19px] font-medium leading-none tracking-[-0.25px] text-[#27384b]">
                G2.ai
              </span>
            </div>

            <div className="flex items-center gap-[20px]">
              <button
                className="flex h-[25px] w-[25px] items-center justify-center border-0 bg-transparent p-0 text-[#111111] outline-none transition-opacity duration-150 hover:opacity-65"
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

              <button
                className="flex h-[25px] w-[25px] items-center justify-center border-0 bg-transparent p-0 text-[#111111] outline-none transition-opacity duration-150 hover:opacity-65"
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

          <div className="g2-chat-body min-h-0 flex-1 overflow-y-auto bg-white px-[33px] pt-[22px] pb-[20px] pl-[15px] [scrollbar-color:#8f8f8f_transparent] [scrollbar-width:auto] max-[600px]:pr-[25px] max-[600px]:pl-[15px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.from === "bot"
                  ? "justify-start"
                  : "mt-[12px] justify-end"
                  } [&+&]:mt-[18px]`}
              >
                <div
                  className={`whitespace-pre-line rounded-[20px] px-[16px] pt-[16px] pb-[17px] text-[15px] leading-[1.5] tracking-[-0.2px] text-[#30435a] max-[600px]:text-[17px] ${msg.from === "bot"
                    ? "w-full bg-[#f8f8f8]"
                    : "w-auto max-w-[78%] rounded-[18px] bg-[#5746b2] px-[16px] py-[12px] text-[14px] text-white"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="mt-[15px] flex items-center">
                <div className="flex items-center gap-[5px] rounded-[18px] bg-[#f8f8f8] px-[17px] py-[13px]">
                  <span className="h-[6px] w-[6px] animate-[g2Typing_1s_infinite_ease-in-out] rounded-full bg-[#8c8c8c] opacity-45" />
                  <span className="[animation-delay:0.15s] h-[6px] w-[6px] animate-[g2Typing_1s_infinite_ease-in-out] rounded-full bg-[#8c8c8c] opacity-45" />
                  <span className="[animation-delay:0.3s] h-[6px] w-[6px] animate-[g2Typing_1s_infinite_ease-in-out] rounded-full bg-[#8c8c8c] opacity-45" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex h-[80px] min-h-[80px] items-center gap-[14px] bg-white px-[15px] pt-[10px] pb-[16px] max-[600px]:h-[76px] max-[600px]:min-h-[76px] max-[600px]:gap-[8px] max-[600px]:px-[12px]">
            <div className="flex h-[52px] flex-1 items-center rounded-[10px] border border-[#bfc2c8] bg-white px-[15px]">
              <input
                ref={inputRef}
                type="text"
                className="h-full w-full border-none bg-transparent font-['Figtree','Inter',Arial,sans-serif] text-[15px] tracking-[-0.2px] text-[#26394f] outline-none placeholder:text-[#65758a] max-[600px]:text-[16px]"
                placeholder="Message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
            </div>

            <button
              className="flex h-[52px] min-w-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-[#dedede] bg-white text-[#111111] transition-colors duration-150 hover:bg-[#f7f7f7] max-[600px]:h-[48px] max-[600px]:min-w-[48px] max-[600px]:w-[48px]"
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
                <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
                <line x1="12" y1="18" x2="12" y2="21" />
                <line x1="9" y1="21" x2="15" y2="21" />
              </svg>
            </button>

            <button
              className="flex h-[52px] min-w-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#b7a9df] transition-all duration-150 hover:scale-[1.04] hover:bg-[#a998d7] disabled:cursor-default disabled:opacity-100 max-[600px]:h-[48px] max-[600px]:min-w-[48px] max-[600px]:w-[48px]"
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

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-[28px] bottom-[28px] z-[99999] flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#FF492C] text-white shadow-[0_6px_24px_rgba(255,79,0,0.35)]"
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
