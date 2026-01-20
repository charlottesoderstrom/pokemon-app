import { useEffect, useRef, useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';

interface SearchBarProps {
  onSearch: (pokemonName: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: pokemonList = [] } = usePokemonList();

  const filteredSuggestions = searchInput.trim()
    ? pokemonList
        .filter(name => name.toLowerCase().includes(searchInput.toLowerCase()))
        .slice(0, 8) // Limit to 8 suggestions
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim().toLowerCase());
      setShowSuggestions(false);
      setSearchInput('');
    }
  };

  const handleSuggestionClick = (pokemonName: string) => {
    setSearchInput(pokemonName);
    onSearch(pokemonName);
    setShowSuggestions(false);
    setSearchInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(filteredSuggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-8 relative">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchInput && setShowSuggestions(true)}
            placeholder="Search for a Pokémon..."
            className="w-full px-4 py-3 rounded-lg border-2 border-white bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
            autoComplete="off"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 max-h-64 overflow-y-auto">
              {filteredSuggestions.map((pokemon, index) => (
                <li
                  key={pokemon}
                  onClick={() => handleSuggestionClick(pokemon)}
                  className={`px-4 py-2 cursor-pointer capitalize hover:bg-yellow-100 transition-colors ${
                    index === selectedIndex ? 'bg-yellow-200' : ''
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${
                    index === filteredSuggestions.length - 1
                      ? 'rounded-b-lg'
                      : ''
                  }`}
                >
                  {pokemon}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};
