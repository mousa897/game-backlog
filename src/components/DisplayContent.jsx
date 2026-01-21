import { useState } from "react";

function DisplayContent({ games, onGames, onEditGame, editGame }) {
  const [showEdit, setShowEdit] = useState(false);

  function handleDelete(id) {
    onGames(games.filter((game) => game.id !== id));
  }

  // later, this will accept props (like the games list)
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white mt-8 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-center">Your Games</h2>
        <button
          // to show edit button
          onClick={() => {
            setShowEdit(!showEdit);

            // to exit edit mode
            if (showEdit && editGame) {
              onEditGame(null);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          {showEdit ? "Hide" : "Edit"}
        </button>
      </div>

      <ul className="space-y-3">
        {games.map((game) => (
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
                    onClick={() => onEditGame(game)}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </>
              )}

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
