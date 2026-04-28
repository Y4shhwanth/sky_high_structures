"use client";

import { useEffect, useRef } from "react";

const steps = [
  { id: "01", title: "Site Visit & Assessment", body: "Detailed land survey, soil testing, and environmental analysis before drafting." },
  { id: "02", title: "Design & Approvals", body: "Architectural blueprints, 3D renderings, and securing all DTCP/local approvals." },
  { id: "03", title: "Construction & QC", body: "Execution by master builders with rigorous 50-point quality checks globally." },
  { id: "04", title: "Handover & Warranty", body: "Final deep clean, key handover ceremony, and our 10-year structural warranty." },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate connector line
            if (lineRef.current) {
              lineRef.current.style.clipPath = "inset(0 0% 0 0)";
            }
            
            // Animate step blocks
            const blocks = containerRef.current?.querySelectorAll(".process-step");
            blocks?.forEach((block, i) => {
              setTimeout(() => {
                (block as HTMLElement).style.transform = "translateX(0)";
                (block as HTMLElement).style.opacity = "1";
              }, i * 120);
            });
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="bg-[var(--sky-dark)] py-20 md:py-[120px] px-6 md:px-[8vw]" ref={containerRef}>
      <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
        The Process
      </h3>
      <h2 className="font-[var(--font-display)] font-light italic text-[clamp(32px,6vw,52px)] text-white leading-tight mb-12 md:mb-20">
        From Blueprint to Handover
      </h2>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
        {/* Horizontal Timeline Connector (Desktop) */}
        <div 
          ref={lineRef}
          className="hidden md:block absolute h-[1px] bg-[var(--sky-gold)] top-[36px] left-[12.5%] w-[75%]"
          style={{ clipPath: "inset(0 100% 0 0)", transition: "clip-path 1.2s var(--ease-arch)" }}
        />

        {steps.map((step, i) => (
          <div
            key={i}
            className="process-step relative flex flex-col pt-8 md:pt-0"
            style={{ transform: "translateX(-20px)", opacity: 0, transition: "transform 0.6s var(--ease-arch), opacity 0.6s" }}
          >
            <div className="font-[var(--font-display)] font-medium text-[72px] text-[var(--sky-gold)] opacity-[0.12] absolute top-[-20px] md:top-0 left-0 leading-none select-none">
              {step.id}
            </div>
            <h4 className="font-[var(--font-display)] font-semibold text-[22px] text-white mt-14 mb-3 relative z-10">
              {step.title}
            </h4>
            <p className="font-[var(--font-body)] text-[15px] text-white/60 leading-[1.65] relative z-10 max-w-[85%]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
