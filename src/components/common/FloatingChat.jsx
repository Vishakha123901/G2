import React, { useState, useRef, useEffect } from 'react';

const G2_AI_LOGO = null; // Remove logo, keep it plain

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
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%,100% { transform: translateY(0); opacity: 0.45; }
          50%      { transform: translateY(-4px); opacity: 1; }
        }
        .g2-chat-msg    { animation: chatFadeIn 0.22s ease; }
        .g2-chat-panel  { animation: chatSlideUp 0.22s cubic-bezier(0.16,1,0.3,1); }
        .g2-chat-fab    { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
        .g2-chat-fab:hover { transform: scale(1.1) rotate(8deg); box-shadow: 0 10px 32px rgba(255,79,0,0.55),0 3px 10px rgba(0,0,0,0.2) !important; }
        .g2-chat-fab:active { transform: scale(0.93); }
        .g2-chat-suggestion:hover { background: #F3F0FF !important; border-color: #5E42C0 !important; color: #5E42C0 !important; }
        .g2-chat-send:hover:not(:disabled) { background: #4E35A6 !important; }
        .g2-chat-icon-btn:hover { color: #1C1D21 !important; }
        .g2-chat-input:focus { outline: none; border-color: #5E42C0 !important; box-shadow: 0 0 0 3px rgba(94,66,192,0.12); }
        
        /* Responsive chat panel */
        @media (max-width: 768px) {
          .g2-chat-panel {
            bottom: 16px !important;
            right: 16px !important;
            left: 16px !important;
            width: auto !important;
            max-width: 480px !important;
            height: 500px !important;
          }
        }
        
        @media (max-width: 480px) {
          .g2-chat-panel {
            bottom: 12px !important;
            right: 12px !important;
            left: 12px !important;
            height: 480px !important;
          }
          .g2-chat-fab {
            bottom: 20px !important;
            right: 20px !important;
            width: 54px !important;
            height: 54px !important;
          }
        }
      `}</style>

      {/* ── CHAT PANEL ── */}
      {open && (
        <div className="g2-chat-panel" style={{
          position: 'fixed', bottom: 96, right: 28,
          width: 480, height: 520,
          background: '#fff', borderRadius: 18,
          boxShadow: '0 12px 48px rgba(0,0,0,0.18), 0 3px 12px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column',
          zIndex: 9999, overflow: 'hidden',
          fontFamily: '"Inter","Figtree",sans-serif',
        }}>

          {/* Header */}
          <div style={{
            background: '#fff',
            padding: '14px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexShrink: 0,
            borderBottom: '1px solid #E5E7EB',
          }}>
            <div style={{ color: '#1C1D21', fontSize: 15, fontWeight: 600 }}>G2.ai</div>
            <button onClick={() => setOpen(false)} style={{
              background:'none', border:'none', cursor:'pointer', 
              padding:'4px', color:'#6B7280', fontSize: 20, lineHeight: 1,
              transition:'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color='#1C1D21'}
            onMouseLeave={e => e.currentTarget.style.color='#6B7280'}>
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '16px 14px',
            display: 'flex', flexDirection: 'column', gap: 12,
            background: '#fff',
            scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB transparent',
          }}>
            {messages.map(msg => (
              <div key={msg.id} className="g2-chat-msg" style={{
                display: 'flex',
                flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start', gap: 8,
              }}>
                <div style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: msg.from === 'user' ? '#5E42C0' : '#F3F4F6',
                  color: msg.from === 'user' ? '#fff' : '#1C1D21',
                  fontSize: 14, lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="g2-chat-msg" style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                <div style={{
                  padding:'10px 16px', borderRadius:'8px',
                  background:'#F3F4F6',
                  display:'flex', alignItems:'center', gap:4,
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width:6,height:6,borderRadius:'50%',background:'#9CA3AF',
                      animation:`typingBounce 1s ease-in-out ${i*0.15}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {messages.length === 1 && (
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:4 }}>
                <div style={{ fontSize:12, color:'#6B7280', fontWeight:500 }}>Suggested questions</div>
                {SUGGESTED.map((s,i) => (
                  <button key={i} className="g2-chat-suggestion" onClick={() => sendMessage(s)} style={{
                    background:'#F9FAFB', border:'1px solid #E5E7EB',
                    borderRadius:8, padding:'8px 12px', fontSize:13,
                    color:'#374151', cursor:'pointer', textAlign:'left',
                    transition:'all 0.15s', fontFamily:'inherit',
                  }}>{s}</button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div style={{
            padding:'12px 16px', borderTop:'1px solid #E5E7EB',
            background:'#fff', display:'flex', alignItems:'center', gap:10, flexShrink:0,
          }}>
            <input ref={inputRef} className="g2-chat-input"
              type="text" placeholder="Message..."
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
              style={{
                flex:1, height:48, border:'1px solid #D1D5DB', borderRadius:24,
                padding:'0 20px', fontSize:15, fontFamily:'inherit',
                color:'#1C1D21', background:'#fff', transition:'all 0.15s',
              }}
            />

            <button style={{
              width:48, height:48, borderRadius:'50%', border:'1px solid #D1D5DB',
              background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', flexShrink:0, transition:'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#9CA3AF'; e.currentTarget.style.background='#F9FAFB'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#D1D5DB'; e.currentTarget.style.background='#fff'; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>

            <button className="g2-chat-send" onClick={() => sendMessage()} disabled={!input.trim()} style={{
              width:48, height:48, borderRadius:'50%',
              background: input.trim() ? '#8B7BD8' : '#E5E7EB',
              border:'none', cursor: input.trim() ? 'pointer' : 'default',
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0, transition:'all 0.15s',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 3 3 9-3 9 19-9Z"/>
                <path d="M6 12h16"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── FAB BUTTON ── */}
      {!open && (
        <button className="g2-chat-fab" onClick={() => setOpen(true)} aria-label="Open G2.ai chat" style={{
          position:'fixed', bottom:28, right:28,
          width:58, height:58, borderRadius:'50%',
          background:'linear-gradient(135deg,#FF4F00 0%,#FF6B35 100%)',
          border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:9999,
          boxShadow:'0 6px 24px rgba(255,79,0,0.42),0 2px 8px rgba(0,0,0,0.14)',
        }}>
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
