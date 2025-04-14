import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, currentUser, loading: authLoading } = useAuth();
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
      await login(email, password);
    } catch (err) {
      let errorMessage = "Login failed. Please check your credentials.";
      if (err.code === "auth/invalid-login-credentials") {
        errorMessage = "Invalid email or password";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Try again later.";
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to continue to your account</p>
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
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-red-800"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </a>
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8">
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
