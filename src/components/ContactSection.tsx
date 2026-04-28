"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import { buildWhatsAppUrl, EMAIL, OFFICE_ADDRESS, PHONE_DISPLAY } from "@/lib/contact";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const details = String(fd.get("details") ?? "").trim();

    if (!name || !phone) {
      setFormState("error");
      setErrorMsg("Please fill in your name and phone number.");
      return;
    }

    const message =
      `Hi Sky High Structures, I'd like to get in touch.\n\n` +
      `Name: ${name}\nPhone: ${phone}\nProject: ${details || "—"}`;

    const win = window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    if (!win) {
      setFormState("error");
      setErrorMsg("Pop-up blocked. Please allow pop-ups, or message us directly on WhatsApp.");
      return;
    }
    setFormState("success");
  };

  return (
    <section id="contact" className="bg-[var(--sky-stone)] py-20 md:py-[120px] px-6 md:px-[8vw]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <Reveal>
          <div>
            <h3 className="font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
              Get In Touch
            </h3>
            <h2 className="font-[var(--font-display)] italic font-semibold text-[clamp(40px,7vw,64px)] text-[var(--sky-text)] leading-[1.0] mb-10 md:mb-12">
              Let&apos;s Build It.
            </h2>

            {formState === "success" ? (
              <div className="bg-[var(--sky-bg)] p-6 md:p-8 border border-[var(--sky-gold)]">
                <p className="font-[var(--font-display)] italic text-[20px] md:text-[24px] text-[var(--sky-text)] mb-4">
                  Thanks — your inquiry has been queued in WhatsApp.
                </p>
                <p className="text-[14px] text-[var(--sky-muted)] mb-6">
                  If the WhatsApp tab didn&apos;t open, tap the button below.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="text-[12px] uppercase tracking-[0.12em] font-bold text-[var(--sky-gold)] hover:text-[var(--sky-dark)] transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10" noValidate>
                <Field id="name" type="text" label="Full Name *" required />
                <Field id="phone" type="tel" label="Phone Number *" required inputMode="tel" pattern="[0-9+\s\-]{6,}" />
                <Field id="details" type="text" label="Project Details (Plot Size, Location)" />

                {formState === "error" && (
                  <p role="alert" className="text-[13px] text-red-600 -mt-4">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full h-[52px] bg-[var(--sky-dark)] text-white font-semibold text-[14px] tracking-[0.04em] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] transition-all duration-300 mt-2 disabled:opacity-50"
                >
                  {formState === "sending" ? "Opening WhatsApp…" : "Send via WhatsApp"}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="lg:pl-20 mt-4 lg:mt-0 flex flex-col justify-start">
            <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[var(--sky-gold)] stroke-[0.75] opacity-25 mb-10 mix-blend-multiply hidden md:block md:w-[200px] md:h-[200px]">
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
              <Info label="Phone" value={PHONE_DISPLAY} />
              <Info label="Email" value={EMAIL} />
              <Info label="Office" value={OFFICE_ADDRESS} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  type,
  label,
  required,
  inputMode,
  pattern,
}: {
  id: string;
  type: "text" | "tel" | "email";
  label: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
}) {
  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        inputMode={inputMode}
        pattern={pattern}
        className="peer w-full bg-transparent border-0 border-b border-[var(--sky-text)]/20 pb-3 text-[16px] text-[var(--sky-text)] outline-none focus:border-[var(--sky-gold)] transition-colors placeholder-transparent pt-6"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-muted)] peer-focus:text-[var(--sky-gold)] transition-colors"
      >
        {label}
      </label>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-bold text-[13px] text-[var(--sky-gold)] uppercase tracking-wider block mb-1">{label}</span>
      <span className="text-[15px] md:text-[16px] text-[var(--sky-text)] leading-relaxed whitespace-pre-line">{value}</span>
    </div>
  );
}
