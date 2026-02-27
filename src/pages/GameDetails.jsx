import { useParams } from "react-router-dom";
import { useGames } from "../context/GameContext";
import DOMPurify from "dompurify";
import { useRawg } from "../hooks/useRawg";

function GameDetails() {
  const { games, setGames } = useGames();
  const { id } = useParams();
  const { data: game, loading, error } = useRawg(`games/${id}`);

  function handleAddGame() {
    const alreadyAdded = games.some((g) => g.id === game.id);
    if (alreadyAdded) {
      alert("Game is already in your backlog!");
      return;
    }
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
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">Something went wrong.</p>
      </div>
    );

  if (!game) return null;

  return (
    <main className="bg-gray-900 text-white min-h-screen px-6 sm:px-10 lg:px-40 py-10">
      {/* Hero banner image */}
      <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-10 shadow-xl hidden sm:block">
        <img
          src={game.background_image || "/placeholder.png"}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        {/* dark gradient overlay so text is readable if we ever put text on it */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* LEFT SIDE - thumbnail + button */}
        <div className="flex flex-col gap-5 items-center w-full lg:w-1/3 lg:sticky lg:top-10">
          <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
            <img
              src={game.background_image || "/placeholder.png"}
              alt={game.name}
              className="w-full object-cover"
            />
          </div>

          {/* meta info pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {game.genres?.map((g) => (
              <span
                key={g.id}
                className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
              >
                {g.name}
              </span>
            ))}
          </div>

          <button
            onClick={handleAddGame}
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-200 py-3 rounded-xl font-semibold text-white shadow-md shadow-blue-900/40"
          >
            + Add to Wishlist
          </button>
        </div>

        {/* RIGHT SIDE - details */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {game.name}
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              ⭐ <span className="text-white font-medium">{game.rating}</span>
              <span className="mx-2 text-gray-600">·</span>
              Released:{" "}
              <span className="text-white font-medium">{game.released}</span>
            </p>
          </div>

          {/* divider */}
          <div className="h-px bg-gray-700/60" />

          {/* description */}
          <div className="text-gray-300 leading-relaxed text-sm sm:text-base">
            {game.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.description),
                }}
              />
            ) : (
              <p className="text-gray-500 italic">No description available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameDetails;
