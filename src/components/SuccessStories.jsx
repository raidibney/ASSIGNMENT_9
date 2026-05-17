"use client";

import { Quote } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      name: "Bella & The Ahmed Family",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=500",
      quote: "Bella was timid when we brought her home, but within a week she became our home's joyful alarm clock. We can't imagine life without her!",
      tag: "Adopted 6 Months Ago"
    },
    {
      name: "Milo & Tanvir",
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=500",
      quote: "Finding Milo on PawsomeAdopt was seamless. He brings so much positive energy into my workspace while I'm programming. True companionship.",
      tag: "Adopted 1 Year Ago"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Happy Beginnings & Success Stories
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            See how matching wonderful families with rescue companions changes lives forever.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm sm:flex-row">
              <div className="h-48 w-full sm:h-auto sm:w-48 flex-shrink-0 relative">
                <img
                  className="h-full w-full object-cover"
                  src={story.image}
                  alt={story.name}
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-primary shadow-sm">
                  {story.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="relative">
                  <Quote className="h-8 w-8 text-primary/10 absolute -top-4 -left-2 -z-10" />
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
  {"\""}{story.quote}{"\""}
</p>
                </div>
                <div className="mt-4 border-t pt-3">
                  <h4 className="text-sm font-bold text-foreground">{story.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}