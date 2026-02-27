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

const initialGames = [
  {
    id: crypto.randomUUID(),
    title: "The Witcher 3: Wild Hunt",
    platform: "PC",
    genre: "RPG",
    status: "completed",
    notes: "One of the best RPGs ever made. The DLCs are a must play.",
    rating: 3,
    image:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  },
  {
    id: crypto.randomUUID(),
    title: "Red Dead Redemption 2",
    platform: "PS5",
    genre: "Action",
    status: "playing",
    notes: "Incredible story and world. Take your time with this one.",
    rating: 5,
    image:
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
  },
  {
    id: crypto.randomUUID(),
    title: "Hollow Knight",
    platform: "PC",
    genre: "Metroidvania",
    status: "wishlist",
    notes: "",
    rating: null,
    image:
      "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
  },
];

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
