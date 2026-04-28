"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Head from "next/head";

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // UI Layer Refs
  const textBlockRef = useRef<HTMLDivElement>(null);
  const revealingLabelRef = useRef<HTMLDivElement>(null);
  const backgroundOverlayRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const debrisContainerRef = useRef<HTMLDivElement>(null);

  // State
  const [loadedScale, setLoadedScale] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [frameIndex, setFrameIndex] = useState(1);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  const totalFrames = isMobile ? 80 : 240;
  const scrollHeight = isMobile ? "300vh" : "600vh";
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRequestedRef = useRef(false);

  // Frame path formatter
  const getFramePath = (index: number) => {
    // If mobile (skip every 3 frames), we stretch the index
    const actualIndex = isMobile ? Math.min(240, index * 3) : index;
    const formatted = String(actualIndex).padStart(3, "0");
    return `/frames/ezgif-frame-${formatted}.jpg`;
  };

  useEffect(() => {
    // 1. Preload Images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadedScale(loadedCount / totalFrames);
        if (loadedCount === totalFrames) {
          imagesRef.current = images;
          setIsLoaded(true);
          startEntryAnimation();
        }
      };
      // In case of error (prevents getting stuck)
      img.onerror = () => {
        loadedCount++;
        setLoadedScale(loadedCount / totalFrames);
        if (loadedCount === totalFrames) {
            imagesRef.current = images;
            setIsLoaded(true);
            startEntryAnimation();
        }
      };
      images.push(img);
    }
  }, [totalFrames]);

  // Create Debris Elements once
  useEffect(() => {
    if (!debrisContainerRef.current) return;
    const container = debrisContainerRef.current;
    container.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const debris = document.createElement("div");
      debris.style.position = "absolute";
      debris.style.width = `${Math.random() * 8 + 4}px`;
      debris.style.height = `${Math.random() * 12 + 6}px`;
      debris.style.backgroundColor = Math.random() > 0.5 ? "#F5F5F5" : "#D3CDBF"; // stone colors
      debris.style.left = `${45 + Math.random() * 10}%`;
      debris.style.top = `${45 + Math.random() * 10}%`;
      debris.style.opacity = "0";
      debris.style.transform = `scale(${Math.random() + 0.5})`;
      debris.style.willChange = "transform, opacity";
      
      // Assign custom vector properties for the scroll explosion
      debris.dataset.vx = String((Math.random() - 0.5) * 800);
      debris.dataset.vy = String((Math.random() - 1.0) * 800);
      
      container.appendChild(debris);
    }
  }, []);

  const drawFrame = useCallback((index: number) => {
    if (!canvasRef.current || !imagesRef.current[index - 1]) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    const img = imagesRef.current[index - 1];
    
    // Simulate object-fit: cover manually within canvas
    const canvas = canvasRef.current;
    
    // Resize canvas internal resolution to match screen for max crispness
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
    }

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                  centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  }, []);

  // Update Layers based on actual frame progress (1 to 240)
  const updateParallaxLayers = useCallback((actualIndex: number) => {
    // Note: actualIndex represents the full 240-frame sequence equivalent.
    // If mobile (80 frames), we still evaluate based on the 1-240 logic structure 
    // by mapping scaledIndex * 3.
    
    // Background parallax overlay fades in after 120
    if (backgroundOverlayRef.current) {
        let opacity = 0;
        if (actualIndex > 120) opacity = Math.min(0.4, (actualIndex - 120) / 40 * 0.4);
        backgroundOverlayRef.current.style.opacity = opacity.toString();
    }

    // Hero Text Block fades out by 70
    if (textBlockRef.current) {
        let opacity = 1;
        if (actualIndex > 50) opacity = Math.max(0, 1 - (actualIndex - 50) / 20);
        textBlockRef.current.style.opacity = opacity.toString();
        textBlockRef.current.style.pointerEvents = opacity > 0 ? "auto" : "none";
    }

    // Revealing Interior Label
    if (revealingLabelRef.current) {
        let opacity = 0;
        let translateY = 40;
        if (actualIndex >= 100 && actualIndex <= 150) {
            const progress = (actualIndex - 100) / 50;
            opacity = progress;
            translateY = 40 - (progress * 40);
        } else if (actualIndex > 150) {
            opacity = 1;
            translateY = 0;
        }
        revealingLabelRef.current.style.opacity = opacity.toString();
        revealingLabelRef.current.style.transform = `translateY(${translateY}px)`;
    }

    // Debris
    if (debrisContainerRef.current) {
        const explosionProgress = Math.max(0, Math.min(1, (actualIndex - 30) / 60)); // Peak from 30-90
        const items = debrisContainerRef.current.children;
        
        let globalOpacity = 0;
        if (actualIndex >= 30 && actualIndex <= 90) {
            // peaks in middle of range
            globalOpacity = Math.sin(explosionProgress * Math.PI); 
        }

        for (let i = 0; i < items.length; i++) {
            const el = items[i] as HTMLElement;
            const vx = parseFloat(el.dataset.vx || "0");
            const vy = parseFloat(el.dataset.vy || "0");
            el.style.transform = `translate(${vx * explosionProgress}px, ${vy * explosionProgress}px) scale(${el.dataset.scale || 1})`;
            el.style.opacity = globalOpacity.toString();
        }
    }

    // Pulse CTA
    if (ctaBtnRef.current) {
        if (actualIndex === 240) {
            ctaBtnRef.current.classList.add("pulse-glow");
        } else {
            ctaBtnRef.current.classList.remove("pulse-glow");
        }
    }

    // Dispatch Events
    if (actualIndex === 70) window.dispatchEvent(new CustomEvent('heroExplodeComplete'));
    if (actualIndex === 150) window.dispatchEvent(new CustomEvent('heroCutawayComplete'));
    if (actualIndex === 240) window.dispatchEvent(new CustomEvent('heroHoldComplete'));

  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isReducedMotion) return;

    const scrollTop = window.scrollY;
    // Map scroll to sequence length container (e.g. 600vh -> ~ 5 * innerHeight scroll domain)
    const maxScroll = containerRef.current.offsetHeight - window.innerHeight;
    const scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    
    const index = Math.round(scrollProgress * (totalFrames - 1)) + 1;
    
    // Only request frame if index changed
    if (index !== frameIndex && !renderRequestedRef.current) {
      renderRequestedRef.current = true;
      requestAnimationFrame(() => {
        drawFrame(index);
        setFrameIndex(index);
        const equivalent240Index = isMobile ? index * 3 : index;
        updateParallaxLayers(equivalent240Index);
        renderRequestedRef.current = false;
      });
    }
  }, [frameIndex, isReducedMotion, totalFrames, isMobile, drawFrame, updateParallaxLayers]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reduced Motion auto-player
  useEffect(() => {
    if (isLoaded && isReducedMotion) {
      let current = 1;
      const interval = setInterval(() => {
        current++;
        if (current > totalFrames) clearInterval(interval);
        else {
          drawFrame(current);
          setFrameIndex(current);
          const eqIdx = isMobile ? current * 3 : current;
          updateParallaxLayers(eqIdx);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isLoaded, isReducedMotion, totalFrames, isMobile, drawFrame, updateParallaxLayers]);

  // Entry Anim Trigger
  const startEntryAnimation = () => {
    requestAnimationFrame(() => {
        drawFrame(1);
        updateParallaxLayers(1);
    });
    
    setTimeout(() => {
        const eyebrow = document.querySelector(".eyebrow-anim") as HTMLElement;
        const lines = document.querySelectorAll(".headline-line");
        const hr = document.querySelector(".gold-hr") as HTMLElement;

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Manrope:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <style dangerouslySetInnerHTML={{__html: `
        :global(body) {
           margin: 0;
           font-family: 'Manrope', sans-serif;
           background: white;
        }
        .hero-font {
           font-family: 'Cormorant Garamond', serif;
        }
        .pulse-glow {
            animation: pulse-border 1.5s infinite alternate;
        }
        @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.7); }
            100% { box-shadow: 0 0 0 15px rgba(197, 160, 89, 0); }
        }
        .eyebrow-anim {
            transition: letter-spacing 1.2s cubic-bezier(0.2, 0, 0, 1);
            letter-spacing: 0em;
        }
        .headline-line {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0, 0.2, 1);
        }
        .gold-hr {
            width: 0%;
            transition: width 0.8s cubic-bezier(0.2, 0, 0.2, 1);
        }
      `}} />

      {!isLoaded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "14px", fontWeight: "bold", marginBottom: "20px" }}>Loading Architecture sequence</div>
          <div style={{ width: "300px", height: "2px", backgroundColor: "#E5E5E5" }}>
            <div style={{ height: "100%", backgroundColor: "#0A192F", width: `${loadedScale * 100}%`, transition: "width 0.1s linear" }} />
          </div>
        </div>
      )}

      {/* Main Scroll Container */}
      <div ref={containerRef} style={{ height: scrollHeight, position: "relative" }}>
        
        {/* Sticky Canvas & Layers wrapper */}
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#fff" }}>
            
            {/* The Canvas Sequence */}
            <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0, zIndex: 0 }} />
            
            {/* LAYER 1: Background parallax overlay */}
            <div ref={backgroundOverlayRef} style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))", opacity: 0, pointerEvents: "none", willChange: "opacity" }} />
            
            {/* LAYER 2: Floating Debris */}
            <div ref={debrisContainerRef} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />

            {/* LAYER 3: Hero Text Block */}
            <div ref={textBlockRef} style={{ position: "absolute", top: "50%", left: "10%", transform: "translateY(-50%)", zIndex: 3, maxWidth: "600px", pointerEvents: "none", willChange: "opacity" }}>
                <div className="eyebrow-anim" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, fontFamily: "Manrope", color: "#0A192F", marginBottom: "20px" }}>
                    COIMBATORE'S PREMIER BUILDERS
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <h1 className="hero-font headline-line" style={{ fontSize: "72px", fontWeight: 300, fontStyle: "italic", margin: 0, lineHeight: 0.9, color: "#0A192F" }}>We Don't Just</h1>
                    <h1 className="hero-font headline-line" style={{ fontSize: "72px", fontWeight: 600, margin: 0, lineHeight: 0.9, color: "#0A192F" }}>Build Walls.</h1>
                    <h1 className="hero-font headline-line" style={{ fontSize: "72px", fontWeight: 300, fontStyle: "italic", margin: 0, lineHeight: 0.9, color: "#C5A059" }}>We Build Legacies.</h1>
                </div>
                
                <div className="gold-hr" style={{ height: "1px", backgroundColor: "#C5A059", marginTop: "40px", marginBottom: "40px" }} />
                
                <p className="headline-line" style={{ fontSize: "18px", fontFamily: "Manrope", fontWeight: 400, color: "#4A4A4A", margin: 0, paddingBottom: "10px" }}>
                    12 years. 150 homes. Zero compromises.
                </p>
            </div>

            {/* LAYER 4: Revealing Interior Label */}
            <div ref={revealingLabelRef} style={{ position: "absolute", top: "25%", right: "15%", zIndex: 4, display: "flex", alignItems: "center", gap: "15px", opacity: 0, pointerEvents: "none", willChange: "transform, opacity" }}>
                <div style={{ width: "40px", height: "1px", backgroundColor: "#C5A059" }} />
                <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C5A059" }}>Revealing Interior</span>
            </div>

            {/* LAYER 5: CTA Button Anchored Bottom-Left */}
            <button ref={ctaBtnRef} style={{ position: "absolute", bottom: "10%", left: "10%", zIndex: 5, padding: "20px 40px", backgroundColor: "#0A192F", color: "white", border: "none", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "0px", transition: "background-color 0.3s" }} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#C5A059"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#0A192F"}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
                Explore Our Work →
            </button>
            
            {/* Scroll Hint */}
            <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", zIndex: 6, display: "flex", flexDirection: "column", alignItems: "center", animation: "bounce 2s infinite" }}>
                <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0A192F", opacity: 0.7 }}>↓ Scroll to reveal</span>
            </div>

        </div>
      </div>
    </>
  );
}
