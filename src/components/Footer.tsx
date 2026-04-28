export default function Footer() {
  return (
    <footer className="bg-[var(--sky-dark)] py-20 px-[8vw] pb-10 relative overflow-hidden">
      <div className="absolute bottom-[-40px] right-0 font-[var(--font-display)] font-light text-[220px] text-white opacity-[0.02] leading-none select-none pointer-events-none">
        1912
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-[60px] mb-[60px] relative z-10">
        
        {/* Brand */}
        <div>
          <div className="font-[var(--font-display)] font-semibold text-[32px] text-[var(--sky-gold)] mb-6 tracking-tight">
            SKY HIGH
          </div>
          <p className="font-[var(--font-body)] text-[15px] text-white/50 leading-[1.7] max-w-sm">
            Building generations of trust through uncompromising quality and architectural excellence in Coimbatore.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-[var(--font-body)] font-bold text-[12px] uppercase tracking-[0.12em] text-white/30 mb-6">
            Quick Links
          </h5>
          <ul className="flex flex-col gap-3">
            {["Home", "Services", "Our Work", "About"].map((l) => (
              <li key={l}>
                <a href="#" className="font-[var(--font-body)] text-[14px] text-white/55 hover:text-[var(--sky-gold)] transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 className="font-[var(--font-body)] font-bold text-[12px] uppercase tracking-[0.12em] text-white/30 mb-6">
            Services
          </h5>
          <ul className="flex flex-col gap-3">
            {["Luxury Villas", "Commercial", "Renovation", "Cost Estimator"].map((l) => (
              <li key={l}>
                <a href="#" className="font-[var(--font-body)] text-[14px] text-white/55 hover:text-[var(--sky-gold)] transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h5 className="font-[var(--font-body)] font-bold text-[12px] uppercase tracking-[0.12em] text-white/30 mb-6">
            Connect
          </h5>
          <div className="flex gap-4">
            {["LI", "FB", "IG"].map((s) => (
              <a 
                key={s} 
                href="#"
                className="w-8 h-8 flex flex-shrink-0 items-center justify-center border border-white/15 font-[var(--font-body)] font-bold text-[11px] text-white hover:border-[var(--sky-gold)] hover:text-[var(--sky-gold)] transition-all"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="h-[1px] w-full bg-white/10 mb-6 relative z-10" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-[var(--font-body)] text-[13px] text-white/40 relative z-10">
        <span>© 2026 Sky High Structures. All rights reserved.</span>
        <span>Made in Coimbatore</span>
      </div>
    </footer>
  );
}
