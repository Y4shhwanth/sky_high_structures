"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

type Category = "All" | "Residential" | "Commercial";

const projects: { name: string; loc: string; img: string; category: Category }[] = [
  { name: "Royal Serenity Villa", loc: "Saravanampatti", img: "villa1", category: "Residential" },
  { name: "Tech Hub", loc: "Peelamedu", img: "tech1", category: "Commercial" },
  { name: "Modern Retreat", loc: "Vadavalli", img: "retreat1", category: "Residential" },
  { name: "Skyline Apartments", loc: "RS Puram", img: "apt1", category: "Residential" },
  { name: "Facade Renovation", loc: "Ganapathy", img: "reno1", category: "Commercial" },
];

const filters: Category[] = ["All", "Residential", "Commercial"];

export default function PortfolioSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Category>("All");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setIsDragging(false);

  return (
    <section id="portfolio" className="bg-[var(--sky-surface)] pt-20 md:pt-[120px] overflow-hidden">
      <div className="px-6 md:px-[8vw] mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
            Our Work
          </h3>
          <h2 className="font-[var(--font-display)] text-[clamp(32px,6vw,52px)] text-[var(--sky-text)] leading-tight">
            A Glimpse Into Recent Triumphs
          </h2>
        </div>
        <div className="flex gap-3 md:gap-4 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`px-4 py-2 border font-semibold text-[12px] md:text-[13px] rounded-none transition-colors ${
                active === f
                  ? "bg-[var(--sky-dark)] text-white border-[var(--sky-dark)]"
                  : "border-[var(--sky-text)] text-[var(--sky-text)] hover:bg-[var(--sky-dark)] hover:text-white"
              }`}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`pl-6 md:pl-[8vw] overflow-x-auto md:overflow-x-hidden scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "md:cursor-grab"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
      >
        <div className="flex gap-5 md:gap-7 w-max pr-6 md:pr-[8vw] pb-20 md:pb-[120px]">
          {visible.length === 0 ? (
            <p className="text-[var(--sky-muted)] py-20">No projects in this category yet.</p>
          ) : (
            visible.map((proj, i) => (
              <Reveal key={`${proj.img}-${active}`} delay={i * 100}>
                <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[420px] sm:h-[480px] md:h-[520px] flex-shrink-0 overflow-hidden group select-none">
                  <Image
                    src={`https://picsum.photos/seed/${proj.img}/800/1200`}
                    alt={proj.name}
                    fill
                    sizes="(max-width: 768px) 280px, 360px"
                    className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[8000ms] ease-out pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-dark)]/90 via-[var(--sky-dark)]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col justify-end p-5 md:p-7">
                    <span className="absolute top-5 right-5 md:top-7 md:right-7 text-white text-[20px]">→</span>
                    <h4 className="font-[var(--font-display)] italic font-semibold text-[20px] md:text-[24px] text-white">
                      {proj.name}
                    </h4>
                    <p className="font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-gold)] mt-1">
                      {proj.loc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
