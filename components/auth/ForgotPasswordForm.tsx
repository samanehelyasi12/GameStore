"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { CLIP, FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";
import { isValidEmail } from "@/lib/utils";

/** Step 1: ask for the email. Step 2: confirmation (no backend yet). */
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("ایمیل معتبر وارد کنید.");
      return;
    }

    setSending(true);
    // TODO(backend): call the password-reset request endpoint.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSending(false);
    setSentTo(email.trim());
  }

  if (sentTo) {
    return (
      <div className="rounded-md border border-success/40 bg-success/10 px-4 py-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-success" aria-hidden />
        <p className="mt-3 text-sm font-semibold text-text-primary">
          اگر این ایمیل در سیستم ثبت شده باشد، لینک بازیابی برای آن ارسال می‌شود.
        </p>
        <p dir="ltr" className="mt-2 text-xs text-text-secondary">
          {sentTo}
        </p>
        <button
          type="button"
          onClick={() => {
            setSentTo(null);
            setEmail("");
          }}
          className={cx(
            "mt-4 text-sm font-semibold text-red-400 transition-colors hover:underline",
            FOCUS,
          )}
        >
          ارسال به ایمیل دیگر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-subtle px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="fp-email" className="mb-1.5 block text-sm font-medium text-text-secondary">
          ایمیل یا نام کاربری
        </label>

        <div className="group relative">
          <Mail
            aria-hidden
            className="pointer-events-none absolute start-[14px] top-1/2 size-[18px] -translate-y-1/2 text-text-tertiary transition-colors duration-fast group-focus-within:text-red-400"
          />
          <input
            id="fp-email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-md border border-border-strong bg-canvas/60 pe-4 ps-11 text-sm text-text-primary placeholder:text-text-tertiary focus:border-red-500 focus:outline-none focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]"
          />
        </div>
      </div>

      <div className="drop-shadow-[0_0_10px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)] transition-[filter] duration-fast hover:drop-shadow-[0_0_16px_color-mix(in_oklab,var(--color-red-500)_65%,transparent)]">
        <button
          type="submit"
          disabled={sending}
          className={cx(
            CLIP.sm,
            "flex h-12 w-full items-center justify-center gap-2 bg-red-600 text-sm font-bold text-white",
            "transition-colors duration-fast hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70",
            FOCUS,
          )}
        >
          {sending ? (
            <Loader2 className="size-[18px] animate-spin" aria-hidden />
          ) : (
            <Send className="size-[18px]" aria-hidden />
          )}
          {sending ? "در حال ارسال..." : "ارسال لینک بازیابی"}
        </button>
      </div>
    </form>
  );
}
