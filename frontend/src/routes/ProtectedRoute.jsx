import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../more/Loader";

const ProtectedRoute = ({ isAdmin, children}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  if(isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  else if(isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  else{
    return children;
  }

};

export default ProtectedRoute;
