import Image from "next/image";
import Reveal from "./Reveal";

const milestones = [
  { year: "2012", label: "Founded" },
  { year: "2016", label: "CREDAI Member" },
  { year: "2020", label: "100th Project" },
  { year: "2024", label: "150 Homes" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[var(--sky-bg)] py-20 md:py-[120px] px-6 md:px-[8vw]">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-center">
        
        {/* Left Column */}
        <Reveal>
          <div className="relative">
            <div className="font-[var(--font-display)] font-light text-[200px] text-[var(--sky-gold)] opacity-[0.06] absolute -top-8 -left-4 leading-none select-none pointer-events-none">
              12
            </div>
            <h3 className="font-[var(--font-body)] font-bold text-[11px] uppercase tracking-[0.18em] text-[var(--sky-gold)] mb-4">
              About Us
            </h3>
            <h2 className="font-[var(--font-display)] font-medium text-[clamp(40px,5vw,52px)] text-[var(--sky-text)] leading-[1.1]">
              Built on Trust & <br />
              <span className="italic text-[var(--sky-gold)]">Precision</span>
            </h2>
            <p className="font-[var(--font-body)] text-[17px] text-[var(--sky-muted)] leading-[1.75] mt-5 mb-10 max-w-xl">
              Established with a singular goal to elevate Coimbatore's architectural landscape, Sky High Structures has grown organically through word-of-mouth. We reject massive developments in favour of bespoke, high-quality, controlled builds where our founders can personally oversee every site.
            </p>

            <div className="relative w-full max-w-lg mt-8">
              <div className="absolute top-[5px] left-0 w-full h-[1px] bg-[rgba(201,168,76,0.3)]" />
              <div className="flex justify-between relative z-10 pr-6">
                {milestones.map((ms, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--sky-gold)] mb-3" />
                    <span className="font-[var(--font-display)] italic text-[18px] text-[var(--sky-gold)] leading-none">
                      {ms.year}
                    </span>
                    <span className="font-[var(--font-body)] font-bold text-[11px] uppercase text-[var(--sky-text)] mt-1 tracking-wider whitespace-nowrap">
                      {ms.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a href="#portfolio" className="inline-block mt-12 bg-[var(--sky-dark)] text-white px-[26px] py-[13px] font-[var(--font-body)] font-semibold text-[14px] hover:bg-[var(--sky-gold)] hover:text-[var(--sky-dark)] transition-colors">
              See Our Story →
            </a>
          </div>
        </Reveal>

        {/* Right Column Images */}
        <Reveal delay={200}>
          <div className="relative h-[380px] sm:h-[500px] w-full mt-6 lg:mt-0">
            <div className="absolute top-[-15px] right-[-15px] w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-t border-r border-[var(--sky-gold)]" />
            <div className="absolute top-0 left-0 w-[85%] h-[90%] md:h-full overflow-hidden">
              <Image
                src="https://picsum.photos/seed/about1/800/1000"
                alt="Construction site"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, 45vw"
              />
            </div>
            <div className="absolute bottom-[-20px] md:bottom-[-30px] right-0 md:right-[-20px] w-[55%] md:w-[52%] h-[40%] md:h-[52%] border-[6px] border-[var(--sky-bg)] z-10 overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/about2/600/600"
                alt="Architectural details"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
