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
