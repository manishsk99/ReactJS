import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {

    return (
        localStorage.getItem("is_logged_In") ? <Component {...rest} />
        : <Navigate to="/login" state={{ redirectTo: rest.path }} />
     );
}

export default ProtectedRoute;