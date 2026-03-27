"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ─── Data ─── */

const products = [
  {
    name: "Cellular Elixir No. 4",
    type: "Regenerative Oil",
    price: "185",
    benefit:
      "A bio-adaptive oil that recalibrates your skin's lipid barrier overnight. Infused with squalane, bakuchiol, and our proprietary peptide complex.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQSSvKYA8Twt8fHCDARIOFw83OBGLWMs7A7Oj9aNvddFwO9IX0yWXg7ABtJtITL2UTusuU3s-PtI9rUyauHMFiMoOTb54hhRFz1YaDEfcKXloYsuayMnejGI87CO7vigLmjJOXHgURoOIMzadlJbAXPWTGcZzrgLLwYI14QOibHfzApbZmW8O2i7uhRr3_tcbkg8jPZeo1W2nxuexqo3CpBCnAOy0STsN69x-lL0BE-Fqz4_eoRiRMGzgN5siQBGQ4S86MkuHvK5M",
  },
  {
    name: "Molecular Repair Balm",
    type: "Intense Hydration",
    price: "210",
    benefit:
      "Deep-penetrating ceramide complex that restores the moisture matrix at a cellular level. For skin that feels reborn by morning.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIMQtgPLBvTwzgT6ZcQCqrTmDVCaxsWum3pVtwNoGHhUOnx95ysm-88X7Qgpa1godXHbBoMi-U2cy9HtPQ8qogxr3IOlQDfHr8uTJuGDiaR_afrG-REkoOz8cDdcjfsMUFZvgmxsjwQB7YTEkJDzxKuuDWj4hV3cwWhykoT7eQABahyTRh8oD5gXGD7VRXlCajy5okPI0fx7_BlHdnuMBCCsU0Ol0BtzE1LBoq2YAXlprLc0wX6kxXZa0VqGyDjd1Fsdrp8U-2uyg",
  },
  {
    name: "The DNA Serum",
    type: "Personalized Base",
    price: "245",
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
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
  }),
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-heading text-6xl md:text-7xl text-text-primary mb-2">
        {isInView ? count : 0}
        <span className="text-gold-dark">%</span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
        {label}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE — $100K CLASSIC LUXURY E-COMMERCE
   Aesthetic: Aesop × Byredo × Celine — warm, editorial, calm
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* ═══ 1. HERO — CALM, WARM, EDITORIAL ═══ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-cream-dark/40 to-cream">
        {/* Soft warm ambient glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold/[0.06] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold-light/[0.05] rounded-full blur-[150px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-12 pt-28 pb-20 md:pt-36 md:pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-center text-center"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-text-muted mb-8 md:mb-10 block"
            >
              Personalized Skincare
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={0.15}
              className="mb-6 md:mb-8"
            >
              <span className="font-heading text-[2.8rem] leading-[1.05] md:text-6xl lg:text-7xl font-medium text-text-primary block">
                Skin, perfected.
              </span>
              <span className="font-heading text-xl md:text-2xl lg:text-3xl font-normal italic text-text-secondary leading-[1.4] block mt-2 md:mt-3">
                by nature and intelligence.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              className="text-base text-text-secondary leading-relaxed mb-10 md:mb-12 max-w-sm"
            >
              Personalized skincare crafted for your unique skin.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.45}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Link href="/quiz" className="block w-full sm:w-auto">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto h-12 px-8 bg-text-primary text-cream rounded-full text-[11px] uppercase tracking-[0.18em] font-medium hover:bg-text-primary/85 transition-colors duration-500"
                >
                  Start Your Ritual
                </motion.button>
              </Link>
              <Link href="/shop" className="block w-full sm:w-auto">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto h-12 px-8 border border-text-primary/12 text-text-primary rounded-full text-[11px] uppercase tracking-[0.18em] font-medium hover:border-text-primary/25 transition-colors duration-500"
                >
                  Explore Products
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="mt-14 md:mt-20 flex justify-center"
          >
            <div className="relative w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96">
              <img
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSKs74w5P1Il4nfq5V6FuPO1M-WAQqAAtCuxaNUUD2BypUeWhliwjCkozSw7093NQ2SHQzzKPjqjjgF6vC36ljjO2xUvLycE0CibAWhk1mfsFK5-CoHv2VdXbkzMaWCSjI1pS11A1J4ahel0NybTSKG0I1-IulbuiS0X0DTS6A3vqvdWShQLtYUTDOWUwyieASPO78TfoYucMU-NA-DXi9ot3qkNy7p6-GU4rxvg0d-40d1o9Q-M_rEcfkOaMPgPyVvyXk4LWdXz8"
                alt="AGYA signature serum"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 md:hidden"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-text-muted/30 to-transparent" />
        </motion.div>
      </section>

      {/* ═══ 2. TRUST STRIP — Warm, Understated ═══ */}
      <section className="py-8 md:py-12 bg-cream border-y border-text-primary/[0.04]">
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
                className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-text-muted whitespace-nowrap flex-shrink-0"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. SKIN PROFILE — Warm Editorial ═══ */}
      <section className="py-24 md:py-40 bg-cream-dark relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-5 block">
              Your Unique Blueprint
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05]">
              Your Skin Profile
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-lg mx-auto"
          >
            {/* Score — clean typography, no ring */}
            <div className="mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                <div className="font-heading text-8xl md:text-9xl text-text-primary leading-none">
                  82
                </div>
                <div className="w-12 h-[1px] bg-gold-dark/30 mx-auto mt-4 mb-3" />
                <div className="text-[9px] uppercase tracking-[0.3em] text-text-muted">
                  Skin Score — Above Average
                </div>
              </motion.div>
            </div>

            {/* Key Details */}
            <div className="space-y-0 mb-14">
              <div className="flex justify-between items-center border-b border-text-primary/[0.06] py-5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-text-muted">
                  Skin Type
                </span>
                <span className="text-text-primary font-heading text-lg">
                  Combination
                </span>
              </div>
              <div className="border-b border-text-primary/[0.06] py-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-text-muted">
                    Key Concerns
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Dehydration", "Fine Lines", "Uneven Tone"].map((c) => (
                    <span
                      key={c}
                      className="px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.15em] bg-white/60 text-text-secondary border border-text-primary/[0.06]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-start py-5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-text-muted">
                  Recommended
                </span>
                <span className="text-text-secondary text-sm text-right max-w-[200px] leading-relaxed">
                  Hyaluronic Acid, Niacinamide, Retinol
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link href="/quiz" className="block">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-text-primary text-cream rounded-full uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-text-primary/85 transition-colors duration-500"
              >
                Unlock Your Skin Profile
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. PERSONALIZATION — Editorial Split ═══ */}
      <section className="py-24 md:py-40 bg-cream relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-6 block">
                AI-Powered Precision
              </span>
              <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl mb-6 text-text-primary">
                Not skincare.
                <br />
                <span className="italic text-gold-dark">Your skincare.</span>
              </h2>
              <p className="text-text-secondary mb-10 leading-relaxed text-base max-w-md">
                Using proprietary AI skin-mapping, we analyze over 40 variables
                in your environmental and genetic profile to engineer a formula
                that evolves with you.
              </p>
              <Link href="/quiz" className="block w-full md:w-auto">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto h-12 px-10 bg-text-primary text-cream rounded-full uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-text-primary/85 transition-colors duration-500"
                >
                  Take Skin Analysis
                </motion.button>
              </Link>
            </motion.div>

            {/* Interactive Mock */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white rounded-2xl p-6 md:p-10 border border-text-primary/[0.05] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/[0.04] rounded-full blur-[50px] -mr-16 -mt-16" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-text-muted">
                    Step 01 / Analysis
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-6 h-[2px] bg-text-primary rounded-full" />
                    <div className="w-6 h-[2px] bg-text-primary/[0.08] rounded-full" />
                    <div className="w-6 h-[2px] bg-text-primary/[0.08] rounded-full" />
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
                          ? "border-gold-dark/30 bg-gold/[0.04]"
                          : "border-text-primary/[0.05] bg-cream/50 hover:border-text-primary/[0.12]"
                      }`}
                    >
                      <span
                        className={
                          i === 1 ? "text-text-primary" : "text-text-secondary"
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

      {/* ═══ 5. PRODUCT SHOWCASE — Clean Editorial Grid ═══ */}
      <section className="bg-cream-dark overflow-hidden">
        <div className="px-6 md:px-12 lg:px-20 pt-24 pb-10 md:pt-40 md:pb-16 max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-4 block">
              The Collection
            </span>
            <div className="flex justify-between items-end">
              <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl text-text-primary">
                Signature
                <br className="md:hidden" /> Formulations
              </h2>
              <Link
                href="/shop"
                className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-text-secondary border-b border-text-primary/15 pb-1 hover:text-text-primary hover:border-text-primary/30 transition-all duration-300"
              >
                View All
              </Link>
            </div>
          </motion.div>
        </div>

        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${i !== products.length - 1 ? "border-b border-text-primary/[0.05]" : ""}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`${i % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Link href="/shop" className="block group">
                    <div className="relative aspect-[3/4] bg-white rounded-2xl flex items-center justify-center p-10 md:p-16 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gold/[0.02]" />
                      <img
                        className="relative z-10 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-transform duration-700 group-hover:scale-[1.02]"
                        src={p.img}
                        alt={p.name}
                      />
                    </div>
                  </Link>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`${i % 2 === 1 ? "md:order-1" : ""} flex flex-col justify-center`}
                >
                  <span className="text-[9px] uppercase tracking-[0.3em] text-text-muted mb-3 block">
                    {p.type}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl mb-3 leading-[1.15] text-text-primary font-medium">
                    {p.name}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6 max-w-sm text-sm md:text-base">
                    {p.benefit}
                  </p>
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="font-sans text-sm text-text-muted font-medium">
                      INR
                    </span>
                    <span className="font-sans text-3xl md:text-4xl font-medium text-text-primary tracking-tight">
                      {p.price}
                    </span>
                  </div>
                  <Link href="/shop" className="block w-full md:w-auto">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full md:w-auto h-12 px-8 bg-text-primary text-cream rounded-full text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-text-primary/85 transition-colors duration-500"
                    >
                      Add to Ritual
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Mobile: View all */}
        <div className="px-6 pb-20 md:hidden">
          <Link href="/shop" className="block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 border border-text-primary/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-text-primary hover:border-text-primary/25 transition-all duration-300"
            >
              View Entire Collection
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ═══ 6. INGREDIENT STORY — Warm & Botanical ═══ */}
      <section className="py-24 md:py-40 bg-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-4 block">
              Botanical Intelligence
            </span>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 max-w-3xl mx-auto">
            {ingredients.map((ing, i) => (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-center py-10 md:py-0 md:px-8 ${
                  i !== ingredients.length - 1
                    ? "border-b md:border-b-0 md:border-r border-text-primary/[0.06]"
                    : ""
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/[0.06] flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-gold/[0.15]" />
                </div>
                <h3 className="font-heading text-xl mb-1.5 text-text-primary">
                  {ing.name}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted mb-2">
                  {ing.origin}
                </p>
                <p className="text-sm text-text-secondary">{ing.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. RESULTS / PROOF — Clean Numbers ═══ */}
      <section className="py-28 md:py-44 bg-cream-dark relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-4 block">
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

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
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

      {/* ═══ 8. BRAND PHILOSOPHY — Warm, Editorial ═══ */}
      <section className="py-28 md:py-44 bg-cream relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24"
          >
            <h2 className="font-heading text-[2.5rem] leading-[1.05] md:text-5xl lg:text-6xl text-text-primary max-w-lg">
              Nature&apos;s blueprint.{" "}
              <span className="italic text-gold-dark">
                AI&apos;s precision.
              </span>
            </h2>
            <p className="text-text-secondary mt-6 leading-relaxed max-w-sm text-base">
              We believe luxury is no longer about the rarest ingredients —
              it&apos;s about the perfect alignment.
            </p>
          </motion.div>

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
                className="border-b border-text-primary/[0.06] py-8 md:py-10"
              >
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold-dark mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 9. FINAL CTA — Warm, Elegant ═══ */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-cream-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold/[0.05] rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold-light/[0.04] rounded-full blur-[180px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-text-muted mb-8 block">
            Begin
          </span>
          <h2 className="font-heading text-[2.8rem] leading-[1.05] md:text-6xl lg:text-7xl xl:text-8xl text-text-primary mb-6">
            Your skin
            <br />
            deserves
            <br />
            <span className="italic text-gold-dark">intelligence.</span>
          </h2>
          <p className="text-text-secondary mb-14 text-base max-w-xs mx-auto leading-relaxed">
            Discover the ritual that evolves with you.
          </p>
          <Link href="/quiz" className="inline-block">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="h-14 px-12 bg-text-primary text-cream rounded-full uppercase tracking-[0.25em] text-[11px] font-medium hover:bg-text-primary/85 transition-colors duration-500"
            >
              Start Your Journey
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
