export interface Character {
  id: number;
  name: string;
  status: string;
  species: Species;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[] | Record<string, string>;
  url: string;
}

export type Species = "Human" | "Alien" | "Animal";

export type SpeciesFilter = Species | "All";

export enum MutationTypes {
  ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES",
  LOAD_FAVOURITES = "LOAD_FAVOURITES",
  REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES",
  FAVOURITES_ARE_LOADING = "FAVOURITES_ARE_LOADING",
}
