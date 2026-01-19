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

  // to edit a game
  const [editGame, setEditGame] = useState(null);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  return (
    <main className="bg-gray-700 min-h-screen">
      <GameForm
        onGames={setGames}
        editGame={editGame}
        onEditGame={setEditGame}
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
