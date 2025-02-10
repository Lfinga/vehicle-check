export default async function DriverPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div>Driver {id}</div>;
}
