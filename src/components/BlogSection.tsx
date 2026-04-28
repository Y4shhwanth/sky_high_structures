"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { X, Share2, Copy } from "lucide-react";

const postsData = [
  {
    id: 1,
    title: "How Much Does It Cost to Build a House in Coimbatore in 2025?",
    category: "Cost Guide",
    readTime: "6 min read",
    imgId: "7",
    tag: "Most Popular",
    excerpt: "The cost of building a house in Coimbatore ranges from ₹1,800 to ₹3,500 per sq ft depending on finish quality, materials, and location. Here's a complete breakdown...",
    content: (
      <>
        <p className="text-[18px] leading-relaxed mb-6">
          The cost of residential construction in Coimbatore has seen significant adjustments leading into 2025. Whether you are building in RS Puram or expanding outward towards Saravanampatti, understanding the financial breakdown is critical to avoiding stalled projects.
        </p>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">1. Material Cost Breakdown</h2>
        <p className="mb-4 leading-relaxed">
          Currently, raw materials account for approximately 60-65% of your total budget. Steel prices continuously fluctuate globally, but local cement, river sand, and country brick rates remain relatively stable in Western Tamil Nadu.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-8 py-4 my-10 bg-[var(--sky-surface)] font-style-italic font-[var(--font-display)] text-[24px]">
          "Choosing highest-grade TMT bars and cement upfront saves you lakhs in structural repairs over the next decade. Never compromise here."
        </blockquote>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">2. Labor Charges in 2025</h2>
        <p className="mb-4 leading-relaxed">
          Labor costs have stabilized at around ₹400 - ₹600 per sq. ft. depending on the complexity of the elevation and interior detailing. Highly skilled masons required for premium facade finishes will command the upper end of this spectrum.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: "10 Things to Check Before Hiring a Civil Contractor in Tamil Nadu",
    category: "Hiring Guide",
    readTime: "4 min read",
    imgId: "8",
    excerpt: "Choosing the wrong contractor is the most expensive mistake in home construction. Here are 10 non-negotiable things to verify before signing any agreement...",
    content: (
      <>
        <p className="text-[18px] leading-relaxed mb-6">
          In Tamil Nadu, the civil construction market is heavily fragmented. Protecting your investment starts with hiring the right execution partner who shares your vision and standards.
        </p>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">1. Check Past Projects In-Person</h2>
        <p className="mb-4 leading-relaxed">
          Do not rely solely on digital portfolios or 3D renders. Ask to visit an ongoing site. Observe the cleanliness of the site, safety measures, and the quality of raw materials stockpiled.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-8 py-4 my-10 bg-[var(--sky-surface)] font-style-italic font-[var(--font-display)] text-[24px]">
          "A contractor's ongoing site tells you more about their work ethic than their finished projects ever could."
        </blockquote>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">2. Clear Payment Schedules</h2>
        <p className="mb-4 leading-relaxed">
          Ensure payment schedules are tied to milestone completions (e.g., foundation, lintel, roof slab), not fixed timeline dates. Avoid contractors who demand more than 10-15% as a mobilization advance before breaking ground.
        </p>
      </>
    )
  },
  {
    id: 3,
    title: "Vastu Shastra and Modern Architecture — How We Balance Both",
    category: "Design",
    readTime: "5 min read",
    imgId: "9",
    excerpt: "Many homeowners in Coimbatore want Vastu-compliant homes but worry it limits modern design. Our engineers explain how both can coexist beautifully...",
    content: (
      <>
        <p className="text-[18px] leading-relaxed mb-6">
          The ancient science of Vastu Shastra is deeply rooted in Indian culture, emphasizing energy flow, sunlight, and ventilation. Many clients fear this means sacrificing contemporary, open-plan aesthetics. We prove otherwise.
        </p>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">Aligning the Elements</h2>
        <p className="mb-4 leading-relaxed">
          For instance, placing the kitchen in the Agneya (Southeast) corner doesn't mean it has to be a closed off, traditional room. We frequently design stunning, open-plan modular kitchens in the SE quadrant that flow directly into modern dining spaces seamlessly.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-8 py-4 my-10 bg-[var(--sky-surface)] font-style-italic font-[var(--font-display)] text-[24px]">
          "True Vastu isn't about arbitrary rules; it's about optimizing natural light, wind circulation, and holistic living."
        </blockquote>
      </>
    )
  },
  {
    id: 4,
    title: "Understanding DTCP vs CMDA Approval — A Simple Guide for Homeowners",
    category: "Legal",
    readTime: "7 min read",
    imgId: "10",
    excerpt: "Before construction begins, your plot needs proper approval. DTCP applies to plots in town panchayat areas, while CMDA covers Chennai metro. Here's what you need in Coimbatore...",
    content: (
      <>
        <p className="text-[18px] leading-relaxed mb-6">
          Navigating the local regulatory landscape is often the most stressful part of building a home. Here is exactly what you need to know about plot approvals in Tamil Nadu to secure a completely legal build.
        </p>
        <h2 className="text-[32px] font-[var(--font-display)] font-semibold mt-10 mb-6 text-[var(--sky-dark)]">What is DTCP Approval?</h2>
        <p className="mb-4 leading-relaxed">
          The Directorate of Town and Country Planning (DTCP) governs urban planning for most of Tamil Nadu outside of the Chennai Metropolitan Area. If you are building in Coimbatore, your plot likely requires DTCP approval for the building plan to be legally sanctioned by local bodies.
        </p>
        <blockquote className="border-l-4 border-[var(--sky-gold)] pl-8 py-4 my-10 bg-[var(--sky-surface)] font-style-italic font-[var(--font-display)] text-[24px]">
          "Never purchase an unapproved plot with the assumption that approval can be easily 'managed' later. It poses massive legal and resale risks."
        </blockquote>
      </>
    )
  }
];

export default function BlogSection() {
  const [activePost, setActivePost] = useState<number | null>(null);

  useEffect(() => {
    if (activePost !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePost]);

  const handleShare = () => {
    // Attempt standard Web Share API first
    if (navigator.share) {
      navigator.share({
        title: "Sky High Structures Blog",
        url: window.location.href,
      }).catch(console.error);
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, "_blank");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <section id="blog" className="py-24 md:py-[150px] bg-[var(--sky-surface)] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20">
        
        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-start mb-16">
            <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
              Construction Tips & Guides
            </h3>
            <h2 className="font-[var(--font-display)] italic font-semibold text-[clamp(40px,5vw,64px)] text-[var(--sky-text)] leading-[1.0]">
              Expert advice from our engineers.
            </h2>
          </div>
        </Reveal>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {postsData.map((post, i) => (
            <Reveal key={post.id} delay={i * 100}>
              <div 
                className="bg-white group cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative h-full flex flex-col"
                onClick={() => setActivePost(i)}
              >
                {/* Ribbon */}
                {post.tag && (
                  <div className="absolute top-4 -right-2 z-10 bg-[var(--sky-gold)] text-[var(--sky-dark)] text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 shadow-md before:content-[''] before:absolute before:bottom-[-6px] before:right-0 before:border-t-[6px] before:border-t-[#9A7D45] before:border-r-[8px] before:border-r-transparent">
                    {post.tag}
                  </div>
                )}
                
                {/* Image */}
                <div className="relative w-full h-[300px] overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${post.imgId}/800/500`}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <span className="font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.1em] text-[var(--sky-gold)] mb-3 block">
                    {post.category}
                  </span>
                  <h4 className="font-[var(--font-display)] font-semibold text-[24px] text-[var(--sky-text)] leading-[1.3] mb-4">
                    {post.title}
                  </h4>
                  <p className="font-[var(--font-body)] text-[14px] text-[var(--sky-muted)] line-clamp-3 mb-8 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Action Row */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
                    <span className="font-[var(--font-body)] text-[12px] text-[var(--sky-muted)] font-medium">
                      {post.readTime}
                    </span>
                    <span className="font-[var(--font-body)] text-[13px] font-bold text-[var(--sky-gold)] group-hover:text-[var(--sky-dark)] transition-colors flex items-center gap-1">
                      Read More <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* MODALS RENDERING (SEO Friendly & Transition Ready) */}
      {postsData.map((post, i) => {
        const isActive = activePost === i;
        return (
          <article 
            key={`modal-${post.id}`}
            className={`fixed inset-0 z-[9999] bg-white overflow-y-auto overflow-x-hidden block transition-all duration-500 ease-[var(--ease-out-expo)] ${
              isActive 
                ? 'opacity-100 pointer-events-auto translate-y-0' 
                : 'opacity-0 pointer-events-none translate-y-20'
            }`}
          >
            {/* Modal Hero */}
            <div className="relative w-full h-[50vh] min-h-[400px]">
              <Image 
                src={`https://picsum.photos/seed/${post.imgId}/1920/1080`} 
                alt={post.title} 
                fill 
                sizes="100vw"
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--sky-dark)] to-black/20" />
              
              {/* Close Button Top Right */}
              <button 
                onClick={() => setActivePost(null)} 
                className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-[#C5A059] hover:text-white backdrop-blur-md p-3 rounded-full text-white transition-all shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 max-w-5xl lg:mx-auto flex flex-col justify-end h-full text-white">
                <span className="font-[var(--font-body)] font-bold text-[12px] uppercase tracking-[0.15em] text-[var(--sky-gold)] mb-4 block drop-shadow-sm">
                  {post.category} • {post.readTime}
                </span>
                <h1 className="font-[var(--font-display)] font-semibold text-[clamp(32px,5vw,56px)] leading-[1.1] max-w-4xl drop-shadow-md">
                  {post.title}
                </h1>
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-20 font-[var(--font-body)] text-[var(--sky-text)]">
              
              {/* Social Share Ribbon */}
              <div className="flex items-center gap-4 pb-10 mb-10 border-b border-black/10">
                <span className="text-[12px] uppercase tracking-widest font-bold text-[var(--sky-muted)]">Share Article</span>
                <button 
                  onClick={handleShare} 
                  className="p-3 bg-[var(--sky-surface)] hover:bg-[#25D366] hover:text-white rounded-full transition-colors text-[var(--sky-text)] flex items-center justify-center shadow-sm"
                  title="Share to WhatsApp"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleCopy} 
                  className="p-3 bg-[var(--sky-surface)] hover:bg-[var(--sky-dark)] hover:text-white rounded-full transition-colors text-[var(--sky-text)] flex items-center justify-center shadow-sm"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Main Text Component */}
              <div className="blog-content">
                {post.content}
              </div>
              
              {/* Related articles snippet */}
              <div className="mt-24 pt-12 border-t border-black/10">
                <h3 className="font-[var(--font-display)] font-semibold text-[32px] mb-8 text-[var(--sky-dark)]">Read Next</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {postsData
                    .filter(p => p.id !== post.id)
                    .slice(0, 2)
                    .map((related) => (
                      <div 
                        key={related.id} 
                        className="cursor-pointer group flex flex-col" 
                        onClick={() => {
                          const idx = postsData.findIndex(x => x.id === related.id);
                          setActivePost(idx);
                        }}
                      >
                        <div className="relative h-[200px] overflow-hidden mb-5 rounded-sm">
                          <Image 
                            src={`https://picsum.photos/seed/${related.imgId}/600/400`} 
                            alt={related.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                        <span className="font-[var(--font-body)] font-bold text-[10px] uppercase tracking-[0.1em] text-[var(--sky-gold)] mb-2 block">
                          {related.category}
                        </span>
                        <h4 className="font-[var(--font-display)] font-semibold text-[20px] group-hover:text-[var(--sky-gold)] transition-colors leading-[1.3] text-[var(--sky-dark)]">
                          {related.title}
                        </h4>
                      </div>
                  ))}
                </div>
              </div>

            </div>
          </article>
        );
      })}

    </section>
  );
}
