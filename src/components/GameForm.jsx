import { useEffect, useRef, useState } from "react";
import { useGames } from "../context/GameContext";

function GameForm({ searchQuery, onSearchQuery, searchResults }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("wishlist"); // default status
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { setGames, editGame, setEditGame } = useGames();

  const wrapperRef = useRef(null);

  // wrapper useEffect
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // use effect so edit renders when editgame value changes
  useEffect(() => {
    if (editGame) {
      setTitle(editGame.title); // change the title to the edited version
      setPlatform(editGame.platform);
      setGenre(editGame.genre);
      setStatus(editGame.status);
      setNotes(editGame.notes);
    }
  }, [editGame]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !platform) return; // validation

    if (editGame) {
      // UPDATE MODE
      setGames((games) =>
        games.map((game) =>
          game.id === editGame.id
            ? { ...game, title, platform, genre, status, notes } // update this game
            : game,
        ),
      );
      setEditGame(null); // back to null
    } else {
      const newGame = {
        id: crypto.randomUUID(),
        title,
        platform,
        genre,
        status,
        notes,
        image,
      };
      // add a new game

      setGames((prevGames) => [...prevGames, newGame]);
    } //  add the new game to list

    // clear the form
    setTitle("");
    setPlatform("");
    setGenre("");
    setStatus("wishlist");
    setNotes("");
    setImage("");
  }

  return (
    <div className="flex justify-center p-10">
      <form
        className="bg-gray-800 text-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4 border border-gray-700"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-2">Add a Game</h2>

        {/* Search Game */}
        <div className="relative flex flex-col" ref={wrapperRef}>
          <label className="mb-1 text-gray-300">Search Game</label>
          <input
            type="text"
            placeholder="Search for a game..."
            className="p-2 mb-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => {
              onSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
          />
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 p-2 rounded max-h-60 overflow-y-auto z-50">
              {" "}
              {searchResults.map((game) => (
                <div
                  key={game.id}
                  className="flex justify-between p-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => {
                    setTitle(game.name);
                    setGenre(game.genres?.[0]?.name || "");
                    setPlatform(game.platforms?.[0]?.platform?.name || "");
                    setImage(game.background_image || "");
                    setShowDropdown(false);
                    onSearchQuery("");
                  }} // when a result is clicked, auto-fill the form
                >
                  <p> {game.name}</p>
                  <p>
                    {game.released
                      ? new Date(game.released).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Title</label>
          <input
            type="text"
            placeholder="Game Title"
            className="p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Platform */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Platform</label>
          <select
            className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">Select platform</option>
            <option value="PC">PC</option>
            <option value="PS5">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
          </select>
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Genre</label>
          <input
            type="text"
            placeholder="Action / Adventure / etc..."
            className="p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300">Status</label>
          <select
            className="p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="wishlist">Wishlist</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        {/* Notes */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-300 ">Notes</label>
          <textarea
            placeholder="Game tips, strategies, or notes..."
            className="p-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded font-semibold text-white"
        >
          {editGame ? "Update Game" : "Add Game"}
        </button>
      </form>
    </div>
  );
}

export default GameForm;
