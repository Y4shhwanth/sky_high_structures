"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { X, Share2, Copy, Check } from "lucide-react";

type Post = {
  id: number;
  title: string;
  category: string;
  readTime: string;
  imgId: string;
  tag?: string;
  excerpt: string;
  content: ReactNode;
};

const postsData: Post[] = [
  {
    id: 1,
    title: "How Much Does It Cost to Build a House in Coimbatore in 2025?",
    category: "Cost Guide",
    readTime: "6 min read",
    imgId: "7",
    tag: "Most Popular",
    excerpt:
      "The cost of building a house in Coimbatore ranges from ₹1,800 to ₹3,500 per sq ft depending on finish quality, materials, and location. Here's a complete breakdown...",
    content: (
      <>
        <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
          The cost of residential construction in Coimbatore has seen significant adjustments leading into 2025. Whether you are building in RS Puram or expanding outward towards Saravanampatti, understanding the financial breakdown is critical to avoiding stalled projects.
        </p>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">1. Material Cost Breakdown</h2>
        <p className="mb-4 leading-relaxed">
          Currently, raw materials account for approximately 60-65% of your total budget. Steel prices continuously fluctuate globally, but local cement, river sand, and country brick rates remain relatively stable in Western Tamil Nadu.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-6 md:pl-8 py-4 my-8 bg-[var(--sky-surface)] italic font-[var(--font-display)] text-[18px] md:text-[24px]">
          &ldquo;Choosing highest-grade TMT bars and cement upfront saves you lakhs in structural repairs over the next decade. Never compromise here.&rdquo;
        </blockquote>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">2. Labor Charges in 2025</h2>
        <p className="mb-4 leading-relaxed">
          Labor costs have stabilized at around ₹400 - ₹600 per sq. ft. depending on the complexity of the elevation and interior detailing. Highly skilled masons required for premium facade finishes will command the upper end of this spectrum.
        </p>
      </>
    ),
  },
  {
    id: 2,
    title: "10 Things to Check Before Hiring a Civil Contractor in Tamil Nadu",
    category: "Hiring Guide",
    readTime: "4 min read",
    imgId: "8",
    excerpt:
      "Choosing the wrong contractor is the most expensive mistake in home construction. Here are 10 non-negotiable things to verify before signing any agreement...",
    content: (
      <>
        <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
          In Tamil Nadu, the civil construction market is heavily fragmented. Protecting your investment starts with hiring the right execution partner who shares your vision and standards.
        </p>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">1. Check Past Projects In-Person</h2>
        <p className="mb-4 leading-relaxed">
          Do not rely solely on digital portfolios or 3D renders. Ask to visit an ongoing site. Observe the cleanliness of the site, safety measures, and the quality of raw materials stockpiled.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-6 md:pl-8 py-4 my-8 bg-[var(--sky-surface)] italic font-[var(--font-display)] text-[18px] md:text-[24px]">
          &ldquo;A contractor&apos;s ongoing site tells you more about their work ethic than their finished projects ever could.&rdquo;
        </blockquote>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">2. Clear Payment Schedules</h2>
        <p className="mb-4 leading-relaxed">
          Ensure payment schedules are tied to milestone completions (e.g., foundation, lintel, roof slab), not fixed timeline dates. Avoid contractors who demand more than 10-15% as a mobilization advance before breaking ground.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: "Vastu Shastra and Modern Architecture — How We Balance Both",
    category: "Design",
    readTime: "5 min read",
    imgId: "9",
    excerpt:
      "Many homeowners in Coimbatore want Vastu-compliant homes but worry it limits modern design. Our engineers explain how both can coexist beautifully...",
    content: (
      <>
        <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
          The ancient science of Vastu Shastra is deeply rooted in Indian culture, emphasizing energy flow, sunlight, and ventilation. Many clients fear this means sacrificing contemporary, open-plan aesthetics. We prove otherwise.
        </p>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">Aligning the Elements</h2>
        <p className="mb-4 leading-relaxed">
          For instance, placing the kitchen in the Agneya (Southeast) corner doesn&apos;t mean it has to be a closed off, traditional room. We frequently design stunning, open-plan modular kitchens in the SE quadrant that flow directly into modern dining spaces seamlessly.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-6 md:pl-8 py-4 my-8 bg-[var(--sky-surface)] italic font-[var(--font-display)] text-[18px] md:text-[24px]">
          &ldquo;True Vastu isn&apos;t about arbitrary rules; it&apos;s about optimizing natural light, wind circulation, and holistic living.&rdquo;
        </blockquote>
      </>
    ),
  },
  {
    id: 4,
    title: "Understanding DTCP vs CMDA Approval — A Simple Guide for Homeowners",
    category: "Legal",
    readTime: "7 min read",
    imgId: "10",
    excerpt:
      "Before construction begins, your plot needs proper approval. DTCP applies to plots in town panchayat areas, while CMDA covers Chennai metro. Here's what you need in Coimbatore...",
    content: (
      <>
        <p className="text-[16px] md:text-[18px] leading-relaxed mb-6">
          Navigating the local regulatory landscape is often the most stressful part of building a home. Here is exactly what you need to know about plot approvals in Tamil Nadu to secure a completely legal build.
        </p>
        <h2 className="text-[24px] md:text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-4 md:mb-6 text-[var(--sky-dark)]">What is DTCP Approval?</h2>
        <p className="mb-4 leading-relaxed">
          The Directorate of Town and Country Planning (DTCP) governs urban planning for most of Tamil Nadu outside of the Chennai Metropolitan Area. If you are building in Coimbatore, your plot likely requires DTCP approval for the building plan to be legally sanctioned by local bodies.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-6 md:pl-8 py-4 my-8 bg-[var(--sky-surface)] italic font-[var(--font-display)] text-[18px] md:text-[24px]">
          &ldquo;Never purchase an unapproved plot with the assumption that approval can be easily &lsquo;managed&rsquo; later. It poses massive legal and resale risks.&rdquo;
        </blockquote>
      </>
    ),
  },
];

export default function BlogSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const previousOverflow = useRef<string>("");
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Scroll lock — preserve original overflow
  useEffect(() => {
    if (activeIdx !== null) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Reset modal scroll when opening a new article
      modalScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
    } else {
      document.body.style.overflow = previousOverflow.current;
    }
    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, [activeIdx]);

  // Esc to close
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Sky High Structures Blog", url });
      } catch {
        // User cancelled — silent
      }
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy — try again");
    }
  };

  const activePost = activeIdx !== null ? postsData[activeIdx] : null;
  const related = activePost ? postsData.filter((p) => p.id !== activePost.id).slice(0, 2) : [];

  return (
    <section id="blog" className="py-20 md:py-[120px] bg-[var(--sky-surface)] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20">
        <Reveal>
          <div className="flex flex-col items-start mb-12 md:mb-16">
            <h3 className="font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
              Construction Tips & Guides
            </h3>
            <h2 className="font-[var(--font-display)] italic font-semibold text-[clamp(32px,7vw,64px)] text-[var(--sky-text)] leading-[1.0]">
              Expert advice from our engineers.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {postsData.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <button
                type="button"
                onClick={() => setActiveIdx(i)}
                className="bg-white group cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative h-full flex flex-col text-left w-full"
              >
                {post.tag && (
                  <div className="absolute top-4 -right-2 z-10 bg-[var(--sky-gold)] text-[var(--sky-dark)] text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 shadow-md before:content-[''] before:absolute before:bottom-[-6px] before:right-0 before:border-t-[6px] before:border-t-[#9A7D45] before:border-r-[8px] before:border-r-transparent">
                    {post.tag}
                  </div>
                )}

                <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${post.imgId}/800/500`}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <span className="font-bold text-[10px] uppercase tracking-[0.1em] text-[var(--sky-gold)] mb-3 block">
                    {post.category}
                  </span>
                  <h4 className="font-[var(--font-display)] font-semibold text-[20px] md:text-[24px] text-[var(--sky-text)] leading-[1.3] mb-4">
                    {post.title}
                  </h4>
                  <p className="text-[14px] text-[var(--sky-muted)] line-clamp-3 mb-6 md:mb-8 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                    <span className="text-[12px] text-[var(--sky-muted)] font-medium">
                      {post.readTime}
                    </span>
                    <span className="text-[13px] font-bold text-[var(--sky-gold)] group-hover:text-[var(--sky-dark)] transition-colors flex items-center gap-1">
                      Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal — only the active post is mounted */}
      {activePost && (
        <article
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[9999] bg-white"
        >
          <div ref={modalScrollRef} className="modal-scroll h-full overflow-y-auto overflow-x-hidden">
            {/* Hero */}
            <div className="relative w-full h-[40vh] sm:h-[50vh] min-h-[280px] sm:min-h-[400px]">
              <Image
                src={`https://picsum.photos/seed/${activePost.imgId}/1920/1080`}
                alt={activePost.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-dark)] via-[var(--sky-dark)]/40 to-black/10" />

              <button
                onClick={() => setActiveIdx(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 bg-white/20 hover:bg-[var(--sky-gold)] backdrop-blur-md p-2.5 sm:p-3 rounded-full text-white transition-all shadow-lg"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 md:p-20 max-w-5xl lg:mx-auto flex flex-col justify-end text-white">
                <span className="font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-[var(--sky-gold)] mb-3 sm:mb-4 block drop-shadow-sm">
                  {activePost.category} • {activePost.readTime}
                </span>
                <h1
                  id="modal-title"
                  className="font-[var(--font-display)] font-semibold text-[clamp(24px,6vw,56px)] leading-[1.1] max-w-4xl drop-shadow-md"
                >
                  {activePost.title}
                </h1>
              </div>
            </div>

            {/* Body */}
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 text-[var(--sky-text)]">
              <div className="flex items-center gap-3 sm:gap-4 pb-8 mb-8 sm:pb-10 sm:mb-10 border-b border-black/10">
                <span className="text-[11px] sm:text-[12px] uppercase tracking-widest font-bold text-[var(--sky-muted)]">
                  Share
                </span>
                <button
                  onClick={handleShare}
                  aria-label="Share article"
                  className="p-2.5 sm:p-3 bg-[var(--sky-surface)] hover:bg-[var(--sky-whatsapp)] hover:text-white rounded-full transition-colors text-[var(--sky-text)] flex items-center justify-center shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  aria-label="Copy link"
                  className="p-2.5 sm:p-3 bg-[var(--sky-surface)] hover:bg-[var(--sky-dark)] hover:text-white rounded-full transition-colors text-[var(--sky-text)] flex items-center justify-center shadow-sm"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="blog-content text-[15px] sm:text-[16px]">{activePost.content}</div>

              {/* Read next */}
              {related.length > 0 && (
                <div className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-black/10">
                  <h3 className="font-[var(--font-display)] font-semibold text-[24px] sm:text-[32px] mb-6 sm:mb-8 text-[var(--sky-dark)]">
                    Read Next
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {related.map((r) => {
                      const idx = postsData.findIndex((x) => x.id === r.id);
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setActiveIdx(idx)}
                          className="cursor-pointer group flex flex-col text-left"
                        >
                          <div className="relative h-[180px] sm:h-[200px] overflow-hidden mb-4 sm:mb-5 rounded-sm">
                            <Image
                              src={`https://picsum.photos/seed/${r.imgId}/600/400`}
                              alt={r.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <span className="font-bold text-[10px] uppercase tracking-[0.1em] text-[var(--sky-gold)] mb-2 block">
                            {r.category}
                          </span>
                          <h4 className="font-[var(--font-display)] font-semibold text-[18px] sm:text-[20px] group-hover:text-[var(--sky-gold)] transition-colors leading-[1.3] text-[var(--sky-dark)]">
                            {r.title}
                          </h4>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10000] bg-[var(--sky-dark)] text-white text-[13px] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-[var(--sky-gold)]" />
          {toast}
        </div>
      )}
    </section>
  );
}
