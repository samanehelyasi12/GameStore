"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Gamepad2,
} from "lucide-react";

const QUICK_LINKS = [
  { label: "خانه", href: "/" },
  { label: "فروشگاه", href: "/games" },
  { label: "دسته‌بندی‌ها", href: "/categories" },
  { label: "تخفیف‌ها", href: "/discounts" },
  { label: "کنسول‌ها", href: "/consoles" },
];

const SUPPORT_LINKS = [
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
  { label: "سوالات متداول", href: "/faq" },
  { label: "قوانین و مقررات", href: "/terms" },
  { label: "حریم خصوصی", href: "/privacy" },
];

const SOCIALS = [
  { icon: Send, href: "https://t.me", label: "تلگرام" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-border-subtle bg-surface">
      {/* بافت نوری قرمز محو پشت فوتر */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-red-subtle/40 via-transparent to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-page px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* ستون برند + لوگوی سقوط‌کننده */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-right">
            <FallingLogo triggered={triggered} />

            <p className="mb-5 mt-4 max-w-xs text-sm leading-7 text-text-secondary">
              فروشگاه تخصصی بازی، کنسول و لوازم گیمینگ. تجربه‌ای متفاوت برای
              گیمرهای واقعی.
            </p>

            <div className="flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-all duration-base ease-standard hover:border-red-400 hover:bg-red-500 hover:text-text-inverse"
                >
                  <social.icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* دسترسی سریع */}
          <FooterColumn title="دسترسی سریع" links={QUICK_LINKS} />

          {/* پشتیبانی */}
          <FooterColumn title="پشتیبانی" links={SUPPORT_LINKS} />

          {/* تماس با ما */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-right">
            <h3 className="mb-4 font-display text-sm font-bold text-text-primary">
              تماس با ما
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-red-400" aria-hidden />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-red-400" aria-hidden />
                support@gamestore.ir
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-red-400" aria-hidden />
                تهران، خیابان ولیعصر، پلاک ۱۲۳
              </li>
            </ul>
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="my-10 h-px bg-border-subtle" />

        {/* نوار پایین */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-text-tertiary sm:flex-row">
          <p>© {new Date().getFullYear()} GameStore. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShoppingCart className="size-3.5" aria-hidden />
              پرداخت امن
            </span>
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="size-3.5" aria-hidden />
              ساخته‌شده برای گیمرها
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-right">
      <h3 className="mb-4 font-display text-sm font-bold text-text-primary">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-text-secondary transition-colors duration-fast ease-fast hover:text-red-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FallingLogo({ triggered }: { triggered: boolean }) {
  return (
    <div className="relative flex h-[110px] w-full items-center justify-center overflow-visible sm:justify-start">
      {/* دود/گرد و غبار موقع فرود، فقط لحظه‌ی برخورد */}
      {triggered && (
        <span className="pointer-events-none absolute bottom-2 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-red-500/40 opacity-0 blur-md sm:left-16 sm:translate-x-0" style={{ animation: "impact-puff 0.5s ease-out 0.65s forwards" }} />
      )}

      <h2
        className="select-none font-display text-h2 font-black tracking-tight sm:text-h1"
        style={{
          opacity: triggered ? 1 : 0,
          transform: triggered ? "translateY(0) rotate(0deg)" : "translateY(-160px) rotate(-8deg)",
          transition: triggered
            ? "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 0ms, opacity 100ms ease-out 0ms"
            : "none",
          animation: triggered ? "shatter-shake 0.5s ease-out 700ms" : "none",
        }}
      >
        <span
          className={triggered ? "neon-store" : ""}
          style={{ color: triggered ? undefined : "var(--color-text-tertiary)" }}
        >
          Game
        </span>
        <span className="text-text-primary">Store</span>
      </h2>

      <style jsx>{`
        @keyframes impact-puff {
          from {
            opacity: 0.6;
            transform: translateX(-50%) scale(0.6);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) scale(2.2);
          }
        }
        @keyframes shatter-shake {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          20% {
            transform: translate(-3px, 1px) rotate(-1.2deg);
          }
          40% {
            transform: translate(3px, -1px) rotate(1.2deg);
          }
          60% {
            transform: translate(-2px, 1px) rotate(-0.6deg);
          }
          80% {
            transform: translate(2px, 0) rotate(0.6deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}