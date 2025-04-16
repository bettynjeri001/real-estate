import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure to import useAuth

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth(); // Destructure both values

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}