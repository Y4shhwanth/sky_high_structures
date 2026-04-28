"use client";

const testimonials = [
  { name: "Anand R.", loc: "Saravanampatti", text: "Sky High built our dream villa in 14 months. Impeccable quality and zero hidden costs." },
  { name: "Priya M.", loc: "RS Puram", text: "Professional from day one. Our 2400 sqft house came out exactly as planned." },
  { name: "Karthik S.", loc: "Ganapathy", text: "Best civil contractor in Coimbatore. They handled everything from approvals to finishing." },
  { name: "Lakshmi V.", loc: "Hopes College", text: "Vastu-compliant, on-time, within budget. Highly recommend." }
];

export default function TestimonialsSection() {
  // Duplicate for seamless marquee
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-[var(--sky-surface)] py-20 md:py-[120px] overflow-hidden">
      <div className="px-6 md:px-[8vw] mb-12 md:mb-16 text-center">
        <h2 className="font-[var(--font-display)] italic text-[clamp(28px,6vw,52px)] text-[var(--sky-text)] leading-tight max-w-3xl mx-auto">
          Words From Those Who Live In Our Work
        </h2>
      </div>

      <div className="group flex overflow-hidden">
        <div className="flex w-max gap-7 animate-marquee pl-7">
          {loopedTestimonials.map((t, i) => (
            <div key={i} className="bg-[var(--sky-bg)] w-[300px] sm:w-[360px] md:w-[400px] flex-shrink-0 p-7 sm:p-9 md:p-10 border-t-2 border-[var(--sky-gold)] relative">
              <div className="font-[var(--font-display)] font-medium text-[72px] text-[var(--sky-gold)] opacity-20 absolute top-3 right-5 leading-none select-none">
                "
              </div>
              <div className="text-[var(--sky-gold)] text-[16px] mb-4 tracking-widest">
                ★★★★★
              </div>
              <p className="font-[var(--font-body)] text-[16px] text-[var(--sky-text)] italic leading-[1.7] mb-6 min-h-[80px]">
                "{t.text}"
              </p>
              <div>
                <h5 className="font-[var(--font-display)] font-semibold text-[20px] text-[var(--sky-text)]">
                  {t.name}
                </h5>
                <p className="font-[var(--font-body)] text-[13px] text-[var(--sky-muted)] mt-1">
                  {t.loc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
