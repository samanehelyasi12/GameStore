"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, LockKeyhole, LogIn, User } from "lucide-react";
import AuthField from "./AuthField";
import { CLIP, FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";

export type LoginValues = {
  identifier: string;
  password: string;
  remember: boolean;
};

type LoginFormProps = {
  /**
   * Wire your auth call here. Throw an Error to show its message.
   *
   * When it is omitted the form reports it through the existing error box —
   * previously the optional call made submit a silent no-op, so a validated
   * form produced no feedback at all.
   */
  onSubmit?: (values: LoginValues) => Promise<void> | void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError("ایمیل یا نام کاربری و رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      if (!onSubmit) {
        // TODO(backend): wire the real login request.
        throw new Error("سرویس ورود هنوز به بک‌اند متصل نشده است.");
      }
      await onSubmit({ identifier: identifier.trim(), password, remember });
    } catch (err) {
      setError(err instanceof Error ? err.message : "ورود ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error ? (
        <div
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-subtle px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      ) : null}

      <AuthField
        label="ایمیل یا نام کاربری"
        name="identifier"
        icon={User}
        type="text"
        autoComplete="username"
        placeholder="example@email.com"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <AuthField
        label="رمز عبور"
        name="password"
        icon={LockKeyhole}
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        trailing={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            className={cx(
              "grid size-9 place-items-center rounded-md text-text-tertiary transition-colors duration-fast hover:text-red-400",
              FOCUS,
            )}
          >
            {showPassword ? (
              <EyeOff className="size-[18px]" aria-hidden />
            ) : (
              <Eye className="size-[18px]" aria-hidden />
            )}
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded-xs accent-red-500"
          />
          مرا به خاطر بسپار
        </label>

        <Link
          href="/forgot-password"
          className={cx(
            "text-sm font-medium text-text-secondary transition-colors duration-fast hover:text-red-400",
            FOCUS,
          )}
        >
          فراموشی رمز عبور
        </Link>
      </div>

      <div className="drop-shadow-[0_0_10px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)] transition-[filter] duration-fast hover:drop-shadow-[0_0_16px_color-mix(in_oklab,var(--color-red-500)_65%,transparent)]">
        <button
          type="submit"
          disabled={loading}
          className={cx(
            CLIP.sm,
            "flex h-12 w-full items-center justify-center gap-2 bg-red-600 text-sm font-bold text-white",
            "transition-colors duration-fast hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70",
            FOCUS,
          )}
        >
          {loading ? (
            <Loader2 className="size-[18px] animate-spin" aria-hidden />
          ) : (
            <LogIn className="size-[18px]" aria-hidden />
          )}
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </div>
    </form>
  );
}
