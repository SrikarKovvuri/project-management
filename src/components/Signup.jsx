import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../App";
import "./Auth.css"; // ✅ Import CSS for styling
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        password,
      });

      if (response.status === 201) {
        login(response.data.token);
        alert("Successful Sig up");
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign up</h2>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign up</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
