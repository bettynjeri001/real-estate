import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Wrap all routes with Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Add fallback route if needed */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
