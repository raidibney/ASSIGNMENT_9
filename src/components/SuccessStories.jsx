"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
} from "lucide-react";

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    {
      name: "Bella & The Ahmed Family",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200",
      quote:
        "Bella was timid when we brought her home, but within a week she became our home's joyful alarm clock.",
      role: "Verified Adoption Story",
      adopted: "6 Months Ago",
    },
    {
      name: "Milo & Tanvir",
      image:
        "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=1200",
      quote:
        "Finding Milo on PawsomeAdopt was seamless. He brings positive energy into my workspace every single day.",
      role: "Verified Adoption Story",
      adopted: "1 Year Ago",
    },
    {
      name: "Luna & Sarah",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1200",
      quote:
        "The adoption process felt premium from start to finish. Luna instantly became part of our family.",
      role: "Verified Adoption Story",
      adopted: "4 Months Ago",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-28 transition-colors duration-500">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* BLOBS */}
        <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl dark:bg-amber-500/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur-xl px-4 py-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />

              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                Community Stories
              </span>
            </div>

            <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-foreground">
              Real Stories. <br />

              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
                Real Connections.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
              Every adoption creates a lifelong bond. Explore inspiring stories
              from families who found their perfect companion.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background/70 text-foreground backdrop-blur-xl transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT STACKED IMAGES */}
          <div className="lg:col-span-5 relative h-[450px] hidden lg:flex items-center justify-center">
            {stories.map((story, index) => {
              const isActive = index === activeIndex;

              let position = index - activeIndex;

              if (position < 0) {
                position += stories.length;
              }

              return (
                <motion.div
                  key={index}
                  animate={{
                    scale: isActive ? 1 : 0.88,
                    rotate: isActive ? 0 : position === 1 ? 8 : -8,
                    x: isActive ? 0 : position === 1 ? 110 : -110,
                    y: isActive ? 0 : 30,
                    opacity: isActive ? 1 : 0.35,
                    zIndex: isActive ? 30 : 10,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                  }}
                  className="absolute"
                >
                  <div className="rounded-[34px] border border-border bg-background/60 p-3 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
                    <div className="relative overflow-hidden rounded-[26px] w-[290px] h-[360px]">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="h-full w-full object-cover"
                        draggable="false"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-300">
                          {story.adopted}
                        </p>

                        <h3 className="text-2xl font-black text-white leading-tight">
                          {story.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[40px] border border-border bg-background/70 p-8 sm:p-10 lg:p-14 backdrop-blur-2xl"
              >
                {/* FLOATING QUOTE */}
                <Quote className="absolute top-8 right-8 h-32 w-32 text-muted/40 dark:text-white/[0.04]" />

                {/* MOBILE IMAGE */}
                <div className="lg:hidden mb-8">
                  <div className="overflow-hidden rounded-[28px] h-[260px]">
                    <img
                      src={stories[activeIndex].image}
                      alt={stories[activeIndex].name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="relative z-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500">
                    {stories[activeIndex].role}
                  </span>

                  <h3 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-foreground">
                    {stories[activeIndex].name}
                  </h3>

                  <p className="mt-8 max-w-3xl text-xl sm:text-2xl font-medium leading-relaxed text-muted-foreground">
                    “{stories[activeIndex].quote}”
                  </p>

                  {/* FOOTER */}
                  <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-black text-white shadow-lg">
                        {stories[activeIndex].name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                          Happy Adoption
                        </p>

                        <h4 className="mt-1 text-lg font-bold text-foreground">
                          Verified Family
                        </h4>
                      </div>
                    </div>

                    <button className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-sm font-bold text-background transition-all duration-300 hover:scale-[1.03]">
                      Read Full Story

                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* INDICATORS */}
            <div className="mt-10 flex items-center gap-3">
              {stories.map((_, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                      isActive
                        ? "h-3 w-20"
                        : "h-3 w-3 bg-muted"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="indicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}