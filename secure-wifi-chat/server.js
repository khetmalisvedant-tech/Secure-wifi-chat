// server.js
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
require("dotenv").config();

// Middleware to parse JSON
app.use(express.json());

// MOUNT AUTH ROUTES (VERY IMPORTANT)
app.use("/api/auth", require("./routes/authRoutes"));

// ---------- SOCKET.IO SETUP ----------
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

// allow controllers to access io
app.set("io", io);

// Track online users
let online = [];

// SOCKET EVENT HANDLERS
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const uid = socket.id;

  // Add user to online list
  online.push({
    id: uid,
    name: socket.handshake?.auth?.name || uid,
    email: socket.handshake?.auth?.email || "",
  });

  // Notify all clients
  io.emit("user:online", online);

  // User joins general room
  socket.on("joinGeneral", () => {
    socket.join("general");
    console.log("User joined general room");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Remove from online list
    online = online.filter((u) => u.id !== uid);

    io.emit("user:offline", online);
  });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port", PORT));
