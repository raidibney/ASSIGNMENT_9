"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Calendar,
  Home,
  ArrowUpRight,
} from "lucide-react";

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
      border: "border-zinc-800 dark:border-zinc-200",
    },
    {
      step: "02",
      title: "Submit Request",
      desc: "Click the Apply button to share key parameters about your living environment with verified shelter coordinates safely.",
      icon: FileText,
      bg: "bg-primary text-primary-foreground",
      accent: "text-white",
      border: "border-primary/50",
    },
    {
      step: "03",
      title: "Meet & Greet",
      desc: "Arrange a structured, safe personal introduction phase to ensure a comfortable physical bond between both parties.",
      icon: Calendar,
      bg: "bg-amber-500 text-white",
      accent: "text-zinc-900",
      border: "border-amber-400",
    },
    {
      step: "04",
      title: "Finalize Adoption",
      desc: "Process final verification registries to legally and formally transition your beautiful new best friend into your home.",
      icon: Home,
      bg: "bg-emerald-600 text-white",
      accent: "text-zinc-100",
      border: "border-emerald-500",
    },
  ];

  return (
    <section className="relative overflow-hidden py-32 bg-background">
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/5 backdrop-blur-xl mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
              Modern Adoption Protocol
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]"
          >
            Experience The <br />
            <span className="bg-gradient-to-r from-primary via-amber-400 to-emerald-500 bg-clip-text text-transparent">
              Premium Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            A beautifully engineered adoption experience designed with modern
            interaction systems, immersive motion layers, and elegant structural
            flow.
          </motion.p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  type: "spring",
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`group relative overflow-hidden rounded-[36px] border backdrop-blur-2xl p-8 sm:p-10 min-h-[340px] transition-all duration-500 ${item.bg} ${item.border}`}
              >
                {/* SHINE EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 left-[-30%] h-[300px] w-[120px] rotate-12 bg-white/10 blur-2xl" />
                </div>

                {/* TOP */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-5">
                    <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-lg">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div>
                      <p
                        className={`text-[11px] uppercase tracking-[0.25em] font-black ${item.accent}`}
                      >
                        Step {item.step}
                      </p>

                      <h3 className="mt-3 text-3xl font-black tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      rotate: isHovered ? 45 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="opacity-50"
                  >
                    <ArrowUpRight className="h-6 w-6" />
                  </motion.div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 mt-16">
                  <p className="max-w-md text-sm sm:text-base leading-relaxed opacity-80 font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* BIG NUMBER */}
                <div className="absolute bottom-[-20px] right-4 text-[140px] font-black leading-none opacity-[0.05] select-none">
                  {item.step}
                </div>

                {/* GLOW BORDER */}
                <div className="absolute inset-0 rounded-[36px] border border-white/5 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}