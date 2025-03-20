import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'instructor' | 'student';
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !userData) {
    return <Navigate to="/" replace />;
  }

  if (userData.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}