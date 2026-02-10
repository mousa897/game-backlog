import { useMemo, useState } from "react";
import { useGames } from "../context/GameContext";

function DisplayContent() {
  // show the edit button
  const [showEdit, setShowEdit] = useState(false);

  // filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  // useGames from context
  const { games, setGames, editGame, setEditGame } = useGames();

  // filter games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const statusMatch =
        statusFilter === "all" || game.status === statusFilter;

      const platformMatch =
        platformFilter === "all" || game.platform === platformFilter;

      return statusMatch && platformMatch;
    });
  }, [games, statusFilter, platformFilter]);

  function handleDelete(id) {
    setGames(games.filter((game) => game.id !== id));
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg text-white mt-8 border border-gray-700 p-6 flex-7">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center">Your Games</h2>
        <div className="flex gap-4 ">
          <label className="flex items-center text-sm text-gray-400">
            Filters :
          </label>
          <select
            className="p-2 rounded bg-gray-700 text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="playing">Playing</option>
            <option value="paused">Paused</option>
            <option value="dropped">Dropped</option>
            <option value="wishlist">Wishlist</option>
          </select>
          <select
            className="p-2 rounded bg-gray-700 text-white"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="PC">PC</option>
            <option value="Playstation">Playstation</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
          </select>
        </div>

        <button
          // to show edit button
          onClick={() => {
            setShowEdit(!showEdit);

            // to exit edit mode
            if (showEdit && editGame) {
              setEditGame(null);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          {showEdit ? "Hide" : "Edit"}
        </button>
      </div>
      <ul className="space-y-3">
        {filteredGames.map((game) => (
          <li
            className="bg-gray-700 p-3 rounded flex justify-between items-center"
            key={game.id}
          >
            <div className="flex items-center">
              {showEdit && (
                <>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="mr-4 flex items-center justify-center w-8 h-8 rounded-full 
               bg-red-600 hover:bg-red-700 text-white font-bold 
               transition-colors"
                  >
                    X
                  </button>

                  <button
                    onClick={() => setEditGame(game)}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </>
              )}
              <img
                src={game.image || "https://via.placeholder.com/80"} // fallback if no image
                alt={game.title}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <h3 className="font-semibold">{game.title}</h3>
                <p className="text-sm text-gray-300">
                  Platform: {game.platform}
                </p>
                <p className="text-sm text-gray-400">Genre: {game.genre}</p>
                <p className="text-sm text-gray-200 italic mt-1">
                  Notes: {game.notes}
                </p>
              </div>
            </div>
            <span
              className={`font-semibold ${
                game.status === "completed"
                  ? "text-green-400"
                  : game.status === "playing"
                    ? "text-yellow-400"
                    : game.status === "dropped"
                      ? "text-red-400"
                      : "text-blue-400"
              }`}
            >
              {game.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayContent;
