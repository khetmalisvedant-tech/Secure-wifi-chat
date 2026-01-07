import React, { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [view, setView] = useState("register");

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setView("register")}>Register</button>
        <button onClick={() => setView("login")}>Login</button>
      </div>

      {view === "register" ? <Register /> : <Login />}
    </div>
  );
}

export default App;
