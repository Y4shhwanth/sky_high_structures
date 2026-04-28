import { EMAIL, PHONE_DISPLAY } from "@/lib/contact";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#portfolio" },
  { label: "About", href: "#about" },
];

const serviceLinks = [
  { label: "Luxury Villas", href: "#services" },
  { label: "Commercial", href: "#services" },
  { label: "Renovation", href: "#services" },
  { label: "Cost Estimator", href: "#estimator" },
];

const social = [
  { label: "LI", href: "https://linkedin.com" },
  { label: "FB", href: "https://facebook.com" },
  { label: "IG", href: "https://instagram.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--sky-dark)] py-16 md:py-20 px-6 md:px-[8vw] pb-8 md:pb-10 relative overflow-hidden">
      <div className="absolute bottom-[-40px] right-0 font-[var(--font-display)] font-light text-[120px] md:text-[220px] text-white opacity-[0.02] leading-none select-none pointer-events-none">
        {year}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-[60px] mb-10 md:mb-[60px] relative z-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-[var(--font-display)] font-semibold text-[28px] md:text-[32px] text-[var(--sky-gold)] mb-4 md:mb-6 tracking-tight">
            SKY HIGH
          </div>
          <p className="text-[14px] md:text-[15px] text-white/50 leading-[1.7] max-w-sm">
            Building generations of trust through uncompromising quality and architectural excellence in Coimbatore.
          </p>
          <p className="text-[12px] md:text-[13px] text-white/40 mt-4">
            {PHONE_DISPLAY} • {EMAIL}
          </p>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Services" links={serviceLinks} />

        <div>
          <h5 className="font-bold text-[12px] uppercase tracking-[0.12em] text-white/30 mb-6">Connect</h5>
          <div className="flex gap-4">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex flex-shrink-0 items-center justify-center border border-white/15 font-bold text-[11px] text-white hover:border-[var(--sky-gold)] hover:text-[var(--sky-gold)] transition-all"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10 mb-6 relative z-10" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] md:text-[13px] text-white/40 relative z-10">
        <span>© {year} Sky High Structures. All rights reserved.</span>
        <span>Made in Coimbatore</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h5 className="font-bold text-[12px] uppercase tracking-[0.12em] text-white/30 mb-5 md:mb-6">{title}</h5>
      <ul className="flex flex-col gap-2.5 md:gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-[14px] text-white/55 hover:text-[var(--sky-gold)] transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
