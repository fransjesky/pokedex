export default async function getPokemons(params: { offset: number }) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${params.offset}`
  );
  const data = await res.json();
  return data;
}
