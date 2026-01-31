import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Backlog from "./pages/Backlog.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Backlog />} />
      </Routes>
    </>
  );
}

export default App;
