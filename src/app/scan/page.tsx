"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, ChevronRight, AlertCircle, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

type ScanStep = "onboarding" | "scanning" | "results";

interface AnalysisResult {
  acne: number;
  wrinkles: number;
  darkSpots: number;
  dietaryAdvice: string;
  recommendedProduct: {
    id: string;
    name: string;
    image: string;
    price: string;
  };
}

export default function ScanPage() {
  const [step, setStep] = useState<ScanStep>("onboarding");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStep("scanning");
      // Wait for camera to stabilize then capture automatically after 4.5s
      setTimeout(captureAndAnalyze, 4500);
    } catch (err) {
      console.error("Camera access denied", err);
      setError("Please enable camera access to analyze your skin.");
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsScanning(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();
      if (data.error && !data.is_mock) throw new Error(data.error);

      setResult({
        acne: data.acne || 0,
        wrinkles: data.wrinkles || 0,
        darkSpots: data.dark_spots || 0,
        dietaryAdvice: data.dietary_advice || "Focus on hydration and antioxidants.",
        recommendedProduct: {
          id: data.optimized_product_id || "1",
          name: data.recommended_actives?.join(" + ") || "Custom Formula",
          image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop",
          price: "₹1,499",
        },
      });
      setStep("results");
    } catch (err: any) {
      console.error("Analysis Failed:", err);
      setError(err.message || "Something went wrong during analysis. Please try again.");
      setStep("onboarding");
    } finally {
      setIsScanning(false);
      // Stop the camera stream
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 overflow-hidden">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative">
        {/* Hidden canvas for capturing frame */}
        <canvas ref={canvasRef} className="hidden" />

        <AnimatePresence mode="wait">
          {/* STEP 1: ONBOARDING */}
          {step === "onboarding" && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-lg"
            >
              <div className="relative mb-8 inline-block">
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
                <div className="relative w-48 h-48 rounded-full border-2 border-primary/20 flex items-center justify-center overflow-hidden bg-cream-dark/50 p-2">
                   <img 
                    src="https://images.unsplash.com/photo-1552668693-84013063f972?q=80&w=400&auto=format&fit=crop" 
                    alt="Skin Analysis" 
                    className="w-full h-full object-cover rounded-full opacity-80"
                  />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-primary border-dashed rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading mb-4 leading-tight">
                Personalized AI-Powered <span className="italic block">Skincare Journey</span>
              </h1>
              <p className="text-muted-foreground mb-10 text-lg">
                Unlock clinical-grade skin analysis in seconds. Our AI maps 1,000+ data points to craft your perfect formula.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-2xl flex items-center gap-3 justify-center border border-destructive/20">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <Button 
                onClick={startCamera}
                size="lg" 
                className="rounded-full px-12 h-14 text-lg btn-gold-glow group"
              >
                Get Started
                <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: SCANNING */}
          {step === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full max-w-sm aspect-[3/4] rounded-[3rem] overflow-hidden border-8 border-cream-dark shadow-2xl bg-black"
            >
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover opacity-80 grayscale-[0.3]"
              />
              
              {/* Face Mesh Overlay Simulation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-80 border-2 border-primary/40 rounded-[2.5rem] relative overflow-hidden">
                   {/* Scanning Beam */}
                   <motion.div 
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(113,91,53,0.8)] z-10"
                   />
                   
                   {/* Decorative Mesh Grid */}
                   <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 opacity-20">
                      {[...Array(48)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-primary/30" />
                      ))}
                   </div>

                   {/* Point Tracking Simulation */}
                   <AnimatePresence>
                    {isScanning && [...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.5 }}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          boxShadow: "0 0 10px rgba(113,91,53,1)"
                        }}
                      />
                    ))}
                   </AnimatePresence>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 right-0 text-center z-20">
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full inline-flex items-center gap-3 border border-white/10">
                   <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                   <span className="text-white font-medium text-sm tracking-widest uppercase">
                    {isScanning ? "Analyzing Concerns..." : "Aligning Face..."}
                   </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESULTS */}
          {step === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Profile & Score Column */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-heading">Skin Analysis</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "Acne", value: result.acne, color: "bg-orange-500" },
                    { label: "Wrinkles", value: result.wrinkles, color: "bg-blue-500" },
                    { label: "Dark Spots", value: result.darkSpots, color: "bg-primary" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-primary/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-primary font-bold">{item.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice Column */}
              <div className="space-y-6 flex flex-col pt-12">
                <div className="bg-primary/5 border border-primary/20 p-6 rounded-[2rem] relative overflow-hidden group flex-grow">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
                  <div className="flex flex-col gap-4 relative z-10 h-full">
                    <div className="bg-white rounded-full w-10 h-10 shrink-0 flex items-center justify-center border border-primary/20">
                       <AlertCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-primary">Nutritional Synergy</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        {result.dietaryAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Column */}
              <div className="space-y-6">
                <div className="bg-white shadow-xl rounded-[2.5rem] p-8 border border-primary/5 flex flex-col justify-between h-full group hover:shadow-2xl transition-all duration-500">
                  <div className="text-center">
                    <div className="bg-accent/30 inline-block px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                      AI Optimized Formula
                    </div>
                    <div className="w-40 h-40 bg-cream-dark rounded-full mx-auto mb-6 p-4 flex items-center justify-center relative shadow-inner">
                      <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse" />
                      <ShoppingBag className="w-16 h-16 text-primary/20 absolute opacity-10" />
                      <img 
                        src={result.recommendedProduct.image} 
                        alt="Target Product" 
                        className="w-full h-full object-contain relative z-10 scale-110 group-hover:scale-125 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-xl font-heading mb-2 leading-tight">{result.recommendedProduct.name}</h3>
                    <p className="text-primary font-bold text-lg mb-6">{result.recommendedProduct.price}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full rounded-full h-12 btn-gold-glow">
                      Apply to Boutique
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full rounded-full h-12 text-muted-foreground hover:text-primary transition-colors" 
                      onClick={() => setStep("onboarding")}
                    >
                      <RefreshCw className="mr-2 w-4 h-4" />
                      Retake Photo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
