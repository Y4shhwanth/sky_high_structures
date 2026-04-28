"use client";

import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { Star, Building2, Clock, Users, HardHat, Award } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function SocialProofSection() {
  const instaSeeds = ["11", "12", "13", "14", "15", "16"];

  const basicBadges = [
    { icon: Building2, text: "CREDAI Member" },
    { icon: Clock, text: "12+ Years in Business" },
    { icon: Users, text: "150+ Happy Families" },
    { icon: HardHat, text: "Licensed Structural Engineers" },
    { icon: Award, text: "ISO 9001 Quality Assured" },
  ];

  const googleReviews = [
    {
      name: "Rahul S.",
      text: "Exceptional quality and timely delivery! They built our dream home in Vadavalli flawlessly.",
    },
    {
      name: "Kavitha R.",
      text: "Very transparent pricing from day one. Their structural engineers know exactly what they are doing.",
    },
    {
      name: "Manoj Kumar",
      text: "The entire process from DTCP approval to interior handover was handled proactively. Highly recommend!",
    },
  ];

  return (
    <section className="bg-white pt-24 border-t border-black/5 flex flex-col font-[var(--font-body)]">
      
      {/* Inline styles for Marquee */}
      <style>{`
        @keyframes slideMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: slideMarquee 25s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* TOP: Two-Column Layout (Insta + Google Reviews) */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
        
        {/* LEFT COLUMN: Instagram Feed */}
        <Reveal>
          <div className="flex flex-col items-start w-full">
            <h2 className="font-[var(--font-display)] font-semibold text-[32px] md:text-[40px] text-[var(--sky-dark)] mb-10 leading-tight">
              Follow Our Work <br/>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[var(--sky-gold)] hover:underline italic underline-offset-4">@skyhighstructures</a>
            </h2>
            
            <div className="grid grid-cols-3 gap-1 w-full max-w-[600px] shadow-sm bg-black/5 p-1">
              {instaSeeds.map((seed, i) => (
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  key={i} 
                  className="relative group w-full aspect-square overflow-hidden block bg-gray-100"
                >
                  <Image 
                    src={`https://picsum.photos/seed/${seed}/400/400`} 
                    alt="Instagram Post" 
                    fill 
                    sizes="(max-width: 768px) 33vw, 20vw" 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[var(--sky-dark)]/85 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)]">
                    <InstagramIcon className="w-8 h-8 text-[var(--sky-gold)] mb-3 drop-shadow-md" />
                    <span className="text-white font-[var(--font-body)] font-bold text-[11px] uppercase tracking-widest drop-shadow-md">View Post</span>
                  </div>
                </a>
              ))}
            </div>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="mt-10 bg-[var(--sky-gold)] hover:bg-[var(--sky-dark)] hover:text-white transition-all duration-300 text-[var(--sky-dark)] px-8 py-4 rounded-sm font-[var(--font-body)] font-bold uppercase tracking-widest text-[13px] flex items-center gap-3 shadow-md"
            >
              <InstagramIcon className="w-5 h-5" /> Follow on Instagram
            </a>
          </div>
        </Reveal>

        {/* RIGHT COLUMN: Google Reviews */}
        <Reveal delay={200}>
          <div className="flex flex-col bg-[#F8F9FA] p-8 md:p-12 rounded-[24px] border border-black/5 h-full relative overflow-hidden">
            
            {/* Soft decorative blob */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[var(--sky-gold)] rounded-full opacity-10 blur-[80px]" />

            <div className="flex flex-col mb-10 relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-[50px] h-[50px] bg-white rounded-full shadow-md flex items-center justify-center pb-0.5">
                  <span className="font-bold text-[24px]" style={{ color: "#4285F4" }}>G</span>
                </div>
                <h2 className="font-[var(--font-display)] font-semibold text-[32px] text-[var(--sky-dark)]">
                  Rated Excellent
                </h2>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-[18px] text-[var(--sky-dark)]">4.9</span>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="#FBBC04" stroke="none" className="w-[18px] h-[18px]" />
                  ))}
                </div>
              </div>
              <p className="font-[var(--font-body)] text-[14px] text-[var(--sky-muted)] tracking-wide">
                Based on 87 authentic reviews
              </p>
            </div>

            <div className="flex flex-col gap-5 relative z-10">
              {googleReviews.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--sky-dark)] text-white flex items-center justify-center font-bold text-[16px]">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[14px] text-[var(--sky-dark)] leading-none mb-1.5">{review.name}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} fill="#FBBC04" stroke="none" className="w-3.5 h-3.5" />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Small Google Tag */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/30 border border-black/10 px-2 py-1 rounded-md bg-gray-50 flex items-center gap-1.5">
                      <span className="font-bold text-[12px]" style={{ color: "#4285F4" }}>G</span> Review
                    </span>
                  </div>
                  <p className="text-[14px] text-[var(--sky-muted)] leading-relaxed mt-4 italic">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>

            <a href="#" className="mt-8 font-bold text-[13px] text-[#4285F4] hover:text-[var(--sky-dark)] transition-colors uppercase tracking-wider inline-flex items-center gap-2 relative z-10 w-fit">
              See all reviews on Google <span className="text-[16px] leading-none mb-0.5">→</span>
            </a>
          </div>
        </Reveal>

      </div>

      {/* BOTTOM: Trust Badges Row (Marquee) */}
      <div className="w-full overflow-hidden bg-[var(--sky-dark)] py-8 border-y-2 border-[var(--sky-gold)]/20 relative marquee-container">
        {/* Soft Fader overlay for infinite illusion */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[var(--sky-dark)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[var(--sky-dark)] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max relative">
          
          <div className="flex animate-marquee shrink-0">
            {[...basicBadges, ...basicBadges].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3.5 bg-[#112445] border border-[var(--sky-gold)]/30 rounded-full px-6 py-3 mr-6 md:mr-10 hover:border-[var(--sky-gold)] hover:bg-[#162744] transition-colors cursor-default"
              >
                <item.icon className="w-5 h-5 text-[var(--sky-gold)] shrink-0" strokeWidth={2} />
                <span className="text-white font-[var(--font-body)] text-[14px] font-medium tracking-widest uppercase">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Exact duplicate block for seamless scroll hook */}
          <div className="flex animate-marquee shrink-0" aria-hidden="true">
            {[...basicBadges, ...basicBadges].map((item, i) => (
              <div 
                key={`dup-${i}`} 
                className="flex items-center gap-3.5 bg-[#112445] border border-[var(--sky-gold)]/30 rounded-full px-6 py-3 mr-6 md:mr-10 hover:border-[var(--sky-gold)] hover:bg-[#162744] transition-colors cursor-default"
              >
                <item.icon className="w-5 h-5 text-[var(--sky-gold)] shrink-0" strokeWidth={2} />
                <span className="text-white font-[var(--font-body)] text-[14px] font-medium tracking-widest uppercase">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
