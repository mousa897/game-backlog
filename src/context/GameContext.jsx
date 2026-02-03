import { createContext, useContext, useEffect, useState } from "react";

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
