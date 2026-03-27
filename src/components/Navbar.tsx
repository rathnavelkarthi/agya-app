"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "The Ritual", href: "/quiz" },
  { label: "Skin Analysis", href: "/scan" },
  { label: "Collections", href: "/shop" },
  { label: "Boutique", href: "/builder" },
];

export default function Navbar() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-5 w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="font-heading text-xl tracking-[0.35em] text-gold-dark transition-colors duration-500"
          >
            AGYA
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex gap-8 items-center ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`tracking-[0.15em] uppercase text-[10px] font-medium transition-all duration-500 ${
                  pathname === link.href
                    ? "text-gold-dark border-b border-gold-dark/40 pb-1"
                    : "text-text-secondary hover:text-gold-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="relative text-text-secondary hover:text-gold-dark hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" x2="21" y1="6" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          <Link
            href="/dashboard"
            className="text-text-secondary hover:text-gold-dark hover:scale-110 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md text-text-secondary hover:text-gold-dark transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <line x1="4" x2="20" y1="7" y2="7" />
                <line x1="4" x2="16" y1="12" y2="12" />
                <line x1="4" x2="12" y1="17" y2="17" />
              </svg>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-charcoal border-l border-white/[0.04] w-80"
            >
              <div className="flex flex-col gap-8 mt-16 px-4">
                <div className="font-heading text-lg tracking-[0.35em] text-gold-light mb-8">
                  AGYA
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`tracking-[0.15em] uppercase text-xs transition-colors duration-300 ${
                      pathname === link.href
                        ? "text-gold-light"
                        : "text-white/40 hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-white/[0.04] pt-8 mt-4">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="tracking-[0.15em] uppercase text-xs text-gold-light/60 hover:text-gold-light transition-colors"
                  >
                    Account
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
