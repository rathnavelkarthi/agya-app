/**
 * AGYA Skin Logic Engine
 *
 * Maps quiz responses to ingredient recommendations, avoid lists,
 * and a computed skin health score (0-100).
 */

export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "normal";
export type Concern =
  | "acne"
  | "aging"
  | "hyperpigmentation"
  | "redness"
  | "dehydration"
  | "texture";
export type SensitivityLevel = "high" | "medium" | "low";
export type Lifestyle =
  | "urban"
  | "outdoor"
  | "sedentary"
  | "active"
  | "traveler";

export interface QuizAnswers {
  skinType: SkinType;
  concerns: Concern[];
  sensitivity: SensitivityLevel;
  lifestyle: Lifestyle;
  age: string;
  waterIntake: string;
  sleepHours: string;
  sunExposure: string;
}

export interface SkinReport {
  skinType: SkinType;
  skinScore: number;
  recommended: string[];
  avoid: string[];
  summary: string;
}

// Skin type -> base ingredient recommendations
const SKIN_TYPE_MAP: Record<SkinType, string[]> = {
  oily: ["Niacinamide", "Zinc PCA", "Salicylic Acid", "Green Tea Extract", "Hyaluronic Acid (lightweight)"],
  dry: ["Ceramides", "Squalane", "Shea Butter", "Hyaluronic Acid", "Rosehip Oil"],
  combination: ["Niacinamide", "Green Tea Extract", "Azelaic Acid", "Aloe Vera", "Jojoba Oil"],
  sensitive: ["Centella Asiatica", "Chamomile Extract", "Aloe Vera", "Oat Extract", "Panthenol"],
  normal: ["Vitamin C", "Hyaluronic Acid", "Peptides", "Aloe Vera", "Rosehip Oil"],
};

// Concern -> active ingredient recommendations
const CONCERN_MAP: Record<Concern, string[]> = {
  acne: ["Salicylic Acid (2%)", "Tea Tree Oil", "Benzoyl Peroxide", "Azelaic Acid"],
  aging: ["Retinol", "Peptides", "Vitamin C (L-Ascorbic Acid)", "Bakuchiol"],
  hyperpigmentation: ["Kojic Acid", "Arbutin", "Vitamin C", "Tranexamic Acid", "Licorice Root"],
  redness: ["Niacinamide", "Centella Asiatica", "Licorice Root", "Green Tea"],
  dehydration: ["Hyaluronic Acid", "Glycerin", "Squalane", "Ceramides", "Aloe Vera"],
  texture: ["AHA (Glycolic Acid)", "BHA (Salicylic Acid)", "PHA", "Retinol"],
};

// Sensitivity -> ingredients to avoid
const SENSITIVITY_AVOID: Record<SensitivityLevel, string[]> = {
  high: ["Fragrance", "Essential Oils", "Alcohol Denat", "Retinol (start slow)", "AHA/BHA (high %)", "Sulfates"],
  medium: ["Fragrance (synthetic)", "High-concentration acids"],
  low: [],
};

// Lifestyle modifiers — extra recommendations
const LIFESTYLE_EXTRAS: Record<Lifestyle, string[]> = {
  urban: ["Vitamin C (antioxidant)", "Niacinamide (pollution shield)", "SPF 50+"],
  outdoor: ["SPF 50+ PA++++", "Vitamin E", "Ferulic Acid"],
  sedentary: ["Hyaluronic Acid (hydration)", "Caffeine (circulation)"],
  active: ["Lightweight gel formulas", "Oil-free SPF", "Electrolyte mist"],
  traveler: ["Ceramides (barrier repair)", "Portable formats", "Multi-use balm"],
};

/**
 * Compute a holistic skin score from 0-100.
 *
 * Higher is healthier. Deductions come from concern count, sensitivity,
 * lifestyle stress factors, and self-reported habits.
 */
function computeScore(answers: QuizAnswers): number {
  let score = 80; // baseline

  // Deduct for concerns
  score -= answers.concerns.length * 5;

  // Sensitivity penalty
  if (answers.sensitivity === "high") score -= 10;
  if (answers.sensitivity === "medium") score -= 5;

  // Lifestyle stress
  if (answers.lifestyle === "urban") score -= 5;
  if (answers.lifestyle === "traveler") score -= 3;

  // Hydration bonus
  if (answers.waterIntake === "8+") score += 5;
  if (answers.waterIntake === "less-than-4") score -= 5;

  // Sleep bonus
  if (answers.sleepHours === "7-9") score += 5;
  if (answers.sleepHours === "less-than-5") score -= 10;

  // Sun exposure penalty
  if (answers.sunExposure === "high") score -= 8;

  return Math.max(10, Math.min(100, score));
}

/**
 * Generate a full skin report from quiz answers.
 */
export function generateReport(answers: QuizAnswers): SkinReport {
  const recommended = new Set<string>();

  // 1) Base ingredients from skin type
  SKIN_TYPE_MAP[answers.skinType].forEach((i) => recommended.add(i));

  // 2) Concern-specific actives
  answers.concerns.forEach((c) => {
    CONCERN_MAP[c]?.forEach((i) => recommended.add(i));
  });

  // 3) Lifestyle extras
  LIFESTYLE_EXTRAS[answers.lifestyle]?.forEach((i) => recommended.add(i));

  // 4) Avoid list from sensitivity
  const avoid = [...SENSITIVITY_AVOID[answers.sensitivity]];

  // 5) Remove avoided ingredients from recommended
  const avoidLower = avoid.map((a) => a.toLowerCase());
  const finalRecommended = [...recommended].filter(
    (r) => !avoidLower.some((a) => r.toLowerCase().includes(a.split(" ")[0]))
  );

  const skinScore = computeScore(answers);

  const summary = buildSummary(answers, skinScore);

  return {
    skinType: answers.skinType,
    skinScore,
    recommended: finalRecommended,
    avoid,
    summary,
  };
}

function buildSummary(answers: QuizAnswers, score: number): string {
  const typeDesc: Record<SkinType, string> = {
    oily: "Your skin tends to produce excess sebum, especially in the T-zone.",
    dry: "Your skin lacks natural moisture and may feel tight or flaky.",
    combination: "You have a mix of oily and dry areas across your face.",
    sensitive: "Your skin reacts easily to environmental changes and products.",
    normal: "Your skin is well-balanced with good hydration levels.",
  };

  let text = `${typeDesc[answers.skinType]} `;
  text += `Your overall skin health score is ${score}/100. `;

  if (answers.concerns.length > 0) {
    text += `Your primary concerns are ${answers.concerns.join(", ")}. `;
  }

  if (score >= 75) {
    text += "Your skin is in good shape. Focus on maintenance and protection.";
  } else if (score >= 50) {
    text += "There is room for improvement. A targeted routine will help.";
  } else {
    text += "Your skin needs attention. We recommend a comprehensive approach with gentle, active ingredients.";
  }

  return text;
}
