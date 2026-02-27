import { useEffect, useMemo, useState } from "react";
import { useGames } from "../context/GameContext";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  playing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  dropped: "bg-red-500/20 text-red-400 border-red-500/30",
  paused: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  wishlist: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

function DisplayContent({ autoScrollRef }) {
  const [showEdit, setShowEdit] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState(null); // tracks which game is being deleted
  const { games, setGames, editGame, setEditGame } = useGames();

  useEffect(() => {
    if (!editGame) setShowEdit(false);
  }, [editGame]);

  const filteredGames = useMemo(() => {
    return games.filter(
      (game) => statusFilter === "all" || game.status === statusFilter,
    );
  }, [games, statusFilter]);

  function handleDelete() {
    setGames(games.filter((game) => game.id !== deleteTarget.id));
    setDeleteTarget(null);
    setShowEdit(false);
    toast.success("Game removed.");
  }

  function renderStars(rating) {
    if (!rating)
      return <span className="text-gray-500 italic text-xs">Unrated</span>;
    return "⭐".repeat(rating);
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg text-white mt-8 border border-gray-700/50 p-6 w-full lg:w-2/3">
      {/* CONFIRM DELETE MODAL */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
          >
            {/* Modal box — stop clicks from bubbling up to the backdrop */}
            <motion.div
              className="bg-gray-800 border border-gray-700/50 rounded-2xl p-6 shadow-2xl w-[90%] max-w-sm flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">Remove game?</h3>
                <p className="text-sm text-gray-400">
                  Are you sure you want to remove{" "}
                  <span className="text-white font-medium">
                    {deleteTarget.title}
                  </span>{" "}
                  from your backlog?
                </p>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-xl font-bold">Your Games</h2>
          <span className="ml-1 text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">
            {filteredGames.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            className="p-2 rounded-lg bg-gray-700/60 border border-gray-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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

          <button
            onClick={() => {
              setShowEdit(!showEdit);
              if (showEdit && editGame) setEditGame(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              showEdit
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {showEdit ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🎮</p>
          <p className="text-sm">No games here yet. Add one!</p>
        </div>
      )}

      {/* Game list */}
      <ul className="space-y-3">
        <AnimatePresence>
          {filteredGames.map((game) => (
            <motion.li
              key={game.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors duration-200"
            >
              {showEdit && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setDeleteTarget(game)} // store the game, opens modal
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => {
                      setEditGame(game);
                      autoScrollRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white text-xs font-medium rounded-full transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}

              <img
                src={game.image || "https://via.placeholder.com/80"}
                alt={game.title}
                className="w-16 h-16 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-white">{game.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {game.platform} · {game.genre}
                </p>
                <p className="text-xs mt-1">{renderStars(game.rating)}</p>
                {game.notes && (
                  <p className="text-xs text-gray-400 italic mt-1 line-clamp-2">
                    {game.notes}
                  </p>
                )}
              </div>

              <span
                className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border capitalize ${STATUS_COLORS[game.status] || "bg-gray-600 text-gray-300"}`}
              >
                {game.status}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default DisplayContent;
