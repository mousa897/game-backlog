import { useEffect, useRef, useState } from "react";
import { useGames } from "../context/GameContext";
import toast from "react-hot-toast";

function GameForm({ autoScrollRef }) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("wishlist");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [rating, setRating] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState("");

  const {
    setGames,
    editGame,
    setEditGame,
    searchQuery,
    setSearchQuery,
    searchResults,
    games,
  } = useGames();
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editGame) {
      setTitle(editGame.title);
      setPlatform(editGame.platform);
      setGenre(editGame.genre);
      setStatus(editGame.status);
      setNotes(editGame.notes);
      setImage(editGame.image || "");
      setRating(editGame.rating || "");
      setHoursPlayed(editGame.hoursPlayed || "");
    }
  }, [editGame]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !platform) return;

    if (editGame) {
      setGames((games) =>
        games.map((game) =>
          game.id === editGame.id
            ? {
                ...game,
                title,
                platform,
                genre,
                status,
                notes,
                rating: rating ? Number(rating) : null,
                hoursPlayed: hoursPlayed ? Number(hoursPlayed) : null,
              }
            : game,
        ),
      );
      setEditGame(null);
      return toast.success("Game updated successfully!");
    }

    const alreadyExists = games.some(
      (game) => game.title.toLowerCase() === title.toLowerCase(),
    );
    if (alreadyExists) {
      toast.error("This game is already in your list!");
      return;
    }

    const newGame = {
      id: crypto.randomUUID(),
      title,
      platform,
      genre,
      status,
      notes,
      rating: rating ? Number(rating) : null,
      hoursPlayed: hoursPlayed ? Number(hoursPlayed) : null,
      image,
    };

    setGames((prev) => [...prev, newGame]);
    toast.success("Game added to your backlog!");

    setTitle("");
    setPlatform("");
    setGenre("");
    setStatus("wishlist");
    setNotes("");
    setImage("");
    setRating("");
    setHoursPlayed("");
  }

  const inputClass =
    "p-2 rounded-lg bg-gray-700/60 border border-gray-600/50 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "mb-1 text-sm font-medium text-gray-400";

  return (
    <div
      ref={autoScrollRef}
      className="flex justify-center w-full lg:w-1/3 mt-8"
    >
      <form
        className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 border border-gray-700/50"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-blue-500 rounded-full" />
          <h2 className="text-xl font-bold">
            {editGame ? "Edit Game" : "Add Game"}
          </h2>
        </div>

        {/* Search */}
        <div className="relative flex flex-col" ref={wrapperRef}>
          <label className={labelClass}>Search Game</label>
          <input
            type="text"
            placeholder="Search for a game..."
            className={inputClass}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
          />
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-xl max-h-64 overflow-auto border border-gray-600/50 shadow-xl z-10">
              {searchResults.map((game) => (
                <div
                  key={game.id}
                  className="flex gap-3 p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700/50 last:border-b-0 transition-colors"
                  onClick={() => {
                    setTitle(game.name);
                    setGenre(game.genres?.[0]?.name || "");
                    setPlatform(game.platforms?.[0]?.platform?.name || "");
                    setImage(game.background_image || "");
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-sm">{game.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {game.released
                        ? new Date(game.released).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fields */}
        {[
          {
            label: "Title",
            value: title,
            setter: setTitle,
            placeholder: "Game Title",
          },
          {
            label: "Platform",
            value: platform,
            setter: setPlatform,
            placeholder: "PC / PS5 / Xbox / Switch...",
          },
          {
            label: "Genre",
            value: genre,
            setter: setGenre,
            placeholder: "Action / Adventure / etc...",
          },
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label} className="flex flex-col">
            <label className={labelClass}>{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              className={inputClass}
              value={value}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}

        {/* Status */}
        <div className="flex flex-col">
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
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

        {/* Hours Played */}
        <div className="flex flex-col">
          <label className={labelClass}>Hours Played</label>
          <input
            type="number"
            min="0"
            placeholder="e.g. 42"
            className={inputClass}
            value={hoursPlayed}
            onChange={(e) => setHoursPlayed(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className={labelClass}>Rating</label>
          <select
            className={inputClass}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Unrated</option>
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>
        </div>

        {/* Notes */}
        <div className="flex flex-col">
          <label className={labelClass}>Notes</label>
          <textarea
            placeholder="Game tips, strategies, or notes..."
            className={`${inputClass} resize-none h-24`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={150}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-200 py-2.5 rounded-xl font-semibold text-white shadow-md shadow-blue-900/30 cursor-pointer"
        >
          {editGame ? "Update Game" : "Add Game"}
        </button>
      </form>
    </div>
  );
}

export default GameForm;
