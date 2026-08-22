export default async function ErrorPage({ searchParams } : { searchParams: {message?: string}}) {
  const params = await searchParams;
  const message = params?.message || "Something went wrong";

  return <p>Sorry, {message}</p>
}