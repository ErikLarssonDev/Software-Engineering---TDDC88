import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (allowedRoles?.includes(auth?.role)
        ? <Outlet />
        : auth?.username
           ? <Navigate to = "/unauthorized" replace />
           : <Navigate to ="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;