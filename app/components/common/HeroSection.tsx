"use client";

interface HeroSectionProps {
  title: string;
}

export function HeroSection({ title }: HeroSectionProps) {
  return (
    <section
      className={`relative table w-full py-36 bg-[url('./assets/images/about-hero.jpg')] bg-top bg-no-repeat bg-cover`}
    >
      <div className="absolute inset-0 bg-emerald-900/90 dark:bg-emerald-800/90" />
      <div className="container">
        <div className="grid grid-cols-1 text-center mt-10">
          <h3 className="md:text-3xl z-10 text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white dark:text-slate-100">
            {title}
          </h3>
        </div>
      </div>
    </section>

  );
}
