"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

// Static fallback
const staticProducts: Record<string, any> = {
  "1": {
    id: "1", name: "Cellular Elixir No. 4", category: "Oils", price: 185,
    description: "Regenerative facial oil with Persian Saffron and Rosehip",
    details: "Our signature facial oil combines cold-pressed Rosehip with hand-harvested Persian Saffron, delivering potent antioxidants deep into the skin's cellular matrix. Each batch is micro-formulated for peak potency.",
    ingredients: ["Saffron Extract", "Rosehip Oil", "Vitamin E", "Jojoba Oil", "Argan Oil", "Sea Buckthorn"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQSSvKYA8Twt8fHCDARIOFw83OBGLWMs7A7Oj9aNvddFwO9IX0yWXg7ABtJtITL2UTusuU3s-PtI9rUyauHMFiMoOTb54hhRFz1YaDEfcKXloYsuayMnejGI87CO7vigLmjJOXHgURoOIMzadlJbAXPWTGcZzrgLLwYI14QOibHfzApbZmW8O2i7uhRr3_tcbkg8jPZeo1W2nxuexqo3CpBCnAOy0STsN69x-lL0BE-Fqz4_eoRiRMGzgN5siQBGQ4S86MkuHvK5M",
  },
  "2": {
    id: "2", name: "Molecular Repair Balm", category: "Moisturizers", price: 210,
    description: "Intensive hydration with Ceramides and Shea Butter",
    details: "A rich, deeply nourishing balm that rebuilds the skin's lipid barrier overnight. Triple-ceramide complex works at the molecular level to restore and retain moisture for 72 hours.",
    ingredients: ["Ceramides", "Shea Butter", "Squalane", "Panthenol", "Hyaluronic Acid", "Beeswax"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIMQtgPLBvTwzgT6ZcQCqrTmDVCaxsWum3pVtwNoGHhUOnx95ysm-88X7Qgpa1godXHbBoMi-U2cy9HtPQ8qogxr3IOlQDfHr8uTJuGDiaR_afrG-REkoOz8cDdcjfsMUFZvgmxsjwQB7YTEkJDzxKuuDWj4hV3cwWhykoT7eQABahyTRh8oD5gXGD7VRXlCajy5okPI0fx7_BlHdnuMBCCsU0Ol0BtzE1LBoq2YAXlprLc0wX6kxXZa0VqGyDjd1Fsdrp8U-2uyg",
  },
  "3": {
    id: "3", name: "The DNA Serum", category: "Serums", price: 245,
    description: "Personalized base serum with Hyaluronic Acid complex",
    details: "Our flagship serum adapts to your skin's unique biology. Multi-weight Hyaluronic Acid penetrates all layers while Vitamin C and Peptides work synergistically to brighten and firm.",
    ingredients: ["Hyaluronic Acid", "Peptides", "Niacinamide", "Vitamin C", "Centella Asiatica", "Green Tea"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoycCn4dZIixtE4Lj_8f24JFT-zQBUqEBkPIob27mAdwalESwKPgFrEuDNUYoovpjKWg6URTKug6Ed_RACnhYMNNxIQA85GihshXmYMw99JqOPK6Dc2w45lpGCMSPUkts4_xoyDQgPbQTBENDW0BEW7iwIhF2-K53P9IOVsxdmmU8oHt7RwTuggoScDaXbCDrN6HCfQrwu4R6d-z6fjupy4ko4VB4mkOoXFriLTOIjXMLf8000735mgKjP7KjjfIX9krxdcRWztzs",
  },
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data && !error) {
        setProduct(data);
      } else if (staticProducts[id]) {
        setProduct(staticProducts[id]);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-gold tracking-widest uppercase text-xs">
          Loading Formulation...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-3xl mb-4">Product Not Found</h2>
          <Link href="/shop">
            <Button className="rounded-full bg-gold text-white">Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productImage = product.image_url || product.image;

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-xs text-muted-foreground mb-12">
          <Link href="/shop" className="hover:text-gold">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-cream-dark rounded-3xl flex items-center justify-center p-16 sticky top-24"
          >
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge className="rounded-full bg-gold/10 text-gold border-gold/20 mb-4">
              {product.category}
            </Badge>
            <h1 className="font-heading text-4xl mb-4">{product.name}</h1>
            <p className="text-2xl text-gold mb-8">₹{product.price}.00</p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.details || product.description}
            </p>

            <Separator className="my-8" />

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest text-gold mb-4">
                Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {(product.ingredients || []).map((ing: string) => (
                  <Badge
                    key={ing}
                    variant="secondary"
                    className="rounded-full px-4 py-2"
                  >
                    {ing}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: productImage,
                  })
                }
                className="flex-1 h-14 rounded-full bg-gold text-white hover:bg-gold/90 uppercase tracking-widest text-xs"
              >
                Add to Cart — ₹{product.price}
              </Button>
              <Link href="/builder">
                <Button
                  variant="outline"
                  className="h-14 rounded-full px-8 uppercase tracking-widest text-xs"
                >
                  Customize
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
