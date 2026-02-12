import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setUser(res.data); 
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        placeholder="Email"
        className="mb-2 p-2 border rounded w-64"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        className="mb-2 p-2 border rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 p-2 text-white rounded w-64 mb-2"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="bg-blue-500 p-2 text-white rounded w-64"
      >
        Register
      </button>
    </div>
  );
}
