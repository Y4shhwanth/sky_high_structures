"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const projects = [
  { name: "Royal Serenity Villa", loc: "Saravanampatti", img: "villa1" },
  { name: "Tech Hub", loc: "Peelamedu", img: "tech1" },
  { name: "Modern Retreat", loc: "Vadavalli", img: "retreat1" },
  { name: "Skyline Apartments", loc: "RS Puram", img: "apt1" },
  { name: "Facade Renovation", loc: "Ganapathy", img: "reno1" },
];

export default function PortfolioSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onPointerUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="portfolio" className="bg-[var(--sky-surface)] pt-[120px] overflow-hidden">
      <div className="px-[8vw] mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
            Our Work
          </h3>
          <h2 className="font-[var(--font-display)] text-[clamp(40px,5vw,52px)] text-[var(--sky-text)] leading-none">
            A Glimpse Into Recent Triumphs
          </h2>
        </div>
        <div className="flex gap-4">
          {["All", "Residential", "Commercial"].map((filter, i) => (
            <button
              key={filter}
              className={`px-4 py-2 border font-[var(--font-body)] font-semibold text-[13px] rounded-none transition-colors ${
                i === 0
                  ? "bg-[var(--sky-dark)] text-white border-[var(--sky-dark)]"
                  : "border-[var(--sky-text)] text-[var(--sky-text)] hover:bg-[var(--sky-dark)] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Drag Track */}
      <div
        ref={scrollRef}
        className={`pl-[8vw] overflow-x-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUpOrLeave}
        onPointerLeave={onPointerUpOrLeave}
      >
        <div className="flex gap-7 w-max pr-[8vw] pb-[120px]">
          {projects.map((proj, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative w-[360px] h-[520px] flex-shrink-0 overflow-hidden group select-none">
                <Image
                  src={`https://picsum.photos/seed/${proj.img}/800/1200`}
                  alt={proj.name}
                  fill
                  sizes="360px"
                  className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[8000ms] ease-out pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-dark)]/90 via-[var(--sky-dark)]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 var(--ease-arch) flex flex-col justify-end p-7">
                  <span className="absolute top-7 right-7 text-white text-[20px]">→</span>
                  <h4 className="font-[var(--font-display)] italic font-semibold text-[24px] text-white">
                    {proj.name}
                  </h4>
                  <p className="font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.12em] text-[var(--sky-gold)] mt-1">
                    {proj.loc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
