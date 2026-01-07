import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import OperatorDashboard from "./pages/OperatorDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* User Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Operator Dashboard (Protected) */}
        <Route
          path="/operator"
          element={
            <ProtectedRoute>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
