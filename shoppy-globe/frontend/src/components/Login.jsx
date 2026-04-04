import { useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Added Navigate
import api from "../api/axios";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  
  // State to track if login was successful to trigger redirection
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // If login is successful, this component will "redirect" the user to home
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send login request to backend
      const res = await api.post("/auth/login", data);
      
      // 2. Save the token to LocalStorage (Crucial for your Cart error!)
      // Ensure your backend sends 'token' in the response body
      localStorage.setItem("token", res.data.token);

      alert("Login Successful 🚀");
      
      // 3. Trigger the redirect via state
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login Error:", err.response?.data);
      alert(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
              value={data.password}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition duration-300 font-bold ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}