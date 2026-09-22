"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * =====================================================================
 * Hero Slider
 *
 * بهینه‌سازی‌های این نسخه:
 *  1. ویدئوی Dante دیگر هر بار با حرکت موس mirror نمی‌شود.
 *  2. seekهای ویدیو با requestAnimationFrame محدود می‌شوند.
 *  3. seekهای خیلی کوچک نادیده گرفته می‌شوند.
 *  4. در مرورگرهایی که پشتیبانی کنند از fastSeek استفاده می‌شود.
 *  5. سیستم hysteresis/debounce قبلی برای جلوگیری از تغییر ناگهانی مود حفظ شده.
 * =====================================================================
 */

const VIDEO_SRC = "/videos/dante-interactive.mp4";

const T_FRONT = 0;
const T_LEFT_END = 3.75;

const T_UP_START = 3.9;
const T_UP_END = 5.6;

const T_DOWN_END = 7.5;

type Mode = "idle" | "x" | "yUp" | "yDown";

export default function HeroSlider() {
  const totalSlides = 3;

  const [activeSlide, setActiveSlide] = useState(0);

  const goTo = (index: number) => {
    setActiveSlide(((index % totalSlides) + totalSlides) % totalSlides);
  };

  return (
    <div className="animate-enter-bottom mx-auto max-w-page px-4 sm:px-6 lg:px-8">
      <section className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border-subtle">
        {/* Slide 1 */}
        <Slide active={activeSlide === 0}>
          <DanteSlide active={activeSlide === 0} />
        </Slide>

        {/* Slide 2 */}
        <Slide active={activeSlide === 1}>
          <ConsoleSlide active={activeSlide === 1} />
        </Slide>

        {/* Slide 3 */}
        <Slide active={activeSlide === 2}>
          <DiscountSlide active={activeSlide === 2} />
        </Slide>

        {/* فلش قبلی */}
        <button
          type="button"
          onClick={() => goTo(activeSlide - 1)}
          aria-label="اسلاید قبلی"
          className="absolute right-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors duration-base ease-standard hover:bg-black/60 sm:right-5 sm:h-10 sm:w-10"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* فلش بعدی */}
        <button
          type="button"
          onClick={() => goTo(activeSlide + 1)}
          aria-label="اسلاید بعدی"
          className="absolute left-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-colors duration-base ease-standard hover:bg-black/60 sm:left-5 sm:h-10 sm:w-10"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 4.5l-7.5 7.5 7.5 7.5"
            />
          </svg>
        </button>
      </section>

      {/* زبانه پجینیشن */}
      <div className="relative z-20 flex justify-center">
        <div className="-mt-px flex items-center gap-1.5 rounded-b-lg border border-t-0 border-white/10 bg-black/60 px-3 py-1.5 shadow-md backdrop-blur-md sm:gap-2 sm:rounded-b-xl sm:px-4 sm:py-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`رفتن به اسلاید ${i + 1}`}
              className={`h-[2px] rounded-full transition-all duration-panel ease-standard sm:h-[3px] ${
                activeSlide === i
                  ? "w-5 bg-accent-500 shadow-accent sm:w-7"
                  : "w-3 bg-white/25 hover:bg-white/40 sm:w-4"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-panel ease-standard ${
        active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* اسلاید ۱: دانته                                                    */
/* ------------------------------------------------------------------ */

function DanteSlide({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [typedText, setTypedText] = useState("");
  const TYPEWRITER_TEXT = "افسانه هرگز نمی‌میرد";

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(TYPEWRITER_TEXT.slice(0, index));

      if (index >= TYPEWRITER_TEXT.length) {
        window.clearInterval(interval);
      }
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  const targetTimeRef = useRef(T_FRONT);
  const lastSeekTimeRef = useRef(T_FRONT);

  const modeRef = useRef<Mode>("idle");
  const lastModeChangeRef = useRef(0);

  const isSeekingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const mouseRef = useRef({
    dx: 0,
    dy: 0,
  });

  /**
   * Seek اصلی ویدیو
   *
   * نکات:
   * - seekهای خیلی کوچک نادیده گرفته می‌شوند.
   * - fastSeek در صورت وجود استفاده می‌شود.
   * - وقتی seek قبلی در حال انجام است، فقط targetTime به‌روز می‌شود.
   */
  const seekTo = useCallback((time: number) => {
    const video = videoRef.current;

    if (!video) {
      targetTimeRef.current = time;
      return;
    }

    const clampedTime = Math.max(
      0,
      Math.min(time, Number.isFinite(video.duration) ? video.duration : time),
    );

    targetTimeRef.current = clampedTime;

    if (isSeekingRef.current) return;

    // جلوگیری از seekهای بسیار ریز
    if (Math.abs(clampedTime - lastSeekTimeRef.current) < 0.045) {
      return;
    }

    isSeekingRef.current = true;
    lastSeekTimeRef.current = clampedTime;

    if (typeof video.fastSeek === "function") {
      video.fastSeek(clampedTime);
    } else {
      video.currentTime = clampedTime;
    }
  }, []);

  /**
   * وقتی seek فعلی تمام شد،
   * بررسی می‌کنیم که آیا موس در این فاصله target جدیدی ساخته یا نه.
   */
  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;

    const video = videoRef.current;

    if (!video) return;

    const target = targetTimeRef.current;

    if (Math.abs(video.currentTime - target) < 0.045) {
      return;
    }

    // seek بعدی را به فریم بعدی منتقل می‌کنیم
    requestAnimationFrame(() => {
      seekTo(target);
    });
  }, [seekTo]);

  /**
   * حرکت موس
   *
   * با requestAnimationFrame محدود می‌شود تا
   * برای هر mousemove مستقیماً seek اتفاق نیفتد.
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();

      if (!rect) return;

      mouseRef.current = {
        dx: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        dy: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      };

      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const { dx, dy } = mouseRef.current;

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        /*
         * وقتی موس نزدیک مرکز است،
         * ویدیو به حالت Front برمی‌گردد.
         */
        if (absDx < 0.1 && absDy < 0.1) {
          modeRef.current = "idle";
          seekTo(T_FRONT);
          return;
        }

        let desiredMode: Mode;

        if (absDx >= absDy) {
          desiredMode = "x";
        } else {
          desiredMode = dy < 0 ? "yUp" : "yDown";
        }

        /*
         * Hysteresis + debounce
         *
         * مود فقط وقتی عوض می‌شود که:
         * - جهت جدید واضحاً غالب باشد
         * - حداقل 150ms از آخرین تغییر گذشته باشد
         */
        const now = performance.now();

        const dominant = desiredMode === "x" ? absDx : absDy;

        const other = desiredMode === "x" ? absDy : absDx;

        const isClearlyDominant = dominant > other * 1.35;

        const enoughTimePassed = now - lastModeChangeRef.current > 150;

        if (
          desiredMode !== modeRef.current &&
          isClearlyDominant &&
          enoughTimePassed
        ) {
          modeRef.current = desiredMode;
          lastModeChangeRef.current = now;
        }

        const mode = modeRef.current === "idle" ? desiredMode : modeRef.current;

        /*
         * حرکت افقی
         *
         * نکته مهم:
         * هیچ mirror / scaleX در این حالت وجود ندارد.
         * Dante همیشه جهت اصلی ویدیو را حفظ می‌کند.
         */
        if (mode === "x") {
          const target = T_FRONT + absDx * (T_LEFT_END - T_FRONT);

          seekTo(target);
        } else if (mode === "yUp") {
          /*
           * حرکت به سمت بالا
           */
          const target = T_UP_START + absDy * (T_UP_END - T_UP_START);

          seekTo(target);
        } else {
          /*
           * حرکت به سمت پایین
           */
          const target = T_UP_END + absDy * (T_DOWN_END - T_UP_END);

          seekTo(target);
        }
      });
    },
    [seekTo],
  );

  /**
   * وقتی موس از Hero خارج می‌شود،
   * ویدیو به حالت Front برمی‌گردد.
   */
  const handleMouseLeave = useCallback(() => {
    modeRef.current = "idle";

    mouseRef.current = {
      dx: 0,
      dy: 0,
    };

    seekTo(T_FRONT);
  }, [seekTo]);

  /**
   * پاک‌سازی RAF هنگام unmount
   */
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full bg-canvas"
    >
      {/* ویدیو Dante */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onSeeked={handleSeeked}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-hero" />

      {/* متن Hero */}
      <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-10 lg:px-14">
        <div
          className={`ml-auto max-w-md text-right transition-all duration-slow ease-emphasized ${
            active
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 sm:translate-x-12"
          }`}
        >
          <p className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-blue-300 backdrop-blur-md sm:mb-3 sm:px-3 sm:py-1 sm:text-kicker">
            Game Store
          </p>
          <p className="mb-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-red-500 sm:text-4xl">
            DEVIL MAY CRY
          </p>

          <h1 className="mb-4 text-base font-medium text-white sm:mb-5 sm:text-2xl">
            {typedText}
            <span
              className="mr-1 inline-block h-[1em] w-[2px] align-middle bg-white animate-blink"
              aria-hidden="true"
            />
          </h1>

          <p className="mb-4 hidden text-lg leading-8 text-white/70 sm:mb-6 sm:block">
            جدیدترین و پرفروش‌ترین بازی‌ها رو
            <br />
            با بهترین قیمت از <span className="neon-store">گیم‌استور</span> تهیه
            کن.
          </p>

          <Link
            href="/games"
            className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-4 py-2 text-xs font-medium text-white shadow-accent transition-colors duration-base ease-standard hover:bg-accent-600 sm:px-6 sm:py-3 sm:text-base"
          >
            مشاهده بازی‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* اسلاید ۲: PS5                                                       */
/* ------------------------------------------------------------------ */

function ConsoleSlide({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/hero/ps5-console.webp"
        alt="PlayStation 5"
        fill
        priority
        sizes="(min-width: 1280px) 1232px, 100vw"
        className="object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 bg-hero" />

      <div className="relative z-10 flex h-full items-end px-6 pb-6 sm:items-center sm:px-10 sm:pb-0">
        <div
          className={`ml-auto max-w-[13rem] text-right transition-all duration-slow ease-emphasized sm:max-w-xs ${
            active
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 sm:translate-x-12"
          }`}
        >
          {/* متن جدا، بیرون و بالای جعبه شیشه‌ای */}
          <h2 className="mb-2 text-sm font-display text-white sm:mb-3 sm:text-h4 lg:text-[30px]">
            دنیای بازی از اینجا شروع می‌شود
          </h2>

          {/* جعبه‌ی شیشه‌ای PS5 — کمی از لبه‌ی راست فاصله گرفته (mr-4/mr-8) */}
          <div className="relative mr-4 rounded-xl border border-white/15 bg-white/5 p-3 shadow-xl backdrop-blur-2xl sm:mr-8 sm:p-5">
            <p className="mb-1 text-[10px] uppercase tracking-wide text-blue-300 sm:text-kicker">
              PlayStation 5
            </p>

            <h2 className="mb-1.5 text-[8px] font-semibold text-white sm:mb-2 sm:text-base">
              نسل جدید بازی رو تجربه کن
            </h2>

            <p className="mb-3 hidden text-sm leading-6 text-white/70 sm:mb-4 sm:block">
              گرافیک فوق‌العاده، بارگذاری آنی و کنترلر DualSense.
            </p>

            <Link
              href="/categories/console"
              className="inline-flex  items-center gap-1 -translate-y-2 text-[9px] font-medium text-blue-300 transition-colors duration-base ease-standard hover:text-blue-200 sm:text-sm"
            >
              مشاهده کنسول‌ها
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>

            {/* سه باکس کوچیک روی خط پایینِ کارت، هرکدوم یه لوگوی پلتفرم.
      نصف ارتفاعشون بیرون کارت می‌مونه (translate-y-1/2) تا دقیقاً
      روی خط پایین بشینن. src ها رو با آدرس واقعی لوگوهاتون عوض کنید. */}
            <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 items-center justify-center gap-2">
              {[
                { name: "PS5", src: "/images/logos/ps5.webp" },
                { name: "PS4", src: "/images/logos/ps4.png" },
                { name: "Xbox", src: "/images/logos/xbox.png" },
              ].map((platform) => (
                <div
                  key={platform.name}
                  className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-[#0e131c] shadow-md sm:h-12 sm:w-12"
                  title={platform.name}
                >
                  <Image
                    src={platform.src}
                    alt={platform.name}
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain sm:h-5 sm:w-5"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* اسلاید ۳: تخفیف ۳۰٪                                                */
/* ------------------------------------------------------------------ */

function DiscountSlide({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/images/hero/games-discount.webp"
        alt="۳۰ درصد تخفیف بازی‌ها"
        fill
        priority
        sizes="(min-width: 1280px) 1232px, 100vw"
        className="object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 bg-hero" />

      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-14">
        <div
          className={`ml-auto max-w-md text-right transition-all duration-slow ease-emphasized ${
            active
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 sm:translate-x-12"
          }`}
        >
          {/* نقطه قرمز چشمک‌زن، سمت راستِ متن (اولین فرزند در dir=rtl) */}
          <div className="mb-2  flex items-center justify-end gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <p className="text-[10px] ml-auto uppercase tracking-wide text-red-400 sm:text-kicker">
              پیشنهاد ویژه
            </p>
          </div>

          <h2 className="mb-2 text-sm font-bold text-white sm:mb-3 sm:text-base lg:text-3xl">
            تا ۳۰٪ تخفیف روی پرفروش‌ترین بازی‌ها
          </h2>

          <p className="mb-3 hidden text-sm leading-7 text-white/70 sm:mb-6 sm:block sm:text-lg sm:leading-8">
            God of War، Witcher 3، Elden Ring و ده‌ها عنوان دیگه، محدود و
            زودگذر.
          </p>

          <Link
            href="/games?discount=30"
            className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-xs font-medium text-white shadow-lg transition-colors duration-base ease-standard hover:bg-red-600 sm:px-6 sm:py-3 sm:text-base"
          >
            مشاهده تخفیف‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}
