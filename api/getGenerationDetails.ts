export default async function getGenerationDetails(params: string) {
  const res = await fetch(params);
  const data = await res.json();
  return data;
}
