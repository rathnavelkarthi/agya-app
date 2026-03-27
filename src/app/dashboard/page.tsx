"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateReport, type QuizAnswers, type SkinReport } from "@/lib/skin-engine";

export default function DashboardPage() {
  const [report, setReport] = useState<SkinReport | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("agya-quiz");
    if (stored) {
      const answers: QuizAnswers = JSON.parse(stored);
      setReport(generateReport(answers));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your skin profile, saved formulas, and orders.
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-cream-dark rounded-full p-1 h-auto">
            <TabsTrigger
              value="profile"
              className="rounded-full py-3 text-xs uppercase tracking-widest data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              Skin Profile
            </TabsTrigger>
            <TabsTrigger
              value="formulas"
              className="rounded-full py-3 text-xs uppercase tracking-widest data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              Saved Formulas
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-full py-3 text-xs uppercase tracking-widest data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Skin Profile Tab */}
          <TabsContent value="profile">
            {report ? (
              <div className="space-y-8">
                {/* Score */}
                <div className="glass-card rounded-3xl p-8 border border-white/20 shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <div className="font-heading text-5xl text-gold">
                        {report.skinScore}
                      </div>
                      <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                        Skin Health Score
                      </div>
                      <Progress value={report.skinScore} className="mt-4 h-2" />
                    </div>
                    <div className="text-center">
                      <div className="font-heading text-2xl capitalize text-gold">
                        {report.skinType}
                      </div>
                      <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-2">
                        Skin Type
                      </div>
                    </div>
                    <div className="text-center">
                      <Link href="/quiz">
                        <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-8 py-4 h-auto">
                          Retake Analysis
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-2xl p-6 border border-border/20">
                    <h3 className="text-xs uppercase tracking-widest text-green-700 mb-4">
                      Recommended
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {report.recommended.map((ing) => (
                        <Badge key={ing} className="rounded-full bg-green-50 text-green-800 border-green-200">
                          {ing}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card rounded-2xl p-6 border border-border/20">
                    <h3 className="text-xs uppercase tracking-widest text-red-600 mb-4">
                      Avoid
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {report.avoid.length > 0 ? (
                        report.avoid.map((ing) => (
                          <Badge key={ing} className="rounded-full bg-red-50 text-red-700 border-red-200">
                            {ing}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Nothing to avoid</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-heading text-2xl mb-4">No Skin Profile Yet</h3>
                <p className="text-muted-foreground mb-8">
                  Take the skin analysis to get your personalized profile.
                </p>
                <Link href="/quiz">
                  <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-10 py-5 h-auto">
                    Start Analysis
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          {/* Formulas Tab */}
          <TabsContent value="formulas">
            <div className="text-center py-16">
              <h3 className="font-heading text-2xl mb-4">No Saved Formulas Yet</h3>
              <p className="text-muted-foreground mb-8">
                Build a custom product and it will appear here.
              </p>
              <Link href="/builder">
                <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-10 py-5 h-auto">
                  Build Custom Formula
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="text-center py-16">
              <h3 className="font-heading text-2xl mb-4">No Orders Yet</h3>
              <p className="text-muted-foreground mb-8">
                Your order history will appear here after your first purchase.
              </p>
              <Link href="/shop">
                <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-10 py-5 h-auto">
                  Browse Products
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
