import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", { username, email, password });
      alert("Registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Register</h2>
      <input placeholder="Username" className="mb-2 p-2 border rounded" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <input placeholder="Email" className="mb-2 p-2 border rounded" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="mb-2 p-2 border rounded" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-green-500 p-2 text-white rounded">Register</button>
    </div>
  );
}
