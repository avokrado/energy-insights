import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex items-center sticky top-0 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-xl font-semibold ${
            isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`
        }
      >
        Energy Insights
      </NavLink>

      <div className="ml-8">
        <NavLink
          to="/devices"
          className={({ isActive }) =>
            `text-sm ${
              isActive
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Devices
        </NavLink>
      </div>
    </nav>
  );
}
