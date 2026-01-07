import React, { useState } from "react";
import { registerUser } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data.message || "Registration successful!");
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
