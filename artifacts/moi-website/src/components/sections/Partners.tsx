import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tier1 = [
  { name: "Airtel",       reach: "1.5M",  engagement: "25K+",  color: "#0066FF" },
  { name: "VI Network",   reach: "40M+",  engagement: "13M+",  color: "#FF0099" },
  { name: "Unicorn Store",reach: "8.3M+", engagement: "394K+", color: "#7755FF" },
  { name: "Jar App",      reach: "4M+",   engagement: "171K+", color: "#0099FF" },
];

const tier2 = ["Lenskart", "Cars24", "Shaadi.com", "V-Guard", "Gillette"];
const tier3 = ["ZEE5", "The Economic Times", "Adani Group", "ZEE5 Marathi", "Ryze", "BlueTea", "AstroTalk"];

const allBrands = [...tier1.map((b) => b.name), ...tier2, ...tier3];

function BrandPill({ brand }: { brand: typeof tier1[0] }) {
  const tooltipRef  = useRef<HTMLDivElement>(null);
  const pillRef     = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const showTooltip = () => {
    setOpen(true);
    const el = tooltipRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(el,
      { y: 8, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }
    );
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        borderColor: `${brand.color}60`,
        backgroundColor: `${brand.color}12`,
        boxShadow: `0 0 20px ${brand.color}20`,
        duration: 0.2, ease: "power2.out",
      });
    }
  };

  const hideTooltip = () => {
    setOpen(false);
    const el = tooltipRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { y: 6, opacity: 0, scale: 0.95, duration: 0.2, ease: "power3.in" });
    if (pillRef.current) {
      gsap.to(pillRef.current, {
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "rgba(255,255,255,0.03)",
        boxShadow: "none",
        duration: 0.2, ease: "power2.in",
      });
    }
  };

  const toggleTooltip = () => { open ? hideTooltip() : showTooltip(); };

  return (
    <div
      className="relative"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onTouchStart={(e) => { e.preventDefault(); toggleTooltip(); }}
    >
      <div
        ref={pillRef}
        className="px-7 py-3.5 rounded-full border text-white font-bold text-lg md:text-xl tracking-tight cursor-default"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {brand.name}
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none"
        style={{ opacity: 0, zIndex: 50 }}
      >
        <div
          className="rounded-2xl border p-4 min-w-[160px] text-center"
          style={{
            background: "#0d0d0d",
            borderColor: `${brand.color}30`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${brand.color}15`,
          }}
        >
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: brand.color }}>
            {brand.name}
          </p>
          <div className="flex gap-4 justify-center">
            <div>
              <p className="text-white font-black text-lg leading-none">{brand.reach}</p>
              <p className="text-white/35 text-[10px] tracking-widest uppercase mt-1">Reach</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-white font-black text-lg leading-none">{brand.engagement}</p>
              <p className="text-white/35 text-[10px] tracking-widest uppercase mt-1">Engagement</p>
            </div>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex justify-center">
          <div
            className="w-2.5 h-2.5 rotate-45 -mt-[5px]"
            style={{ background: "#0d0d0d", border: `1px solid ${brand.color}30`, borderTop: "none", borderLeft: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

const stats = [
  { number: "40+", label: "Brand Partnerships" },
  { number: "70M+", label: "Combined Reach" },
  { number: "70+", label: "Creators Managed" },
];

export default function Partners() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const tier1Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = [headingRef.current, tier1Ref.current];
    gsap.set(els, { y: 30, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });

    tl
      .to(headingRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .to(tier1Ref.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");


    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="py-24 bg-[#050505] border-y border-white/5 overflow-hidden relative"
    >
      {/* Background watermark — static */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.02)",
            fontSize: "clamp(80px,16vw,220px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          PARTNERS
        </span>
      </div>

      {/* ── Header ── */}
      <div ref={headingRef} className="container mx-auto px-4 md:px-6 mb-16 text-center" style={{ opacity: 0 }}>
        <p className="text-xs font-semibold tracking-[0.35em] uppercase text-white/30 mb-4">
          Brands We Work With
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          40+{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#FF0099]">
            Brand Partnerships
          </span>
        </h2>
        <p className="text-white/40 text-base font-light max-w-xl mx-auto">
          Trusted by leading brands across OTT, FMCG, telecom, and tech.
        </p>
      </div>

      {/* ── Tier 1 Feature Row ── */}
      <div ref={tier1Ref} className="container mx-auto px-4 md:px-6 mb-14" style={{ opacity: 0 }}>
        <p className="text-center text-[10px] font-semibold tracking-[0.4em] uppercase text-[#0066FF]/60 mb-7">
          Marquee Partners
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {tier1.map((brand) => (
            <BrandPill key={brand.name} brand={brand} />
          ))}
        </div>
      </div>

      {/* ── Marquee row 1 — all brands forward ── */}
      <div className="relative w-full overflow-hidden mb-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...allBrands, ...allBrands].map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center mx-8 text-lg md:text-2xl font-black text-white/50 hover:text-white/80 transition-colors cursor-default select-none shrink-0"
            >
              <span className="mr-8">{brand}</span>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#FF0099] opacity-30 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee row 2 — all brands reverse ── */}
      <div className="relative w-full overflow-hidden mb-16">
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[...allBrands].slice().reverse().concat([...allBrands].slice().reverse()).map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center mx-8 text-lg md:text-2xl font-black text-white/40 hover:text-white/70 transition-colors cursor-default select-none shrink-0"
            >
              <span className="mr-8">{brand}</span>
              <span className="w-2 h-2 rounded-full bg-white/15 shrink-0" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
