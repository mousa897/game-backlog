import { useCallback, useEffect, useState } from "react";
import DisplayContent from "../components/DisplayContent";
import GameForm from "../components/GameForm";
import GameOfTheDay from "../components/GameOfTheDay";
import { useGames } from "../context/GameContext";

function Backlog() {
  const { games } = useGames();

  // Search Game Results
  const [searchResults, setSearchResults] = useState([]);
  // Search Query
  const [searchQuery, setSearchQuery] = useState("");

  // save locally
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

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
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchQuery, fetchGames]);

  return (
    <main className="bg-gray-700 min-h-screen flex-col items-center">
      <GameForm
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        fetchGames={fetchGames}
        searchResults={searchResults}
        onSearchResults={setSearchResults}
      />
      <DisplayContent />
      <GameOfTheDay />
    </main>
  );
}

export default Backlog;
