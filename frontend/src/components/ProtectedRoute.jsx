import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children, requiredAdmin = false }) {
  const { isLoggedIn, isAdmin } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (requiredAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;