import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 p-5 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">🎮 Gamers’ Hub</h1>

        <nav className="flex gap-4 text-gray-300">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
