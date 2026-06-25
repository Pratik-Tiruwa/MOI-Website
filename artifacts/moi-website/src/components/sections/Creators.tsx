import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

gsap.registerPlugin(ScrollTrigger);

const creators = [
  {
    name: "Atharva Ruke",
    handle: "ruke_atharva",
    insta: "https://www.instagram.com/ruke_atharva/",
    followers: "950K+",
    color: "#0066FF",
    image: "/creators/atharva-ruke.jpg",
    imgObjectPosition: "center 30%",
  },
  {
    name: "Vishal Shastri",
    handle: "theramvishal",
    insta: "https://www.instagram.com/theramvishal/",
    followers: "125K+",
    color: "#FF0099",
    image: "/creators/vishal-shastri.jpg",
  },
  {
    name: "Harsh Thakur",
    handle: "the_harshhthakur",
    insta: "https://www.instagram.com/the_harshhthakur",
    followers: "200K+",
    color: "#FF6600",
    image: "/creators/harsh-thakur.jpg",
  },
  {
    name: "Sunny Gupta",
    handle: "sunny_gupta__",
    insta: "https://www.instagram.com/sunny_gupta__/",
    followers: "115K+",
    color: "#FFAA00",
    image: "/creators/sunny-gupta.jpg",
  },
  {
    name: "Pink Smile",
    handle: "pinksmile14_",
    insta: "https://www.instagram.com/pinksmile14_",
    followers: "180K+",
    color: "#FF44BB",
    image: "/creators/pink-smile.jpg",
  },
  {
    name: "Yash Khatu",
    handle: "yash_in_rush",
    insta: "https://www.instagram.com/yash_in_rush",
    followers: "44K+",
    color: "#00DD88",
    image: "/creators/yash-khatu.jpg",
    imgFilter: "brightness(1.35) contrast(1.05)",
  },
  {
    name: "Ayush Khandekar",
    handle: "buntastic_29",
    insta: "https://www.instagram.com/buntastic_29/",
    followers: "22K+",
    color: "#7755FF",
    image: "/creators/ayush-khandekar.jpg",
  },
  {
    name: "Anshuman Sandhu",
    handle: "theanshmansandhu",
    insta: "https://www.instagram.com/theanshmansandhu",
    followers: "20K+",
    color: "#FF5500",
    image: "/creators/anshman-sandhu.jpg",
  },
  {
    name: "Prabal Bhatt",
    handle: "prabalbhatt16",
    insta: "https://www.instagram.com/prabalbhatt16/",
    followers: "49K+",
    color: "#00CCFF",
    image: "/creators/prabal-bhatt.jpg",
  },
];

