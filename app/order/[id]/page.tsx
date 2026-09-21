type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  return (
    <section>
      <h1>Order Details</h1>
      <p>Temporary order placeholder for order #{id}.</p>
    </section>
  );
}