import { useGames } from "../context/GameContext";

function BacklogStats() {
  const { games } = useGames();

  const completed = games.filter((g) => g.status === "completed").length;
  const playing = games.filter((g) => g.status === "playing").length;
  const paused = games.filter((g) => g.status === "paused").length;
  const dropped = games.filter((g) => g.status === "dropped").length;
  const wishlist = games.filter((g) => g.status === "wishlist").length;

  const ratedGames = games.filter((g) => g.rating);
  const avgRating =
    ratedGames.length > 0
      ? (
          ratedGames.reduce((sum, g) => sum + g.rating, 0) / ratedGames.length
        ).toFixed(1)
      : null;

  const stats = [
    {
      label: "Total",
      value: games.length,
      color: "text-white",
      bg: "bg-gray-700/50",
      border: "border-gray-600/30",
    },
    {
      label: "Playing",
      value: playing,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    {
      label: "Completed",
      value: completed,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      label: "Paused",
      value: paused,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Dropped",
      value: dropped,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      label: "Wishlist",
      value: wishlist,
      color: "text-blue-300",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  ];

  if (games.length === 0) return null;

  return (
    <div className="w-full bg-gray-800 border border-gray-700/50 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        <h2 className="text-xl font-bold text-white">Backlog Stats</h2>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border ${stat.bg} ${stat.border}`}
          >
            <span className={`text-2xl font-extrabold ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs text-gray-400 mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Average rating — only shows if at least one game is rated */}
      {avgRating && (
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-2">
          <span className="text-sm text-gray-400">Average Rating</span>
          <span className="text-sm font-bold text-white">⭐ {avgRating}</span>
          <span className="text-xs text-gray-500">/ 5</span>
        </div>
      )}
    </div>
  );
}

export default BacklogStats;
