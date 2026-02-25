// GameOfTheDay.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GameOfTheDay() {
  const [game, setGame] = useState(null);
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function fetchGameOfTheDay() {
      const storedGame = localStorage.getItem("gameOfTheDay");
      const storedDate = localStorage.getItem("gameOfTheDayDate");
      const today = new Date().toDateString();

      if (storedGame && storedDate === today) {
        setGame(JSON.parse(storedGame));
        return;
      }

      const res = await fetch(
        `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&ordering=-rating&page_size=20`,
      );
      const data = await res.json();
      const randomGame =
        data.results[Math.floor(Math.random() * data.results.length)];
      localStorage.setItem("gameOfTheDay", JSON.stringify(randomGame));
      localStorage.setItem("gameOfTheDayDate", today);
      setGame(randomGame);
    }
    fetchGameOfTheDay();
  }, [RAWG_API_KEY]);

  if (!game)
    return (
      <div className="w-full h-36 bg-gray-800 rounded-2xl animate-pulse border border-gray-700/50" />
    );

  return (
    <Link
      to={`/game/${game.id}`}
      className="group w-full relative rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
    >
      {/* Background image */}
      <img
        src={game.background_image}
        alt={game.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 p-6 sm:p-8 max-w-lg">
        {/* Badge */}
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">
          🎮 Game of the Day
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {game.name}
        </h2>

        <div className="flex items-center gap-3 text-sm text-gray-300 mt-1">
          <span>⭐ {game.rating}</span>
          <span className="text-gray-600">·</span>
          <span>Released: {game.released || "Unknown"}</span>
        </div>

        <span className="mt-3 inline-flex items-center gap-1 text-sm text-blue-400 font-medium group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
}

export default GameOfTheDay;
