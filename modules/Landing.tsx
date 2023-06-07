'use client';

// core components
import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Card from '@/components/Card';

// api
import getPokemons from '@/api/getPokemons';
import getPokemonDetails from '@/api/getPokemonDetails';
import getSpeciesDetails from '@/api/getSpeciesDetails';

// types
import { PokemonsProps, PokemonListProps } from './types/LandingType';

export default function Landing() {
  const [data, setData] = useState<PokemonsProps | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListProps[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      // fetch list
      const pokemons = await getPokemons();
      setData(pokemons);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      // array init
      let pokeDetails: unknown[];
      let specDetails: unknown[];

      // fetch details
      const pokemonDetails = await Promise.all(
        data!.results.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      // fetch species
      const speciesDetails = await Promise.all(
        data!.results.map((pokemon) => getSpeciesDetails(pokemon.name))
      );

      // variables define
      pokeDetails = pokemonDetails;
      specDetails = speciesDetails;

      // combine the fetched data
      const completePokemonDetails: any[] = [];
      pokemonDetails.map((data, index) => {
        const specData = speciesDetails[index];
        let tempPokemonDetails = {
          ...data,
          species_details: specData,
        };

        completePokemonDetails.push(tempPokemonDetails);
      });

      // set state based on the combined data
      setPokemonList(completePokemonDetails);
    };

    data && fetchPokemonDetails();
  }, [data]);

  useEffect(() => {
    console.log('pokemon list: ', pokemonList);
  }, [pokemonList]);

  return (
    <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        container
        rowSpacing={4}
        sx={{
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/Pokeball.png)',
          backgroundAttachment: 'fixed',
          overflowY: 'auto',
        }}
      >
        {pokemonList &&
          pokemonList.map((pokemon, index) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                display='flex'
                justifyContent='center'
                key={index}
              >
                <Card
                  id={`#${pokemon.id.toString().padStart(4, '0')}`}
                  name={pokemon.name}
                  originalName={pokemon.species_details.names[9].name}
                  type={pokemon.types[0].type.name}
                  imageURL={`${pokemon.sprites.other['official-artwork'].front_default}`}
                  altImageURL={`${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}`}
                  desc={`${pokemon.species_details.flavor_text_entries[1].flavor_text}`}
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
