"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const DESKTOP_FRAMES = 240;
const MOBILE_FRAMES = 80;
const INITIAL_BATCH = 30;

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const textBlockRef = useRef<HTMLDivElement>(null);
  const revealingLabelRef = useRef<HTMLDivElement>(null);
  const backgroundOverlayRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const debrisContainerRef = useRef<HTMLDivElement>(null);

  const [loadedScale, setLoadedScale] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const frameIndexRef = useRef(1);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRequestedRef = useRef(false);

  const totalFrames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
  const scrollHeight = isMobile ? "300vh" : "600vh";

  // Detect viewport + reduced motion (client-only)
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

  // Preload — initial batch eager, rest deferred to idle
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
      startEntryAnimation();

      // Defer rest
      const remaining = Array.from({ length: totalFrames }, (_, i) => i).slice(INITIAL_BATCH);
      const idle =
        (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 200));
      idle(() => {
        remaining.forEach(loadOne);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [totalFrames, getFramePath]);

  // Debris
  useEffect(() => {
    if (!debrisContainerRef.current) return;
    const container = debrisContainerRef.current;
    container.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      const d = document.createElement("div");
      d.style.position = "absolute";
      d.style.width = `${Math.random() * 8 + 4}px`;
      d.style.height = `${Math.random() * 12 + 6}px`;
      d.style.backgroundColor = Math.random() > 0.5 ? "#F5F5F5" : "#D3CDBF";
      d.style.left = `${45 + Math.random() * 10}%`;
      d.style.top = `${45 + Math.random() * 10}%`;
      d.style.opacity = "0";
      d.style.transform = `scale(${Math.random() + 0.5})`;
      d.style.willChange = "transform, opacity";
      d.dataset.vx = String((Math.random() - 0.5) * 800);
      d.dataset.vy = String((Math.random() - 1.0) * 800);
      container.appendChild(d);
    }
  }, []);

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

  const updateParallaxLayers = useCallback((actualIndex: number) => {
    if (backgroundOverlayRef.current) {
      const opacity = actualIndex > 120 ? Math.min(0.4, ((actualIndex - 120) / 40) * 0.4) : 0;
      backgroundOverlayRef.current.style.opacity = opacity.toString();
    }

    if (textBlockRef.current) {
      const opacity = actualIndex > 50 ? Math.max(0, 1 - (actualIndex - 50) / 20) : 1;
      textBlockRef.current.style.opacity = opacity.toString();
      textBlockRef.current.style.pointerEvents = opacity > 0 ? "auto" : "none";
    }

    if (revealingLabelRef.current) {
      let opacity = 0;
      let translateY = 40;
      if (actualIndex >= 100 && actualIndex <= 150) {
        const p = (actualIndex - 100) / 50;
        opacity = p;
        translateY = 40 - p * 40;
      } else if (actualIndex > 150) {
        opacity = 1;
        translateY = 0;
      }
      revealingLabelRef.current.style.opacity = opacity.toString();
      revealingLabelRef.current.style.transform = `translateY(${translateY}px)`;
    }

    if (debrisContainerRef.current) {
      const explosionProgress = Math.max(0, Math.min(1, (actualIndex - 30) / 60));
      let globalOpacity = 0;
      if (actualIndex >= 30 && actualIndex <= 90) globalOpacity = Math.sin(explosionProgress * Math.PI);

      const items = debrisContainerRef.current.children;
      for (let i = 0; i < items.length; i++) {
        const el = items[i] as HTMLElement;
        const vx = parseFloat(el.dataset.vx || "0");
        const vy = parseFloat(el.dataset.vy || "0");
        el.style.transform = `translate(${vx * explosionProgress}px, ${vy * explosionProgress}px)`;
        el.style.opacity = globalOpacity.toString();
      }
    }

    if (ctaBtnRef.current) {
      ctaBtnRef.current.classList.toggle("pulse-glow", actualIndex === 240);
    }

    if (actualIndex === 70) window.dispatchEvent(new CustomEvent("heroExplodeComplete"));
    if (actualIndex === 150) window.dispatchEvent(new CustomEvent("heroCutawayComplete"));
    if (actualIndex === 240) window.dispatchEvent(new CustomEvent("heroHoldComplete"));
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
        updateParallaxLayers(isMobile ? index * 3 : index);
        renderRequestedRef.current = false;
      });
    }
  }, [isReducedMotion, totalFrames, isMobile, drawFrame, updateParallaxLayers]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isLoaded && isReducedMotion) {
      let current = 1;
      const interval = setInterval(() => {
        current++;
        if (current > totalFrames) {
          clearInterval(interval);
          return;
        }
        drawFrame(current);
        frameIndexRef.current = current;
        updateParallaxLayers(isMobile ? current * 3 : current);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoaded, isReducedMotion, totalFrames, isMobile, drawFrame, updateParallaxLayers]);

  const startEntryAnimation = () => {
    requestAnimationFrame(() => {
      drawFrame(1);
      updateParallaxLayers(1);
    });

    setTimeout(() => {
      const eyebrow = document.querySelector(".eyebrow-anim") as HTMLElement | null;
      const lines = document.querySelectorAll(".headline-line");
      const hr = document.querySelector(".gold-hr") as HTMLElement | null;

      if (eyebrow) eyebrow.style.letterSpacing = "0.15em";
      lines.forEach((l, i) => {
        setTimeout(() => {
          (l as HTMLElement).style.opacity = "1";
          (l as HTMLElement).style.transform = "translateY(0)";
        }, i * 150 + 200);
      });
      if (hr) {
        setTimeout(() => {
          hr.style.width = "75%";
        }, 800);
      }
    }, 200);
  };

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-6">
          <div className="uppercase tracking-[0.15em] text-[12px] sm:text-[14px] font-bold mb-5 text-center">
            Loading Architecture sequence
          </div>
          <div className="w-full max-w-[300px] h-[2px] bg-[#E5E5E5]">
            <div
              className="h-full bg-[var(--sky-dark)] transition-[width] duration-100 ease-linear"
              style={{ width: `${loadedScale * 100}%` }}
            />
          </div>
        </div>
      )}

      <div ref={containerRef} id="hero" style={{ height: scrollHeight, position: "relative" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-white">
          <canvas ref={canvasRef} className="absolute inset-0 w-screen h-screen z-0" />

          <div
            ref={backgroundOverlayRef}
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))", opacity: 0, willChange: "opacity" }}
          />

          <div ref={debrisContainerRef} className="absolute inset-0 z-[2] pointer-events-none" />

          {/* Hero text */}
          <div
            ref={textBlockRef}
            className="absolute top-1/2 left-6 right-6 sm:left-[8vw] sm:right-auto -translate-y-1/2 z-[3] sm:max-w-[600px]"
            style={{ pointerEvents: "none", willChange: "opacity" }}
          >
            <div className="eyebrow-anim text-[10px] sm:text-[12px] uppercase font-bold text-[var(--sky-dark)] mb-4 sm:mb-5">
              COIMBATORE&apos;S PREMIER BUILDERS
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="hero-font headline-line m-0 leading-[0.95] text-[var(--sky-dark)] font-light italic text-[clamp(36px,9vw,72px)]">
                We Don&apos;t Just
              </h1>
              <h1 className="hero-font headline-line m-0 leading-[0.95] text-[var(--sky-dark)] font-semibold text-[clamp(36px,9vw,72px)]">
                Build Walls.
              </h1>
              <h1 className="hero-font headline-line m-0 leading-[0.95] text-[var(--sky-gold)] font-light italic text-[clamp(36px,9vw,72px)]">
                We Build Legacies.
              </h1>
            </div>

            <div className="gold-hr h-px bg-[var(--sky-gold)] my-8 sm:my-10" />

            <p className="headline-line m-0 text-[14px] sm:text-[18px] text-[var(--sky-text)]">
              12 years. 150 homes. Zero compromises.
            </p>
          </div>

          {/* Revealing label — desktop only, would crowd mobile hero */}
          <div
            ref={revealingLabelRef}
            className="hidden md:flex absolute top-[25%] right-[15%] z-[4] items-center gap-4 opacity-0 pointer-events-none"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="w-10 h-px bg-[var(--sky-gold)]" />
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[var(--sky-gold)]">
              Revealing Interior
            </span>
          </div>

          {/* CTA */}
          <button
            ref={ctaBtnRef}
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="absolute bottom-[12%] left-6 right-6 sm:left-[8vw] sm:right-auto z-[5] py-4 sm:py-5 px-6 sm:px-10 bg-[var(--sky-dark)] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] text-white text-[12px] sm:text-[14px] font-bold tracking-[0.1em] uppercase transition-colors"
          >
            Explore Our Work →
          </button>

          {/* Scroll hint */}
          <div className="hidden sm:flex absolute bottom-[10%] left-1/2 -translate-x-1/2 z-[6] flex-col items-center">
            <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--sky-dark)] opacity-70">↓ Scroll to reveal</span>
          </div>
        </div>
      </div>
    </>
  );
}
