"use client";

import type { InputHTMLAttributes } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { cx } from "@/components/layout/Navbar/navbar-styles";
import { isValidEmail, isValidPhone, isValidPostalCode } from "@/lib/utils";

export type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  houseNumber: string;
  address: string;
  postalCode: string;
};

export const emptyCustomer: CustomerForm = {
  name: "",
  email: "",
  phone: "",
  province: "",
  city: "",
  houseNumber: "",
  address: "",
  postalCode: "",
};

export function validateCustomer(form: CustomerForm) {
  const errors: Partial<Record<keyof CustomerForm, string>> = {};

  if (form.name.trim().length < 3) errors.name = "نام و نام خانوادگی را کامل وارد کنید.";
  if (!isValidEmail(form.email)) errors.email = "ایمیل معتبر وارد کنید.";
  if (!isValidPhone(form.phone))
    errors.phone = "شماره‌ی موبایل را با ۱۱ رقم وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
  if (form.province.trim().length < 2) errors.province = "استان را وارد کنید.";
  if (form.city.trim().length < 2) errors.city = "شهر را وارد کنید.";
  if (form.houseNumber.trim().length < 1 || form.houseNumber.trim().length > 20)
    errors.houseNumber = "پلاک و واحد را وارد کنید (مثال: ۱۲، واحد ۳).";
  if (form.address.trim().length < 10) errors.address = "نشانی را کامل‌تر بنویسید.";
  if (!isValidPostalCode(form.postalCode))
    errors.postalCode = "کد پستی باید ۱۰ رقم باشد.";

  return errors;
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: typeof User;
  error?: string;
  hint?: string;
};

/** Same visual language as the auth fields (HUD input, red focus ring). */
function Field({ label, icon: Icon, error, hint, id, className, ...props }: FieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-text-secondary">
        {label}
      </label>

      <div className="group relative">
        <Icon
          aria-hidden
          className={cx(
            "pointer-events-none absolute start-[14px] top-1/2 size-[18px] -translate-y-1/2 transition-colors duration-fast",
            error ? "text-red-500" : "text-text-tertiary group-focus-within:text-red-400",
          )}
        />
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={cx(
            "h-12 w-full rounded-md border bg-canvas/60 pe-4 ps-11 text-sm text-text-primary",
            "placeholder:text-text-tertiary",
            "transition-[border-color,box-shadow] duration-fast ease-fast focus:outline-none",
            error
              ? "border-red-500 shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]"
              : "border-border-strong focus:border-red-500 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]",
            className,
          )}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-text-tertiary">{hint}</p>
      ) : null}
    </div>
  );
}

type CheckoutAddressFieldsProps = {
  value: CustomerForm;
  onChange: (next: CustomerForm) => void;
  errors?: Partial<Record<keyof CustomerForm, string>>;
};

export default function CheckoutAddressFields({
  value,
  onChange,
  errors = {},
}: CheckoutAddressFieldsProps) {
  const set = (key: keyof CustomerForm) => (e: { target: { value: string } }) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field
        label="نام و نام خانوادگی"
        name="name"
        icon={User}
        autoComplete="name"
        placeholder="مثلاً علی رضایی"
        value={value.name}
        onChange={set("name")}
        error={errors.name}
      />

      <Field
        label="شماره‌ی موبایل"
        name="phone"
        icon={Phone}
        type="tel"
        inputMode="numeric"
        dir="ltr"
        autoComplete="tel"
        placeholder="09123456789"
        value={value.phone}
        onChange={set("phone")}
        error={errors.phone}
      />

      <Field
        label="ایمیل"
        name="email"
        icon={Mail}
        type="email"
        dir="ltr"
        autoComplete="email"
        placeholder="example@email.com"
        value={value.email}
        onChange={set("email")}
        error={errors.email}
        hint={errors.email ? undefined : "رسید و کلید فعال‌سازی به این ایمیل ارسال می‌شود."}
      />

      <Field
        label="استان"
        name="province"
        icon={MapPin}
        autoComplete="address-level1"
        placeholder="تهران"
        value={value.province}
        onChange={set("province")}
        error={errors.province}
      />

      <Field
        label="شهر"
        name="city"
        icon={MapPin}
        autoComplete="address-level2"
        placeholder="تهران"
        value={value.city}
        onChange={set("city")}
        error={errors.city}
      />

      <Field
        label="پلاک و واحد"
        name="houseNumber"
        icon={MapPin}
        placeholder="۱۲، واحد ۳"
        value={value.houseNumber}
        onChange={set("houseNumber")}
        error={errors.houseNumber}
      />

      <div className="sm:col-span-2">
        <Field
          label="نشانی"
          name="address"
          icon={MapPin}
          autoComplete="street-address"
          placeholder="خیابان، کوچه و بالاتر از..."
          value={value.address}
          onChange={set("address")}
          error={errors.address}
        />
      </div>

      <Field
        label="کد پستی"
        name="postalCode"
        icon={MapPin}
        inputMode="numeric"
        dir="ltr"
        autoComplete="postal-code"
        placeholder="1234567890"
        value={value.postalCode}
        onChange={set("postalCode")}
        error={errors.postalCode}
      />
    </div>
  );
}
