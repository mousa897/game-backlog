import { Link } from "react-router-dom";
import { useRawg } from "../hooks/useRawg";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function GameSection({ title, endpoint }) {
  const { data, loading, error } = useRawg(`games?page_size=4${endpoint}`);

  const games = data?.results || [];

  if (loading)
    return <p className="text-white p-6 sm:p-10 lg:px-40">Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id} className="block">
            <div className="bg-gray-800 rounded hover:scale-105 transition transform duration-300">
              <motion.img
                src={game.background_image}
                alt={game.name}
                className="h-48 sm:h-40 lg:h-44 w-full object-cover rounded-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <p className="p-2 font-semibold text-white">{game.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default GameSection;