function CreatorCard({ creator, index }: { creator: typeof creators[0]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const initials = creator.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      className="creator-card relative flex-shrink-0 w-[265px] md:w-[300px] h-[400px] md:h-[450px] rounded-3xl overflow-hidden cursor-pointer group border-0 bg-transparent"
      style={{
        boxShadow: hovered
          ? `0 0 0 1px ${creator.color}55, 0 20px 60px ${creator.color}30, 0 0 40px ${creator.color}15`
          : `0 0 0 1px ${creator.color}25, 0 8px 40px ${creator.color}12`,
        transform: hovered ? "scale(1.04) translateY(-4px)" : "scale(1) translateY(0)",
        transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo or gradient fallback */}
      {!imgError ? (
        <img
          src={creator.image}
          alt={creator.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: creator.imgObjectPosition ?? "center top",
            filter: creator.imgFilter,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${creator.color}40 0%, #050505 70%)`,
          }}
        >
          <span className="text-[110px] font-black select-none" style={{ color: `${creator.color}30` }}>
            {initials}
          </span>
        </div>
      )}

      {/* Dark scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.45) 38%, rgba(5,5,5,0.0) 100%)",
        }}
      />

      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${creator.color}, transparent)`,
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Hover inner glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 80px ${creator.color}${hovered ? "22" : "00"}`,
          transition: "box-shadow 0.4s ease",
        }}
      />


      {/* Bottom content */}
      <CardContent className="absolute bottom-0 left-0 right-0 p-0">
        <div className="px-5 pb-1 pt-4">
          <p
            className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-1.5"
            style={{ color: creator.color }}
          >
            @{creator.handle}
          </p>
          <h3 className="text-[22px] font-black text-white leading-tight tracking-tight">
            {creator.name}
          </h3>
        </div>

        <CardFooter className="px-5 py-4 flex items-center justify-between">
          {creator.followers !== "Growing" ? (
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white/8 text-white/60 border-0"
            >
              {creator.followers} followers
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase"
              style={{
                background: `${creator.color}18`,
                color: creator.color,
                borderColor: `${creator.color}35`,
              }}
            >
              Rising ↑
            </Badge>
          )}

          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={creator.insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-btn relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group/insta"
                  style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.18)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Default ring */}
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${creator.color}20`, border: `1px solid ${creator.color}50` }}
                  />
                  {/* Instagram gradient on hover */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover/insta:opacity-100"
                    style={{
                      background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  {/* Glow behind */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover/insta:opacity-100 blur-sm -z-10"
                    style={{
                      background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                      transition: "opacity 0.3s ease",
                    }}
                  />
                  <Instagram className="relative z-10 w-4 h-4 text-white drop-shadow-sm" />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="text-[11px] font-semibold tracking-wide px-3 py-1.5"
                style={{
                  background: "linear-gradient(135deg, #e6683c, #dc2743, #bc1888)",
                  border: "none",
                  color: "#fff",
                }}
              >
                Follow on Instagram
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default function Creators() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    const track  = trackRef.current;
    if (!outer || !sticky || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollDist = () => track.scrollWidth - sticky.offsetWidth;

      const setHeight = () => {
        outer.style.height = `${sticky.offsetHeight + getScrollDist()}px`;
      };
      setHeight();

      const tween = gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${getScrollDist()}`,
          pin: sticky,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: setHeight,
        },
      });

      // Heading reveal
      if (labelRef.current) {
        gsap.from(labelRef.current, {
          x: -24, opacity: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: outer, start: "top 80%" },
        });
      }
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          x: -30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: outer, start: "top 80%" },
        });
      }

      // Per-card reveal
      const cards = track.querySelectorAll<HTMLElement>(".creator-card");
      cards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.85,
          y: 40,
          filter: "blur(8px)",
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 92%",
            end: "left 58%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── DESKTOP: GSAP pinned horizontal scroll ── */}
      <div id="creators" ref={outerRef} className="hidden md:block relative bg-[#050505]">
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center"
        >
          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(0,102,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
          />

          {/* Left panel: compact — 26vw */}
          <div className="absolute inset-y-0 left-0 w-[26vw] flex flex-col items-start justify-center z-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #050505 72%, transparent 100%)" }}
            />
            <div className="relative z-10 pointer-events-auto pl-12">
              <p ref={labelRef} className="text-xs font-semibold tracking-[0.35em] uppercase text-[#0066FF] mb-3">
                The Roster
              </p>
              <h2 ref={headingRef} className="text-5xl xl:text-6xl font-black text-white leading-none">
                Our<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#FF0099]">
                  Creators
                </span>
              </h2>
              <div className="mt-8 flex items-center gap-2 text-white/25 text-xs tracking-widest uppercase">
                <div className="w-6 h-px bg-white/20" />
                scroll to explore
                <div className="w-6 h-px bg-white/20" />
              </div>
            </div>
          </div>

          {/* Track — pl-[26vw] ensures first card is fully visible on entry */}
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-[26vw] pr-32 will-change-transform"
            style={{ width: "max-content" }}
          >
            {creators.map((c, i) => (
              <CreatorCard key={c.handle} creator={c} index={i} />
            ))}

          </div>
        </div>
      </div>

      {/* ── MOBILE: snap horizontal scroll ── */}
      <section id="creators" className="md:hidden py-20 bg-[#050505] overflow-hidden">
        <div className="px-5 mb-10">
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#0066FF] mb-2">
            The Roster
          </p>
          <h2 className="text-4xl font-black text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#FF0099]">
              Creators
            </span>
          </h2>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 px-5 scrollbar-hide">
          {creators.map((c, i) => (
            <div key={c.handle} className="snap-center flex-shrink-0">
              <CreatorCard creator={c} index={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
