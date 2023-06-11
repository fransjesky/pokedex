export default async function getPokemonAbility(params: string) {
  const res = await fetch(params);
  const data = await res.json();
  return data;
}
