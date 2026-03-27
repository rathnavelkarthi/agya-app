"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } =
    useCartStore();

  const cartTotal = total();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-8">
            Explore our collection or build a custom formula.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop">
              <Button className="rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs px-8 py-5 h-auto">
                Browse Shop
              </Button>
            </Link>
            <Link href="/builder">
              <Button
                variant="outline"
                className="rounded-full uppercase tracking-widest text-xs px-8 py-5 h-auto"
              >
                Build Custom
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleCheckout() {
    // In production, this would call Razorpay and create an order
    alert(
      "Razorpay checkout would open here. Total: ₹" +
        cartTotal.toFixed(2) +
        "\n\nTo enable payments, add your Razorpay keys to .env.local"
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl mb-12 text-center">Your Cart</h1>

        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-6 items-center p-6 bg-card rounded-2xl border border-border/20"
            >
              {/* Image placeholder */}
              <div className="w-20 h-20 bg-cream-dark rounded-xl flex items-center justify-center shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2 rounded-xl"
                  />
                ) : (
                  <span className="text-2xl">🧴</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{item.name}</h4>
                {item.isCustom && (
                  <span className="text-[10px] text-gold uppercase tracking-widest">
                    Custom Formula
                  </span>
                )}
                <p className="text-gold mt-1">₹{item.price.toFixed(2)}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center hover:border-gold transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center hover:border-gold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="text-right min-w-[80px]">
                <p className="font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Summary */}
        <div className="bg-cream-dark rounded-2xl p-8">
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-gold">Free</span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-xl font-heading">
            <span>Total</span>
            <span className="text-gold">₹{cartTotal.toFixed(2)}</span>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full mt-8 h-14 rounded-full bg-gradient-to-r from-gold to-gold-light text-white uppercase tracking-widest text-xs"
          >
            Checkout with Razorpay
          </Button>

          <button
            onClick={clearCart}
            className="w-full mt-4 text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-widest"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
