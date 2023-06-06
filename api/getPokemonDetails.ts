export default async function getPokemonDetails(params: string) {
  const res = await fetch(params);
  const data = await res.json();
  return data;
}
