export interface CardProps {
  id: string;
  name: string;
  originalName: string;
  type: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  imageURL: string | null;
  altImageURL: string | null;
  desc: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  weight: number;
  exp: number;
  generation: string;
  evolutions: string;
}

export interface AbilitiesProps {
  ability: {
    name: string;
    url: string;
  };
  is_hidden?: boolean;
  slot?: number;
}

export interface AbilitiesList {
  effect_changes: string[];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon: {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export interface GenerationProps {
  abilities: string[];
  id: number;
  main_region: {
    name: string;
    url: string;
  };
  moves: {
    name: string;
    url: string;
  }[];
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    }[];
    name: string;
  }[];
  pokemon_species: {
    name: string;
    url: string;
  }[];
  types: {
    name: string;
    url: string;
  }[];
  version_groups: {
    name: string;
    url: string;
  }[];
}
