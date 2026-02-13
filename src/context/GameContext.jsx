import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Create Context

const GameContext = createContext();

const initialGames = [
  {
    id: 2233,
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
    status: "playing",
    notes: "its a hard game",
    image: "https://media.rawg.io/media/games/xyz/elden_ring.jpg",
  },
];

export function GameProvider({ children }) {
  // game list
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("games");
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });

  // Search Game Results
  const [searchResults, setSearchResults] = useState([]);
  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // api key
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  // async function to fetch api
  const fetchGames = useCallback(
    async (query) => {
      if (!query) return;

      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}`,
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
    [RAWG_API_KEY],
  );

  // debounce effect
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchGames(searchQuery);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, fetchGames]);

  // to edit a game
  const [editGame, setEditGame] = useState(null);

  // save locally
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        editGame,
        setEditGame,
        searchResults,
        setSearchQuery,
      }}
    >
      {children}
      {/* everything inside <GameProvider> can use this state */}
    </GameContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useGames() {
  return useContext(GameContext);
}
