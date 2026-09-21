type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  return (
    <section>
      <h1>Category</h1>
      <p>Temporary category placeholder for &quot;{slug}&quot;.</p>
    </section>
  );
}