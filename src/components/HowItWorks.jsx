"use client";

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Browse Profiles", desc: "Filter listings by age, size, and personality to match your current living arrangement." },
    { step: "02", title: "Submit Request", desc: "Click the Apply button to share information about your home environment with shelter hosts." },
    { step: "03", title: "Meet & Greet", desc: "Schedule a safe personal introduction interaction to ensure you both form a comfortable match." },
    { step: "04", title: "Finalize Adoption", desc: "Complete basic structural paperwork to formally bring your new best friend safely home!" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Four Simple Steps to Adoption
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Our streamlined process ensures that finding and approving your ideal animal matching takes minimal effort.
        </p>

        <div className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={index} className="relative group text-left p-6 rounded-2xl border bg-background/50 hover:bg-background transition-colors">
              <span className="block text-4xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}