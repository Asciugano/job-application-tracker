export default async function ApplicationForID({
  params
}: {
  params: Promise<{ id: number }>
}) {

  const { id } = await params;

  return <div>Application for {id}</div>
}
