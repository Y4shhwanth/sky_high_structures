"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
  { value: 150, suffix: "+", label: "Projects Completed" },
  { value: 12, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Team Members" },
];

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Wait for heroHoldComplete event to unlock visibility
    const onHeroHold = () => {
      setIsVisible(true);
    };
    window.addEventListener("heroHoldComplete", onHeroHold);

    // Intersection observer for count up animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isVisible && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountUp();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("heroHoldComplete", onHeroHold);
      observer.disconnect();
    };
  }, [isVisible]);

  const startCountUp = () => {
    const duration = 2000;
    const startObj = performance.now();

    const animate = (time: number) => {
      let progress = (time - startObj) / duration;
      if (progress > 1) progress = 1;

      const easeProgress = easeOutExpo(progress);

      statsData.forEach((stat, i) => {
        const span = document.getElementById(`stat-value-${i}`);
        if (span) {
          const currentVal = Math.floor(easeProgress * stat.value);
          span.innerText = currentVal.toString();
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section
      ref={containerRef}
      className={`bg-[var(--sky-dark)] py-[72px] px-[8vw] transition-opacity duration-800 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center md:items-start relative ${
              i !== 3 ? "md:border-r md:border-[rgba(201,168,76,0.15)] md:pr-10" : "md:pl-10"
            } ${i !== 0 && i !== 3 ? "md:px-10" : ""}`}
          >
            <div className="flex items-baseline text-[var(--sky-gold)] font-[var(--font-display)]">
              <span
                id={`stat-value-${i}`}
                className="font-medium text-[clamp(56px,7vw,88px)] leading-[0.9]"
              >
                0
              </span>
              <span className="text-[40px] pl-1 font-medium">{stat.suffix}</span>
            </div>
            <span className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.15em] text-[var(--sky-muted)] mt-2 text-center md:text-left">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
