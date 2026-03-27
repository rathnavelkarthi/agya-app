import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal flex flex-col items-center justify-center py-20 md:py-28 px-6 border-t border-white/[0.04]">
      {/* Logo */}
      <div className="font-heading text-lg tracking-[0.4em] text-gold-light/80 mb-10">
        AGYA
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14">
        {["Privacy", "Terms", "Shipping", "Sustainability"].map((text) => (
          <Link
            key={text}
            href="#"
            className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-gold-light/60 transition-colors duration-500"
          >
            {text}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-14" />

      {/* Copyright */}
      <div className="text-[9px] tracking-[0.3em] uppercase text-white/20">
        &copy; 2025 AGYA Laboratories
      </div>
    </footer>
  );
}
