"use client";

import Image from "next/image";
import { useState } from "react";
import { avatarTint, avatarUrl, initials } from "@/lib/auth/avatar";
import { cx } from "@/components/layout/Navbar/navbar-styles";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "size-8 text-[11px]",
  md: "size-10 text-sm",
  lg: "size-16 text-lg",
} as const;

const imageSizes = { sm: 32, md: 40, lg: 64 } as const;

/**
 * The user's avatar. Generated from the DiceBear service, with the name's
 * initials as an automatic fallback so the avatar is never blank when the
 * service is unreachable or `next/image` is set to unoptimized.
 */
export default function Avatar({ name, size = "md", className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      // Purely decorative: every place the avatar appears also shows the
      // user's name as text, so exposing it again would double up for
      // screen readers.
      aria-hidden
      className={cx(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full",
        sizes[size],
        avatarTint(name),
        className,
      )}
    >
      {failed ? (
        <span className="font-bold text-white">{initials(name)}</span>
      ) : (
        <Image
          src={avatarUrl(name)}
          alt=""
          width={imageSizes[size]}
          height={imageSizes[size]}
          unoptimized
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </span>
  );
}
