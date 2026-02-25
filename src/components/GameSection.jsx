import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useRawg } from "../hooks/useRawg";

function GameSection({ title, endpoint }) {
  const { data, loading, error } = useRawg(`games?page_size=4${endpoint}`);
  const games = data?.results || [];

  if (loading)
    return (
      <div className="flex flex-col gap-3">
        <div className="h-7 w-48 bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="h-44 bg-gray-700" />
              <div className="p-3 flex flex-col gap-2">
                <div className="h-4 bg-gray-600 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return <p className="text-red-400 text-sm">Something went wrong.</p>;

  return (
    <section>
      {/* Section title with accent */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game, index) => (
          <Link to={`/game/${game.id}`} key={game.id} className="block group">
            <motion.div
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700/40 hover:border-blue-500/50 shadow-md hover:shadow-blue-900/30 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={game.background_image || "/placeholder.png"}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* subtle gradient at bottom of image */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-800/80 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-semibold text-white text-sm leading-snug line-clamp-1">
                  {game.name}
                </p>
                {game.rating > 0 && (
                  <p className="text-xs text-gray-400 mt-1">⭐ {game.rating}</p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default GameSection;
