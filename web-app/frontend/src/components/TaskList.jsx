export default function TaskList({
  tasks,
  onDelete,
}) {
  return (
    <div className="grid gap-4 mt-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-xl shadow p-5"
        >
          <h2 className="font-bold text-lg">
            {task.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {task.description}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

            <button
              onClick={() =>
                onDelete(task._id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}