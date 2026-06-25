import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const moiLogo  = "/moi-icon.png";
const fullLogo = "/moi-full-logo.png";

function MobileMenu({
  open,
  onClose,
  navLinks,
  scrollTo,
  navigate,
  isStaticPage,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; isPage?: boolean }[];
  scrollTo: (id: string) => void;
  navigate: (path: string) => void;
  isStaticPage?: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleClick = (link: { href: string; isPage?: boolean }) => {
    onClose();
    if (link.isPage) {
      navigate(link.href);
    } else if (isStaticPage) {
      navigate("/");
      setTimeout(() => {
        document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      scrollTo(link.href);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center gap-8"
      style={{ zIndex: 9999 }}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
        aria-label="Close menu"
      >
        <X size={28} />
      </button>

      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.isPage ? link.href : undefined}
          onClick={(e) => { e.preventDefault(); handleClick(link); }}
          className="text-3xl font-black text-white/80 hover:text-white transition-colors"
        >
          {link.name}
        </a>
      ))}

      <Button
        onClick={() => { onClose(); if (isStaticPage) { navigate("/"); setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 400); } else scrollTo("#contact"); }}
        size="lg"
        className="bg-gradient-to-r from-[#0066FF] to-[#FF0099] text-white w-52 mt-4 rounded-full font-bold"
      >
        Let's Talk
      </Button>
    </div>,
    document.body
  );
}

export default function Navbar({ isStaticPage }: { isStaticPage?: boolean }) {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoKey, setLogoKey]               = useState(0);
  const [, navigate]                        = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        setLogoKey((k) => k + 1);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: "About",     href: "#about" },
    { name: "Services",  href: "#services" },
    { name: "Creators",  href: "#creators" },
    { name: "Partners",  href: "#partners" },
    { name: "Impact",    href: "#impact" },
    { name: "Our Works", href: "/our-works", isPage: true },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (link: { href: string; isPage?: boolean }) => {
    if (link.isPage) {
      navigate(link.href);
    } else if (isStaticPage) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }, 400);
    } else {
      scrollTo(link.href);
    }
  };

  const handleLetsTalk = () => {
    if (isStaticPage) {
      navigate("/");
      setTimeout(() => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } else {
      scrollTo("#contact");
    }
  };

  return (
    <>
      {/* ── Floating pill wrapper ── */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto w-full max-w-5xl flex items-center justify-between rounded-full border border-white/10 px-4 py-2 transition-all duration-500"
          style={{
            background: isScrolled
              ? "rgba(8,8,8,0.92)"
              : "rgba(12,12,12,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isScrolled
              ? "0 4px 40px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 2px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="relative z-10 flex items-center shrink-0"
            data-testid="link-navbar-home"
          >
            <motion.img
              key={logoKey}
              src={isScrolled ? moiLogo : fullLogo}
              alt={isScrolled ? "MOI" : "MadeOverInfluence"}
              initial={{ opacity: 0, x: isScrolled ? 10 : -10, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`object-contain ${isScrolled ? "h-10" : "h-11"}`}
              data-testid="img-navbar-logo"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200 uppercase"
                data-testid={`link-nav-${link.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden md:block shrink-0">
            <button
              onClick={handleLetsTalk}
              className="h-9 px-5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#FF0099] text-white text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
              data-testid="button-nav-contact"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-10 text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </div>

      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        scrollTo={scrollTo}
        navigate={navigate}
        isStaticPage={isStaticPage}
      />
    </>
  );
}
