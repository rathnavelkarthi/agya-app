"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import type { SkinReport } from "@/lib/skin-engine";
import { generateReport, type QuizAnswers } from "@/lib/skin-engine";

// Available base products
const bases = [
  { id: "base-shea", name: "Shea Butter Base", price: 1499, type: "Rich & Deeply Nourishing" },
  { id: "base-mango", name: "Mango Butter Base", price: 1299, type: "Lightweight & Fruity" },
  { id: "base-cocoa", name: "Cocoa Butter Base", price: 1599, type: "Ultra-Creamy Texture" },
  { id: "base-aloe", name: "Aloe Butter Base", price: 1199, type: "Cooling & Hydrating" },
];

// Available add-on ingredients with pricing and compatibility
const ingredients = [
  { id: "i1", name: "Vitamin E Oil", price: 299, benefit: "Repairing", compatibleWith: ["i2", "i4", "i6"], incompatibleWith: ["i3"] },
  { id: "i2", name: "Almond Oil", price: 199, benefit: "Softening", compatibleWith: ["i1", "i3", "i4", "i5", "i6", "i7", "i8"], incompatibleWith: [] },
  { id: "i3", name: "Turmeric Extract", price: 349, benefit: "Brightening", compatibleWith: ["i2", "i5"], incompatibleWith: ["i1", "i4", "i7"] },
  { id: "i4", name: "Saffron Threads", price: 499, benefit: "Royal Glow", compatibleWith: ["i1", "i2", "i5", "i6"], incompatibleWith: ["i3"] },
  { id: "i5", name: "Aloe Vera Gel", price: 149, benefit: "Calming", compatibleWith: ["i2", "i3", "i4", "i6", "i7", "i8"], incompatibleWith: [] },
  { id: "i6", name: "Tea Tree Oil", price: 249, benefit: "Antibacterial", compatibleWith: ["i1", "i2", "i4", "i5"], incompatibleWith: ["i7", "i8"] },
  { id: "i7", name: "Sandalwood Dust", price: 549, benefit: "Anti-aging", compatibleWith: ["i2", "i5", "i8"], incompatibleWith: ["i3", "i6"] },
  { id: "i8", name: "Honey Infusion", price: 299, benefit: "Moisture lock", compatibleWith: ["i2", "i5", "i7"], incompatibleWith: ["i6"] },
];

export default function BuilderPage() {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [formulaName, setFormulaName] = useState("");
  const [report, setReport] = useState<SkinReport | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  // Load skin report for personalized recommendations
  useEffect(() => {
    const stored = localStorage.getItem("agya-quiz");
    if (stored) {
      const answers: QuizAnswers = JSON.parse(stored);
      setReport(generateReport(answers));
    }
  }, []);

  const base = bases.find((b) => b.id === selectedBase);
  const selected = ingredients.filter((i) => selectedIngredients.includes(i.id));

  // Check if an ingredient is compatible with all currently selected ones
  function isCompatible(ingredientId: string): boolean {
    const ing = ingredients.find((i) => i.id === ingredientId)!;
    // Check against all selected ingredients
    for (const selId of selectedIngredients) {
      if (ing.incompatibleWith.includes(selId)) return false;
      const selIng = ingredients.find((i) => i.id === selId)!;
      if (selIng.incompatibleWith.includes(ingredientId)) return false;
    }
    return true;
  }

  function toggleIngredient(id: string) {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients((prev) => prev.filter((i) => i !== id));
    } else if (isCompatible(id) && selectedIngredients.length < 4) {
      setSelectedIngredients((prev) => [...prev, id]);
    }
  }

  const totalPrice = (base?.price || 0) + selected.reduce((sum, i) => sum + i.price, 0);

  function addToCart() {
    if (!base) return;
    const name = formulaName || `Custom ${base.name} Formula`;
    addItem({
      id: `custom-${Date.now()}`,
      name,
      price: totalPrice,
      isCustom: true,
    });
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-widest uppercase text-gold mb-4 block">
            Build Your Formula
          </span>
          <h1 className="font-heading text-4xl md:text-5xl mb-6">
            Personalized Butter Builder
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select a butter base, add up to 4 active botanicals, and we'll craft your
            personalized body and face butter.
          </p>
        </div>

        {/* Recommended banner */}
        {report && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent/20 border border-gold/20 rounded-2xl p-6 mb-12 text-center"
          >
            <p className="text-sm text-gold">
              Based on your skin analysis, we recommend:{" "}
              <strong>{report.recommended.slice(0, 3).join(", ")}</strong>
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Step 1: Base */}
          <div>
            <h3 className="font-heading text-xl mb-6">1. Choose Your Base</h3>
            <div className="space-y-4">
              {bases.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBase(b.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    selectedBase === b.id
                      ? "border-gold bg-accent/10 shadow-sm"
                      : "border-border/30 hover:border-gold/50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{b.type}</div>
                    </div>
                    <div className="text-gold font-medium">₹{b.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Ingredients */}
          <div>
            <h3 className="font-heading text-xl mb-6">
              2. Add Ingredients{" "}
              <span className="text-sm text-muted-foreground">
                ({selectedIngredients.length}/4)
              </span>
            </h3>
            <div className="space-y-3">
              {ingredients.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.id);
                const compatible = isSelected || isCompatible(ing.id);
                const maxed = selectedIngredients.length >= 4 && !isSelected;

                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    disabled={!compatible || maxed}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "border-gold bg-accent/10"
                        : !compatible || maxed
                        ? "border-border/10 opacity-40 cursor-not-allowed"
                        : "border-border/30 hover:border-gold/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{ing.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">
                          {ing.benefit}
                          {!compatible && " — Incompatible"}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gold">+₹{ing.price}</span>
                        {isSelected && <span className="text-gold">✓</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Summary */}
          <div>
            <h3 className="font-heading text-xl mb-6">3. Your Formula</h3>
            <div className="bg-cream-dark rounded-2xl p-8 sticky top-24">
              <input
                type="text"
                placeholder="Name your formula..."
                value={formulaName}
                onChange={(e) => setFormulaName(e.target.value)}
                className="w-full bg-transparent border-b border-border/30 pb-3 mb-6 text-lg font-heading focus:outline-none focus:border-gold placeholder:text-muted-foreground/40"
              />

              {base ? (
                <div className="mb-4 pb-4 border-b border-border/20">
                  <div className="flex justify-between text-sm">
                    <span>{base.name}</span>
                    <span>₹{base.price}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-6">
                  Select a base to start
                </p>
              )}

              {selected.map((ing) => (
                <div
                  key={ing.id}
                  className="flex justify-between text-sm py-2"
                >
                  <span>+ {ing.name}</span>
                  <span className="text-gold">₹{ing.price}</span>
                </div>
              ))}

              <Separator className="my-6" />

              <div className="flex justify-between text-xl font-heading">
                <span>Total</span>
                <span className="text-gold">₹{totalPrice}.00</span>
              </div>

              <Button
                onClick={addToCart}
                disabled={!selectedBase}
                className="w-full mt-8 h-14 rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
