import { PokemonCard } from './components/PokemonCard';
import { usePokemon } from './hooks/usePokemon';

function App() {
  const { data, isLoading, error } = usePokemon('pikachu');

  console.log('Pokemon data:', data);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
          Pokémon App
        </h1>
        <div className="flex justify-center">
          {isLoading && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <p className="text-xl text-gray-600">Loading Pokemon...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-2 border-red-400 rounded-lg shadow-xl p-8">
              <p className="text-xl text-red-800 font-semibold">
                Error: {error.message}
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
