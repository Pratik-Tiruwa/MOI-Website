import moiLogo from "@assets/image_1776962839021.png";
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#030303] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <img src={moiLogo} alt="MOI Logo" className="h-10 mb-6" data-testid="img-footer-logo" />
            <p className="text-white/40 max-w-sm font-light leading-relaxed text-sm mb-8">
              A creator-first talent management and influencer marketing agency built to scale long-term creator careers — not just close one-off campaigns.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/madeoverinfluence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#FF0099] hover:border-[#FF0099]/30 hover:bg-[#FF0099]/5 transition-all"
                data-testid="link-footer-instagram"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://linkedin.com/company/madeoverinfluence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 transition-all"
                data-testid="link-footer-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://twitter.com/madeoverinfluence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                data-testid="link-footer-twitter"
                aria-label="Twitter / X"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://facebook.com/madeoverinfluence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#0066FF] hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 transition-all"
                data-testid="link-footer-facebook"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: "About Us", id: "#about" },
                { label: "Why MOI", id: "#why" },
                { label: "Services", id: "#services" },
                { label: "Creators", id: "#creators" },
                { label: "Partners", id: "#partners" },
                { label: "Contact", id: "#contact" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-white/40 hover:text-white transition-colors text-sm cursor-pointer"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Contact</h4>
            <ul className="space-y-5">
              <li>
                <a
                  href="mailto:userpc0498@gmail.com"
                  className="flex items-start gap-3 text-white/40 hover:text-white transition-colors group"
                  data-testid="link-footer-email"
                >
                  <Mail size={15} className="shrink-0 mt-0.5 group-hover:text-[#0066FF] transition-colors" />
                  <span className="text-sm leading-relaxed">userpc0498@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918828031506"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
                  data-testid="link-footer-phone"
                >
                  <Phone size={15} className="shrink-0 group-hover:text-[#FF0099] transition-colors" />
                  <span className="text-sm">+91 88280 31506</span>
                </a>
              </li>
              <li className="text-white/40 text-sm">
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {currentYear} MadeOverInfluence (MOI). All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Suraj Saboji — Founder
          </p>
        </div>
      </div>
    </footer>
  );
}
