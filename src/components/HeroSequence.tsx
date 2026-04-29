"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DESKTOP_FRAMES = 192;
const MOBILE_FRAMES = 64;
const INITIAL_BATCH = 30;

const PROJECT_CARDS = [
  {
    id: 1,
    title: "Luxury Villa — ECR Seafront",
    subtitle: "Coimbatore · Completed 2024",
    tag: "Residential",
    img: "/frames/ezgif-frame-020.jpg",
  },
  {
    id: 2,
    title: "The Meridian Apartments",
    subtitle: "Saravanampatti · Completed 2023",
    tag: "Multi-Unit",
    img: "/frames/ezgif-frame-060.jpg",
  },
  {
    id: 3,
    title: "Azure Corporate Hub",
    subtitle: "Peelamedu · Completed 2024",
    tag: "Commercial",
    img: "/frames/ezgif-frame-100.jpg",
  },
  {
    id: 4,
    title: "Garden Terrace Estate",
    subtitle: "Kovai North · Ongoing",
    tag: "Premium Villa",
    img: "/frames/ezgif-frame-140.jpg",
  },
  {
    id: 5,
    title: "The Skyline Towers",
    subtitle: "RS Puram · Completed 2022",
    tag: "High-Rise",
    img: "/frames/ezgif-frame-170.jpg",
  },
];

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndexRef = useRef(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRequestedRef = useRef(false);

  const [loadedScale, setLoadedScale] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);

  const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
  const scrollHeight = isMobile ? "250vh" : "500vh";

  // Detect viewport + reduced motion
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mqMobile.matches);
      setIsReducedMotion(mqMotion.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  const getFramePath = useCallback(
    (index: number) => {
      const actualIndex = isMobile ? Math.min(DESKTOP_FRAMES, index * 3) : index;
      return `/frames/ezgif-frame-${String(actualIndex).padStart(3, "0")}.jpg`;
    },
    [isMobile]
  );

  // Preload frames
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFramePath(i + 1);
        const done = () => {
          if (cancelled) return resolve();
          loadedCount++;
          setLoadedScale(loadedCount / totalFrames);
          resolve();
        };
        img.onload = done;
        img.onerror = done;
        images[i] = img;
      });

    const initial = Array.from({ length: Math.min(INITIAL_BATCH, totalFrames) }, (_, i) => i);
    Promise.all(initial.map(loadOne)).then(() => {
      if (cancelled) return;
      imagesRef.current = images;
      setIsLoaded(true);
      requestAnimationFrame(() => drawFrame(1));

      const remaining = Array.from({ length: totalFrames }, (_, i) => i).slice(INITIAL_BATCH);
      const idle =
        (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 200));
      idle(() => remaining.forEach(loadOne));
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, getFramePath]);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index - 1];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * ratio) / 2;
    const y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isReducedMotion) return;
    const scrollTop = window.scrollY;
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    const index = Math.round(progress * (totalFrames - 1)) + 1;

    if (index !== frameIndexRef.current && !renderRequestedRef.current) {
      renderRequestedRef.current = true;
      requestAnimationFrame(() => {
        drawFrame(index);
        frameIndexRef.current = index;
        renderRequestedRef.current = false;
      });
    }
  }, [isReducedMotion, totalFrames, drawFrame]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reduced motion: auto-play
  useEffect(() => {
    if (isLoaded && isReducedMotion) {
      let current = 1;
      const interval = setInterval(() => {
        current++;
        if (current > totalFrames) { clearInterval(interval); return; }
        drawFrame(current);
        frameIndexRef.current = current;
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoaded, isReducedMotion, totalFrames, drawFrame]);

  // Card navigation
  const goCard = (dir: 1 | -1) => {
    setCardVisible(false);
    setTimeout(() => {
      setCardIndex((prev) => (prev + dir + PROJECT_CARDS.length) % PROJECT_CARDS.length);
      setCardVisible(true);
    }, 200);
  };

  const card = PROJECT_CARDS[cardIndex];

  return (
    <>
      {/* Loading screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] bg-[#0D1117] flex flex-col items-center justify-center px-6">
          <div
            className="text-white uppercase tracking-[0.2em] text-[11px] font-semibold mb-6"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Sky High Structures
          </div>
          <div className="w-[220px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-[width] duration-150 ease-linear"
              style={{ width: `${loadedScale * 100}%` }}
            />
          </div>
          <div className="mt-4 text-white/40 text-[11px] tracking-widest uppercase">
            Loading…
          </div>
        </div>
      )}

      <div ref={containerRef} id="hero" style={{ height: scrollHeight, position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Canvas — frame sequence */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 object-cover" />

          {/* Dark gradient overlay — ensures text legibility */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.15) 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
          />

          {/* ─── Main content layout ─── */}
          <div className="relative z-[3] h-full flex items-center px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-6 pb-16 lg:pb-24">

              {/* LEFT — Headline + sub */}
              <div className="flex-1 max-w-[560px]">
                {/* Eyebrow */}
                <p
                  className="text-white/60 uppercase tracking-[0.18em] text-[11px] sm:text-[12px] font-semibold mb-5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Coimbatore&apos;s Premier Builders
                </p>

                {/* Big headline */}
                <h1
                  className="text-white font-bold leading-[1.0] m-0"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(42px, 7vw, 80px)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  We Build<br />More Than<br />
                  <span style={{ color: "var(--sky-gold)" }}>Structures.</span>
                </h1>

                {/* Divider */}
                <div
                  className="my-6 sm:my-8"
                  style={{ width: 56, height: 3, background: "var(--sky-gold)", borderRadius: 2 }}
                />

                {/* Subtext */}
                <p
                  className="text-white/80 leading-relaxed m-0"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(14px, 1.4vw, 18px)",
                    maxWidth: 420,
                    textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  At Sky High Structures, we partner with families and businesses to
                  bring their ambitions to life — delivering homes and spaces that make
                  a lasting, meaningful difference.
                </p>

                {/* CTA */}
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-8 sm:mt-10 inline-flex items-center gap-3 text-white font-semibold uppercase tracking-[0.1em] text-[12px] sm:text-[13px] border border-white/40 hover:border-[var(--sky-gold)] hover:text-[var(--sky-gold)] transition-all duration-300 px-7 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Explore Our Work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* RIGHT — Project cards carousel */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                {/* Prev arrow */}
                <button
                  onClick={() => goCard(-1)}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 border border-white/20"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Card */}
                <div
                  className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: 290,
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {/* Card image */}
                  <div className="relative overflow-hidden" style={{ height: 180 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ transition: "transform 0.6s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    {/* Tag badge */}
                    <div
                      className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
                      style={{ background: "var(--sky-gold)", letterSpacing: "0.12em" }}
                    >
                      {card.tag}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 pt-4 pb-5">
                    <h3
                      className="m-0 leading-snug font-bold text-[var(--sky-dark)]"
                      style={{ fontFamily: "var(--font-body)", fontSize: 15 }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-1 m-0 text-[var(--sky-muted)]"
                      style={{ fontFamily: "var(--font-body)", fontSize: 12 }}
                    >
                      {card.subtitle}
                    </p>

                    {/* Dots + Arrow row */}
                    <div className="mt-4 flex items-center justify-between">
                      {/* Dots */}
                      <div className="flex items-center gap-[5px]">
                        {PROJECT_CARDS.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { setCardVisible(false); setTimeout(() => { setCardIndex(i); setCardVisible(true); }, 200); }}
                            aria-label={`Go to project ${i + 1}`}
                            style={{
                              width: i === cardIndex ? 20 : 6,
                              height: 6,
                              borderRadius: 4,
                              background: i === cardIndex ? "var(--sky-gold)" : "#D1CFC9",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              transition: "width 0.3s ease, background 0.3s ease",
                            }}
                          />
                        ))}
                      </div>

                      {/* Arrow button */}
                      <button
                        onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                        aria-label="View project"
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ background: "var(--sky-gold)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Next arrow */}
                <button
                  onClick={() => goCard(1)}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 border border-white/20"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 pointer-events-none">
            <span
              className="text-white/50 uppercase tracking-[0.14em]"
              style={{ fontFamily: "var(--font-body)", fontSize: 10 }}
            >
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-white/30 animate-bounce" />
          </div>

        </div>
      </div>
    </>
  );
}
