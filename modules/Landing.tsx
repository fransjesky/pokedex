'use client';

// core components
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Card from '@/components/Card';

// reusable components
import Pagination from '@/components/Pagination';

// api
import getPokemons from '@/api/getPokemons';
import getPokemonDetails from '@/api/getPokemonDetails';
import getSpeciesDetails from '@/api/getSpeciesDetails';

// types
import { PokemonsProps, PokemonListProps } from './types/LandingType';

export default function Landing() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<PokemonsProps | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListProps[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      setOffset((page - 1) * limit);

      // fetch list
      const pokemons = await getPokemons({ offset });
      setData(pokemons);
    };

    fetchPokemons();
  }, [offset, page]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      // array init
      let pokeDetails: unknown[];
      let specDetails: unknown[];

      // fetch details
      const pokemonDetails = await Promise.all(
        data!.results.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      pokeDetails = pokemonDetails;

      // fetch species
      const speciesDetails = await Promise.all(
        pokemonDetails.map((pokemon) => getSpeciesDetails(pokemon.species.name))
      );

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
      console.log('pokemons: ', completePokemonDetails);
      setPokemonList(completePokemonDetails);
    };

    data && fetchPokemonDetails();
  }, [data]);

  // format string function
  function formatString(input: string): string {
    const words = input.split('-');
    const formattedString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return formattedString;
  }

  return (
    <Box>
      <Grid
        container
        rowSpacing={4}
        sx={{
          minHeight: 'calc(100vh - 2.5rem)',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem',
          backgroundColor: '#000000',
          overflowY: 'auto',
        }}
      >
        {pokemonList &&
          pokemonList.map((pokemon, index) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                lg={3}
                xl={2}
                display='flex'
                justifyContent='center'
                key={index}
              >
                <Card
                  id={`#${pokemon.id.toString().padStart(4, '0')}`}
                  name={
                    pokemon.order >= 0 ? pokemon.name : pokemon.species.name
                  }
                  originalName={
                    pokemon.species_details.names.length >= 10
                      ? pokemon.species_details.names[9]?.name
                      : pokemon.species_details.names[7]?.name
                  }
                  type={pokemon.types}
                  imageURL={
                    pokemon.sprites.other['official-artwork'].front_default
                      ? `${pokemon.sprites.other['official-artwork'].front_default}`
                      : null
                  }
                  altImageURL={
                    pokemon.sprites.versions['generation-v']['black-white']
                      .animated.front_default
                      ? `${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}`
                      : null
                  }
                  desc={((): string => {
                    const englishEntry =
                      pokemon.species_details.flavor_text_entries.find(
                        (entry) => entry.language.name === 'en'
                      );

                    return (
                      englishEntry?.flavor_text.replace(/[\n\f]/g, ' ') ||
                      `${formatString(
                        pokemon.name
                      )} complete data is currently unavailable.`
                    );
                  })()}
                  abilities={pokemon.abilities}
                  stats={pokemon.stats}
                />
              </Grid>
            );
          })}
      </Grid>
      <Box
        sx={{
          height: '5rem',
          width: '100vw',
          position: 'fixed',
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            padding: '0.625rem',
            borderRadius: '1rem',
            backgroundColor: '#121212',
            boxShadow:
              '0 0.0625rem 0.5rem 0 rgba(0,0,0,.04), 0 0.0625rem 0.3125rem 0 rgba(0,0,0,.04)',
          }}
        >
          <Pagination
            count={data ? Math.ceil(data!.count / limit) : 0}
            page={page}
            onChange={(newPage) => setPage(newPage as number)}
          />
        </Box>
      </Box>
    </Box>
  );
}
