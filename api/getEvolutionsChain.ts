export default async function getEvolutionsChain(params: string) {
  const res = await fetch(params);
  const data = await res.json();
  return data;
}
