import { usePokemon } from './hooks/usePokemon';

function App() {
  const { data, isLoading, error } = usePokemon('pikachu');

  console.log('Pokemon data:', data);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokémon App</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>Successfully fetched: {data.name}</p>}
      </div>
    </div>
  );
}

export default App;
