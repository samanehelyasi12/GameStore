"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Smartphone,
  UserPlus,
  User,
} from "lucide-react";
import AuthField from "./AuthField";
import { CLIP, FOCUS, cx } from "@/components/layout/Navbar/navbar-styles";
import { isValidEmail, isValidPhone } from "@/lib/utils";

export type RegisterValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type RegisterFormProps = {
  /**
   * Wire your auth call here. Throw an Error to show its message.
   *
   * When it is omitted the form reports it through the existing error box —
   * previously the optional call made submit a silent no-op, so a validated
   * form produced no feedback at all.
   */
  onSubmit?: (values: RegisterValues) => Promise<void> | void;
};

function eyeToggle(
  shown: boolean,
  onClick: () => void,
  label: string,
): React.ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cx(
        "grid size-9 place-items-center rounded-md text-text-tertiary transition-colors duration-fast hover:text-red-400",
        FOCUS,
      )}
    >
      {shown ? <EyeOff className="size-[18px]" aria-hidden /> : <Eye className="size-[18px]" aria-hidden />}
    </button>
  );
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 3) {
      setError("نام و نام خانوادگی را کامل وارد کنید.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("ایمیل معتبر وارد کنید.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("شماره‌ی موبایل را با ۱۱ رقم وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).");
      return;
    }
    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }
    if (password !== confirmPassword) {
      setError("تکرار رمز عبور با رمز عبور یکسان نیست.");
      return;
    }
    if (!acceptTerms) {
      setError("برای ادامه باید قوانین و مقررات را بپذیرید.");
      return;
    }

    setLoading(true);
    try {
      if (!onSubmit) {
        // TODO(backend): wire the real registration request.
        throw new Error("سرویس ثبت‌نام هنوز به بک‌اند متصل نشده است.");
      }
      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        confirmPassword,
        acceptTerms,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "ثبت‌نام ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
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

      <AuthField
        label="نام و نام خانوادگی"
        name="name"
        icon={User}
        type="text"
        autoComplete="name"
        placeholder="مثلاً علی رضایی"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <AuthField
        label="ایمیل"
        name="email"
        icon={Mail}
        type="email"
        dir="ltr"
        autoComplete="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthField
        label="شماره‌ی موبایل"
        name="phone"
        icon={Smartphone}
        type="tel"
        inputMode="numeric"
        dir="ltr"
        autoComplete="tel"
        placeholder="09123456789"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <AuthField
        label="رمز عبور"
        name="password"
        icon={LockKeyhole}
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        placeholder="حداقل ۸ کاراکتر"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        trailing={eyeToggle(
          showPassword,
          () => setShowPassword((v) => !v),
          showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور",
        )}
      />

      <AuthField
        label="تکرار رمز عبور"
        name="confirmPassword"
        icon={LockKeyhole}
        type={showConfirm ? "text" : "password"}
        autoComplete="new-password"
        placeholder="رمز عبور را دوباره وارد کنید"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        trailing={eyeToggle(
          showConfirm,
          () => setShowConfirm((v) => !v),
          showConfirm ? "پنهان کردن تکرار رمز" : "نمایش تکرار رمز",
        )}
      />

      <label className="flex cursor-pointer items-start gap-2 text-sm leading-6 text-text-secondary">
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="mt-1 size-4 shrink-0 rounded-xs accent-red-500"
        />
        <span>
          <Link href="/terms" className="font-medium text-red-400 hover:underline">
            قوانین و مقررات
          </Link>{" "}
          و{" "}
          <Link href="/privacy" className="font-medium text-red-400 hover:underline">
            حریم خصوصی
          </Link>{" "}
          فروشگاه را می‌پذیرم.
        </span>
      </label>

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
            <UserPlus className="size-[18px]" aria-hidden />
          )}
          {loading ? "در حال ساخت حساب..." : "ساخت حساب کاربری"}
        </button>
      </div>
    </form>
  );
}
