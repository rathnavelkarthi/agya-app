"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { generateReport, type QuizAnswers, type SkinReport } from "@/lib/skin-engine";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

export default function ResultsPage() {
  const [report, setReport] = useState<SkinReport | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("agya-quiz");
    if (stored) {
      const answers: QuizAnswers = JSON.parse(stored);
      const result = generateReport(answers);
      setReport(result);
      saveToSupabase(answers, result);
    }
  }, []);

  async function saveToSupabase(answers: QuizAnswers, result: SkinReport) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    try {
      // 1. Insert Quiz Response
      const { data: quizData, error: quizError } = await supabase
        .from("quiz_responses")
        .insert({
          user_id: user.id,
          skin_type: answers.skinType,
          concerns: answers.concerns,
          sensitivity: answers.sensitivity,
          lifestyle: answers.lifestyle,
          age_range: answers.age,
          water_intake: answers.waterIntake,
          sleep_hours: answers.sleepHours,
          sun_exposure: answers.sunExposure,
        })
        .select()
        .single();

      if (quizError) throw quizError;

      // 2. Insert/Update Skin Profile
      const { error: profileError } = await supabase
        .from("skin_profiles")
        .upsert({
          user_id: user.id,
          quiz_response_id: quizData.id,
          skin_type: result.skinType,
          skin_score: result.skinScore,
          recommended_ingredients: result.recommended,
          avoid_ingredients: result.avoid,
          summary: result.summary,
        });

      if (profileError) throw profileError;
      
      console.log("Skin profile synced to Supabase");
    } catch (error) {
      console.error("Error syncing to Supabase:", error);
    }
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-heading text-3xl mb-4">No Results Yet</h2>
          <p className="text-muted-foreground mb-8">
            Take the skin analysis first to see your report.
          </p>
          <Link href="/quiz">
            <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-10 py-5 h-auto">
              Start Analysis
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const scoreColor =
    report.skinScore >= 75
      ? "text-green-600"
      : report.skinScore >= 50
      ? "text-yellow-600"
      : "text-red-500";

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] tracking-widest uppercase text-gold mb-4 block">
            Your Skin Report
          </span>
          <h1 className="font-heading text-4xl md:text-5xl mb-6">
            Your Personalized Skin Profile
          </h1>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className={`font-heading text-6xl ${scoreColor}`}>
                {report.skinScore}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                Skin Health Score
              </div>
              <Progress value={report.skinScore} className="mt-4 h-2" />
            </div>

            <div className="text-center md:border-x border-border/20 px-8">
              <div className="font-heading text-2xl capitalize text-gold">
                {report.skinType}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                Skin Type
              </div>
            </div>

            <div className="text-center">
              <div className="font-heading text-2xl">
                {report.recommended.length}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                Recommended Actives
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-cream-dark rounded-3xl p-8 md:p-12 mb-12"
        >
          <h3 className="font-heading text-xl mb-4">Analysis Summary</h3>
          <p className="text-muted-foreground leading-relaxed">
            {report.summary}
          </p>
        </motion.div>

        {/* Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-3xl p-8 border border-border/30"
          >
            <h3 className="font-heading text-xl mb-6 text-green-700">
              ✓ Recommended Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {report.recommended.map((ing) => (
                <Badge
                  key={ing}
                  variant="secondary"
                  className="rounded-full px-4 py-2 bg-green-50 text-green-800 border-green-200"
                >
                  {ing}
                </Badge>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-3xl p-8 border border-border/30"
          >
            <h3 className="font-heading text-xl mb-6 text-red-600">
              ✗ Ingredients to Avoid
            </h3>
            {report.avoid.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {report.avoid.map((ing) => (
                  <Badge
                    key={ing}
                    variant="secondary"
                    className="rounded-full px-4 py-2 bg-red-50 text-red-700 border-red-200"
                  >
                    {ing}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No specific ingredients to avoid. Your skin is resilient.
              </p>
            )}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h3 className="font-heading text-2xl mb-6">
            Ready to build your perfect formula?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/builder">
              <Button className="rounded-full px-10 py-5 bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs h-auto">
                Custom Product Builder
              </Button>
            </Link>
            <Link href="/shop">
              <Button
                variant="outline"
                className="rounded-full px-10 py-5 uppercase tracking-widest text-xs h-auto"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
