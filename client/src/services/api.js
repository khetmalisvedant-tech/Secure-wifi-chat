import axios from "axios";

// connect frontend (port 3000) to backend (port 5000)
const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);
