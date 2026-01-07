import React, { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(res.data.message || "Login successful!");
      localStorage.setItem("token", res.data.token); // Save auth token for later use
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid credentials!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
