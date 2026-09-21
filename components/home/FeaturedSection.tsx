import type { ReactNode } from "react";

type FeaturedSectionProps = {
  title: string;
  children: ReactNode;
};

export default function FeaturedSection({ title, children }: FeaturedSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}