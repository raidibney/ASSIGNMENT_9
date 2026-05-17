"use client";

import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mx-auto max-w-md space-y-6">
        
        {/* Playful Visual Illustration (Pure CSS & Lucide) */}
        <div className="relative flex justify-center">
          {/* Subtle background glow */}
          <div className="absolute -z-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
          
          <div className="relative h-44 w-44 rounded-full border-4 border-dashed border-primary/40 p-4 flex items-center justify-center bg-background shadow-sm animate-pulse">
            {/* Custom SVG Cute Lost Dog illustration */}
            <svg
              className="h-28 w-28 text-muted-foreground/80 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" className="text-primary/10" />
              <path d="M12 2a5 5 0 0 0-5 5v3.5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7a5 5 0 0 0-5-5zm-2.5 6.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" className="text-muted-foreground" />
              <path d="M5 9.5c-.3 0-.6-.1-.8-.3l-2-2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l2 2c.4.4.4 1 0 1.4-.2.2-.4.3-.6.3zm14 0c-.2 0-.5-.1-.6-.3-.4-.4-.4-1 0-1.4l2-2c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-2 2c-.2.2-.4.3-.8.3z" className="text-primary" />
            </svg>
            
            {/* Small Question Mark Floating Badge */}
            <div className="absolute top-2 right-2 rounded-full bg-amber-500 p-1.5 text-white shadow-md">
              <HelpCircle className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Error Message Header */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Error 404 
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl pt-2">
            Looks Like You are !
          </h1>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed">
            Dont worry, even the best trackers lose the scent sometimes. The page you are looking for has wandered off or been rehomed.
          </p>
        </div>
                
        {/* Quick Back to Safety Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow shadow-primary/20 hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <MoveLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home Base
          </Link>
        </div>

        {/* Helpful Alternative Links */}
        <div className="border-t pt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <Link href="/all-pets" className="hover:text-primary transition-colors">
            Browse All Pets
          </Link>
          <span className="text-muted/40">•</span>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            User Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}