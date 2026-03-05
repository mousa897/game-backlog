import GameSection from "../components/GameSection";

const today = new Date().toISOString().split("T")[0];

const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 6);
const future = futureDate.toISOString().split("T")[0];

const thisYear = new Date().getFullYear();

new Date(new Date().setMonth(new Date().getMonth() - 3))
  .toISOString()
  .split("T")[0];

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
          <GameSection
            title="Popular Games"
            endpoint="&ordering=-added&metacritic=80,100"
          />
          <GameSection title="Highest Rated" endpoint="&ordering=-metacritic" />
          <GameSection
            title={`Best Games of ${thisYear}`}
            endpoint={`&dates=${thisYear}-01-01,${thisYear}-12-31&ordering=-rating`}
          />
          <GameSection
            title="Recently Released"
            endpoint={`&dates=${new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split("T")[0]},${today}&ordering=-added`}
          />
          <GameSection title="Indie Games" endpoint="&genres=indie" />
          <GameSection
            title="Upcoming Games"
            endpoint={`&dates=${today},${future}&ordering=-added`}
          />
        </div>
      </div>
    </div>
  );
}

export default Discover;
