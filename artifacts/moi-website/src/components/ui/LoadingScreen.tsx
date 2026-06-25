import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const moiLogo = "/moi-logo-transparent.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = 100;
    const duration = 2400;
    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);

        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.9,
              ease: "power4.inOut",
              onComplete: () => {
                onComplete();
              }
            });
          }
        }, 200);
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      data-testid="loading-screen"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-[#0066FF] rounded-full mix-blend-screen filter blur-[200px] opacity-10" />
        <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-[#FF0099] rounded-full mix-blend-screen filter blur-[200px] opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-8">
        <img
          src={moiLogo}
          alt="MOI"
          className="h-14 mb-16 opacity-90"
        />

        <div className="w-full mb-6">
          <div className="h-[1px] w-full bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0066FF] to-[#FF0099] rounded-full transition-none"
              style={{ width: `${count}%`, transition: "width 0.016s linear" }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between w-full">
          <span className="text-xs text-white/30 tracking-[0.3em] uppercase font-medium">Loading</span>
          <span ref={counterRef} className="text-4xl font-black text-white tabular-nums">
            {count}<span className="text-[#0066FF]">%</span>
          </span>
        </div>

        <p className="mt-12 text-white/20 text-xs tracking-[0.5em] uppercase">
          MadeOverInfluence
        </p>
      </div>
    </div>
  );
}
