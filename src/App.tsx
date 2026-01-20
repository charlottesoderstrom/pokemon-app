import { useState } from 'react';
import { PokemonCard } from './components/PokemonCard';
import { SearchBar } from './components/SearchBar';
import { usePokemon } from './hooks/usePokemon';

function App() {
  const [searchedPokemon, setSearchedPokemon] = useState('');
  const { data, isLoading, error } = usePokemon(searchedPokemon);

  const handleSearch = (pokemonName: string) => {
    setSearchedPokemon(pokemonName);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Pokémon App
        </h1>
        <div className="flex flex-col items-center">
          <SearchBar onSearch={handleSearch} />
          {!searchedPokemon && (
            <p className="text-xl text-white text-center">
              Search for a Pokemon to get started!
            </p>
          )}
          {isLoading && searchedPokemon && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <p className="text-xl text-gray-600">Loading Pokemon...</p>
            </div>
          )}
          {error && searchedPokemon && (
            <div className="bg-red-100 border-2 border-red-400 rounded-lg shadow-xl p-8">
              <p className="text-xl text-red-800 font-semibold">
                Pokémon not found! Try another name.
              </p>
            </div>
          )}
          {data && <PokemonCard pokemon={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
