"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Team Members" },
];

const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isVisibleRef = useRef(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const onHeroHold = () => setIsVisible(true);
    window.addEventListener("heroHoldComplete", onHeroHold);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isVisibleRef.current && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountUp();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("heroHoldComplete", onHeroHold);
      observer.disconnect();
    };
  }, []);

  const startCountUp = () => {
    const duration = 2000;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const eased = easeOutExpo(progress);

      statsData.forEach((stat, i) => {
        const span = valueRefs.current[i];
        if (span) span.textContent = String(Math.floor(eased * stat.value));
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <section
      ref={containerRef}
      className={`bg-[var(--sky-dark)] py-16 md:py-[72px] px-6 md:px-[8vw] transition-opacity duration-[800ms] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-0">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center md:items-start relative ${
              i !== 3 ? "md:border-r md:border-[rgba(201,168,76,0.15)] md:pr-10" : "md:pl-10"
            } ${i !== 0 && i !== 3 ? "md:px-10" : ""}`}
          >
            <div className="flex items-baseline text-[var(--sky-gold)] font-[var(--font-display)]">
              <span
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
                className="font-medium text-[clamp(44px,9vw,88px)] leading-[0.9]"
              >
                0
              </span>
              <span className="text-[28px] md:text-[40px] pl-1 font-medium">{stat.suffix}</span>
            </div>
            <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[var(--sky-muted)] mt-2 text-center md:text-left">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
