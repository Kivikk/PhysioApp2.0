import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Loader } from 'lucide-react';
import AuthContext from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useContext(AuthContext);

  // loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-physio-mocha animate-spin" />
      </div>
    );
  }


  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }


  return children;
};

export default ProtectedRoute;

