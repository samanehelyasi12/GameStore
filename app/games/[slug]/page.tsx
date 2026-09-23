import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

type GameDetailPageProps = {
  params: Promise<{ slug: string }>;
};

// TODO: replace with a real lookup once game data exists.
function getGameTitle(slug: string) {
  return slug.replace(/-/g, " ");
}

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: getGameTitle(slug) };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  const title = getGameTitle(slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "فروشگاه", href: "/games" }, { label: title }]} />

      <section className="mx-auto w-full max-w-page px-3 pb-16 sm:px-4">
        <h1 className="mb-6 font-display text-h3 font-bold text-text-primary sm:text-h2">
          {title}
        </h1>

        {/* TODO: game detail content (images, price, description, buy button) go here */}
      </section>
    </>
  );
}
