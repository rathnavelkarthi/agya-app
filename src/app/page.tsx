"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Data ─── */

const products = [
  {
    name: "Cellular Elixir No. 4",
    type: "Regenerative Oil",
    price: "₹185",
    benefit:
      "A bio-adaptive oil that recalibrates your skin's lipid barrier overnight. Infused with squalane, bakuchiol, and our proprietary peptide complex.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQSSvKYA8Twt8fHCDARIOFw83OBGLWMs7A7Oj9aNvddFwO9IX0yWXg7ABtJtITL2UTusuU3s-PtI9rUyauHMFiMoOTb54hhRFz1YaDEfcKXloYsuayMnejGI87CO7vigLmjJOXHgURoOIMzadlJbAXPWTGcZzrgLLwYI14QOibHfzApbZmW8O2i7uhRr3_tcbkg8jPZeo1W2nxuexqo3CpBCnAOy0STsN69x-lL0BE-Fqz4_eoRiRMGzgN5siQBGQ4S86MkuHvK5M",
  },
  {
    name: "Molecular Repair Balm",
    type: "Intense Hydration",
    price: "₹210",
    benefit:
      "Deep-penetrating ceramide complex that restores the moisture matrix at a cellular level. For skin that feels reborn by morning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIMQtgPLBvTwzgT6ZcQCqrTmDVCaxsWum3pVtwNoGHhUOnx95ysm-88X7Qgpa1godXHbBoMi-U2cy9HtPQ8qogxr3IOlQDfHr8uTJuGDiaR_afrG-REkoOz8cDdcjfsMUFZvgmxsjwQB7YTEkJDzxKuuDWj4hV3cwWhykoT7eQABahyTRh8oD5gXGD7VRXlCajy5okPI0fx7_BlHdnuMBCCsU0Ol0BtzE1LBoq2YAXlprLc0wX6kxXZa0VqGyDjd1Fsdrp8U-2uyg",
  },
  {
    name: "The DNA Serum",
    type: "Personalized Base",
    price: "₹245",
    benefit:
      "Your unique formula. Engineered from 40+ skin variables and recalibrated each season. The pinnacle of personalized skincare.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoycCn4dZIixtE4Lj_8f24JFT-zQBUqEBkPIob27mAdwalESwKPgFrEuDNUYoovpjKWg6URTKug6Ed_RACnhYMNNxIQA85GihshXmYMw99JqOPK6Dc2w45lpGCMSPUkts4_xoyDQgPbQTBENDW0BEW7iwIhF2-K53P9IOVsxdmmU8oHt7RwTuggoScDaXbCDrN6HCfQrwu4R6d-z6fjupy4ko4VB4mkOoXFriLTOIjXMLf8000735mgKjP7KjjfIX9krxdcRWztzs",
  },
];

const stats = [
  { value: "94%", label: "Visible Glow" },
  { value: "88%", label: "Fine Line Reduction" },
  { value: "100%", label: "Clean Ingredients" },
];

const ingredients = [
  { name: "Saffron", origin: "Kashmir Valley", benefit: "Radiance & tone" },
  {
    name: "Rose Absolute",
    origin: "Grasse, France",
    benefit: "Deep hydration",
  },
  { name: "Aloe Ferox", origin: "South Africa", benefit: "Barrier repair" },
];

/* ─── Animation Variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay,
    },
  }),
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

/* ─── Scroll Progress Ring ─── */

