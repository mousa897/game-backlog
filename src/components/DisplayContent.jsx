import { useMemo, useState } from "react";
import { useGames } from "../context/GameContext";

function DisplayContent({ autoScrollRef }) {
  // show the edit button
  const [showEdit, setShowEdit] = useState(false);

  // filter states
  const [statusFilter, setStatusFilter] = useState("all");

  // useGames from context
  const { games, setGames, editGame, setEditGame } = useGames();

  // filter games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const statusMatch =
        statusFilter === "all" || game.status === statusFilter;

      return statusMatch;
    });
  }, [games, statusFilter]);

  function handleDelete(id) {
    setGames(games.filter((game) => game.id !== id));
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg text-white mt-8 border border-gray-700 p-6 w-full lg:w-2/3">
      {/* HEADER SECTION*/}
      <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          Your Games
        </h2>

        {/* filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          <label className="flex items-center text-sm text-gray-400">
            Filter :
          </label>

          {/* Dropdown that updates statusFilter state */}
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
        </div>

        {/* edit mode toggle */}
        <button
          onClick={() => {
            setShowEdit(!showEdit);

            // If exiting edit mode, clear selected editGame
            if (showEdit && editGame) {
              setEditGame(null);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-[50%]  sm:w-auto"
        >
          {showEdit ? "Hide" : "Edit"}
        </button>
      </div>

      {/* game list */}
      <ul className="space-y-3">
        {filteredGames.map((game) => (
          <li
            // Each individual game card
            className="bg-gray-700 p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            key={game.id}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              {showEdit && (
                <div className="flex gap-2 sm:order-none order-first">
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="mr-4 flex items-center justify-center w-8 h-8 rounded-full 
             bg-red-600 hover:bg-red-700 text-white font-bold 
             transition-colors"
                  >
                    X
                  </button>

                  {/* Edit button sets selected game into edit mode */}
                  <button
                    onClick={() => {
                      setEditGame(game); // scroll back to form to edit
                      if (autoScrollRef?.current) {
                        autoScrollRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              )}

              {/* Game thumbnail image */}
              <img
                src={game.image || "https://via.placeholder.com/80"}
                alt={game.title}
                className="w-20 h-20 object-cover rounded mr-4"
              />

              {/* Game information text */}
              <div className="text-center sm:text-start">
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

            {/* Color changes based on game.status */}
            <span
              className={`font-semibold text-center ${
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
