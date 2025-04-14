import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiAlertCircle } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(
        currentUser.role === "admin" ? "/" : "/"
      );
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password, name, role);
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address";
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4M18 10l-4 4-4-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg"
            >
              <FiAlertCircle className="flex-shrink-0 mr-2" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                UserName
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="John Doe"
                  required
                  minLength="2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all flex items-center justify-center"
          >
            {authLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-0">
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm font-medium text-red-600 hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Sign in to your account
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
