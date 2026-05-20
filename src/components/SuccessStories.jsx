"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stories = [
    {
      name: "Bella & The Ahmed Family",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=700",
      quote: "Bella was timid when we brought her home, but within a week she became our home's joyful alarm clock. We can't imagine life without her!",
      tag: "Adopted 6 Months Ago",
    },
    {
      name: "Milo & Tanvir",
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=700",
      quote: "Finding Milo on PawsomeAdopt was seamless. He brings so much positive energy into my workspace while I'm programming. True companionship.",
      tag: "Adopted 1 Year Ago",
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="relative py-24 bg-zinc-950 text-white overflow-hidden select-none">
      {/* 1. THE TECH MATRIX GRID LINES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* 2. PREMIUM CHROMATIC GLOWS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION MASTER TITLING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white">
            Success Stories
          </h2>
        </div>

        {/* INTERACTIVE CAROUSEL DECK TRACK CONTAINER */}
        <div className="relative flex items-center justify-center min-h-[480px] w-full">
          
          {/* THE PREVIOUS SIDE-PEEK CARD */}
          <div className="hidden lg:block absolute left-[-20%] xl:left-[-15%] w-[30%] opacity-20 scale-90 pointer-events-none transition-all duration-500">
            <SideCardPeek story={stories[(activeIndex - 1 + stories.length) % stories.length]} />
          </div>

          {/* LEFT TRACK NAVIGATION TRIGGER */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-30 h-14 w-14 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20 transition-all shadow-2xl active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* MAIN CENTER ACTIVE FOCUS VIEWPORT */}
          <div className="w-full max-w-4xl z-20 px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.96, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, x: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="w-full grid grid-cols-1 md:grid-cols-12 bg-zinc-900/80 backdrop-blur-2xl border border-indigo-500/20 rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
              >
                {/* CARD PICTURE FRAME MODULE */}
                <div className="md:col-span-6 h-72 md:h-[440px] relative overflow-hidden">
                  <img
                    src={stories[activeIndex].image}
                    alt={stories[activeIndex].name}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                  
                  {/* Subtle Gradient Shield and Labels */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 left-4 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                    {stories[activeIndex].tag}
                  </span>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-1">
                      Featured Entry
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-serif">
                      {stories[activeIndex].name}
                    </h3>
                  </div>
                </div>

                {/* TESTIMONIAL METRICS ROW CONTENT */}
                <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-transparent to-zinc-950/40">
                  {/* Styled Background Letter Watermark */}
                  <Quote className="absolute right-6 bottom-4 h-36 w-36 text-zinc-800/10 -z-0 pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <p className="text-base md:text-lg text-zinc-300 font-serif leading-relaxed italic font-light">
                      {`"${stories[activeIndex].quote}"`}
                    </p>

                    <div className="flex items-center space-x-3 pt-4 border-t border-zinc-800">
                      <div className="h-7 w-7 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                        ID
                      </div>
                      <div>
                        <p className="text-xs font-black tracking-widest uppercase text-zinc-400">Adoptive Partner</p>
                        <p className="text-sm font-bold text-zinc-200 mt-0.5">{stories[activeIndex].name.split("&")[1] || "Verified Host"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT TRACK NAVIGATION TRIGGER */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-30 h-14 w-14 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/80 hover:border-white/20 transition-all shadow-2xl active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* THE NEXT SIDE-PEEK CARD */}
          <div className="hidden lg:block absolute right-[-20%] xl:right-[-15%] w-[30%] opacity-20 scale-90 pointer-events-none transition-all duration-500">
            <SideCardPeek story={stories[(activeIndex + 1) % stories.length]} />
          </div>

        </div>

        {/* PROGRESS-DASH BOARD METRIC SYSTEM */}
        <div className="flex justify-center items-center space-x-3 mt-12">
          {stories.map((_, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="h-1 rounded-full overflow-hidden transition-all duration-500 relative"
                style={{ width: isActive ? "80px" : "16px" }}
              >
                <div className={`absolute inset-0 rounded-full ${isActive ? "bg-indigo-500" : "bg-zinc-800"}`} />
                {isActive && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500"
                  />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Micro Layout View for Ambient Offscreen Cards
function SideCardPeek({ story }) {
  return (
    <div className="w-full bg-zinc-900 border border-white/5 rounded-[24px] overflow-hidden p-3 space-y-4">
      <div className="h-48 w-full rounded-[16px] overflow-hidden">
        <img src={story.image} alt="" className="w-full h-full object-cover grayscale opacity-50" />
      </div>
      <div className="space-y-1 px-2 pb-2">
        <div className="h-3 w-1/3 bg-zinc-800 rounded" />
        <div className="h-4 w-2/3 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}