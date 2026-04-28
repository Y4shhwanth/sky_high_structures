"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { WHATSAPP_NUMBER, buildWhatsAppUrl } from "@/lib/contact";

const WA_PATTERN_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='%23D9D2C7' fill-opacity='0.5'><circle cx='10' cy='10' r='1.5'/><circle cx='40' cy='25' r='1.5'/><circle cx='65' cy='15' r='1.5'/><circle cx='20' cy='55' r='1.5'/><circle cx='55' cy='60' r='1.5'/><circle cx='75' cy='45' r='1.5'/></g></svg>\")";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [message, setMessage] = useState("");

  // Auto-open only after user has scrolled past the hero, not on bare page load
  useEffect(() => {
    if (hasInteracted) return;
    let armed = false;
    const onScroll = () => {
      if (!armed && window.scrollY > window.innerHeight * 0.8) {
        armed = true;
        window.setTimeout(() => {
          if (!hasInteracted) {
            setIsOpen(true);
            setShowBadge(true);
          }
        }, 4000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasInteracted]);

  const handleToggle = () => {
    setIsOpen((v) => !v);
    setShowBadge(false);
    setHasInteracted(true);
  };

  const sendWhatsApp = (text?: string) => {
    const msg = (text ?? message).trim();
    if (!msg) return;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setMessage("");
    setShowBadge(false);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end font-[var(--font-body)]">
      <div
        className={`transition-all duration-300 origin-bottom-right overflow-hidden bg-white border border-black/5 rounded-2xl shadow-2xl w-[calc(100vw-2rem)] max-w-[380px] sm:w-[380px] flex flex-col ${
          isOpen ? "scale-100 opacity-100 h-[min(80vh,480px)] mb-4 pointer-events-auto" : "scale-50 opacity-0 h-0 mb-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="bg-[var(--sky-whatsapp)] px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle fill="white" className="w-6 h-6 text-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] sm:text-[15px] text-white flex items-center gap-2 tracking-wide">
                Sky High Structures
                <span className="w-2 h-2 bg-green-200 rounded-full animate-pulse shadow-[0_0_8px_rgba(187,247,208,0.8)]" />
              </span>
              <span className="text-[11px] sm:text-[12px] text-white/90">Typically replies within 1 hour</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close WhatsApp panel"
            className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="flex-1 p-5 overflow-y-auto modal-scroll flex flex-col gap-4"
          style={{ backgroundColor: "#E5DDD5", backgroundImage: WA_PATTERN_BG, backgroundSize: "80px 80px" }}
        >
          <div className="bg-white text-[var(--sky-text)] p-3.5 rounded-tr-xl rounded-b-xl shadow-sm text-[14px] max-w-[85%] leading-relaxed self-start">
            Hi there! 👋 <br />
            How can we help you build your dream project today?
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-black/40 text-center mb-1">Quick Replies</span>
            {["I want to build a new house", "I need a renovation quote", "I want a free site visit"].map((opt) => (
              <button
                key={opt}
                onClick={() => sendWhatsApp(opt)}
                className="bg-white border border-[var(--sky-whatsapp)]/30 text-[var(--sky-whatsapp)] hover:bg-[var(--sky-whatsapp)] hover:text-white transition-colors text-[13px] font-bold py-2.5 px-4 rounded-full text-left shadow-sm self-start"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#F0F2F5] p-3 flex gap-2 items-center shrink-0">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-white border-0 rounded-full px-4 sm:px-5 py-3 text-[14px] text-[var(--sky-text)] outline-none shadow-sm focus:ring-1 focus:ring-[var(--sky-whatsapp)]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendWhatsApp()}
            aria-label="Type a WhatsApp message"
          />
          <button
            onClick={() => sendWhatsApp()}
            aria-label="Send to WhatsApp"
            className="bg-[var(--sky-whatsapp)] text-white p-3 rounded-full hover:bg-green-600 transition-colors shadow-sm shrink-0 flex items-center justify-center"
          >
            <Send className="w-4 h-4 ml-[2px]" />
          </button>
        </div>
      </div>

      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close WhatsApp" : `Chat on WhatsApp (${WHATSAPP_NUMBER})`}
        className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] bg-[var(--sky-whatsapp)] hover:bg-green-600 transition-transform hover:scale-105 active:scale-95 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] flex items-center justify-center relative"
      >
        <MessageCircle fill="white" className="w-7 h-7 sm:w-[34px] sm:h-[34px] text-transparent" />
        {showBadge && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[12px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse">
            1
          </div>
        )}
      </button>
    </div>
  );
}
