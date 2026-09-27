"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { trailers, aparatEmbedUrl, type Trailer } from "./trailers-data";

export default function TrailersSection() {
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(null);
  const [closing, setClosing] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setActiveTrailer(null);
      setClosing(false);
    }, 250);
  };

  const scrollByCards = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* تایتل + فلش‌ها (موبایل/تبلت) */}
      <div className="mb-8 flex items-end justify-between gap-4 lg:mb-14 lg:flex-col lg:items-center lg:justify-center lg:gap-2 lg:text-center">
        <div className="flex flex-col gap-2 lg:mx-auto lg:max-w-xl lg:items-center">
          <h2 className="font-display text-h4 font-bold text-text-primary sm:text-h3 lg:text-h2">
            تریلر <span className="text-red-400">بازی‌ها</span>
          </h2>
          <p className="hidden text-sm text-text-secondary sm:block lg:text-base">
            نگاهی کوتاه به دنیای بازی‌های محبوب پیش از خرید
          </p>
          <span className="hidden h-1 w-14 rounded-full bg-red-500 lg:mt-1 lg:block" />
        </div>

        {/* فلش‌ها — فقط موبایل/تبلت */}
        <div className="flex shrink-0 gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="قبلی"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-red-400 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="بعدی"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-primary transition-colors duration-base ease-standard hover:border-red-400 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5l-7.5 7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* موبایل/تبلت: اسلایدر افقی */}
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
      >
        {trailers.map((trailer) => (
          <div key={trailer.id} data-card className="w-[82%] shrink-0 snap-start sm:w-[48%]">
            <Card3D trailer={trailer} onPlay={() => setActiveTrailer(trailer)} />
          </div>
        ))}
      </div>

      {/* دسکتاپ: گرید ۳ ستونه */}
      <div className="hidden grid-cols-3 gap-10 lg:grid">
        {trailers.map((trailer) => (
          <Card3D key={trailer.id} trailer={trailer} onPlay={() => setActiveTrailer(trailer)} />
        ))}
      </div>

      {activeTrailer && (
        <TrailerModal trailer={activeTrailer} closing={closing} onClose={handleClose} />
      )}
    </section>
  );
}

function TrailerModal({
  trailer,
  closing,
  onClose,
}: {
  trailer: Trailer;
  closing: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(229,72,77,0.12), transparent 60%), rgba(3,5,9,0.92)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-red-500/40 blur-2xl"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animation: `float-particle ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl origin-center transition-all duration-300 ease-[cubic-bezier(0.2,0.9,0.1,1)] ${
          closing
            ? "scale-75 rotate-3 opacity-0"
            : "scale-100 rotate-0 opacity-100 animate-[modal-in_0.4s_cubic-bezier(0.2,0.9,0.1,1)]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/60 via-purple-500/40 to-transparent opacity-70 blur-lg" aria-hidden />

        <div className="relative overflow-hidden rounded-2xl border border-red-400/30 bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border-subtle bg-gradient-to-l from-red-subtle to-transparent px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-red-500">
                <Play className="size-3" fill="currentColor" aria-hidden />
              </span>
              <h3 className="line-clamp-1 font-display text-sm font-bold text-text-primary">
                {trailer.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="بستن"
              className="group flex size-8 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-all duration-fast ease-fast hover:rotate-90 hover:border-red-400 hover:bg-red-500 hover:text-text-inverse"
            >
              <X className="size-4 transition-transform" aria-hidden />
            </button>
          </div>

          <div className="aspect-video w-full bg-canvas">
            <iframe
              src={aparatEmbedUrl(trailer.aparatId)}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="h-full w-full"
              title={trailer.title}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-in {
          from {
            transform: scale(0.6) rotateY(15deg);
            opacity: 0;
          }
          to {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
          }
        }
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -30px) scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}

function Card3D({ trailer, onPlay }: { trailer: Trailer; onPlay: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRot({ x: (0.5 - py) * 22, y: (px - 0.5) * 26 });
    setMouse({ x: px * 100, y: py * 100 });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setRot({ x: 0, y: 0 });
      }}
      style={{ perspective: "1200px" }}
      className="group relative"
    >
      <div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500 via-purple-500 to-accent-500 opacity-0 blur-xl transition-opacity duration-slow ease-standard group-hover:opacity-60"
        aria-hidden
      />

      <div className="absolute -inset-[1.5px] overflow-hidden rounded-2xl" aria-hidden>
        <div
          className="absolute inset-[-50%] opacity-0 transition-opacity duration-base ease-standard group-hover:opacity-100"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, var(--color-red-500) 15%, transparent 30%)",
            animation: hovering ? "spin-border 2.2s linear infinite" : "none",
          }}
        />
      </div>

      <button
        type="button"
        onClick={onPlay}
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: "preserve-3d",
          transition: hovering ? "transform 80ms linear" : "transform 500ms cubic-bezier(0.2,0.9,0.1,1)",
        }}
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface text-start will-change-transform"
      >
        <div style={{ transform: "translateZ(0px)" }} className="absolute inset-0">
          <Image
            src={trailer.poster}
            alt={trailer.title}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-slow ease-standard group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-canvas/95 via-canvas/20 to-transparent" />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.28), transparent 50%)`,
          }}
        />

        <div style={{ transform: "translateZ(60px)" }} className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex size-16 items-center justify-center rounded-full bg-red-500 text-text-inverse transition-all duration-base ease-standard group-hover:scale-125 group-hover:shadow-[0_0_35px_8px_rgba(229,72,77,0.55)]">
            <Play className="size-7" fill="currentColor" aria-hidden />
          </span>
        </div>

        {trailer.duration && (
          <span style={{ transform: "translateZ(35px)" }} className="absolute end-3 top-3 rounded-md bg-canvas/80 px-2 py-1 text-xs font-bold text-text-primary backdrop-blur-sm">
            {trailer.duration}
          </span>
        )}

        <span style={{ transform: "translateZ(35px)" }} className="absolute inset-x-0 bottom-0 p-4">
          <span className="line-clamp-1 text-sm font-bold text-text-primary sm:text-base">
            {trailer.title}
          </span>
        </span>
      </button>

      <style jsx>{`
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}