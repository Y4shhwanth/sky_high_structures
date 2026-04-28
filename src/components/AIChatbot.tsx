"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Phone } from "lucide-react";
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/contact";

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
  "What areas do you serve?",
];

const getBotResponse = (input: string): { text: string; showWhatsAppButton?: boolean } => {
  const lower = input.toLowerCase();

  if (lower.includes("human") || lower.includes("talk to someone") || lower.includes("agent")) {
    return {
      text: "I'll connect you with our engineer on WhatsApp. Tap the button below.",
      showWhatsAppButton: true,
    };
  }
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

  return {
    text: "Great question! For detailed answers, please WhatsApp us directly or fill the contact form. Our engineer will respond within 2 hours.",
    showWhatsAppButton: true,
  };
};

const openWhatsApp = (msg = "I'd like to speak to an engineer about my project.") =>
  window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init-1", sender: "bot", text: "Hi! I'm the Sky High AI. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const botReplyCountRef = useRef(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: `${Date.now()}-u`, sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const response = getBotResponse(text);
      botReplyCountRef.current += 1;
      const newCount = botReplyCountRef.current;

      const finalResponse = { ...response };
      if (newCount >= 3 && !finalResponse.showWhatsAppButton) {
        finalResponse.text += "\n\nWant to speak to our engineer directly?";
        finalResponse.showWhatsAppButton = true;
      }

      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-b`, sender: "bot", ...finalResponse },
      ]);
    }, 900);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[9990] flex justify-center sm:block">
      <div className="relative flex flex-col items-center w-full sm:w-auto">
        <div
          className={`absolute bottom-full mb-3 w-full sm:w-[360px] max-w-[420px] h-[min(80vh,520px)] bg-[#F8F9FA] rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-all duration-300 origin-bottom border border-black/5 ${
            isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-50 opacity-0 pointer-events-none"
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-5 overflow-y-auto modal-scroll flex flex-col gap-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col max-w-[85%] msg-animate ${m.sender === "user" ? "self-end items-end" : "self-start items-start"}`}>
                <div
                  className={`px-4 py-3 text-[13px] leading-relaxed shadow-sm break-words ${
                    m.sender === "user"
                      ? "bg-[var(--sky-gold)] text-[var(--sky-dark)] font-medium rounded-2xl rounded-tr-sm"
                      : "bg-[var(--sky-dark)] text-white/95 rounded-2xl rounded-tl-sm"
                  }`}
                >
                  {m.text.split("\n\n").map((p, idx) => (
                    <div key={idx} className={idx !== 0 ? "mt-3" : ""}>
                      {p}
                    </div>
                  ))}
                </div>

                {m.showWhatsAppButton && (
                  <button
                    onClick={() => openWhatsApp()}
                    className="mt-3 bg-[var(--sky-whatsapp)] text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-4 rounded-full flex items-center gap-2 hover:bg-green-600 transition-colors shadow-sm self-start whitespace-nowrap"
                  >
                    <Phone className="w-3 h-3" /> Connect on WhatsApp
                  </button>
                )}
              </div>
            ))}

            {messages.filter((m) => m.sender === "user").length === 0 && (
              <div className="flex flex-col gap-2 mt-2 msg-animate">
                <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold ml-1 mb-1">Quick Questions</span>
                {QUICK_CHIPS.map((chip) => (
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

            {isTyping && (
              <div className="flex self-start items-start max-w-[85%] msg-animate">
                <div className="bg-[var(--sky-dark)] text-white px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-10 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[var(--sky-gold)] rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1 shrink-0" />
          </div>

          {/* Input */}
          <div className="bg-white p-3 border-t border-black/5 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 bg-[#F8F9FA] border border-black/10 outline-none rounded-full px-5 py-3 text-[13px] text-black focus:border-[var(--sky-gold)] transition-colors"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
              aria-label="Type your question"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="w-[44px] h-[44px] rounded-full bg-[var(--sky-dark)] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] text-white transition-colors flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Floating launcher — bottom-center on desktop, bottom-left on mobile to avoid overlapping the WhatsApp widget on the right */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className="self-start sm:self-center w-14 h-14 bg-[var(--sky-dark)] text-[var(--sky-gold)] rounded-full shadow-[0_8px_20px_rgba(10,25,47,0.3)] hover:scale-110 active:scale-95 transition-transform flex items-center justify-center border border-[var(--sky-gold)]/20 z-50 overflow-hidden relative group"
          data-whatsapp={WHATSAPP_NUMBER}
        >
          <MessageSquare className="w-6 h-6 relative z-10 transition-transform group-hover:-translate-y-0.5" />
          <div className="absolute inset-0 bg-[#162744] transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
