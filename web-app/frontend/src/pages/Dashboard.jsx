import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchTasks = async () => {
    const res = await API.get("/tasks");

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    await API.post("/tasks", form);

    setForm({
      title: "",
      description: "",
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <form
            onSubmit={createTask}
            className="space-y-4"
          >
            <input
              placeholder="Task Title"
              value={form.title}
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={form.description}
              className="w-full border p-3 rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />

            <button
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              Create Task
            </button>
          </form>
        </div>

        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}