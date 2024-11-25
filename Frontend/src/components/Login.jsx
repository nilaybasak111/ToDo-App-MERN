import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  // Redirect
  const navigateTo = useNavigate();

  // This Function Call Backend Login Route
  const handleLogin = async (e) => {
    e.preventDefault(); // Validate the input before allowing the form to submit

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("Login response ", response.data)
      const token = response.data?.user?.token || response.data?.token;
      
      if (token) {
        localStorage.setItem("jwt", token);
        navigateTo("/");
        window.location.href = "/";
        toast.success(response.data.msg || "Logged in Successfully");
        SetEmail("");
        SetPassword("");
      } else {
        throw new Error("Token not received");
      }
      // localStorage.setItem("jwt", response.data.user.token)
      // navigateTo("/");
      // toast.success(response.data.msg || "Loggedin Successfully");
      // SetEmail("");
      // SetPassword("");
      
    } catch (error) {
      console.log("Error in handleLogin ", error.response);
      toast.error(
        error.response.data.msg || "User Login Failed"
      );
    }
  };

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-5">Login</h2>
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  placeholder="Type Email"
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  placeholder="Type Password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-700 duration-300 p-3 rounded-xl mx-auto"
              >
                Login
              </button>
              <p className="mt-4 text-center text-gray-600">
                New User?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                  to="/signup"
                >
                  SignUp
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
