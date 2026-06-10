import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      login(res.data.token);

      navigate("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          Task Manager
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Sign in to continue
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-3"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            className="text-blue-600"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}