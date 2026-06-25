import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import video1 from "@localassets/homepage_video_1.mp4";
import video2 from "@localassets/homepage_video_2.mp4";
import video3 from "@localassets/homepage_video_3.mp4";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: "70M+",
    label: "Reach",
    accent: "#0066FF",
    desc: "Combined audience across all creator platforms",
  },
  {
    value: "40+",
    label: "Brands",
    accent: "#FF0099",
    desc: "Trusted brand partners we've collaborated with",
  },
  {
    value: "70+",
    label: "Creators Empowered",
    accent: "#7755FF",
    desc: "Talented creators growing under our management",
  },
];

const cards = [
  { rotate: "-3.9deg", accent: "#0066FF", glow: "rgba(0,102,255,0.22)",  z: 2, video: video1 },
  { rotate: "0deg",    accent: "#7755FF", glow: "rgba(119,85,255,0.22)", z: 3, video: video2 },
  { rotate: "4.5deg",  accent: "#FF0099", glow: "rgba(255,0,153,0.22)",  z: 1, video: video3 },
];

const CARD_H       = 370;
const CARD_W       = Math.round(CARD_H * 9 / 16); // ≈208px
const OVERLAP_STEP = 190;

/* Card inner — fills its absolutely-positioned parent via inset-0 */
function CardInner({ card }: { card: typeof cards[0] }) {
  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #141418 0%, #0c0c10 100%)",
        border: `1.5px solid ${card.accent}35`,
        boxShadow: `
          0 12px 40px rgba(0,0,0,0.65),
          0 0 0 1px ${card.accent}10,
          inset 0 1px 0 rgba(255,255,255,0.05)
        `,
      }}
    >
      <video
        src={card.video}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 50% -10%, ${card.glow} 0%, transparent 60%)` }} />
      <div className="absolute top-0 left-5 right-5 h-[1.5px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${card.accent}90, transparent)` }} />
    </div>
  );
}

export default function Impact() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set(leftRef.current,   { x: -40, opacity: 0 });
    gsap.set(rightRef.current,  { x: 60,  opacity: 0 });
    statsRef.current.forEach((el) => el && gsap.set(el, { y: 40, opacity: 0 }));
    cardRefs.current.forEach((el) => el && gsap.set(el, { y: 50, opacity: 0, scale: 0.9 }));

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });

    tl
      .to(leftRef.current,   { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.1)
      .to(statsRef.current.filter(Boolean), {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out",
      }, 0.25)
      .to(rightRef.current,  { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.3)
      .to(cardRefs.current.filter(Boolean), {
        y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.1, ease: "back.out(1.3)",
      }, 0.5);

    return () => { tl.kill(); };
  }, []);

  const containerW = OVERLAP_STEP * (cards.length - 1) + CARD_W;

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0066FF] rounded-full mix-blend-screen pointer-events-none"
        style={{ filter: "blur(160px)", opacity: 0.05 }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7755FF] rounded-full mix-blend-screen pointer-events-none"
        style={{ filter: "blur(140px)", opacity: 0.06 }} />

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
          IMPACT
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-20 lg:items-end">

          {/* ── Left col: stats ── */}
          <div ref={leftRef} className="lg:w-1/2 w-full" style={{ opacity: 0 }}>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0066FF] mb-6">
              Our Impact
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-6 text-white">
              Numbers That<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#7755FF]">
                Speak
              </span>
            </h2>
            <div className="w-16 h-[3px] rounded-full mb-8 md:mb-10"
              style={{ background: "linear-gradient(90deg, #0066FF, #7755FF)" }} />

            <div className="space-y-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={(el) => { statsRef.current[i] = el; }}
                  className="flex items-center gap-4 md:gap-6 bg-[#0d0d0d] border border-white/5 rounded-2xl p-4 md:p-6 hover:border-white/10 transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div className="shrink-0 w-1 h-12 md:h-14 rounded-full" style={{ background: stat.accent }} />
                  <div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-black leading-none mb-1" style={{ color: stat.accent }}>
                      {stat.value}
                    </div>
                    <div className="text-white font-semibold text-base md:text-lg mb-0.5">{stat.label}</div>
                    <div className="text-white/40 text-xs md:text-sm font-light">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right col: video cards ── */}
          <div
            ref={rightRef}
            className="lg:w-1/2 w-full"
            style={{ opacity: 0 }}
          >

            {/* ── DESKTOP: overlapping spread ── */}
            <div
              className="hidden md:flex items-center justify-center"
              style={{ paddingLeft: 'clamp(0px, 6vw, 100px)', marginBottom: 'clamp(0px, 4vw, 60px)' }}
            >
              <div
                className="relative"
                style={{ width: containerW + 40, height: CARD_H + 96 }}
              >
                {cards.map((card, i) => (
                  <div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="absolute"
                    style={{
                      opacity: 0,
                      top: i === 1 ? 62 : 64,
                      left: i * OVERLAP_STEP,
                      width: CARD_W,
                      height: i === 1 ? CARD_H + 2 : CARD_H,
                      zIndex: card.z,
                      transform: `rotate(${card.rotate})`,
                      transformOrigin: "bottom center",
                    }}
                  >
                    <CardInner card={card} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── MOBILE: snap-scroll horizontal ── */}
            <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
              <div className="flex gap-4" style={{ width: "max-content", paddingRight: "1rem" }}>
                {cards.map((card, i) => (
                  <div
                    key={i}
                    ref={(el) => { if (!cardRefs.current[i]) cardRefs.current[i] = el; }}
                    className="snap-center flex-shrink-0 relative rounded-3xl overflow-hidden"
                    style={{
                      opacity: 0,
                      width: "72vw",
                      maxWidth: 230,
                      height: 320,
                      border: `1.5px solid ${card.accent}35`,
                      background: "linear-gradient(160deg, #141418 0%, #0c0c10 100%)",
                      boxShadow: `0 12px 40px rgba(0,0,0,0.65), 0 0 0 1px ${card.accent}10`,
                    }}
                  >
                    <video
                      src={card.video}
                      autoPlay muted loop playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{ background: `radial-gradient(ellipse at 50% -10%, ${card.glow} 0%, transparent 60%)` }} />
                    <div className="absolute top-0 left-5 right-5 h-[1.5px] rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${card.accent}90, transparent)` }} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
