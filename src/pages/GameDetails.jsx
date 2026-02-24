import { useParams } from "react-router-dom";

import { useGames } from "../context/GameContext";
import DOMPurify from "dompurify";
import { useRawg } from "../hooks/useRawg";

function GameDetails() {
  const { games, setGames } = useGames();
  const { id } = useParams();

  const { data: game, loading, error } = useRawg(`games/${id}`);

  function handleAddGame() {
    // checks if game is already in the list
    const alreadyAdded = games.some((g) => g.id === game.id);
    if (alreadyAdded) {
      alert("Game is already in your backlog!");
      return;
    }

    // adds the game to the list
    const newGame = {
      id: game.id,
      title: game.name,
      platform: game.platforms?.[0]?.platform?.name || "Unknown",
      genre: game.genres?.[0]?.name || "Unknown",
      status: "wishlist",
      notes: "",
      image: game.background_image,
    };
    setGames([...games, newGame]);
    alert("Game added to your backlog!");
  }

  if (loading)
    return <p className="text-white p-6 sm:p-10 lg:px-40">Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  if (!game) return null;

  return (
    <main className="bg-gray-900 text-white min-h-screen px-6 sm:px-10 lg:px-40 py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5 items-center w-full lg:w-1/3">
          <div className="w-80 flex items-center justify-center overflow-hidden rounded-xl">
            <img
              src={game.background_image || "/placeholder.png"}
              alt={game.name}
              className="min-h-full min-w-full object-contain"
            />
          </div>
          <button
            onClick={handleAddGame}
            className=" cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold text-white w-[50%]"
          >
            Add Game To Wishlist
          </button>
        </div>
        <div className="flex flex-col gap-4 items-start justify-center">
          <h1 className="text-4xl font-bold">{game.name}</h1>

          <p className="text-gray-400">
            ⭐ {game.rating} | Released: {game.released}
          </p>

          <div className="text-gray-300">
            {game.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.description),
                }}
              />
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameDetails;
