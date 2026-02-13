import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GameSection({ title, endpoint }) {
  const [games, setGames] = useState([]);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=8${endpoint}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results));
  }, [endpoint, API_KEY]);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>

      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <div className="bg-gray-800 rounded hover:scale-105 transition">
              <img
                src={game.background_image}
                alt={game.name}
                className="h-40 w-full object-cover rounded-t"
              />
              <p className="p-2 font-semibold text-white">{game.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default GameSection;
