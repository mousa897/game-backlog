import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <header className="relative bg-gray-900 border-b border-gray-700/50 shadow-lg">
      {/* subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500 to-transparent" />

      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-8 lg:px-20 xl:px-40 gap-4">
        {/* Logo */}
        <div className="flex gap-3 items-center group">
          <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">
            🎮
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Gamers' Hub
          </h1>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Nav */}
        <nav className="flex gap-1 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/60"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/discover"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/60"
              }`
            }
          >
            Discover
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
