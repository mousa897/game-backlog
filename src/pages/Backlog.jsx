import DisplayContent from "../components/DisplayContent";
import GameForm from "../components/GameForm";
import GameOfTheDay from "../components/GameOfTheDay";

function Backlog() {
  return (
    <main className=" min-h-screen bg-gray-900 px-4 sm:px-8 lg:px-20 xl:px-40 py-10 flex flex-col items-center">
      <GameOfTheDay />
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10 w-full mt-10">
        <GameForm />
        <DisplayContent />
      </div>
    </main>
  );
}

export default Backlog;
