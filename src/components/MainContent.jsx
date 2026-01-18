import { useState } from "react";
import DisplayContent from "./DisplayContent";
import GameForm from "./GameForm";

const initialGames = [
  {
    id: 2233,
    title: "Elden Ring",
    platform: "PC",
    genre: "Action RPG",
    status: "playing",
  },
  {
    id: 3322,
    title: "Baldur's Gate 3",
    platform: "PC",
    genre: "CRPG",
    status: "completed",
  },
];

function MainContent() {
  // game list
  const [games, setGames] = useState(initialGames);
  // to edit a game
  const [editGame, setEditGame] = useState(null);

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
