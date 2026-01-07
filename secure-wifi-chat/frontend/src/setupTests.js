// frontend/src/socket.js
import { io } from "socket.io-client";

const SERVER = "http://localhost:5000";
const token = localStorage.getItem("token");

// optional: pass token in query if you use it for auth, otherwise keep simple
export const socket = io(SERVER, {
  auth: { token },
  transports: ["websocket"],
});

export default socket;
