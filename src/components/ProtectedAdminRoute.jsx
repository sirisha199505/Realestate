import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedAdminRoute({ children }) {
  const { adminUser } = useAuth();
  if (!adminUser) return <Navigate to="/admin/login" replace />;
  return children;
}
