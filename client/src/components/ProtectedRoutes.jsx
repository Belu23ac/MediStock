import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userid = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  if (!userid || !username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;