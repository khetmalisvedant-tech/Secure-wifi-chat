import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      alert("Login Successful!");

      // Redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

