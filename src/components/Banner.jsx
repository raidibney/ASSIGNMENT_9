"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, ShieldCheck } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Banner() {
  const containerRef = useRef(null);
  
 
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);


  const cardX = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), springConfig);
  const cardY = useSpring(useTransform(mouseY, [-400, 400], [-15, 15]), springConfig);

  function handleMouseMove(e) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
   
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-16"
    >
     
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <motion.div 
        style={{
          x: glowX,
          y: glowY,
          transform: "translate(-50%, -50%)"
        }}
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
       
        <div className="w-full lg:w-[55%] text-center lg:text-left space-y-8">
          
       
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-flex items-center space-x-2 bg-zinc-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-xl shadow-sm"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">
              Global Adoption Gateway
            </span>
          </motion.div>

       
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground leading-[0.95]">
              <span className="block text-muted-foreground font-light text-2xl sm:text-4xl tracking-normal mb-1">
                A brand new life for
              </span>
              Every Single <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-amber-500 bg-clip-text text-transparent font-extrabold">
                Beautiful Companion
              </span>
            </h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl text-sm sm:text-base font-medium leading-relaxed"
          >
            We architecture direct premium interactions between certified regional adoption agencies and protective families. Step forward to protect an innocent companion today.
          </motion.p>

         
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/all-pets" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-foreground text-background px-6 text-xs font-black uppercase tracking-widest shadow-md hover:bg-foreground/90 transition-all"
              >
                <span>Initialize Match</span>
                <ArrowRight className="ml-2 h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </motion.div>
            </Link>

            <Link href="/dashboard?tab=add-pet" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: "rgba(128,128,128,0.08)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-border/80 bg-transparent px-6 text-xs font-black uppercase tracking-widest text-foreground transition-all"
              >
                Register Pet
              </motion.div>
            </Link>
          </div>

        
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 pt-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Identity Verified Users</span>
            </div>
            <div className="hidden sm:block h-1 w-1 rounded-full bg-muted-foreground/40" />
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-purple-500" />
              <span>Zero-Cost Infrastructure</span>
            </div>
          </div>

        </div>

      
        <div className="w-full lg:w-[40%] flex justify-center items-center">
          <motion.div 
            style={{ x: cardX, y: cardY }}
            className="relative w-full max-w-[380px] h-[400px] flex items-center justify-center"
          >
            
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-[32px] blur-2xl -z-10" />

           
            <motion.div 
              whileHover={{ scale: 1.03, zIndex: 30 }}
              className="absolute top-0 left-0 w-[75%] h-[70%] bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-2.5 rounded-[24px] shadow-xl"
            >
              <div className="w-full h-full rounded-[16px] overflow-hidden relative group/img">
                <img 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600" 
                  alt="Dog Card" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  draggable="false"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md">
                  Active Listing
                </div>
              </div>
            </motion.div>

          
            <motion.div 
              whileHover={{ scale: 1.04, zIndex: 30 }}
              className="absolute bottom-0 right-0 w-[70%] h-[65%] bg-zinc-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-2.5 rounded-[24px] shadow-2xl z-20"
            >
              <div className="w-full h-full rounded-[16px] overflow-hidden relative group/img2">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500" 
                  alt="Cat Card" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img2:scale-105"
                  draggable="false"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md">
                  98% Match
                </div>
              </div>
            </motion.div>

          
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 -right-6 bg-background border border-border p-3 rounded-xl shadow-xl flex items-center space-x-3 z-30"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="h-4 w-4 fill-current" />
              </div>
              <div className="text-left pr-2">
                <div className="text-xs font-black tracking-tight text-foreground">1.2K +</div>
                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Saved Lives</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}