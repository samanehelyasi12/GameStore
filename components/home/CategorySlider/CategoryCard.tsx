import Image from "next/image";
import Link from "next/link";
import type { CategoryItem } from "./categories-data";
import { categoryHref } from "./categories-data";

/**
 * The source images already contain their own frame + label, so this
 * card just presents them — no extra background or text overlay.
 */
export default function CategoryCard({ id, label, image }: CategoryItem) {
  return (
    <Link
      href={categoryHref(id)}
      aria-label={label}
      className="group relative block aspect-square w-full shrink-0 snap-start transition-transform duration-base ease-fast hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 focus-visible:rounded-2xl"
    >
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
        className="object-contain drop-shadow-[0_0_0_transparent] transition-[filter] duration-base ease-fast group-hover:drop-shadow-[0_0_18px_color-mix(in_oklab,var(--color-red-500)_35%,transparent)]"
      />
    </Link>
  );
}