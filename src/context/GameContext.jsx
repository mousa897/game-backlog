import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Create Context

const GameContext = createContext();

const initialGames = [];

export function GameProvider({ children }) {
  // game list
  const [games, setGames] = useLocalStorage("games", initialGames);

  // Search Game Results
  const [searchResults, setSearchResults] = useState([]);
  // Search Query
  const [searchQuery, setSearchQuery] = useState("");
  // to edit a game
  const [editGame, setEditGame] = useState(null);

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

  // values
  const value = useMemo(() => {
    return {
      games,
      setGames,
      editGame,
      setEditGame,
      searchResults,
      searchQuery,
      setSearchQuery,
    };
  }, [games, setGames, editGame, searchResults, searchQuery]);

  return (
    <GameContext.Provider value={value}>
      {children}
      {/* everything inside <GameProvider> can use this state */}
    </GameContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useGames() {
  return useContext(GameContext);
}