function SkinScoreRing({ score }: { score: number }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div ref={containerRef} className="relative w-44 h-44 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(214,185,140,0.1)"
          strokeWidth="1.5"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#goldGradientRing)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isInView ? offset : circumference}
          style={{
            transition:
              "stroke-dashoffset 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
        <defs>
          <linearGradient
            id="goldGradientRing"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#D6B98C" />
            <stop offset="50%" stopColor="#E6CFA7" />
            <stop offset="100%" stopColor="#D6B98C" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-heading text-5xl text-gold-light"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {isInView ? score : 0}
        </motion.span>
        <span className="text-[9px] uppercase tracking-[0.3em] text-gold-light/50 mt-1">
          skin score
        </span>
      </div>
    </div>
  );
}

/* ─── Parallax Product Image ─── */

function ParallaxProduct({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left - rect.width / 2) / 20;
    const py = (e.clientY - rect.top - rect.height / 2) / 20;
    x.set(px);
    y.set(py);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="relative w-72 h-[460px] lg:w-80 lg:h-[520px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent rounded-full blur-3xl scale-75 animate-float-slow" />
      <motion.img
        className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(214,185,140,0.25)] animate-float"
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ─── Animated Counter ─── */

function AnimatedStat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const num = parseInt(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = num;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, num]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-heading text-7xl md:text-8xl text-gradient-gold mb-3">
        {isInView ? count : 0}%
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
        {label}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE — LUXURY CINEMATIC MOBILE-FIRST
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <>
      {/* ═══ 1. HERO — FULL SCREEN CINEMATIC ═══ */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] flex flex-col justify-end overflow-hidden"
      >
        {/* Background with parallax zoom */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOZmkRaiUOOHZvhoqec8HnZvwi6YmXJ-8UgRHcBh-tMbDY9GhFmsjPTTjySzjnhNqrSCCpaVfHzG_dl9-0WdSjnvKReUvnIpRf7UjD3VqlLWQX-ws8rHdlSrPpmdORvbz70z_UsTvgR7EhoiBprPj4BFU0zz2OtSsgFAMRRJ3RsCTNWrQc9FlV5efYjsM9ctJ5qVbWj29TvAOdb0bIdfW9VIo6aplD8CM-7ka84U4zACkTAL2kWgFFojIgRY6_uYz3KQhiwI3faNo"
            alt="Abstract water ripples with gold lighting"
          />
          {/* Dark cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
          <div className="absolute inset-0 bg-charcoal/40" />
          {/* Subtle gold shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3 animate-gradient opacity-50" />
        </motion.div>

        {/* Hero Content — bottom-aligned for mobile drama */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pb-14 md:pb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            {/* Left — Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-gold-light/60 mb-6 md:mb-8 block"
              >
                Future of Apothecary
              </motion.span>

              {/* Headline — dramatically large */}
              <motion.h1
                variants={fadeUp}
                custom={0.1}
                className="mb-6 md:mb-8"
              >
                <span className="font-heading text-[3.2rem] leading-[0.95] md:text-7xl lg:text-8xl xl:text-[7rem] font-bold text-white block">
                  Skin,
                  <br />
                  perfected.
                </span>
                <span className="font-heading text-2xl md:text-4xl lg:text-5xl font-normal italic text-gold-light/80 leading-[1.3] block mt-3 md:mt-4">
                  by nature and intelligence.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="text-sm md:text-base text-white/50 leading-relaxed mb-8 md:mb-10 max-w-sm font-light tracking-wide"
              >
                Personalized skincare engineered
                <br className="md:hidden" /> for your unique skin.
              </motion.p>

              {/* CTA — Full width on mobile */}
              <motion.div
                variants={fadeUp}
                custom={0.35}
                className="space-y-3 md:space-y-0 md:flex md:gap-4"
              >
                <Link href="/quiz" className="block w-full md:w-auto">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold-glow w-full md:w-auto h-14 px-10 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-xl uppercase tracking-[0.2em] text-[11px] font-semibold hover:scale-[1.02] transition-all duration-500 shadow-[0_20px_60px_rgba(214,185,140,0.35)]"
                  >
                    Start Your Skin Journey
                  </motion.button>
                </Link>
                <Link href="/shop" className="block w-full md:w-auto">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto h-14 px-10 border border-white/15 text-white/70 rounded-xl uppercase tracking-[0.2em] text-[11px] font-medium hover:border-gold-light/30 hover:text-gold-light transition-all duration-500 backdrop-blur-sm"
                  >
                    Explore Products
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — Floating Product (desktop) */}
            <div className="hidden md:flex justify-center items-end">
              <ParallaxProduct
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSKs74w5P1Il4nfq5V6FuPO1M-WAQqAAtCuxaNUUD2BypUeWhliwjCkozSw7093NQ2SHQzzKPjqjjgF6vC36ljjO2xUvLycE0CibAWhk1mfsFK5-CoHv2VdXbkzMaWCSjI1pS11A1J4ahel0NybTSKG0I1-IulbuiS0X0DTS6A3vqvdWShQLtYUTDOWUwyieASPO78TfoYucMU-NA-DXi9ot3qkNy7p6-GU4rxvg0d-40d1o9Q-M_rEcfkOaMPgPyVvyXk4LWdXz8"
                alt="Luxury frosted glass serum bottle"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:hidden"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-6 bg-gradient-to-b from-gold-light/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══ 2. TRUST STRIP — Minimal ═══ */}
      <section className="py-6 md:py-10 bg-charcoal border-y border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex overflow-x-auto gap-8 md:gap-0 md:justify-between items-center scrollbar-none pb-1"
          >
            {[
              "100% Organic",
              "No Harmful Chemicals",
              "Dermatologically Backed",
              "Personalized Formulations",
            ].map((item) => (
              <span
                key={item}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/30 whitespace-nowrap flex-shrink-0"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. SKIN PROFILE — Full Width Feature Block ═══ */}
      <section className="py-20 md:py-36 bg-charcoal relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-20"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-light/40 mb-5 block">
              Your Unique Blueprint
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
              Your Skin Profile
            </h2>
          </motion.div>

          {/* Profile — clean, no card borders */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-lg mx-auto"
          >
            {/* Score Ring */}
            <div className="mb-14">
              <SkinScoreRing score={82} />
              <div className="mt-5 text-center">
                <div className="text-[9px] uppercase tracking-[0.3em] text-gold-light/40 mb-1">
                  Skin Health
                </div>
                <div className="text-sm text-white/60 font-heading">
                  Above Average
                </div>
              </div>
            </div>

            {/* Key Details — minimal */}
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center border-b border-white/[0.06] pb-5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/40">
                  Skin Type
                </span>
                <span className="text-white/80 font-heading text-lg">
                  Combination
                </span>
              </div>
              <div className="border-b border-white/[0.06] pb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/40">
                    Key Concerns
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Dehydration", "Fine Lines", "Uneven Tone"].map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.15em] bg-gold/[0.08] text-gold-light/70 border border-gold/[0.1]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/40">
                  Recommended
                </span>
                <span className="text-white/50 text-sm text-right max-w-[200px] leading-relaxed">
                  Hyaluronic Acid, Niacinamide, Retinol
                </span>
              </div>
            </div>

            {/* CTA — Full width */}
            <Link href="/quiz" className="block">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="btn-gold-glow w-full h-14 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-xl uppercase tracking-[0.2em] text-[11px] font-semibold transition-all duration-500 shadow-[0_20px_60px_rgba(214,185,140,0.2)]"
              >
                Unlock Your Skin Profile
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. PERSONALIZATION — Emotional Story ═══ */}
      <section className="py-20 md:py-36 bg-cream relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-[9px] uppercase tracking-[0.5em] text-gold-dark/60 mb-6 block">
                AI-Powered Precision
              </span>
              <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl mb-6 text-text-primary">
                Not skincare.
                <br />
                <span className="italic text-gradient-gold">
                  Your skincare.
                </span>
              </h2>
              <p className="text-text-secondary mb-10 leading-relaxed text-base max-w-md">
                Using proprietary AI skin-mapping, we analyze over 40 variables
                in your environmental and genetic profile to engineer a formula
                that evolves with you.
              </p>
              <Link href="/quiz" className="block w-full md:w-auto">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto h-14 px-10 bg-text-primary text-cream rounded-xl uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-gold-dark hover:text-white transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
                >
                  Take Skin Analysis
                </motion.button>
              </Link>
            </motion.div>

            {/* Interactive Mock */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="bg-white rounded-2xl p-6 md:p-10 border border-[rgba(0,0,0,0.06)] shadow-[0_30px_60px_rgba(0,0,0,0.06)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[50px] -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-gold-dark/60">
                    Step 01 / Analysis
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-6 h-[2px] bg-gold rounded-full" />
                    <div className="w-6 h-[2px] bg-[rgba(0,0,0,0.08)] rounded-full" />
                    <div className="w-6 h-[2px] bg-[rgba(0,0,0,0.08)] rounded-full" />
                  </div>
                </div>

                <h3 className="font-heading text-xl md:text-2xl mb-5 text-text-primary">
                  What is your primary concern?
                </h3>

                <div className="space-y-2.5">
                  {[
                    "Fine lines & Elasticity",
                    "Hydration & Glow",
                    "Uneven Texture",
                  ].map((opt, i) => (
                    <div
                      key={opt}
                      className={`w-full text-left px-5 py-4 rounded-xl border text-sm flex justify-between items-center transition-all duration-300 ${
                        i === 1
                          ? "border-gold/40 bg-gold/[0.06] shadow-[0_0_30px_rgba(214,185,140,0.08)]"
                          : "border-[rgba(0,0,0,0.06)] bg-cream/50 hover:border-gold/20"
                      }`}
                    >
                      <span
                        className={
                          i === 1
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }
                      >
                        {opt}
                      </span>
                      {i === 1 && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-gold-dark"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M5 8l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 5. PRODUCT SHOWCASE — Scroll Story ═══ */}
      <section className="bg-cream-dark overflow-hidden">
        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-20 pt-20 pb-10 md:pt-36 md:pb-16 max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-dark/50 mb-4 block">
              The Collection
            </span>
            <div className="flex justify-between items-end">
              <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl text-text-primary">
                Signature
                <br className="md:hidden" /> Formulations
              </h2>
              <Link
                href="/shop"
                className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-gold-dark border-b border-gold-dark/20 pb-1 hover:border-gold-dark transition-colors duration-300"
              >
                View All
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Products — full-width storytelling blocks */}
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${i !== products.length - 1 ? "border-b border-[rgba(0,0,0,0.06)]" : ""}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24">
                {/* Image — Large */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Link href="/shop" className="block group">
                    <div className="relative aspect-[3/4] bg-white rounded-2xl flex items-center justify-center p-10 md:p-16 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gold/[0.03]" />
                      <img
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-transform duration-700 group-hover:scale-[1.03]"
                        src={p.img}
                        alt={p.name}
                      />
                    </div>
                  </Link>
                </motion.div>

                {/* Text — Strong hierarchy */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className={`${i % 2 === 1 ? "md:order-1" : ""} flex flex-col justify-center`}
                >
                  {/* Type label */}
                  <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted mb-3 block">
                    {p.type}
                  </span>

                  {/* Product name — serif, medium */}
                  <h3 className="font-heading text-2xl md:text-3xl mb-3 leading-[1.15] text-text-primary font-medium">
                    {p.name}
                  </h3>

                  {/* Description — sans, secondary color */}
                  <p className="text-text-secondary leading-relaxed mb-6 max-w-sm text-sm md:text-base">
                    {p.benefit}
                  </p>

                  {/* PRICE — visually dominant */}
                  <div className="mb-8">
                    <span className="font-heading text-3xl md:text-4xl font-semibold text-text-primary tracking-wide">
                      {p.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/shop"
                    className="block w-full md:w-auto"
                  >
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-xl text-[10px] uppercase tracking-[0.2em] font-semibold hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(214,185,140,0.2)]"
                    >
                      Customize
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Mobile: View all */}
        <div className="px-6 pb-16 md:hidden">
          <Link href="/shop" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 border border-text-primary/10 rounded-xl text-[10px] uppercase tracking-[0.2em] text-text-primary hover:border-gold-dark hover:text-gold-dark transition-all duration-300"
            >
              View Entire Collection
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ═══ 6. INGREDIENT STORY — Fixed Contrast ═══ */}
      <section className="py-20 md:py-36 bg-cream relative overflow-hidden">
        {/* Warm ambient glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-dark/50 mb-4 block">
              Botanical Intelligence
            </span>
            {/* Heading — high contrast black, not washed out */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-text-primary leading-[1.1]">
              Only what your skin
              <br />
              understands
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto text-base">
              Sourced from the world&apos;s most pristine botanicals. Every
              ingredient earns its place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="group text-center p-8 md:p-10"
              >
                <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-gold/10 to-gold-light/10 flex items-center justify-center shadow-[0_20px_60px_rgba(214,185,140,0.1)] group-hover:shadow-[0_20px_60px_rgba(214,185,140,0.2)] transition-shadow duration-700">
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold-light/20 animate-float-slow"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </div>
                <h3 className="font-heading text-2xl mb-2 text-text-primary">
                  {ing.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-dark/60 mb-3">
                  {ing.origin}
                </p>
                <p className="text-sm text-text-secondary">{ing.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. RESULTS / PROOF ═══ */}
      <section className="py-24 md:py-40 bg-cream-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-gold-dark/50 mb-4 block">
              Clinical Evidence
            </span>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] text-text-primary">
              The Convergence
              <br />
              of Evidence
            </h2>
            <p className="text-text-secondary mt-4 text-sm max-w-xs mx-auto">
              Results after 21 days of personalized ritual.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                label={s.label}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. BRAND PHILOSOPHY — Dark, Emotional ═══ */}
      <section className="py-24 md:py-40 bg-charcoal relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl text-white max-w-md">
              Nature&apos;s blueprint.{" "}
              <span className="italic text-gradient-gold">
                AI&apos;s precision.
              </span>
            </h2>
            <p className="text-white/40 mt-6 leading-relaxed max-w-sm text-base">
              We believe luxury is no longer about the rarest ingredients —
              it&apos;s about the perfect alignment.
            </p>
          </motion.div>

          {/* Values — spaced list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-0 max-w-2xl"
          >
            {[
              {
                title: "Zero Toxicity",
                desc: "We blacklist over 2,500 common ingredients that disrupt hormonal balance or irritate the skin microbiome.",
              },
              {
                title: "Hyper-Personalization",
                desc: "Every bottle is unique. We adjust formulations seasonally to match your environment.",
              },
              {
                title: "Scientific Backing",
                desc: "Led by world-class dermatologists and biostatisticians. Efficacy is never a promise — it's a result.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="border-b border-white/[0.06] py-8 md:py-10"
              >
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold-light mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-white/50 leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 9. FINAL CTA — Full Impact ═══ */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        {/* Animated silk background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal animate-silk" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.02] to-transparent animate-gradient" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-gold-light/30 mb-8 block">
            Begin
          </span>
          <h2 className="font-heading text-[2.8rem] leading-[1] md:text-6xl lg:text-7xl xl:text-8xl text-white mb-5">
            Your skin
            <br />
            deserves
            <br />
            <span className="italic text-gradient-gold">intelligence.</span>
          </h2>
          <p className="text-white/40 mb-12 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
            Discover the ritual that evolves with you.
          </p>
          <Link href="/quiz" className="block max-w-sm mx-auto">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="btn-gold-glow animate-glow-pulse w-full h-14 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-xl uppercase tracking-[0.25em] text-[11px] font-semibold hover:scale-[1.02] transition-transform duration-500"
            >
              Start Your Journey
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
