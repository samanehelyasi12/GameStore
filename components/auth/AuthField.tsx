import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cx } from "@/components/layout/Navbar/navbar-styles";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: LucideIcon;
  /** Optional control inside the field's end edge (e.g. show/hide password). */
  trailing?: ReactNode;
};

/** Labeled input with a leading icon and a red neon focus state. */
export default function AuthField({
  label,
  icon: Icon,
  trailing,
  id,
  className,
  ...props
}: AuthFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-sm font-medium text-text-secondary"
      >
        {label}
      </label>

      <div className="group relative">
        <Icon
          aria-hidden
          className="pointer-events-none absolute start-[14px] top-1/2 size-[18px] -translate-y-1/2 text-text-tertiary transition-colors duration-fast group-focus-within:text-red-400"
        />
        <input
          id={fieldId}
          className={cx(
            "h-12 w-full rounded-md border border-border-strong bg-canvas/60 ps-11 text-sm text-text-primary",
            "placeholder:text-text-tertiary",
            trailing ? "pe-12" : "pe-4",
            "transition-[border-color,box-shadow] duration-fast ease-fast",
            "focus:border-red-500 focus:outline-none",
            "focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-red-500)_22%,transparent)]",
            className,
          )}
          {...props}
        />
        {trailing ? (
          <div className="absolute end-1.5 top-1/2 -translate-y-1/2">{trailing}</div>
        ) : null}
      </div>
    </div>
  );
}
