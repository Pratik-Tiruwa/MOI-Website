import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let hovering = false;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.classList.contains("cursor-pointer");
    };

    const tick = () => {
      // Dot — snaps instantly, mix-blend-difference keeps text readable
      if (dotRef.current) {
        const s = hovering ? 2.4 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0) scale(${s})`;
      }

      // Ring — smooth lerp
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (ringRef.current) {
        const s = hovering ? 1.55 : 1;
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${s})`;
        ringRef.current.style.borderColor = hovering ? "#FF009988" : "#0066FF88";
        ringRef.current.style.boxShadow   = hovering
          ? "0 0 10px #FF009944, 0 0 20px #0066FF22"
          : "0 0 8px #0066FF44";
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot — mix-blend-difference so it's always readable on any bg */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white"
        style={{
          width: 12,
          height: 12,
          transform: "translate3d(-100px, -100px, 0)",
          transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
      />

      {/* Ring — transparent fill, brand-blue border + glow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid #0066FF88",
          background: "transparent",
          transform: "translate3d(-100px, -100px, 0)",
          boxShadow: "0 0 8px #0066FF44",
          transition: "transform 0.16s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease, box-shadow 0.3s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
