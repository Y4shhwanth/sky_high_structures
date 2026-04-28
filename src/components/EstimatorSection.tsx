"use client";
import { useState, useMemo } from "react";
import Reveal from "./Reveal";

export default function EstimatorSection() {
  const [area, setArea] = useState(1500);
  const [floors, setFloors] = useState<1 | 2 | 3>(1);
  const [quality, setQuality] = useState<"standard" | "premium" | "luxury">("premium");

  const estimatedRange = useMemo(() => {
    const rates = { standard: 1800, premium: 2400, luxury: 3200 };
    const multipliers = { 1: 1.0, 2: 1.85, 3: 2.65 };

    const baseCost = area * rates[quality] * multipliers[floors];
    const minLakhs = ((baseCost * 0.9) / 100000).toFixed(1);
    const maxLakhs = ((baseCost * 1.1) / 100000).toFixed(1);

    return `₹ ${minLakhs} – ${maxLakhs} Lakhs`;
  }, [area, floors, quality]);

  return (
    <section id="estimator" className="bg-[var(--sky-bg)] py-20 md:py-[120px] px-6 md:px-[8vw]">
      <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
        Live Estimator
      </h3>
      <h2 className="font-[var(--font-display)] text-[clamp(40px,5vw,52px)] text-[var(--sky-text)] leading-tight max-w-2xl">
        How Much Will Your Dream Home Cost?
      </h2>

      <Reveal>
        <div className="bg-[var(--sky-surface)] border-t-2 border-[var(--sky-gold)] mt-16 grid grid-cols-1 lg:grid-cols-2 shadow-sm">
          {/* left variables */}
          <div className="p-8 md:p-[60px] flex flex-col gap-10">
            
            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="font-[var(--font-body)] font-semibold text-[15px] text-[var(--sky-text)]">
                  Built-up Area
                </span>
                <span className="font-[var(--font-display)] italic text-[22px] text-[var(--sky-gold)] font-bold">
                  {area} sq.ft
                </span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100" 
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-1 bg-[rgba(201,168,76,0.3)] appearance-none outline-none accent-[var(--sky-gold)]"
              />
            </div>

            <div>
              <span className="block font-[var(--font-body)] font-semibold text-[15px] text-[var(--sky-text)] mb-4">
                Elevation / Floors
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { val: 1, label: "Ground Floor" },
                  { val: 2, label: "G + 1" },
                  { val: 3, label: "G + 2" }
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => setFloors(f.val as 1|2|3)}
                    className={`px-5 py-3 font-[var(--font-body)] font-semibold text-[13px] border ${
                      floors === f.val
                        ? "bg-[var(--sky-dark)] text-white border-[var(--sky-dark)]"
                        : "bg-transparent text-[var(--sky-text)] border-black/10 hover:border-[var(--sky-gold)]"
                    } transition-colors`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block font-[var(--font-body)] font-semibold text-[15px] text-[var(--sky-text)] mb-4">
                Finish Quality
              </span>
              <div className="flex flex-wrap gap-3">
                {(["standard", "premium", "luxury"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-5 py-3 font-[var(--font-body)] font-semibold text-[13px] border capitalize ${
                      quality === q
                        ? "bg-[var(--sky-dark)] text-white border-[var(--sky-dark)]"
                        : "bg-transparent text-[var(--sky-text)] border-black/10 hover:border-[var(--sky-gold)]"
                    } transition-colors`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* right result */}
          <div className="bg-[var(--sky-dark)] p-8 md:p-[60px] flex flex-col justify-center">
            <span className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.15em] text-[var(--sky-muted)] mb-4 block">
              Estimated Range
            </span>
            <div className="font-[var(--font-display)] font-medium text-[clamp(40px,5vw,64px)] text-[var(--sky-gold)] mb-3 leading-tight tracking-tight">
              {estimatedRange}
            </div>
            <p className="font-[var(--font-body)] text-[13px] text-white/40 mb-10 leading-relaxed max-w-sm">
              * This is an approximate bare-shell to finish estimate excluding land cost, registration, and bespoke luxury interior add-ons. ± 10% variance expected.
            </p>
            <a
              href="#contact"
              className="w-full text-center px-[26px] py-[15px] border border-white/20 text-white font-[var(--font-body)] font-semibold text-[14px] hover:bg-white hover:text-[var(--sky-dark)] transition-colors"
            >
              Get Exact Quote →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
