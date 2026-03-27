"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { SkinType, Concern, SensitivityLevel, Lifestyle, QuizAnswers } from "@/lib/skin-engine";

const steps = [
  {
    title: "What is your skin type?",
    subtitle: "Select the option that best describes your skin",
    key: "skinType" as const,
    type: "single" as const,
    options: [
      { value: "oily", label: "Oily", desc: "Excess shine, enlarged pores" },
      { value: "dry", label: "Dry", desc: "Tight, flaky, rough patches" },
      { value: "combination", label: "Combination", desc: "Oily T-zone, dry cheeks" },
      { value: "sensitive", label: "Sensitive", desc: "Easily irritated, redness" },
      { value: "normal", label: "Normal", desc: "Balanced, few imperfections" },
    ],
  },
  {
    title: "What are your skin concerns?",
    subtitle: "Select all that apply",
    key: "concerns" as const,
    type: "multi" as const,
    options: [
      { value: "acne", label: "Acne & Breakouts", desc: "Pimples, blackheads, whiteheads" },
      { value: "aging", label: "Aging & Fine Lines", desc: "Wrinkles, loss of firmness" },
      { value: "hyperpigmentation", label: "Dark Spots", desc: "Uneven tone, sun damage" },
      { value: "redness", label: "Redness & Irritation", desc: "Rosacea, flushing" },
      { value: "dehydration", label: "Dehydration", desc: "Dull, lackluster skin" },
      { value: "texture", label: "Uneven Texture", desc: "Rough, bumpy surface" },
    ],
  },
  {
    title: "How sensitive is your skin?",
    subtitle: "This helps us avoid potential irritants",
    key: "sensitivity" as const,
    type: "single" as const,
    options: [
      { value: "high", label: "Very Sensitive", desc: "Reacts to most products" },
      { value: "medium", label: "Somewhat Sensitive", desc: "Occasional reactions" },
      { value: "low", label: "Not Sensitive", desc: "Tolerates most ingredients" },
    ],
  },
  {
    title: "Describe your lifestyle",
    subtitle: "Your environment affects your skin",
    key: "lifestyle" as const,
    type: "single" as const,
    options: [
      { value: "urban", label: "Urban Dweller", desc: "City pollution, indoor AC" },
      { value: "outdoor", label: "Outdoor Active", desc: "Lots of sun exposure" },
      { value: "sedentary", label: "Mostly Indoors", desc: "Office, screen time" },
      { value: "active", label: "Athletic", desc: "Regular exercise, sweat" },
      { value: "traveler", label: "Frequent Traveler", desc: "Changing climates" },
    ],
  },
  {
    title: "A few more details",
    subtitle: "Fine-tune your skin score",
    key: "extras" as const,
    type: "extras" as const,
    options: [],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    concerns: [],
    age: "25-34",
    waterIntake: "6-8",
    sleepHours: "7-9",
    sunExposure: "moderate",
  });
  const [loading, setLoading] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  function selectSingle(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(value: string) {
    setAnswers((prev) => {
      const concerns = prev.concerns || [];
      const updated = concerns.includes(value as Concern)
        ? concerns.filter((c) => c !== value)
        : [...concerns, value as Concern];
      return { ...prev, concerns: updated };
    });
  }

  function canProceed() {
    if (current.key === "skinType") return !!answers.skinType;
    if (current.key === "concerns") return (answers.concerns?.length || 0) > 0;
    if (current.key === "sensitivity") return !!answers.sensitivity;
    if (current.key === "lifestyle") return !!answers.lifestyle;
    return true;
  }

  async function handleFinish() {
    setLoading(true);
    // Store quiz answers in localStorage and navigate to results
    localStorage.setItem("agya-quiz", JSON.stringify(answers));
    router.push("/quiz/results");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] tracking-widest uppercase text-gold">
              Step {step + 1} of {steps.length}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
              Skin Analysis
            </span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-3">
              {current.title}
            </h2>
            <p className="text-muted-foreground mb-10">{current.subtitle}</p>

            {/* Options */}
            {current.type !== "extras" && (
              <div className="space-y-4">
                {current.options.map((opt) => {
                  const isSelected =
                    current.type === "multi"
                      ? answers.concerns?.includes(opt.value as Concern)
                      : answers[current.key as keyof QuizAnswers] === opt.value;

                  return (
                    <button
                      key={opt.value}
                      onClick={() =>
                        current.type === "multi"
                          ? toggleMulti(opt.value)
                          : selectSingle(current.key, opt.value)
                      }
                      className={`w-full text-left px-6 py-5 rounded-xl border transition-all flex justify-between items-center ${
                        isSelected
                          ? "border-gold bg-accent/10 shadow-sm"
                          : "border-border/30 bg-card hover:border-gold/50"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {opt.desc}
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-gold text-lg">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Extras step */}
            {current.type === "extras" && (
              <div className="space-y-8">
                {[
                  {
                    label: "Age Range",
                    key: "age",
                    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
                  },
                  {
                    label: "Daily Water Intake (glasses)",
                    key: "waterIntake",
                    options: ["less-than-4", "4-6", "6-8", "8+"],
                  },
                  {
                    label: "Average Sleep (hours)",
                    key: "sleepHours",
                    options: ["less-than-5", "5-7", "7-9", "9+"],
                  },
                  {
                    label: "Sun Exposure",
                    key: "sunExposure",
                    options: ["low", "moderate", "high"],
                  },
                ].map((q) => (
                  <div key={q.key}>
                    <label className="text-xs uppercase tracking-widest text-gold mb-3 block">
                      {q.label}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [q.key]: opt,
                            }))
                          }
                          className={`px-5 py-3 rounded-full border text-sm transition-all ${
                            answers[q.key as keyof QuizAnswers] === opt
                              ? "border-gold bg-accent/10 text-gold"
                              : "border-border/30 hover:border-gold/50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="rounded-full px-8 uppercase tracking-widest text-xs"
          >
            Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="rounded-full px-8 bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={loading}
              className="rounded-full px-8 bg-gradient-to-r from-gold to-gold-light text-white uppercase tracking-widest text-xs"
            >
              {loading ? "Analyzing..." : "See My Results"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
