import { useRef } from "react";
import DisplayContent from "../components/DisplayContent";
import GameForm from "../components/GameForm";
import GameOfTheDay from "../components/GameOfTheDay";
import BacklogStats from "../components/BacklogStats";

function Backlog() {
  const autoScrollRef = useRef(null);

  return (
    <main className="min-h-screen bg-gray-900 px-4 sm:px-8 lg:px-20 xl:px-40 py-10 flex flex-col items-center">
      {/* Page heading */}
      <div className="w-full border-b border-gray-700/60 pb-8 mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          My Backlog
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track, manage, and review your game collection.
        </p>
      </div>

      <GameOfTheDay />

      <div className="w-full mt-10">
        <BacklogStats />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 w-full mt-10">
        <GameForm autoScrollRef={autoScrollRef} />
        <DisplayContent autoScrollRef={autoScrollRef} />
      </div>
    </main>
  );
}

export default Backlog;
