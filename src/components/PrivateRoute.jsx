import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}