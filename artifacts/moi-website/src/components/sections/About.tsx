import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const p1Ref      = useRef<HTMLDivElement>(null);
  const p2Ref      = useRef<HTMLDivElement>(null);
  const p3Ref      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.set([labelRef.current, headingRef.current, barRef.current, p1Ref.current, p2Ref.current, p3Ref.current], {
      y: 40, opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
    });

    tl
      .to(labelRef.current,   { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.1)
      .to(headingRef.current, { y: 0, opacity: 1, duration: 0.85, ease: "power4.out" }, 0.22)
      .to(barRef.current,     { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.42)
      .to(p1Ref.current,      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.6)
      .to(p2Ref.current,      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.82)
      .to(p3Ref.current,      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 1.04);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute -top-1/4 -left-1/4 w-2/3 h-2/3 bg-[#0066FF] rounded-full mix-blend-screen pointer-events-none"
        style={{ filter: "blur(180px)", opacity: 0.06 }} />
      <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-[#FF0099] rounded-full mix-blend-screen pointer-events-none"
        style={{ filter: "blur(180px)", opacity: 0.06 }} />

      {/* Background watermark — static */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden translate-x-[15%]"
        aria-hidden="true"
      >
        <span
          style={{
            color: "rgba(255,255,255,0.025)",
            fontSize: "clamp(100px,20vw,260px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          MOI
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl text-center">

        <p ref={labelRef} className="text-xs font-semibold tracking-[0.35em] uppercase text-[#0066FF] mb-5">
          Our Story
        </p>

        <h2 ref={headingRef} className="text-4xl md:text-6xl font-black leading-[1.05] text-white mb-6">
          Who We Are
        </h2>

        <div ref={barRef} className="mx-auto w-16 h-[3px] rounded-full mb-12"
          style={{ background: "linear-gradient(90deg, #0066FF, #FF0099)" }} />

        <div className="space-y-8">
          <div ref={p1Ref}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              At MOI, we exist to{" "}
              <span className="text-white font-semibold">unite creators and brands</span>{" "}
              through meaningful, lasting partnerships.
            </p>
          </div>

          <div ref={p2Ref}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#4488FF] font-semibold">For creators</span>, we provide hands-on guidance, managing everything from brand collaborations to OTT/Movies, ensuring they can focus on their craft while we position them for bigger opportunities.
            </p>
          </div>

          <div ref={p3Ref}>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0099] to-[#FF44BB] font-semibold">For brands</span>, we offer end-to-end campaign execution, aligning the perfect talent fit to deliver impactful, measurable results. By championing both sides equally, we ensure that{" "}
              <span className="text-white font-medium italic">every partnership counts and every collaboration thrives.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
