import { useState } from "react";
import axios from "axios";
import API from "../api";

export default function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/auth/register`, data);
      alert("Signup Successful 🎉");
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}