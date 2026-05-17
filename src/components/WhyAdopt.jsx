"use client";

import { Heart, Home, ShieldCheck, Sparkles } from "lucide-react";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: Heart,
      title: "Save a Precious Life",
      description: "Millions of healthy, loving animals face euthanasia each year. By adopting, you give a deserving pet a second chance at happiness."
    },
    {
      icon: Home,
      title: "Fight Puppy Mills",
      description: "Adopting directly reduces the financial demand for commercial breeding mills that prioritize profits over animal welfare and health."
    },
    {
      icon: ShieldCheck,
      title: "Healthier Companions",
      description: "Many rescue animals are mixed breeds, which naturally makes them less prone to genetic illnesses. Plus, most are already vaccinated!"
    },
    {
      icon: Sparkles,
      title: "Unconditional Loyalty",
      description: "Rescue pets seem to know they've been given a new lease on life. The bond and loyalty you share with an adopted pet is unmatched."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Adopt a Pet?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Choosing to adopt is a powerful decision that transforms your lifestyle and directly creates a better world for animals.
        </p>

        <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center p-6 rounded-2xl border bg-background text-center shadow-sm transition-all hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}