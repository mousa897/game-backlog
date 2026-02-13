import DisplayContent from "../components/DisplayContent";
import GameForm from "../components/GameForm";
import GameOfTheDay from "../components/GameOfTheDay";

function Backlog() {
  return (
    <main className=" min-h-screen overflow-hidden px-40 bg-gray-900 flex flex-col justify-center items-center py-10">
      <GameOfTheDay />
      <div className="flex justify-center items-start gap-10 w-full">
        <GameForm />
        <DisplayContent />
      </div>
    </main>
  );
}

export default Backlog;
