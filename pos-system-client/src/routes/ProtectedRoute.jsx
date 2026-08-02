import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  console.log("TOKEN =", token);

  if (!token) {
    console.log("Redirecting to Login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;