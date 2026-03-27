import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-cream flex flex-col items-center justify-center py-20 md:py-28 px-6 border-t border-text-primary/[0.04]">
      {/* Logo */}
      <div className="font-heading text-lg tracking-[0.4em] text-gold-dark mb-10">
        AGYA
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-14">
        {["Privacy", "Terms", "Shipping", "Sustainability"].map((text) => (
          <Link
            key={text}
            href="#"
            className="text-[10px] tracking-[0.2em] uppercase text-text-muted hover:text-gold-dark transition-colors duration-500"
          >
            {text}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-dark/20 to-transparent mb-14" />

      {/* Copyright */}
      <div className="text-[9px] tracking-[0.3em] uppercase text-text-muted">
        &copy; 2025 AGYA Laboratories
      </div>
    </footer>
  );
}
