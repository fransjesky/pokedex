export default async function getSpeciesDetails(params: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${params}`
  );
  const data = await res.json();
  return data;
}
