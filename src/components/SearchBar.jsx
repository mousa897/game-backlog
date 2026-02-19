import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  const wrapperRef = useRef(null);

  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const fetchGames = useCallback(
    async (searchValue) => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${searchValue}`,
        );
        const data = await res.json();
        setResults(data.results.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    },
    [RAWG_API_KEY],
  );

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchGames(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, fetchGames]);

  // clicking outside closes the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setDropdown(true);
        }}
        placeholder="Search for a game..."
        className="p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white w-100  text-center sm:text-start"
      />

      {search.length > 0 && dropdown && (
        <div className="absolute bg-gray-800 w-100 rounded mt-2 border border-gray-700 flex flex-col gap-2">
          {results.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              className="flex justify-start align-center text-white p-2"
              onClick={() => setDropdown(false)}
            >
              <img
                src={game.background_image}
                alt={game.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex flex-col justify-start">
                <p> {game.name}</p>
                <p>
                  {game.released
                    ? new Date(game.released).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
