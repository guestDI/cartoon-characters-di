interface Character {
  id: number;
  name: string;
  status: string;
  species: Species;
  type: string;
  gender: string;
  origin: {
    name: "Alien Spa";
    url: "https://rickandmortyapi.com/api/location/64";
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
}

type Species = "Humanoid";
