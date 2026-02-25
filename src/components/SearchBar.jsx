import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const fetchGames = useCallback(
    async (searchValue) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${searchValue}`,
        );
        const data = await res.json();
        setResults(data.results.slice(0, 5));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [RAWG_API_KEY],
  );

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => fetchGames(search), 300);
    return () => clearTimeout(timeout);
  }, [search, fetchGames]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      {/* Input */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setDropdown(true);
          }}
          placeholder="Search for a game..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-700/60 border border-gray-600/50 placeholder-gray-500 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {/* clear button */}
        {search && (
          <button
            onClick={() => {
              setSearch("");
              setResults([]);
              setDropdown(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {search.length > 0 && dropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700/50 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col gap-2 p-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg shrink-0" />
                  <div className="flex flex-col gap-2 justify-center flex-1">
                    <div className="h-3 bg-gray-700 rounded w-3/4" />
                    <div className="h-3 bg-gray-700 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!loading &&
            results.map((game, index) => (
              <Link
                to={`/game/${game.id}`}
                key={game.id}
                onClick={() => {
                  setDropdown(false);
                  setSearch("");
                }}
                className={`flex items-center gap-3 p-3 hover:bg-gray-700/60 transition-colors duration-150 text-white
                ${index !== results.length - 1 ? "border-b border-gray-700/50" : ""}`}
              >
                <img
                  src={game.background_image || "/placeholder.png"}
                  alt={game.name}
                  className="w-12 h-12 object-cover rounded-lg shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium truncate">{game.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {game.released
                      ? new Date(game.released).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </Link>
            ))}

          {/* No results */}
          {!loading && results.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-6">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
