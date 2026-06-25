import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const tickerItems = [
  "Premium Brand Collabs",
  "Creator-First Management",
  "Fair Pricing",
  "Long-Term Brand Deals",
  "Campaign Execution",
  "Usage Rights Protection",
  "70+ Creators",
  "70M+ Reach",
  "100+ Brands",
];

// Split a string into per-word animated spans
function SplitWords({ text, className, wordClassName }: { text: string; className?: string; wordClassName?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="split-word-wrap inline-block overflow-hidden pb-[0.18em] mb-[-0.18em]"
          style={{ marginRight: "0.25em" }}
        >
          <span className={`split-word inline-block ${wordClassName ?? ""}`}>{word}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Particle canvas — skip on reduced-motion or touch devices for perf
    const canvas = canvasRef.current;
    if (!canvas) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; color: string; alpha: number };
    let particles: Particle[] = [];
    const colors = ["#0066FF", "#FF0099", "#4488FF", "#FF44BB"];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    resize();

    // Fewer particles on mobile / reduced-motion for performance
    const count = prefersReducedMotion ? 0 : isTouchDevice ? 20 : 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const drawParticles = () => {
      animId = requestAnimationFrame(drawParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
    };
    drawParticles();

    // ── SPLIT TEXT reveal ──
    const h1Words = h1Ref.current?.querySelectorAll(".split-word");
    const h2Words = h2Ref.current?.querySelectorAll(".split-word");

    if (h1Words) gsap.set(h1Words, { y: "110%", opacity: 0 });
    if (h2Words) gsap.set(h2Words, { y: "110%", opacity: 0 });
    gsap.set([badgeRef.current, subRef.current, btnsRef.current], { y: 28, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    // Badge pill
    tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })

    // H1 word-by-word reveal
    if (h1Words) {
      tl.to(h1Words, {
        y: "0%", opacity: 1,
        duration: 0.9, stagger: 0.08, ease: "power4.out"
      }, "-=0.3");
    }

    // H2 word-by-word reveal (dimmed line)
    if (h2Words) {
      tl.to(h2Words, {
        y: "0%", opacity: 1,
        duration: 0.85, stagger: 0.07, ease: "power4.out"
      }, "-=0.55");
    }

    // Subtext, buttons, stats fade up
    tl.to(subRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .to(btnsRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      tl.kill();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const allItems = [...tickerItems, ...tickerItems];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      ref={containerRef}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#0066FF] rounded-full mix-blend-screen filter blur-[220px] opacity-8 animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#FF0099] rounded-full mix-blend-screen filter blur-[220px] opacity-8 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center pt-24 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-0">

          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-white/70 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            <span>Creator-First Talent Management</span>
          </div>

          {/* H1 — split words */}
          <h1
            ref={h1Ref}
            className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.02em] leading-[1.0] mt-6 text-white"
          >
            <SplitWords text="Enriching" />
            <br />
            <SplitWords
              text="Creators."
              wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7755FF] to-[#FF0099]"
            />
          </h1>

          {/* H2 — split words */}
          <h2
            ref={h2Ref}
            className="text-[clamp(3rem,9vw,7rem)] font-black tracking-[-0.02em] leading-[1.0] text-white/30 mt-[-0.05em]"
          >
            <SplitWords text="Elevating Brands." />
          </h2>

          <p ref={subRef} className="text-base md:text-xl text-white/50 max-w-2xl mt-8 font-light leading-relaxed">
            MadeOverInfluence is a creator-first agency built to scale long-term
            careers and secure premium brand partnerships not just close one-off campaigns.
          </p>

          <div ref={btnsRef} className="flex flex-col sm:flex-row items-center gap-4 mt-10">
            <MagneticButton>
              <Button
                size="lg"
                onClick={() => scrollTo("#contact")}
                className="h-14 px-10 bg-gradient-to-r from-[#0066FF] to-[#FF0099] hover:opacity-90 text-white rounded-full text-base font-bold group transition-all"
                data-testid="button-hero-cta-primary"
              >
                Partner With Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("#creators")}
                className="h-14 px-10 rounded-full border-white/15 hover:bg-white/5 hover:border-white/25 text-white text-base font-medium transition-all"
                data-testid="button-hero-cta-secondary"
              >
                Meet Our Creators
              </Button>
            </MagneticButton>
          </div>

        </div>
      </div>

      <div ref={tickerRef} className="relative z-10 w-full overflow-hidden border-t border-b border-white/5 py-4 mt-auto">
        <div className="flex whitespace-nowrap animate-ticker">
          {allItems.map((item, idx) => (
            <div key={idx} className="inline-flex items-center shrink-0">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/25 px-8">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#FF0099] opacity-40 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity z-10 cursor-pointer"
        data-testid="button-scroll-down"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
      </button>
    </section>
  );
}
