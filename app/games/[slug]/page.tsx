type GameDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { slug } = await params;
  return (
    <section>
      <h1>Game Details</h1>
      <p>Temporary game details placeholder for &quot;{slug}&quot;.</p>
    </section>
  );
}