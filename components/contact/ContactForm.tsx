"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";
import { isValidEmail } from "@/lib/utils";

/** Contact form — local validation only (no backend yet). */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (name.trim().length < 3) return setError("نام خود را کامل وارد کنید.");
    if (!isValidEmail(email)) return setError("ایمیل معتبر وارد کنید.");
    if (subject.trim().length < 3) return setError("موضوع پیام را بنویسید.");
    if (message.trim().length < 10) return setError("متن پیام باید حداقل ۱۰ کاراکتر باشد.");

    setSending(true);
    // TODO(backend): POST to the support/ticket endpoint.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-success/40 bg-success/10 p-6 text-center">
        <CheckCircle2 className="mx-auto size-8 text-success" aria-hidden />
        <h2 className="mt-3 font-display text-h4 font-bold text-text-primary">
          پیام شما ثبت شد
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-secondary">
          کارشناسان پشتیبانی در کمتر از یک روز کاری پاسخ می‌دهند. (نسخه‌ی نمایشی: پیام ارسال نشد.)
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
          }}
          className={cx(
            "mt-5 h-11 rounded-lg border border-border-strong px-5 text-sm font-semibold text-text-primary",
            "transition-colors duration-fast hover:border-red-500/60 hover:text-red-400",
            FOCUS,
          )}
        >
          ارسال پیام دیگر
        </button>
      </div>
    );
  }

  const input = cx(
    "h-12 w-full rounded-md border border-border-strong bg-canvas/60 px-4 text-sm text-text-primary",
    "placeholder:text-text-tertiary",
    "transition-[border-color,box-shadow] duration-fast ease-fast",
    "focus:border-red-500 focus:outline-none focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]",
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface p-5 sm:p-6"
    >
      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-subtle px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          نام و نام خانوادگی
        </label>
        <input
          id="c-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً سارا محمدی"
          className={input}
        />
      </div>

      <div>
        <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-text-secondary">
          ایمیل
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={input}
        />
      </div>

      <div>
        <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-text-secondary">
          موضوع
        </label>
        <input
          id="c-subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="مثلاً پیگیری سفارش"
          className={input}
        />
      </div>

      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-text-secondary">
          متن پیام
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام خود را بنویسید..."
          className="w-full rounded-md border border-border-strong bg-canvas/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-red-500 focus:outline-none focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className={cx(
          "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-bold text-text-inverse",
          "transition-colors duration-fast ease-fast hover:bg-red-600",
          "disabled:cursor-not-allowed disabled:opacity-70",
          FOCUS,
        )}
      >
        {sending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {sending ? "در حال ارسال..." : "ارسال پیام"}
      </button>
    </form>
  );
}
