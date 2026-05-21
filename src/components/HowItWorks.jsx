"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Calendar, Home, ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const steps = [
    { 
      step: "01", 
      title: "Browse Profiles", 
      desc: "Filter listings by age, size, and personality parameters to find a companion that fits your exact lifestyle matrix seamlessly.",
      icon: Search,
      bg: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
      accent: "text-primary",
      border: "border-zinc-800 dark:border-zinc-200"
    },
    { 
      step: "02", 
      title: "Submit Request", 
      desc: "Click the Apply button to share key parameters about your living environment with verified shelter coordinates safely.",
      icon: FileText,
      bg: "bg-primary text-primary-foreground",
      accent: "text-white",
      border: "border-primary/50"
    },
    { 
      step: "03", 
      title: "Meet & Greet", 
      desc: "Arrange a structured, safe personal introduction phase to ensure a comfortable physical bond between both parties.",
      icon: Calendar,
      bg: "bg-amber-500 text-white",
      accent: "text-zinc-900",
      border: "border-amber-400"
    },
    { 
      step: "04", 
      title: "Finalize Adoption", 
      desc: "Process final verification registries to legally and formally transition your beautiful new best friend into your home.",
      icon: Home,
      bg: "bg-emerald-600 text-white",
      accent: "text-zinc-100",
      border: "border-emerald-500"
    }
  ];

  return (
    <section className="relative py-32 bg-background overflow-hidden select-none">
     
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
         
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-muted dark:bg-zinc-900 border border-border px-3 py-1 rounded-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">The Interactive Stack</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-foreground leading-[1.05]">
              Four Steps <br />
              To Your New <br />
              <span className="bg-gradient-to-r from-primary via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                Family Dynamic
              </span>
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-sm leading-relaxed">
              Hover over or scroll through the structural stack layout to preview how our modern deployment network simplifies your configuration.
            </p>

      
            <div className="hidden lg:flex items-center space-x-2 pt-4">
              {steps.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    hoveredIndex === idx ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[550px] w-full flex flex-col justify-start items-center">
            {steps.map((item, index) => {
              const IconComponent = item.icon;
              
              
              const isHovered = hoveredIndex === index;
              const anyHovered = hoveredIndex !== null;
              
              
              let yOffset = index * 45;
              let scaleOffset = 1 - (steps.length - 1 - index) * 0.03;
              let zIndexValue = 10 + index;
              let opacityValue = 1;

              
              if (anyHovered) {
                if (isHovered) {
                  yOffset = index * 35 - 15; 
                  scaleOffset = 1.02;
                  zIndexValue = 50; 
                } else if (index < hoveredIndex) {
                  yOffset = index * 35 - 25; 
                  scaleOffset = 0.94;
                  opacityValue = 0.4; 
                } else {
                  yOffset = index * 45 + 20; 
                  scaleOffset = 0.96;
                  opacityValue = 0.6;
                }
              }

              return (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    y: yOffset,
                    scale: scaleOffset,
                    zIndex: zIndexValue,
                    opacity: opacityValue
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className={`absolute w-full max-w-[500px] border p-8 sm:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col justify-between h-[320px] transition-colors duration-200 ${item.bg} ${item.border}`}
                  style={{
                    top: 0,
                    transformOrigin: "top center"
                  }}
                >
                  {/* Card Header Section */}
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 dark:bg-black/5 backdrop-blur-md flex items-center justify-center border border-white/10 dark:border-black/5 shadow-sm">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.accent}`}>
                        Protocol Phase // {item.step}
                      </span>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isHovered ? 45 : 0 }}
                      className="text-white/40 dark:text-zinc-500/40"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  {/* Card Core Typography Content */}
                  <div className="space-y-3 mt-auto">
                    <h3 className="text-2xl font-black tracking-tight uppercase">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-80 font-medium leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>

                  {/* Floating Giant Index Design Accent */}
                  <span className="absolute bottom-4 right-6 font-mono text-7xl font-black opacity-[0.04] select-none">
                    {item.step}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}