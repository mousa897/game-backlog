import GameSection from "../components/GameSection";

function Discover() {
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mx-40 py-10 flex flex-col gap-5">
        <h1 className="text-white text-3xl">Discover</h1>
        <GameSection title="Popular Games" endpoint="&ordering=-added" />
        <GameSection
          title="Highest Rated"
          endpoint="&ordering=-rating&dates=2000-01-01,2025-12-31"
        />
        <GameSection
          title="Highest Rated Games of 2025"
          endpoint="&dates=2025-01-01,2025-12-31&ordering=-rating"
        />
        <GameSection
          title="Recently Released"
          endpoint="&dates=2025-01-01,2025-12-31&ordering=-added"
        />
        <GameSection
          title="Upcoming Games"
          endpoint="&dates=2026-01-01,2026-03-01&ordering=-added"
        />
        <GameSection title="Indie Games" endpoint="&genres=indie" />
      </div>
    </div>
  );
}

export default Discover;
