import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin,  children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if(loading === false){
        if(!isAuthenticated){
            return <Navigate to="/login" replace />
        }
        if(isAdmin === true && user.role!== "Admin"){
            return <Navigate to="/login" replace />
        }
        return children
    }
}

export default ProtectedRoute;