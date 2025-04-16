import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Layout Components
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      
      <Routes>
        {/* Main layout wrapper for all routes */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Protected User Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="user/dashboard" element={<UserDashboard />} />
          </Route>
        

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;