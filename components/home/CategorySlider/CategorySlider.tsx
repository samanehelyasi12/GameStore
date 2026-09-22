"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import { categoryItems } from "./categories-data";

const AUTOPLAY_MS = 4000;

/**
 * Horizontal category slider: 6 cards visible on desktop, fewer on
 * smaller screens, scroll-snap based (no extra dependency). RTL-aware —
 * "next" always moves toward the start of reading order (right → left).
 */
export default function CategorySlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // In RTL, scrollLeft is <= 0 (or positive-inverted) depending on the
    // browser; using both ends against scrollWidth keeps it correct either way.
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanPrev(pos > 4);
    setCanNext(pos < max - 4);
  }, []);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 200) + 16; // + gap
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  // "Next" = forward in reading order = visually leftward in RTL.
  const goNext = useCallback(() => scrollByCard(-1), [scrollByCard]);
  const goPrev = useCallback(() => scrollByCard(1), [scrollByCard]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  // Autoplay — pauses on hover/focus/touch and stops at the last card.
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const pos = Math.abs(el.scrollLeft);
      if (pos >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        goNext();
      }
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, goNext]);

  return (
    <section
      aria-label="دسته‌بندی‌ها"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="mx-auto w-full max-w-page px-3 sm:px-4"
    >
      <div className="mt-9 flex items-center justify-between">
        <h2 className="font-display text-h3 font-bold text-text-primary sm:text-h2">
          دسته‌بندی‌ها
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="دسته‌بندی قبلی"
            disabled={!canPrev}
            onClick={goPrev}
            className="grid size-9 place-items-center rounded-full border border-red-500/40 text-text-primary transition-[border-color,color,opacity] duration-fast hover:border-red-500 hover:text-red-400 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="دسته‌بندی بعدی"
            disabled={!canNext}
            onClick={goNext}
            className="grid size-9 place-items-center rounded-full border border-red-500/40 text-text-primary transition-[border-color,color,opacity] duration-fast hover:border-red-500 hover:text-red-400 disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categoryItems.map((item) => (
          <div
            key={item.id}
            data-card
            className="w-[calc((100%-20px)/2)] shrink-0 sm:w-[calc((100%-2*20px)/3)] md:w-[calc((100%-3*20px)/4)] lg:w-[calc((100%-4*20px)/5)]"
          >
            <CategoryCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}