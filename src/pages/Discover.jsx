import GameSection from "../components/GameSection";

function Discover() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="px-4 sm:px-8 lg:px-20 xl:px-40 py-10 flex flex-col gap-12">
        {/* Page header */}
        <div className="flex flex-col gap-2 border-b border-gray-700/60 pb-8">
          <h1 className="text-white text-4xl font-extrabold tracking-tight">
            Discover
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">
            Explore the latest and greatest games. Browse popular titles,
            top-rated games, and more.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          <GameSection title="Popular Games" endpoint="&ordering=-added" />
          <GameSection
            title="Highest Rated"
            endpoint="&ordering=-rating&dates=2000-01-01,2025-12-31"
          />
          <GameSection
            title="Highest Rated of 2025"
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
    </div>
  );
}

export default Discover;
