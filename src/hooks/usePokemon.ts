import { useQuery } from '@tanstack/react-query';
import type { Pokemon } from '../types/pokemon';

const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );

  if (!response.ok) {
    throw new Error('Pokémon not found');
  }

  return response.json();
};

export const usePokemon = (name: string) => {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemon(name),
    enabled: !!name, // Only fetch if name is provided
  });
};
