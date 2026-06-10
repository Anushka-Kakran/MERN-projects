import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">
        Task Manager
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </nav>
  );
}