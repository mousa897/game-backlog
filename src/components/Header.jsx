import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 shadow-md flex justify-between items-center py-6 px-40">
      <div className="flex gap-2 items-center">
        <h1 className="text-3xl">🎮</h1>
        <h1 className="text-3xl font-bold text-white">Gamers’ Hub</h1>
      </div>
      <nav className="flex gap-4 text-gray-300">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/discover">Discover</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}

export default Header;
