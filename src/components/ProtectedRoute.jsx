import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function ProtectedRoute({ allowedRoles }) {
  const { session } = useAppContext();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.role.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
