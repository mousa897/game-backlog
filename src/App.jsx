import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Backlog from "./pages/Backlog.jsx";
import GameDetails from "./pages/GameDetails.jsx";
import Discover from "./pages/Discover.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Backlog />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </>
  );
}

export default App;
