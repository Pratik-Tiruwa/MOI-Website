import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion"; 
import { X, Play, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

const brandDeals = [
  {
    id: 1,
    brand: "Airtel",
    category: "Telecom",
    tag: "Awareness",
    accent: "#FF0099",
    description: "Protecting users from online scams through authentic creator storytelling for Airtel's digital safety initiative.",
    videoSrc: "/videos/airtel-brand-deal.mp4",
  },
  {
    id: 2,
    brand: "RYZE",
    category: "Health & Wellness",
    tag: "Performance",
    accent: "#0066FF",
    description: "High-energy creator campaign targeting UP audience with relatable regional content and Amazon CTA.",
    videoSrc: "/videos/ryze-brand-deal.mp4",
  },
  {
    id: 3,
    brand: "Avimee Herbal",
    category: "Beauty",
    tag: "Brand Awareness",
    accent: "#7755FF",
    description: "Before-after creator content for Avimee Herbal's hair care range driving organic discovery and trust.",
    videoSrc: "/videos/avimee-herbal.mp4",
  },
  {
    id: 4,
    brand: "Creator Collab",
    category: "Lifestyle",
    tag: "Engagement",
    accent: "#FF0099",
    description: "Emotional storytelling reel featuring a delivery partner's journey — driving massive engagement and brand recall.",
    videoSrc: "/videos/delivery-partner.mp4",
  },
  {
    id: 5,
    brand: "Creator Collab",
    category: "Fashion",
    tag: "Brand Content",
    accent: "#0066FF",
    description: "High-concept cinematic reel — premium content that blends storytelling with brand aesthetics.",
    videoSrc: "/videos/ending-beginning.mp4",
  },
  {
    id: 6,
    brand: "Fitness Brand",
    category: "Fitness",
    tag: "Performance",
    accent: "#7755FF",
    description: "30-day fitness challenge series promoting muscle gain supplements with health-focused audiences.",
    videoSrc: "/videos/muscle-gains.mp4",
  },
  {
    id: 7,
    brand: "Licious",
    category: "Food",
    tag: "Brand Story",
    accent: "#FF0099",
    description: "Marketing case study reel for Licious breaking down their campaign strategy through creator storytelling.",
    videoSrc: "/videos/licious-campaign.mp4",
  },
  {
    id: 8,
    brand: "Airtel × BTS",
    category: "Telecom",
    tag: "Viral Content",
    accent: "#0066FF",
    description: "BTS ARMY creator moment — blending K-pop fandom culture with telecom brand recall for massive organic reach.",
    videoSrc: "/videos/airtel-bts.mp4",
  },
  {
    id: 9,
    brand: "Food Brand",
    category: "Food",
    tag: "Product Launch",
    accent: "#FF5500",
    description: "Cheese burst product reveal with a twist ending — driving cravings and purchase intent through satisfying content.",
    videoSrc: "/videos/cheese-burst.mp4",
  },
  {
    id: 10,
    brand: "Creator Spotlight",
    category: "Lifestyle",
    tag: "Creator Content",
    accent: "#7755FF",
    description: "Polished creator spotlight reel elevating personal brands and driving engagement for top-tier creators.",
    videoSrc: "/videos/creator-video-400.mp4",
  },
  {
    id: 11,
    brand: "Aegis IRX",
    category: "Lifestyle",
    tag: "Brand Awareness",
    accent: "#0066FF",
    description: "Fast-paced lifestyle reel for Aegis IRX sunscreen — relatable storytelling that drives urgency and purchase intent through creator-native content.",
    videoSrc: "/videos/aegis-irx.mp4",
  },
  {
    id: 12,
    brand: "Gill",
    category: "Lifestyle",
    tag: "Engagement",
    accent: "#FF0099",
    description: "Friend-group relatable reel for Gill — tapping into shared social moments to drive brand recall and aspirational positioning with a young audience.",
    videoSrc: "/videos/gill-brand.mp4",
  },
  {
    id: 13,
    brand: "Atharva Ruke",
    category: "Entertainment",
    tag: "Viral Content",
    accent: "#7755FF",
    description: "High-engagement Marathi content by Atharva Ruke — 'Kunda Aatya is Back' series delivering massive reach through culturally resonant storytelling.",
    videoSrc: "/videos/kunda-aatya.mp4",
  },
  {
    id: 14,
    brand: "Brand Deal",
    category: "Lifestyle",
    tag: "Performance",
    accent: "#FF5500",
    description: "High-quality brand integration reel — seamlessly weaving product storytelling into creator content for authentic, non-intrusive brand promotion.",
    videoSrc: "/videos/brand-deal-v1.mp4",
  },
];



function VideoModal({ deal, onClose }: { deal: typeof brandDeals[0]; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[9000] p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm z-10"
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video */}
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{ boxShadow: `0 0 80px ${deal.accent}30, 0 0 0 1px ${deal.accent}20` }}
          >
            {/* Close button — inside the card */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition-all text-xs font-semibold tracking-wider border border-white/10"
            >
              <X size={12} /> ESC
            </button>

            <video
              ref={videoRef}
              src={deal.videoSrc}
              className="w-full h-auto block max-h-[80vh]"
              controls
              playsInline
              preload="metadata"
            />

            {/* Bottom bar */}
            <div className="bg-[#0a0a0a] px-5 py-4 flex items-center justify-between border-t border-white/5">
              <div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: deal.accent }}
                >
                  {deal.category} · {deal.tag}
                </span>
                <h3 className="text-base font-black text-white mt-0.5">{deal.brand}</h3>
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${deal.accent}20`, border: `1px solid ${deal.accent}30` }}
              >
                <Play size={12} fill={deal.accent} color={deal.accent} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoCard({
  deal,
  onClick,
  index,
  featured = false,
}: {
  deal: typeof brandDeals[0];
  onClick: () => void;
  index: number;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isHovered) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [isHovered]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow: isHovered ? `0 20px 60px ${deal.accent}20` : "none" }}
    >
      {/* Accent border on hover */}
      <div
        className="absolute inset-0 rounded-2xl z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: `inset 0 0 0 1px ${deal.accent}50`,
        }}
      />

      {/* Video */}
      <div className={`relative bg-[#0a0a0a] overflow-hidden ${featured ? "aspect-[4/3]" : "aspect-[9/16]"}`}>
        <video
          ref={videoRef}
          src={deal.videoSrc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          muted
          playsInline
          preload="metadata"
          loop
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300" />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${deal.accent}20 0%, transparent 70%)` }}
        />

        {/* Top row */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <span
            className="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full backdrop-blur-md"
            style={{
              background: `${deal.accent}18`,
              color: deal.accent,
              border: `1px solid ${deal.accent}35`,
            }}
          >
            {deal.category}
          </span>
          <span className="text-[11px] font-bold text-white/20 tabular-nums">{num}</span>
        </div>

        {/* Play button — center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              background: `${deal.accent}30`,
              border: `1.5px solid ${deal.accent}60`,
              boxShadow: isHovered ? `0 0 30px ${deal.accent}50` : `0 0 12px ${deal.accent}20`,
            }}
            animate={{ scale: isHovered ? 1.12 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            <Play size={16} className="ml-0.5" fill="white" color="white" />
          </motion.div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p
                className="text-[10px] font-semibold tracking-widest uppercase mb-1 opacity-70"
                style={{ color: deal.accent }}
              >
                {deal.tag}
              </p>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">{deal.brand}</h3>
            </div>
            <motion.div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center shrink-0 border border-white/10"
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUpRight size={13} className="text-white/60" />
            </motion.div>
          </div>

          {/* Description — always visible on mobile, hover-only on desktop */}
          <p className="text-white/50 text-xs leading-relaxed mt-2 line-clamp-2 sm:hidden">
            {deal.description}
          </p>
          <motion.p
            className="hidden sm:block text-white/50 text-xs leading-relaxed mt-2 line-clamp-2"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
            transition={{ duration: 0.25 }}
          >
            {deal.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function OurWorksPage() {
  const [, navigate] = useLocation();
  const [activeModal, setActiveModal] = useState<typeof brandDeals[0] | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-foreground selection:bg-[#0066FF] selection:text-white">
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar isStaticPage />

      <main className="pt-20 sm:pt-28 pb-16 sm:pb-24">

        {/* ── Hero ── */}
        <div className="container mx-auto px-4 md:px-8 mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-6 h-[1.5px] bg-[#FF0099]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#FF0099]">
                Our Works
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.0] tracking-tight text-white mb-6">
              Work That
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#7755FF] to-[#FF0099]">
                Speaks Louder.
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-8 pt-8 border-t border-white/5">
              <p className="text-white/35 text-sm sm:text-base max-w-sm leading-relaxed font-light">
                Real campaigns. Real creators. Real results — every frame tells a story of influence.
              </p>
              <div className="flex gap-6 sm:gap-10 shrink-0">
                {[
                  { value: "70M+", label: "Total Reach" },
                  { value: "40+", label: "Brands" },
                  { value: "70+", label: "Creators" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-3xl font-black text-white">{s.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/25 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Brand Ticker ── */}
        <div className="relative overflow-hidden border-y border-white/5 py-4 mb-10 md:mb-16">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].flatMap(() => [
              "Airtel", "·", "Licious", "·", "RYZE", "·", "Avimee Herbal", "·",
              "Airtel × BTS", "·", "Fitness Brand", "·", "Food Brand", "·", "Creator Collab", "·",
            ]).map((item, i) => (
              <span
                key={i}
                className={
                  item === "·"
                    ? "mx-4 text-white/10 text-sm"
                    : "mx-6 text-[11px] font-bold tracking-[0.25em] uppercase text-white/20 hover:text-white/60 transition-colors duration-300"
                }
              >
                {item}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: "linear-gradient(90deg, #050505, transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: "linear-gradient(270deg, #050505, transparent)" }} />
        </div>

        {/* ── Grid ── */}
        <div className="container mx-auto px-4 md:px-8">
          {/* Ambient glows */}
          <div className="relative">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "#0066FF", filter: "blur(160px)", opacity: 0.04 }} />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "#FF0099", filter: "blur(160px)", opacity: 0.04 }} />

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {brandDeals.map((deal, i) => (
                <div key={deal.id} className="break-inside-avoid">
                  <VideoCard
                    deal={deal}
                    index={i}
                    onClick={() => setActiveModal(deal)}
                    featured={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="container mx-auto px-4 md:px-8 mt-16 md:mt-28">
          <motion.div
            className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 p-8 sm:p-12 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #0d0a18 50%, #0a0a0a 100%)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, #7755FF15 0%, transparent 60%)" }} />
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/30 mb-4">Ready to create impact?</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 sm:mb-8">
              Let's Build Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#FF0099]">
                Next Campaign.
              </span>
            </h2>
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-full bg-white text-[#050505] text-sm font-black tracking-wide hover:bg-white/90 transition-colors"
            >
              Work With MOI <ArrowUpRight size={15} />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />

      {activeModal && (
        <VideoModal deal={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
