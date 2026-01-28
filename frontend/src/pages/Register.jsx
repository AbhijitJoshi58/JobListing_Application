import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("JOBSEEKER");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/register", { username, password, role });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* LEFT */}
        <div className="register-left">
          <h1 className="brand">
            Hire<span>Network</span>
          </h1>
          <p className="tagline">Build your professional future</p>

          <h2>Create account</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="JOBSEEKER">Job Seeker</option>
            <option value="COMPANY">Company</option>
          </select>

          <button onClick={handleRegister}>Register</button>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="register-right">
          <img src="/login image.png" alt="HireNetwork team" />
        </div>

      </div>
    </div>
  );
}
