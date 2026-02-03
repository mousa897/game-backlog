import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Backlog from "./pages/Backlog.jsx";
import Discover from "./pages/Discover.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Backlog />} />
        <Route path="/Discover" element={<Discover />} />
      </Routes>
    </>
  );
}

export default App;
