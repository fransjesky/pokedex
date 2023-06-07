export interface PokemonsProps {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonListProps {
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
    versions: {
      'generation-i': {
        'red-blue': {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
        yellow: {
          back_default: string;
          back_gray: string;
          back_transparent: string;
          front_default: string;
          front_gray: string;
          front_transparent: string;
        };
      };
      'generation-ii': {
        crystal: {
          back_default: string;
          back_shiny: string;
          back_shiny_transparent: string;
          back_transparent: string;
          front_default: string;
          front_shiny: string;
          front_shiny_transparent: string;
          front_transparent: string;
        };
        gold: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
        silver: {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
          front_transparent: string;
        };
      };
      'generation-iii': {
        emerald: {
          front_default: string;
          front_shiny: string;
        };
        'firered-leafgreen': {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
        'ruby-sapphire': {
          back_default: string;
          back_shiny: string;
          front_default: string;
          front_shiny: string;
        };
      };
      'generation-iv': {
        'diamond-pearl': {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        'heartgold-soulsilver': {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        platinum: {
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-v': {
        'black-white': {
          animated: {
            back_default: string;
            back_female: string;
            back_shiny: string;
            back_shiny_female: string;
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
          };
          back_default: string;
          back_female: string;
          back_shiny: string;
          back_shiny_female: string;
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-vi': {
        'omegaruby-alphasapphire': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
        'x-y': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-vii': {
        icons: {
          front_default: string;
          front_female: string;
        };
        'ultra-sun-ultra-moon': {
          front_default: string;
          front_female: string;
          front_shiny: string;
          front_shiny_female: string;
        };
      };
      'generation-viii': {
        icons: {
          front_default: string;
          front_female: string;
        };
      };
    };
  };
  species_details: {
    base_happiness: number;
    capture_rate: number;
    color: {
      name: string;
      url: string;
    }[];
    egg_groups: {
      name: string;
      url: string;
    }[];
    evolution_chain: {
      url: string;
    };
    evolves_from_species: string | null;
    flavor_text_entries: {
      flavor_text: string;
      language: {
        name: string;
        url: string;
      };
      version: {
        name: string;
        url: string;
      };
    }[];
    form_descriptions: string[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: {
      genus: string;
      language: {
        name: string;
        url: string;
      };
    }[];
    generation: {
      name: string;
      url: string;
    };
    growth_rate: {
      name: string;
      url: string;
    };
    habitat: {
      name: string;
      url: string;
    };
    has_gender_difference: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: {
      language: string;
      name: string;
    }[];
    order: number;
    pal_park_encounters: {
      area: {
        name: string;
        url: string;
      };
      base_score: number;
      rate: number;
    }[];
    pokedex_number: {
      entry_number: number;
      pokedex: {
        name: string;
        url: string;
      };
    }[];
    shape: {
      name: string;
      url: string;
    };
    varieties: {
      is_default: boolean;
      pokemon: {
        name: string;
        url: string;
      };
    }[];
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
