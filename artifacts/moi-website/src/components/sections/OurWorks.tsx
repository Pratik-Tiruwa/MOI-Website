import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    brand: "Brand Campaign",
    category: "Influencer Marketing",
    accent: "#0066FF",
    desc: "Multi-creator campaign delivering 12M+ impressions across Instagram & YouTube.",
  },
  {
    brand: "Product Launch",
    category: "Content Strategy",
    accent: "#FF0099",
    desc: "Viral product seeding drive that generated 5M+ organic views in 72 hours.",
  },
  {
    brand: "Creator Collab",
    category: "Talent Management",
    accent: "#7755FF",
    desc: "End-to-end creator partnership program across 15+ top-tier influencers.",
  },
  {
    brand: "Social Growth",
    category: "Brand Building",
    accent: "#0066FF",
    desc: "Grew a D2C brand's social presence from 10K to 500K followers in 6 months.",
  },
];

export default function OurWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(headRef.current, { y: 30, opacity: 0 });
    cardRefs.current.forEach((el) => el && gsap.set(el, { y: 50, opacity: 0 }));

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });

    tl
      .to(headRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0)
      .to(cardRefs.current.filter(Boolean), {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
      }, 0.25);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="our-works"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#050505] relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "#FF0099", filter: "blur(160px)", opacity: 0.04 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "#0066FF", filter: "blur(140px)", opacity: 0.05 }}
      />

      {/* Background watermark */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee-works 22s linear infinite",
            color: "rgba(255,255,255,0.02)",
            fontSize: "clamp(80px,16vw,220px)",
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-12">WORKS</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-works {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <div ref={headRef} className="mb-14 md:mb-20" style={{ opacity: 0 }}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#FF0099] mb-4">
            Our Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] text-white mb-4">
            Campaigns That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0099] to-[#7755FF]">
              Made Noise
            </span>
          </h2>
          <div
            className="w-16 h-[3px] rounded-full"
            style={{ background: "linear-gradient(90deg, #FF0099, #7755FF)" }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {works.map((work, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="group relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300 overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Top accent glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${work.accent}80, transparent)` }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${work.accent}10 0%, transparent 60%)` }}
              />

              <div className="relative z-10">
                <div
                  className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3"
                  style={{ color: work.accent }}
                >
                  {work.category}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3">
                  {work.brand}
                </h3>
                <div
                  className="w-10 h-[2px] rounded-full mb-4"
                  style={{ background: work.accent }}
                />
                <p className="text-white/45 text-sm md:text-base leading-relaxed font-light">
                  {work.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
