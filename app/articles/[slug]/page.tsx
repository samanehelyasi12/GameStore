type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  return (
    <section>
      <h1>Article Details</h1>
      <p>Temporary article placeholder for &quot;{slug}&quot;.</p>
    </section>
  );
}