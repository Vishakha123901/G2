import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    from: 'bot',
    text: 'Hello! I am G2.ai, an AI assistant designed to help you find the best solutions for your business needs.\n\nHow can I help you today?',
    time: new Date(),
  }
];

const SUGGESTED = [
  'Find best CRM software',
  'Compare marketing tools',
  'Top-rated project management',
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text: msg, time: new Date() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text: `Thanks for your question! I'm analyzing the best options for "${msg}". Based on thousands of verified reviews on G2, I can help you find the perfect solution. What specific features matter most to you?`,
        time: new Date(),
      }]);
    }, 1400);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInMsg {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%,100% { transform: translateY(0); opacity: 0.45; }
          50%      { transform: translateY(-4px); opacity: 1; }
        }
        .chat-msg    { animation: fadeInMsg 0.22s ease; }
        .chat-panel  { animation: slideUpChat 0.22s cubic-bezier(0.16,1,0.3,1); }
        .chat-fab    { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .chat-fab:hover { transform: scale(1.1) rotate(8deg); box-shadow: 0 10px 32px rgba(255,79,0,0.55),0 3px 10px rgba(0,0,0,0.2) !important; }
        .chat-fab:active { transform: scale(0.93); }
        
        @media (max-width: 768px) {
          .chat-panel {
            bottom: 16px !important;
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
            max-width: 480px !important;
            height: 500px !important;
          }
        }
        
        @media (max-width: 480px) {
          .chat-panel {
            bottom: 12px !important;
            right: 12px !important;
            left: 12px !important;
            height: 480px !important;
          }
          .chat-fab {
            bottom: 20px !important;
            right: 20px !important;
            width: 54px !important;
            height: 54px !important;
          }
        }
      `}</style>

      {/* CHAT PANEL */}
      {open && (
        <div 
          className="chat-panel fixed bottom-24 right-7 w-[480px] h-[520px] bg-white rounded-2xl flex flex-col z-[9999] overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.18),0_3px_12px_rgba(0,0,0,0.08)]"
          style={{ fontFamily: '"Inter","Figtree",sans-serif' }}
        >
          {/* Header */}
          <div className="bg-white px-[18px] py-[14px] flex items-center justify-between flex-shrink-0 border-b border-[#E5E7EB]">
            <div className="text-[#1C1D21] text-[15px] font-semibold">G2.ai</div>
            <button 
              onClick={() => setOpen(false)}
              className="bg-transparent border-none cursor-pointer p-1 text-[#6B7280] text-xl leading-none transition-colors hover:text-[#1C1D21]"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-[14px] py-4 flex flex-col gap-3 bg-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent' }}>
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`chat-msg flex items-start gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div 
                  className={`max-w-[78%] px-[14px] py-[10px] rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === 'user' ? 'bg-[#5A39A2] text-white' : 'bg-[#F3F4F6] text-[#1C1D21]'
                  }`}
                  style={{ fontFamily: 'inherit' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="chat-msg flex items-start gap-2">
                <div className="px-4 py-[10px] rounded-lg bg-[#F3F4F6] flex items-center gap-1">
                  {[0,1,2].map(i => (
                    <div 
                      key={i} 
                      className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]"
                      style={{ animation: `typingDot 1s ease-in-out ${i*0.15}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="text-xs text-[#6B7280] font-medium">Suggested questions</div>
                {SUGGESTED.map((s,i) => (
                  <button 
                    key={i} 
                    onClick={() => sendMessage(s)}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-[13px] text-[#374151] cursor-pointer text-left transition-all hover:bg-[#F3F0FF] hover:border-[#5A39A2] hover:text-[#5A39A2]"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="px-4 py-3 border-t border-[#E5E7EB] bg-white flex items-center gap-2.5 flex-shrink-0">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Message..."
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={handleKey}
              className="flex-1 h-12 border border-[#D1D5DB] rounded-3xl px-5 text-[15px] text-[#1C1D21] bg-white transition-all focus:outline-none focus:border-[#5A39A2] focus:shadow-[0_0_0_3px_rgba(94,66,192,0.12)]"
              style={{ fontFamily: 'inherit' }}
            />

            <button 
              className="w-12 h-12 rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center cursor-pointer flex-shrink-0 transition-all hover:border-[#9CA3AF] hover:bg-[#F9FAFB]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>

            <button 
              onClick={() => sendMessage()} 
              disabled={!input.trim()}
              className={`w-12 h-12 rounded-full border-none flex items-center justify-center flex-shrink-0 transition-all ${
                input.trim() ? 'bg-[#8B7BD8] cursor-pointer hover:bg-[#493088]' : 'bg-[#E5E7EB] cursor-default'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 3 3 9-3 9 19-9Z"/>
                <path d="M6 12h16"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* FAB BUTTON */}
      {!open && (
        <button 
          className="chat-fab fixed bottom-7 right-7 w-[58px] h-[58px] rounded-full border-none cursor-pointer flex items-center justify-center z-[9999]"
          onClick={() => setOpen(true)} 
          aria-label="Open G2.ai chat"
          style={{
            background: 'linear-gradient(135deg,#FF4F00 0%,#FF6B35 100%)',
            boxShadow: '0 6px 24px rgba(255,79,0,0.42),0 2px 8px rgba(0,0,0,0.14)',
          }}
        >
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white"/>
            <path d="M19 15L19.7 17.3L22 18L19.7 18.7L19 21L18.3 18.7L16 18L18.3 17.3L19 15Z" fill="white" opacity="0.85"/>
            <path d="M6 3L6.6 4.7L8.3 5.3L6.6 5.9L6 7.6L5.4 5.9L3.7 5.3L5.4 4.7L6 3Z" fill="white" opacity="0.7"/>
          </svg>
        </button>
      )}
    </>
  );
}
