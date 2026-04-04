import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/searchSlice";
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Check login (token exists or not)
  const token = localStorage.getItem("token");

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 flex items-center gap-2"
        >
          🛒 <span>ShoppyGlobe</span>
        </Link>

        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center w-1/2 bg-gray-100 rounded-full px-3 py-1">
          <FiSearch className="text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none w-full"
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {/* ✅ AUTH BUTTONS */}
          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* USER ICON */}
              <div className="flex items-center gap-2 text-gray-700">
                <Link
                  to="/account"
                  className="flex items-center gap-1 hover:text-purple-600 transition"
                >
                  <FiUser /> 
                  <span>Account</span>
                </Link>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          )}

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FiShoppingCart size={22} />

            <span className="hidden sm:block">Cart</span>

            {/* Badge */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border rounded-full px-3 py-1"
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>
    </header>
  );
}
