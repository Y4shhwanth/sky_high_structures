"use client";

import { useEffect, useRef } from "react";
import { Home, Castle, Hammer, HardHat, Paintbrush, Building2 } from "lucide-react";

const services = [
  { title: "New Home Construction", desc: "Turnkey residential solutions from foundation to finish.", icon: Home },
  { title: "Luxury Villas", desc: "Bespoke architectural masterpieces built for generations.", icon: Castle },
  { title: "Renovation & Remodelling", desc: "Transforming existing spaces with modern aesthetics.", icon: Hammer },
  { title: "Structural Consulting", desc: "Expert engineering analysis and safety compliances.", icon: HardHat },
  { title: "Interior Finishing", desc: "Premium materials and flawless interior execution.", icon: Paintbrush },
  { title: "Commercial Buildings", desc: "Scalable commercial spaces built for business growth.", icon: Building2 },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = containerRef.current?.querySelectorAll(".service-card");
            cards?.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 80);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-[var(--sky-bg)] py-[120px] px-[8vw]" ref={containerRef}>
      <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
        What We Build
      </h3>
      <h2 className="font-[var(--font-display)] font-medium text-[clamp(38px,4vw,56px)] text-[var(--sky-text)] leading-[1.15]">
        Mastercraftsmen Building Coimbatore's Future
      </h2>
      <p className="font-[var(--font-body)] text-[17px] text-[var(--sky-muted)] leading-[1.75] mt-4 mb-16 max-w-2xl">
        From foundation to finish, we bring unwavering quality and meticulous attention to detail to every square foot.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc, i) => (
          <div
            key={i}
            style={{ transform: "translateY(24px)", transition: "transform 0.6s var(--ease-arch), background-color 0.4s" }}
            className="service-card group cursor-pointer bg-[var(--sky-surface)] p-10 border-t-2 border-[var(--sky-gold)] hover:bg-[var(--sky-dark)]"
          >
            <svc.icon className="w-10 h-10 stroke-[var(--sky-gold)] stroke-[1.5] fill-none transition-colors group-hover:stroke-white" />
            <h4 className="font-[var(--font-display)] font-semibold text-[26px] text-[var(--sky-text)] mt-6 mb-3 transition-colors group-hover:text-white">
              {svc.title}
            </h4>
            <p className="font-[var(--font-body)] text-[15px] text-[var(--sky-muted)] mb-8 transition-colors group-hover:text-white/70">
              {svc.desc}
            </p>
            <div className="flex items-center font-[var(--font-body)] font-semibold text-[13px] text-[var(--sky-gold)]">
              <span className="group-hover:translate-x-1.5 transition-transform">Learn More →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
