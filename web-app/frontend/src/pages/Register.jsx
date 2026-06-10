import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      navigate("/");
    }  catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Registration Failed"
  );
}
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >
          <input
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
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
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-lg">
            Register
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}