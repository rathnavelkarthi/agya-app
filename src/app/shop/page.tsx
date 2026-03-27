"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

// Static product catalog (in production, fetch from Supabase)
const products = [
  {
    id: "1",
    name: "Cellular Elixir No. 4",
    category: "Oils",
    price: 185,
    description: "Regenerative facial oil with Persian Saffron and Rosehip",
    ingredients: ["Saffron Extract", "Rosehip Oil", "Vitamin E", "Jojoba Oil"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQSSvKYA8Twt8fHCDARIOFw83OBGLWMs7A7Oj9aNvddFwO9IX0yWXg7ABtJtITL2UTusuU3s-PtI9rUyauHMFiMoOTb54hhRFz1YaDEfcKXloYsuayMnejGI87CO7vigLmjJOXHgURoOIMzadlJbAXPWTGcZzrgLLwYI14QOibHfzApbZmW8O2i7uhRr3_tcbkg8jPZeo1W2nxuexqo3CpBCnAOy0STsN69x-lL0BE-Fqz4_eoRiRMGzgN5siQBGQ4S86MkuHvK5M",
  },
  {
    id: "2",
    name: "Molecular Repair Balm",
    category: "Moisturizers",
    price: 210,
    description: "Intensive hydration with Ceramides and Shea Butter",
    ingredients: ["Ceramides", "Shea Butter", "Squalane", "Panthenol"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIMQtgPLBvTwzgT6ZcQCqrTmDVCaxsWum3pVtwNoGHhUOnx95ysm-88X7Qgpa1godXHbBoMi-U2cy9HtPQ8qogxr3IOlQDfHr8uTJuGDiaR_afrG-REkoOz8cDdcjfsMUFZvgmxsjwQB7YTEkJDzxKuuDWj4hV3cwWhykoT7eQABahyTRh8oD5gXGD7VRXlCajy5okPI0fx7_BlHdnuMBCCsU0Ol0BtzE1LBoq2YAXlprLc0wX6kxXZa0VqGyDjd1Fsdrp8U-2uyg",
  },
  {
    id: "3",
    name: "The DNA Serum",
    category: "Serums",
    price: 245,
    description: "Personalized base serum with Hyaluronic Acid complex",
    ingredients: ["Hyaluronic Acid", "Peptides", "Niacinamide", "Vitamin C"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoycCn4dZIixtE4Lj_8f24JFT-zQBUqEBkPIob27mAdwalESwKPgFrEuDNUYoovpjKWg6URTKug6Ed_RACnhYMNNxIQA85GihshXmYMw99JqOPK6Dc2w45lpGCMSPUkts4_xoyDQgPbQTBENDW0BEW7iwIhF2-K53P9IOVsxdmmU8oHt7RwTuggoScDaXbCDrN6HCfQrwu4R6d-z6fjupy4ko4VB4mkOoXFriLTOIjXMLf8000735mgKjP7KjjfIX9krxdcRWztzs",
  },
  {
    id: "4",
    name: "Botanical Cleansing Milk",
    category: "Cleansers",
    price: 95,
    description: "Gentle milk cleanser with Chamomile and Aloe",
    ingredients: ["Chamomile Extract", "Aloe Vera", "Glycerin", "Oat Extract"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQSSvKYA8Twt8fHCDARIOFw83OBGLWMs7A7Oj9aNvddFwO9IX0yWXg7ABtJtITL2UTusuU3s-PtI9rUyauHMFiMoOTb54hhRFz1YaDEfcKXloYsuayMnejGI87CO7vigLmjJOXHgURoOIMzadlJbAXPWTGcZzrgLLwYI14QOibHfzApbZmW8O2i7uhRr3_tcbkg8jPZeo1W2nxuexqo3CpBCnAOy0STsN69x-lL0BE-Fqz4_eoRiRMGzgN5siQBGQ4S86MkuHvK5M",
  },
  {
    id: "5",
    name: "Radiance Tonic",
    category: "Toners",
    price: 120,
    description: "Glow-boosting toner with Rose Water and AHA",
    ingredients: ["Rose Water", "Glycolic Acid", "Witch Hazel", "Centella"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoycCn4dZIixtE4Lj_8f24JFT-zQBUqEBkPIob27mAdwalESwKPgFrEuDNUYoovpjKWg6URTKug6Ed_RACnhYMNNxIQA85GihshXmYMw99JqOPK6Dc2w45lpGCMSPUkts4_xoyDQgPbQTBENDW0BEW7iwIhF2-K53P9IOVsxdmmU8oHt7RwTuggoScDaXbCDrN6HCfQrwu4R6d-z6fjupy4ko4VB4mkOoXFriLTOIjXMLf8000735mgKjP7KjjfIX9krxdcRWztzs",
  },
  {
    id: "6",
    name: "Night Renewal Complex",
    category: "Serums",
    price: 195,
    description: "Overnight repair with Retinol and Bakuchiol",
    ingredients: ["Retinol", "Bakuchiol", "Peptides", "Squalane"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIMQtgPLBvTwzgT6ZcQCqrTmDVCaxsWum3pVtwNoGHhUOnx95ysm-88X7Qgpa1godXHbBoMi-U2cy9HtPQ8qogxr3IOlQDfHr8uTJuGDiaR_afrG-REkoOz8cDdcjfsMUFZvgmxsjwQB7YTEkJDzxKuuDWj4hV3cwWhykoT7eQABahyTRh8oD5gXGD7VRXlCajy5okPI0fx7_BlHdnuMBCCsU0Ol0BtzE1LBoq2YAXlprLc0wX6kxXZa0VqGyDjd1Fsdrp8U-2uyg",
  },
];

const categories = ["All", "Serums", "Oils", "Moisturizers", "Cleansers", "Toners"];

export default function ShopPage() {
  const [filter, setFilter] = useState("All");
  const [realProducts, setRealProducts] = useState<any[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);

      if (data && !error) {
        setRealProducts(data);
      }
      setDbLoading(false);
    }
    fetchProducts();
  }, []);

  const displayProducts = realProducts.length > 0 ? realProducts : products;

  const filtered =
    filter === "All"
      ? displayProducts
      : displayProducts.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-widest uppercase text-gold mb-4 block">
            The Collection
          </span>
          <h1 className="font-heading text-4xl md:text-5xl mb-6">
            Signature Formulations
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Each product is crafted with organic botanicals and clinical-grade
            actives for visibly transformative results.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all ${
                filter === cat
                  ? "bg-gold text-white"
                  : "border border-border/30 hover:border-gold text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/shop/${product.id}`}>
                <div className="aspect-[4/5] bg-cream-dark rounded-3xl mb-6 flex items-center justify-center p-12 transition-all duration-700 group-hover:-translate-y-3 overflow-hidden">
                  <img
                    className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                    src={product.image_url || product.image}
                    alt={product.name}
                  />
                </div>
              </Link>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading text-lg mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                    {product.category}
                  </p>
                  <p className="text-gold font-medium">₹{product.price}.00</p>
                </div>
                <Button
                  size="sm"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image_url || product.image,
                    })
                  }
                  className="rounded-full bg-gold text-white hover:bg-gold/90 text-[10px] uppercase tracking-widest"
                >
                  Add
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
