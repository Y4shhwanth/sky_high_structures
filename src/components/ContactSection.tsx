"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    
    // Simulate fetch to Formspree
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[var(--sky-stone)] py-[120px] px-[8vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Form Column */}
        <Reveal>
          <div>
            <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
              Get In Touch
            </h3>
            <h2 className="font-[var(--font-display)] italic font-semibold text-[clamp(48px,6vw,64px)] text-[var(--sky-text)] leading-[1.0] mb-12">
              Let's Build It.
            </h2>

            {formState === "success" ? (
              <div className="bg-[var(--sky-bg)] p-8 border border-[var(--sky-gold)]">
                <p className="font-[var(--font-display)] italic text-[24px] text-[var(--sky-text)]">
                  Thank you. We will contact you within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="peer w-full bg-transparent border-0 border-b border-[var(--sky-text)]/20 pb-3 font-[var(--font-body)] text-[16px] text-[var(--sky-text)] outline-none focus:border-[var(--sky-gold)] transition-colors placeholder-transparent pt-6"
                    placeholder="Full Name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-0 font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-muted)] peer-focus:text-[var(--sky-gold)] transition-colors"
                  >
                    Full Name *
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    className="peer w-full bg-transparent border-0 border-b border-[var(--sky-text)]/20 pb-3 font-[var(--font-body)] text-[16px] text-[var(--sky-text)] outline-none focus:border-[var(--sky-gold)] transition-colors placeholder-transparent pt-6"
                    placeholder="Phone Number"
                  />
                  <label 
                    htmlFor="phone" 
                    className="absolute left-0 top-0 font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-muted)] peer-focus:text-[var(--sky-gold)] transition-colors"
                  >
                    Phone Number *
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="text" 
                    id="details" 
                    className="peer w-full bg-transparent border-0 border-b border-[var(--sky-text)]/20 pb-3 font-[var(--font-body)] text-[16px] text-[var(--sky-text)] outline-none focus:border-[var(--sky-gold)] transition-colors placeholder-transparent pt-6"
                    placeholder="Project Details (Plot Size, Location)"
                  />
                  <label 
                    htmlFor="details" 
                    className="absolute left-0 top-0 font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-muted)] peer-focus:text-[var(--sky-gold)] transition-colors"
                  >
                    Project Details (Plot Size, Location)
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === "sending"}
                  className="w-full h-[52px] bg-[var(--sky-dark)] text-white font-[var(--font-body)] font-semibold text-[14px] tracking-[0.04em] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] transition-all duration-300 mt-4 disabled:opacity-50"
                >
                  {formState === "sending" ? "Sending..." : "Request Call Back"}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        {/* Info Column */}
        <Reveal delay={200}>
          <div className="lg:pl-20 mt-10 lg:mt-0 flex flex-col justify-start">
            <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[var(--sky-gold)] stroke-[0.75] opacity-[0.25] mb-12 mix-blend-multiply">
              <path d="M10 90H90" />
              <path d="M20 90V40" />
              <path d="M80 90V40" />
              <path d="M10 45L50 15L90 45" />
              <rect x="40" y="60" width="20" height="30" />
              <rect x="25" y="50" width="10" height="15" />
              <rect x="65" y="50" width="10" height="15" />
              <rect x="25" y="70" width="10" height="15" />
              <rect x="65" y="70" width="10" height="15" />
            </svg>

            <div className="flex flex-col gap-6">
              <div>
                <span className="font-[var(--font-body)] font-bold text-[13px] text-[var(--sky-gold)] uppercase tracking-wider block mb-1">Phone</span>
                <span className="font-[var(--font-body)] text-[16px] text-[var(--sky-text)]">+91 98765 43210</span>
              </div>
              <div>
                <span className="font-[var(--font-body)] font-bold text-[13px] text-[var(--sky-gold)] uppercase tracking-wider block mb-1">Email</span>
                <span className="font-[var(--font-body)] text-[16px] text-[var(--sky-text)]">info@skyhighstructures.in</span>
              </div>
              <div>
                <span className="font-[var(--font-body)] font-bold text-[13px] text-[var(--sky-gold)] uppercase tracking-wider block mb-1">Office</span>
                <span className="font-[var(--font-body)] text-[16px] text-[var(--sky-text)] leading-relaxed">
                  4th Floor, Skyline Tower<br />
                  RS Puram<br />
                  Coimbatore, TN 641002
                </span>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
