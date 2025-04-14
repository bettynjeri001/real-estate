import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiAlertCircle } from 'react-icons/fi';

import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Check your inbox for reset instructions.');
    } catch (err) {
      let errorMessage = 'Failed to reset password. Please try again.';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address';
      }
      setError(errorMessage);
    }
    setLoading(false);
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
              className="w-12 h-12 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M16 12a4 4 0 01-8 0" 
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-500">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
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

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg"
            >
              <span className="text-sm">{message}</span>
            </motion.div>
          )}

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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Back to Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}
