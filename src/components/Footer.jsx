"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PawPrint, Mail, Phone, MapPin, Heart, ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "All Pets", href: "/all-pets" },
    { label: "Rehome a Pet", href: "/add-pet" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@pawsomeadopt.com", href: "mailto:support@pawsomeadopt.com" },
    { icon: Phone, text: "+123 456 7890", href: "tel:+1234567890" },
    { icon: MapPin, text: "123 Bark Avenue, Pet City", href: null },
  ];

  return (
    <footer className="relative w-full border-t border-border/60 bg-background text-muted-foreground overflow-hidden select-none">
      {/* Structural Tech Background Matrix Alignment */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.01)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Ambient Micro Glow Fields */}
      <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP DECK: CORE NAVIGATION MESH */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          
          {/* BRAND ARCHITECTURE PANEL */}
          <div className="md:col-span-5 flex flex-col space-y-4 pr-0 md:pr-8">
            <Link href="/" className="group inline-flex items-center space-x-2.5 text-foreground font-black text-xl tracking-tighter">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-all duration-300">
                <PawPrint className="h-4 w-4 fill-current" />
              </div>
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Pawsome<span className="font-light text-primary">Adopt</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-sm text-muted-foreground/80">
              Connecting loving families with rescue pets across verified coordinates. Our system pipeline streamlines adoption routes to find a home for every wagging tail.
            </p>
            <div className="inline-flex items-center space-x-2 pt-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">Registry Node Active</span>
            </div>
          </div>

          {/* QUICK LINKS COMPONENT BLOCK */}
          <div className="md:col-span-2 flex flex-col space-y-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-foreground/90 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-primary" /> System Index
            </span>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center justify-between text-muted-foreground hover:text-foreground transition-all duration-200 py-0.5"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT VECTOR CONNECTIONS */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <span className="text-[10px] font-black tracking-widest uppercase text-foreground/90 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-amber-500" /> Endpoint Data
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <>
                    <div className="h-7 w-7 rounded-lg bg-muted/60 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-300 flex-shrink-0">
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate text-muted-foreground/80 group-hover:text-foreground transition-colors">
                      {info.text}
                    </span>
                  </>
                );

                return (
                  <li key={index}>
                    {info.href ? (
                      <a href={info.href} className="group flex items-center space-x-2.5 py-0.5">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center space-x-2.5 py-0.5">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SOCIAL NETWORK HUB */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-foreground/90 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-indigo-500" /> Stream Feed
            </span>
            <p className="text-xs text-muted-foreground/70 font-medium leading-relaxed">
              Track real-time rescue sequences and logs.
            </p>
            <div className="flex space-x-2 pt-1">
              {[
                { label: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", type: "fill" },
                { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", type: "fill" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", type: "stroke" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={`https://${social.label.toLowerCase()}.com`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-8 w-8 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-background transition-all duration-300 shadow-sm active:scale-95"
                  aria-label={social.label}
                >
                  {social.type === "fill" ? (
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  ) : (
                    <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d={social.path}></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* SYSTEM LINE SPLIT ACCENT */}
        <div className="relative w-full h-[1px] bg-border/60 my-6">
          <div className="absolute top-0 left-0 h-[1px] w-1/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* BASE SYSTEM META FOOTER */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] font-mono font-bold tracking-wider uppercase text-muted-foreground/60 space-y-4 md:space-y-0">
          <p className="hover:text-muted-foreground transition-colors duration-200">
            &copy; {currentYear} PawsomeAdopt. Core Protocol Registry.
          </p>
          
          <div className="flex items-center space-x-1 bg-muted/40 dark:bg-zinc-900/40 border border-border/50 px-3 py-1 rounded-xl shadow-inner">
            <span>Built via</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse mx-0.5" />
            <span>For Global Animal Logistics</span>
          </div>
        </div>

      </div>
    </footer>
  );
}