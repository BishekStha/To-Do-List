import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: true } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        toast.success("Task Deleted Successfully! ✅");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-slate-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Todo List
        </h2>

        <Create />

        <div className="mt-4">
          {todos.length === 0 ? (
            <div className="text-center text-white">
              <h2>No Records Found</h2>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 my-2 transition-all hover:scale-[1.02]"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => handleEdit(todo._id)}
                >
                  {todo.done ? (
                    <BsFillCheckCircleFill className="text-green-500 text-xl mr-3" />
                  ) : (
                    <BsCircleFill className="text-gray-400 text-xl mr-3" />
                  )}
                  <p
                    className={`text-lg font-medium ${
                      todo.done ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {todo.task}
                  </p>
                </div>
                <span
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition-all"
                >
                  <BsFillTrashFill />
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Home;
