"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Swords, Shield, Sparkles, Flag, Quote } from "lucide-react";
import { heroes, type Hero } from "./heroes-data";

export default function HeroPickerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const isAnimating = useRef(false);

  const current = heroes[currentIndex];

  const goTo = (index: number) => {
    if (isAnimating.current || index === currentIndex) return;
    isAnimating.current = true;
    setPendingIndex(index);
    setNoTransition(false);
    setFlipped(true);
  };

  const handleTransitionEnd = () => {
    if (pendingIndex !== null) {
      setNoTransition(true);
      setCurrentIndex(pendingIndex);
      setPendingIndex(null);
      setFlipped(false);
      isAnimating.current = false;
    }
  };

  const goNext = () => goTo((currentIndex + 1) % heroes.length);
  const goPrev = () => goTo((currentIndex - 1 + heroes.length) % heroes.length);

  return (
    <section className="relative mx-auto max-w-page overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div
        className="absolute inset-0 -z-10 rounded-2xl bg-canvas transition-colors duration-slow ease-standard"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 30%, ${current.accent}22, transparent 55%)`,
        }}
      />
      <div className="absolute inset-0 -z-10 rounded-2xl border border-border-subtle" />

      <div className="relative z-10 mb-8 flex items-center justify-between text-sm font-bold text-text-secondary sm:text-base">
        <span>افسانه‌ها در یک جهان</span>
        <span className="text-red-400">انتخاب شخصیت</span>
      </div>

      <div className="relative z-10" style={{ perspective: "2000px" }}>
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: noTransition ? "none" : "transform 700ms cubic-bezier(0.4, 0.1, 0.2, 1)",
          }}
          className="relative"
        >
          <div style={{ backfaceVisibility: "hidden" }}>
            <HeroPanel hero={current} />
          </div>

          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              inset: 0,
            }}
          >
            <HeroPanel hero={pendingIndex !== null ? heroes[pendingIndex] : current} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={goNext}
          aria-label="شخصیت بعدی"
          className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-red-400 hover:text-red-400"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {heroes.map((hero, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={hero.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={hero.name}
                className={`relative size-11 shrink-0 overflow-hidden rounded-full border-2 transition-all duration-base ease-standard sm:size-14 ${
                  isActive
                    ? "scale-110 border-red-400 shadow-accent"
                    : "border-border-subtle opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={hero.image} alt={hero.name} fill sizes="56px" className="object-cover object-top" />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="شخصیت قبلی"
          className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-red-400 hover:text-red-400"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
      </div>

      <div className="relative z-10 mt-4 flex justify-center gap-1.5">
        {heroes.map((hero, index) => (
          <span
            key={hero.id}
            className={`h-1 rounded-full transition-all duration-base ease-standard ${
              index === currentIndex ? "w-6 bg-red-400" : "w-3 bg-border-strong"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function HeroPanel({ hero }: { hero: Hero }) {
  const stats = [
    { icon: Sparkles, label: "دنیای بازی", value: hero.world },
    { icon: Swords, label: "سلاح اصلی", value: hero.weapon },
    { icon: Shield, label: "سبک مبارزه", value: hero.style },
    { icon: Flag, label: "اولین حضور", value: hero.firstAppearance },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-center lg:gap-4">
      <div className="order-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-8 lg:order-1">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-text-tertiary sm:text-sm">
          {hero.game}
        </p>
        <h3 className="mb-1 font-display text-h3 font-bold text-text-primary sm:text-h2">
          {hero.name}
        </h3>
        <p className="mb-4 text-sm font-bold" style={{ color: hero.accent }}>
          {hero.title}
        </p>

        <p className="mb-6 text-sm leading-7 text-text-secondary sm:text-base">
          {hero.description}
        </p>

        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface/60 p-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2 text-text-tertiary">
                <stat.icon className="size-4" aria-hidden />
                {stat.label}
              </span>
              <span className="font-semibold text-text-primary">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2 border-r-2 pr-3 text-sm italic text-text-secondary" style={{ borderColor: hero.accent }}>
          <Quote className="mt-0.5 size-4 shrink-0 rotate-180" style={{ color: hero.accent }} aria-hidden />
          <span>{hero.quote}</span>
        </div>
      </div>

      <div className="order-1 flex justify-center lg:order-2">
        <div className="relative aspect-[4/5] w-full max-w-[340px] sm:max-w-[400px]">
          <div
            className="absolute inset-0 -z-10 blur-3xl"
            style={{ backgroundColor: `${hero.accent}33` }}
          />

          <div
            className="relative h-full w-full overflow-hidden border-2"
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)",
              borderColor: hero.accent,
              boxShadow: `0 0 40px ${hero.accent}55, inset 0 0 40px ${hero.accent}22`,
            }}
          >
            <Image
              src={hero.image}
              alt={hero.name}
              fill
              sizes="400px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" />
          </div>

          <span
            className="absolute -end-2 top-1/2 hidden -translate-y-1/2 text-xs font-black tracking-[0.3em] sm:block"
            style={{
              writingMode: "vertical-rl",
              color: hero.accent,
            }}
          >
            {hero.name.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}