import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GameSection({ title, endpoint }) {
  const [games, setGames] = useState([]);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Declare the async function inside useEffect
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=4${endpoint}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch game");
        }
        const data = await res.json();
        setGames(data.results);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames(); // call the async function
  }, [endpoint, API_KEY]);

  if (loading)
    return <p className="text-white p-6 sm:p-10 lg:px-40">Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.slice(0, 4).map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="block">
            <div className="bg-gray-800 rounded hover:scale-105 transition transform duration-300">
              <img
                src={game.background_image}
                alt={game.name}
                className="h-48 sm:h-40 lg:h-44 w-full object-cover rounded-t"
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
