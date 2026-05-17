"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 lg:py-24">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="text-center lg:col-span-7 lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5 fill-current" />
              <span>Find Your Furry Family Today</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
              Every Pet Deserves a <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                Loving Forever Home
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0 leading-relaxed">
              PawsomeAdopt connects compassionate families with delightful pets waiting for a second chance. Adopt, dont shop, and experience the pure, unconditional love a companion brings to your life.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/all-pets"
                className="group inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span>Adopt Now</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/dashboard?tab=add-pet"
                className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-6 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all w-full sm:w-auto"
              >
                Rehome a Pet
              </Link>
            </div>

            {/* Quick Stats / Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-foreground">1,200+</p>
                <p className="text-xs text-muted-foreground">Pets Adopted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">450+</p>
                <p className="text-xs text-muted-foreground">Active Listings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">99%</p>
                <p className="text-xs text-muted-foreground">Happy Families</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Image Grid */}
          <div className="relative lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md h-[400px]">
              
              {/* Main Large Image (Dog) */}
              <div className="absolute top-0 right-4 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-2xl border-4 border-background rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600"
                  alt="Happy dog looking up"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Smaller Image (Cat) */}
              <div className="absolute bottom-4 left-4 w-[55%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-background -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500"
                  alt="Cute kitten staring"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Card Badge */}
              <div className="absolute bottom-16 right-0 bg-background p-3 rounded-2xl shadow-xl flex items-center space-x-3 border animate-bounce duration-1000">
                <div className="p-2 rounded-xl bg-destructive/10 text-destructive">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-bold text-foreground">Save a Life</p>
                  <p className="text-[10px] text-muted-foreground">They need you</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}