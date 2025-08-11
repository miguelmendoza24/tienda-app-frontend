import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";


function RequireAuth({ children, role}) {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" replace/>
  }
  return children;
}



export default RequireAuth;
