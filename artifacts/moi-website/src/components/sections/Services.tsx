import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Talent Management",
    accent: "#0066FF",
    oneLiner: "We guide creators through each step of their journey, actively supporting their growth from brand collaborations to broader career opportunities.",
    pointers: [
      { label: "Ideal brand partners", desc: "Matching creators with brands that align with their audience and values." },
      { label: "Deal negotiation", desc: "Securing fair, beneficial deals that maximize creator value." },
      { label: "Live event coordination", desc: "Managing logistics so creators can focus on performing." },
      { label: "Content strategy support", desc: "Guiding creators in crafting content that resonates with their audience." },
      { label: "Opportunity exploration", desc: "Identifying new collaborations, from brand deals to OTT and movie opportunities." },
      { label: "End-to-end management", desc: "Overseeing the creator's entire professional journey." },
    ],
  },
  {
    number: "02",
    title: "Influencer Marketing",
    accent: "#FF0099",
    oneLiner: "We work closely with brands to connect them with fitting talent and deliver well-executed campaigns designed to achieve impactful outcomes.",
    pointers: [
      { label: "Creator alignment", desc: "Pairing brands with creators whose audience fits their goals." },
      { label: "Custom strategy", desc: "Crafting influencer campaigns tailored to brand objectives." },
      { label: "Campaign execution", desc: "Handling the full process from outreach to delivery." },
      { label: "Performance tracking", desc: "Monitoring results and reporting key campaign metrics." },
      { label: "Seamless coordination", desc: "Managing communication between brands and creators smoothly." },
    ],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [active, setActive] = useState(false);
  const pointersRef = useRef<HTMLDivElement>(null);

  const isTouch = () => window.matchMedia("(hover: none)").matches;

  const handleMouseEnter = () => { if (!isTouch()) setActive(true); };
  const handleMouseLeave = () => { if (!isTouch()) setActive(false); };
  const handleClick      = () => { if (isTouch())  setActive((v) => !v); };

  useEffect(() => {
    const el = pointersRef.current;
    if (!el) return;
    if (active) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(el.querySelectorAll(".pointer-item"),
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.32, ease: "power3.in" });
    }
  }, [active]);

  return (
    <div
      className="relative bg-[#0d0d0d] border border-white/5 rounded-2xl p-8 transition-all duration-500 cursor-default select-none"
      style={{
        borderColor: active ? `${service.accent}30` : "rgba(255,255,255,0.05)",
        background: active ? "#111111" : "#0d0d0d",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid={`service-item-${index}`}
    >
      {/* Faint number — top right */}
      <div
        className="absolute top-6 right-8 text-5xl font-black select-none transition-colors duration-500"
        style={{ color: active ? `${service.accent}18` : "rgba(255,255,255,0.04)" }}
        aria-hidden="true"
      >
        {service.number}
      </div>

      {/* Colored dot — top left */}
      <div
        className="w-3 h-3 rounded-full mb-5 transition-all duration-300"
        style={{
          background: service.accent,
          boxShadow: active ? `0 0 12px ${service.accent}80` : "none",
        }}
      />

      {/* Title + mobile chevron */}
      <div className="flex items-center justify-between pr-16 md:pr-0 mb-3">
        <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
        {/* Chevron — only visible on touch/mobile */}
        <div
          className="md:hidden shrink-0 ml-3 w-7 h-7 rounded-full flex items-center justify-center border border-white/10 transition-all duration-300"
          style={{
            borderColor: active ? `${service.accent}50` : "rgba(255,255,255,0.1)",
            background: active ? `${service.accent}15` : "transparent",
            transform: active ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke={active ? service.accent : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* One-liner */}
      <p className="text-white/50 text-base leading-relaxed font-light">{service.oneLiner}</p>

      {/* Expandable pointers */}
      <div ref={pointersRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="pt-6 border-t border-white/5 mt-6 space-y-4">
          {service.pointers.map((p, i) => (
            <div key={i} className="pointer-item flex items-start gap-3">
              <span
                className="w-[5px] h-[5px] rounded-full shrink-0 mt-[6px]"
                style={{ background: service.accent }}
              />
              <div>
                <span className="text-white font-semibold text-base">{p.label}</span>
                <span className="text-white/40 text-base"> — {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(leftRef.current, { opacity: 0, x: -40 });
    const cards = rightRef.current?.children;
    if (cards) gsap.set(cards, { y: 50, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });

    tl

      .to(leftRef.current, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.1)
      .to(cards ? Array.from(cards) : [], {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.18, ease: "power3.out",
      }, 0.25);

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="services" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden" ref={sectionRef}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF0099] rounded-full mix-blend-screen pointer-events-none"
        style={{ filter: "blur(130px)", opacity: 0.06 }} />

      {/* Background watermark — static */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.025)",
            fontSize: "clamp(80px,16vw,220px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          SERVICES
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* ── Left sticky col ── */}
          <div ref={leftRef} className="lg:w-5/12 lg:sticky lg:top-32" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0066FF] mb-6">
              What We Do
            </p>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.05] mb-8 text-white">
              Our Services
            </h2>
            <div className="w-16 h-[3px] rounded-full mb-8"
              style={{ background: "linear-gradient(90deg, #0066FF, #FF0099)" }} />
            <p className="text-white/50 font-light leading-relaxed mb-10">
              We empower creators and brands with seamless, end-to-end talent management and impactful campaign execution.
            </p>
            <div className="inline-flex items-center gap-3 text-white/30 text-sm">
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="tracking-widest uppercase text-xs hidden md:inline">Hover to explore</span>
              <span className="tracking-widest uppercase text-xs md:hidden">Tap to explore</span>
            </div>
          </div>

          {/* ── Right cards col ── */}
          <div ref={rightRef} className="lg:w-7/12 space-y-5">
            {services.map((s, i) => (
              <ServiceCard key={i} service={s} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
