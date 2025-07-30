import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function PrivateRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
