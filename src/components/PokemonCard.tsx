import type { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const formatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-yellow-400">
      <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{formatName(pokemon.name)}</h2>
          <span className="text-xl font-semibold">#{pokemon.id}</span>
        </div>
      </div>
      <div className="bg-linear-to-r from-gray-50 to-gray-100 p-8 flex justify-center">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-64 h-64 object-contain drop-shadow-2xl"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Type</h3>
          <div className="flex gap-2">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600 font-semibold">Height</span>
            <div className="text-xl font-bold text-gray-900">
              {(pokemon.height / 10).toFixed(1)} m
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-600 font-semibold">Weight</span>
            <div className="text-xl font-bold text-gray-900">
              {(pokemon.weight / 10).toFixed(1)} kg
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Abilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.slice(0, 3).map((ability, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium"
              >
                {formatName(ability.ability.name)}
                {ability.is_hidden && ' (Hidden)'}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Sample Moves
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {pokemon.moves.slice(0, 4).map((move, index) => (
              <div
                key={index}
                className="bg-linear-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-800">
                  {formatName(move.move.name)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
