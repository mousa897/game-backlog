import { useEffect, useState } from "react";
import DisplayContent from "./DisplayContent";
import GameForm from "./GameForm";

const initialGames = [
  {
    id: 2233,
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
    status: "playing",
    notes: "its a hard game",
  },
];

function MainContent() {
  // game list
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("games");
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });

  // Search Game Results
  const [searchResults, setSearchResults] = useState([]);
  // Search Query
  const [searchQuery, setSearchQuery] = useState("");
  // to edit a game
  const [editGame, setEditGame] = useState(null);

  // save locally
  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  // api key
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  // async function to fetch api
  async function fetchGames(query) {
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
  }

  return (
    <main className="bg-gray-700 min-h-screen">
      <GameForm
        onGames={setGames}
        editGame={editGame}
        onEditGame={setEditGame}
        searchQuery={searchQuery}
        onSearchQuery={setSearchQuery}
        fetchGames={fetchGames}
        searchResults={searchResults}
      />
      <DisplayContent
        games={games}
        onGames={setGames}
        editGame={editGame}
        onEditGame={setEditGame}
      />
    </main>
  );
}

export default MainContent;
