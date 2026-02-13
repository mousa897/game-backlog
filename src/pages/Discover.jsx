import GameSection from "../components/GameSection";

function Discover() {
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl">Discover</h1>
      <GameSection title="🔥 Popular Games" endpoint="?ordering=-added" />\
    </div>
  );
}

export default Discover;
