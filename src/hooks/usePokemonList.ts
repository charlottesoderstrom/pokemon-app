import { useQuery } from '@tanstack/react-query';

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

const fetchPokemonList = async (): Promise<string[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');

  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }

  const data: PokemonListResponse = await response.json();
  return data.results.map(pokemon => pokemon.name);
};

export const usePokemonList = () => {
  return useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonList,
    staleTime: Infinity, // Pokemon list doesn't change often
  });
};
