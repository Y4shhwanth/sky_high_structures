"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Phone } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  showWhatsAppButton?: boolean;
};

const QUICK_CHIPS = [
  "How much does construction cost?",
  "How long does it take to build?",
  "Do you provide free site visits?",
  "What areas do you serve?"
];

// Pure JS Rule-Based Engine
const getBotResponse = (input: string): { text: string; showWhatsAppButton?: boolean } => {
  const lower = input.toLowerCase();

  // Redirect hooks
  if (lower.includes("human") || lower.includes("talk to someone")) {
     return { 
       text: "Connecting you to WhatsApp...", 
       showWhatsAppButton: false 
     };
  }
  
  // Keyword matches
  if (lower.match(/cost|price|rate|sqft/)) {
    return { text: "Construction costs in Coimbatore range from ₹1,800/sqft (basic) to ₹3,200/sqft (premium). Use our Cost Estimator on this page for a personalized estimate!" };
  }
  if (lower.match(/time|long|duration|months/)) {
    return { text: "A typical 1500 sqft house takes 10-14 months from foundation to handover. We provide weekly progress updates via WhatsApp." };
  }
  if (lower.match(/site visit|visit|free/)) {
    return { text: "Yes! We offer completely free site visits across Coimbatore. Click the 'Get a Free Quote' button and our engineer will contact you within 2 hours." };
  }
  if (lower.match(/area|serve|location|where/)) {
    return { text: "We serve all areas of Coimbatore: Peelamedu, RS Puram, Saravanampatti, Ganapathy, Singanallur, Vadavalli, Hopes College, and surrounding areas." };
  }
  if (lower.match(/vastu/)) {
    return { text: "Yes, all our designs can be made Vastu-compliant. Our in-house architect works with Vastu guidelines without compromising on modern aesthetics." };
  }
  if (lower.match(/approval|permit|dtcp|legal/)) {
    return { text: "We handle all DTCP approvals, building plan submissions, and legal documentation as part of our full construction package." };
  }
  if (lower.match(/material|quality|brand/)) {
    return { text: "We use only ISI-marked cement (Ultratech/ACC), TMT steel (SAIL/JSW), and premium bricks. No compromise on material quality." };
  }
  if (lower.match(/payment|installment|emi/)) {
    return { text: "Payments are milestone-based: Foundation → Structure → Finishing → Handover. We never ask for full payment upfront." };
  }

  // Fallback
  return { 
    text: "Great question! For detailed answers, please WhatsApp us directly or fill the contact form. Our engineer will respond within 2 hours.", 
    showWhatsAppButton: true 
  };
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init-1", sender: "bot", text: "Hi! I'm the Sky High AI. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botReplyCount, setBotReplyCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
  const handleSend = (text: string) => {
     if (!text.trim()) return;
     
     // Build User Msg
     const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
     setMessages(prev => [...prev, userMsg]);
     setInputValue("");
     setIsTyping(true);
     
     // Fake network delay
     setTimeout(() => {
       setIsTyping(false);
       
       const lower = text.toLowerCase();
       const needsHuman = lower.includes("human") || lower.includes("talk to someone");
       
       if (needsHuman) {
          window.open(`https://wa.me/919876543210?text=I%20would%20like%20to%20speak%20to%20an%20engineer`, "_blank");
       }

       const response = getBotResponse(text);
       
       const newCount = botReplyCount + 1;
       setBotReplyCount(newCount);
       
       let finalResponse = { ...response };
       
       // Inject the WhatsApp CTA after 3rd response if not already present
       if (newCount >= 3 && !needsHuman && !finalResponse.showWhatsAppButton) {
          finalResponse.text += "\n\nWant to speak to our engineer directly?";
          finalResponse.showWhatsAppButton = true;
       }

       setMessages(prev => [...prev, { id: Date.now().toString() + "-bot", sender: "bot", ...finalResponse }]);
     }, 1200);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] font-[var(--font-body)]">
       
       {/* Inline Styles for Slide Up Animation */}
       <style>{`
         @keyframes msgSlideUp {
           from { opacity: 0; transform: translateY(10px); }
           to { opacity: 1; transform: translateY(0); }
         }
         .msg-animate {
           animation: msgSlideUp 0.3s ease-out forwards;
         }
       `}</style>
       
       <div className="relative flex flex-col items-center">
          
          {/* POPUP CHAT WINDOW */}
          <div 
            className={`absolute bottom-full mb-4 w-[360px] h-[480px] bg-[#F8F9FA] rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom border border-black/5 ${
              isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-50 opacity-0 pointer-events-none display-none'
            }`}
          >
              {/* Header */}
              <div className="bg-[var(--sky-dark)] px-5 py-4 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                     <div className="w-[38px] h-[38px] bg-white/10 rounded-full flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-[var(--sky-gold)]" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-white font-[var(--font-display)] font-semibold text-[15px] leading-tight">Ask Our AI Assistant</span>
                        <span className="text-white/60 text-[10px] uppercase tracking-wider mt-0.5">Powered by Sky High Structures</span>
                     </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
                     <X className="w-5 h-5" />
                  </button>
              </div>
              
              {/* Messages Body */}
              <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
                 
                 {messages.map((m) => (
                    <div key={m.id} className={`flex flex-col max-w-[85%] msg-animate ${m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                       
                       <div 
                         className={`px-4 py-3 text-[13px] font-[var(--font-body)] leading-relaxed shadow-sm break-words ${
                           m.sender === 'user' 
                              ? 'bg-[var(--sky-gold)] text-[var(--sky-dark)] font-medium rounded-2xl rounded-tr-sm' 
                              : 'bg-[var(--sky-dark)] text-white/95 rounded-2xl rounded-tl-sm'
                         }`}
                       >
                         {/* Render new lines appropriately */}
                         {m.text.split("\n\n").map((paragraph, idx) => (
                           <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                             {paragraph}
                           </div>
                         ))}
                       </div>

                       {/* Action Buttons inside Bot message */}
                       {m.showWhatsAppButton && (
                          <button 
                             onClick={() => window.open('https://wa.me/919876543210', '_blank')} 
                             className="mt-3 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors shadow-sm self-start whitespace-nowrap"
                          >
                             <Phone className="w-3 h-3" /> Connect on WhatsApp
                          </button>
                       )}
                    </div>
                 ))}

                 {/* Quick Chips (if no user response yet) */}
                 {messages.filter(m => m.sender === 'user').length === 0 && (
                   <div className="flex flex-col gap-2 mt-2 msg-animate">
                     <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold ml-1 mb-1">Quick Questions</span>
                     {QUICK_CHIPS.map(chip => (
                       <button 
                         key={chip} 
                         onClick={() => handleSend(chip)} 
                         className="bg-white border border-[var(--sky-gold)]/40 text-[var(--sky-dark)] text-[12px] py-2 px-4 rounded-full hover:bg-[var(--sky-gold)] hover:border-transparent transition-all text-left shadow-sm font-medium self-start"
                       >
                          {chip}
                       </button>
                     ))}
                   </div>
                 )}

                 {/* Typing Indicator */}
                 {isTyping && (
                    <div className="flex self-start items-start max-w-[85%] msg-animate">
                       <div className="bg-[var(--sky-dark)] text-white px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-10 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce"></span>
                       </div>
                    </div>
                 )}
                 <div ref={messagesEndRef} className="h-1 shrink-0" />
              </div>

              {/* Input Area */}
              <div className="bg-white p-3 border-t border-black/5 flex items-center gap-2 shrink-0">
                 <input 
                   type="text"
                   placeholder="Ask a question..."
                   className="flex-1 bg-[#F8F9FA] border border-black/10 outline-none rounded-full px-5 py-3 text-[13px] text-black focus:border-[var(--sky-gold)] transition-colors"
                   value={inputValue}
                   onChange={e => setInputValue(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && handleSend(inputValue)}
                 />
                 <button 
                   onClick={() => handleSend(inputValue)} 
                   disabled={!inputValue.trim()}
                   className="w-[44px] h-[44px] rounded-full bg-[var(--sky-dark)] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] text-white transition-colors flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <Send className="w-4 h-4 ml-0.5" />
                 </button>
              </div>
          </div>

          {/* FLOATING ICON (Always visible) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-14 h-14 bg-[var(--sky-dark)] text-[var(--sky-gold)] rounded-full shadow-[0_8px_20px_rgba(10,25,47,0.3)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-[var(--sky-gold)]/20 z-50 overflow-hidden relative group"
          >
             <MessageSquare className="w-6 h-6 relative z-10 transition-transform group-hover:-translate-y-0.5" />
             <div className="absolute inset-0 bg-[#162744] transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
       </div>
    </div>
  );
}
