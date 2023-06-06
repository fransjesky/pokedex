'use client';

// core components
import { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import Card from '@/components/Card';

// api
import getPokemons from '@/api/getPokemons';
import getPokemonDetails from '@/api/getPokemonDetails';

interface PokemonsProps {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonListProps {
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    }[];
  }[];
  height: number;
  held_items: string[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    }[];
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_types: string[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

export default function Landing() {
  const [data, setData] = useState<PokemonsProps | null>(null);
  const [pokemonList, setPokemonList] = useState<PokemonListProps[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemons = await getPokemons();
      setData(pokemons);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const pokemonDetails = await Promise.all(
        data!.results.map((pokemon) => getPokemonDetails(pokemon.url))
      );

      setPokemonList(pokemonDetails);
    };

    data && fetchPokemonDetails();
  }, [data]);

  useEffect(() => {
    console.log('list: ', pokemonList);
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
                  type={pokemon.types[0].type.name}
                  imageURL={`${pokemon.sprites.other['official-artwork'].front_default}`}
                  desc='There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.'
                />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
