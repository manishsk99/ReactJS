import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
    const location = useLocation();
    return (
        localStorage.getItem("is_logged_In") ? <Component />
        : <Navigate to="/login" state={{ returnTo: location.pathname }} />
     );
}

export default ProtectedRoute;