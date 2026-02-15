import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GameOfTheDay() {
  const [game, setGame] = useState(null);

  // api key
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

  return (
    <div className="bg-gray-800 text-white rounded-xl shadow-md border border-gray-700 ">
      {game ? (
        <Link
          to={`/game/${game.id}`}
          className="flex flex-col items-center justify-center w-fit gap-2 p-5"
        >
          <h2 className="text-xl font-bold mb-2">Game Of The Day</h2>
          <div className="flex justify-center mt-2">
            <img
              src={game.background_image}
              alt={game.name}
              className="w-40 h-40 object-cover rounded"
            />
          </div>
          <p className="text-lg font-semibold">{game.name}</p>
          <p className="text-sm text-gray-400">
            Released: {game.released || "Unknown"}
          </p>
          <p className="text-sm text-gray-400">Rating: ⭐ {game.rating}</p>
        </Link>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GameOfTheDay;
