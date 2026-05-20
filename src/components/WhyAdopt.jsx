"use client";

import { motion } from "framer-motion";
import { Heart, Home, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: Heart,
      title: "Save a Precious Life",
      description: "Millions of healthy, loving animals face euthanasia each year. By adopting, you give a deserving pet a second chance at genuine happiness.",
      size: "lg:col-span-7", // Large feature block
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      iconColor: "text-rose-500 bg-rose-500/10 border-rose-500/20"
    },
    {
      icon: Home,
      title: "Fight Puppy Mills",
      description: "Adopting directly reduces the financial demand for commercial breeding mills that prioritize profits over basic animal health and global welfare standards.",
      size: "lg:col-span-5", // Medium flanking block
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
      iconColor: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: ShieldCheck,
      title: "Healthier Companions",
      description: "Many rescue animals are mixed breeds, making them naturally resilient to genetic illnesses. Plus, they arrive fully up-to-date on vital vaccinations.",
      size: "lg:col-span-5",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      iconColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: Sparkles,
      title: "Unconditional Loyalty",
      description: "Rescue pets seem to inherently recognize their new lease on life. The deep emotional bond and lifelong devotion you share with an adopted pet remains completely unmatched.",
      size: "lg:col-span-7",
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      iconColor: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    }
  ];

  return (
    <section className="relative py-28 bg-background overflow-hidden select-none">
      {/* Structural Tech Background Mesh Alignment */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* PREMIUM STACKED MASTER HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-muted dark:bg-zinc-900 border border-border px-3 py-1 rounded-xl shadow-sm"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-black tracking-widest uppercase text-muted-foreground">Altruistic Matrix // Impact Log</span>
          </motion.div>
          
          <h2 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl leading-none">
            Why Adopt <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">a Companion?</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Choosing to adopt is a definitive decision that radically transforms your home environment and directly shifts the baseline global safety metrics for animals.
          </p>
        </div>

        {/* HIGH-FIDELITY ASYMMETRIC BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-md mx-auto sm:max-w-none">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group relative flex flex-col justify-between p-8 rounded-[32px] border border-border/80 bg-gradient-to-b from-background to-muted/10 dark:to-zinc-900/10 shadow-sm hover:shadow-xl hover:border-foreground/10 transition-all duration-300 overflow-hidden ${item.size}`}
              >
                {/* Dynamic Corner Gradient Flare on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />

                {/* Top Deck Action Bar */}
                <div className="flex items-start justify-between w-full">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 shadow-sm ${item.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="text-muted-foreground/30 group-hover:text-foreground/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Core Text Configuration */}
                <div className="mt-12 space-y-2.5">
                  <h3 className="text-lg font-black uppercase tracking-wider text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Micro Linear Grid Accent Indicator */}
                <div className="absolute top-0 right-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent group-hover:w-full transition-all duration-700" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}