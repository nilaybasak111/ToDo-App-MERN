import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  // Redirect
  const navigateTo = useNavigate()

  // This Function Call Backend Register Route
  const handleRegister = async (e) => {
    e.preventDefault(); // Validate the input before allowing the form to submit

    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/signup`,
        {
          username,
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
      toast.success(response.data.msg || "Register Successfully")
      //console.log("signup response ", response.data)
      localStorage.setItem("jwt", response.data.token)
      navigateTo("/login");
      SetUsername("");
      SetEmail("");
      SetPassword("");
      
    } catch (error) {
      // console.log("Error in handleRegister ", error.response);
      toast.error(error.response.data.errormessage || "User Registration Failed");
    }
  };

  return (
    <div>
      <div>
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-5">SignUp</h2>
            <form onSubmit={handleRegister}>
              {/* Username */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Username
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={username}
                  onChange={(e)=> SetUsername(e.target.value)}
                  placeholder="Type UserName"
                />
              </div>
              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  value={email}
                  onChange={(e)=> SetEmail(e.target.value)}
                  placeholder="Type Email"
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label className="block mb-2 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  value={password}
                  onChange={(e)=> SetPassword(e.target.value)}
                  placeholder="Type Password"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700 duration-300 p-3 rounded-xl mx-auto">
                SignUp
              </button>
              <p className="mt-4 text-center text-gray-600">
                Already Have an Account?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
