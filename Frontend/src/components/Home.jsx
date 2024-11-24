import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newtodo, setNewtodo] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}todo/fetch`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("this is response ", response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to Fetch Todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  const createTodo = async () => {
    if (!newtodo.trim()) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}todo/create`,
        {
          text: newtodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data.newToDo]);
      setNewtodo("");
    } catch (error) {
      setError("Failed to Create Todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    // console.log("this is is", todo);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("response", response.data.todos);
      setTodos(todos.map((t) => (t._id === id ? response.data.todos : t)));
    } catch (error) {
      setError("Failed to Find Todo Status");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

   // Redirect
   const navigateTo = useNavigate();

  const onLogout = async ()=>{
    try{
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/logout`, {
        withCredentials : true
      });
      navigateTo("/login");
      localStorage.removeItem("jwt");
      toast.success("logout successfully")
      
    } catch(error){
      toast.error("Error in logout")
    }
  }

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-8">
      <h1 className="text-4xl font-semibold text-center mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a New Todo"
          value={newtodo}
          onChange={(e) => setNewtodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && createTodo()}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={createTodo}
          className="bg-blue-600 hover:bg-blue-900 duration-300 border rounded-r-md px-4 py-2 text-white"
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-center justify-center">
          <span className="textgray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                  className="mr-2"
                />
                {/* {console.log("this is inside ", todo.text)} */}
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-800 duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingTodos} ToDos Remaining
      </p>
      <button
        onClick={() => onLogout()}
        className="mt-3 bg-red-500 text-white hover:bg-red-800 duration-500 rounded-md mx-auto px-4 py-2 block"
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
