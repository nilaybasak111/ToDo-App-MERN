import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import PageNotFound from "./components/PageNotFound.jsx"
import { Toaster } from 'react-hot-toast';

export default function App() {
  const token = localStorage.getItem("jwt")
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to = {"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
