"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleHeroHold = () => {
      setScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("heroHoldComplete", handleHeroHold);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroHoldComplete", handleHeroHold);
    };
  }, []);

  return (
    <>
      <nav
        style={{ transition: "all 500ms var(--ease-arch)" }}
        className={`fixed top-0 w-full z-[1000] flex justify-between items-center px-6 md:px-[8vw] ${
          scrolled
            ? "py-3 md:py-4 bg-[rgba(250,250,248,0.96)] backdrop-blur-md border-b border-[rgba(201,168,76,0.2)] text-[#3D3A35]"
            : "py-5 md:py-6 bg-transparent text-[#FAFAF8]"
        }`}
      >
        <Link href="/" className="flex flex-col items-start leading-[1.0] group">
          <span
            className={`font-[var(--font-display)] font-semibold text-[22px] tracking-tight ${
              scrolled ? "text-[#0D1117]" : "text-[var(--sky-gold)]"
            }`}
          >
            SKY HIGH
          </span>
          <span className="font-[var(--font-body)] font-bold text-[9px] uppercase tracking-[0.2em] text-[var(--sky-gold)]">
            STRUCTURES
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {["Home", "Services", "Our Work", "Blog", "About"].map((item) => {
            const anchor =
              item === "Home" ? "#hero" : `#${item.toLowerCase().replace(" ", "")}`;
            return (
              <a
                key={item}
                href={anchor}
                className="relative font-[var(--font-body)] font-medium text-[14px] group"
              >
                {item}
                <span className="absolute left-0 bottom-[-2px] w-0 h-[1.5px] bg-[var(--sky-gold)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="hidden md:block px-[22px] py-[11px] bg-[var(--sky-dark)] text-white font-[var(--font-body)] font-semibold text-[14px] leading-none tracking-wide transition-colors hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)]"
          >
            Get Quote →
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[6px] cursor-pointer z-50 text-[inherit]"
          >
            <span
              className={`w-6 h-[1px] bg-current transition-transform ${
                menuOpen ? "rotate-45 translate-y-[7px] text-white" : ""
              }`}
            />
            <span
              className={`w-6 h-[1px] bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-[1px] bg-current transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-[7px] text-white" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[999] bg-[var(--sky-dark)] flex flex-col items-center justify-center gap-10">
          {["Home", "Services", "Our Work", "Blog", "About"].map((item, i) => {
            const anchor =
              item === "Home" ? "#hero" : `#${item.toLowerCase().replace(" ", "")}`;
            return (
              <a
                key={item}
                href={anchor}
                onClick={() => setMenuOpen(false)}
                className="font-[var(--font-display)] italic text-[48px] text-white translate-y-4 animate-[slideUp_0.4s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
