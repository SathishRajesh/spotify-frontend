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
      alert(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h2 className="authTitle">Create Account</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primaryBtn" onClick={handleRegister}>
          Register
        </button>

        <button
          className="secondaryBtn"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
