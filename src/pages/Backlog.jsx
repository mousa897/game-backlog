import { useCallback, useEffect, useState } from "react";
import DisplayContent from "../components/DisplayContent";
import GameForm from "../components/GameForm";
import GameOfTheDay from "../components/GameOfTheDay";

function Backlog() {
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

  return (
    <main className="bg-gray-900 min-h-screen overflow-hidden p-6">
      <div className="space-y-12">
        <GameOfTheDay />

        <GameForm
          searchQuery={searchQuery}
          onSearchQuery={setSearchQuery}
          fetchGames={fetchGames}
          searchResults={searchResults}
          onSearchResults={setSearchResults}
        />
        <DisplayContent />
      </div>
    </main>
  );
}

export default Backlog;
