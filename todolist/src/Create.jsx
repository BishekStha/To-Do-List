import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure CSS is imported
import { toast } from "react-toastify";

function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) {
      toast.error("Task cannot be empty! ❌");
      return;
    }

    axios
      .post("http://localhost:3001/add", { task })
      .then((res) => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center gap-2 mt-4">
  <input
    type="text"
    placeholder="Enter Task"
    onChange={(e) => setTask(e.target.value)}
    value={task}
    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
  />
  <button
    type="button"
    onClick={handleAdd}
    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-green-600"
  >
    Add
  </button>
</div>

  );
}

export default Create;
