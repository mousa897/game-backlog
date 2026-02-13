import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function fetchGame() {
      const res = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
      );
      const data = await res.json();
      setGame(data);
    }

    fetchGame();
  }, [id, API_KEY]);

  if (!game) return <p className="text-white p-10">Loading...</p>;

  return (
    <main className="bg-gray-900 min-h-screen text-white p-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded-xl mb-6 w-full max-h-[400px] object-cover"
        />

        <h1 className="text-4xl font-bold mb-2">{game.name}</h1>

        <p className="text-gray-400 mb-4">
          ⭐ {game.rating} | Released: {game.released}
        </p>

        <div
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>
    </main>
  );
}

export default GameDetails;
