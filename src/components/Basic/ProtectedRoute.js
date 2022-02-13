import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({component: Component, ...rest}) {
    return ( 
        <Route {...rest} 
        render={(props) => {
            if (localStorageObj.getItem("is_logged_In")) return <Component {...props} />;
            if (!localStorageObj.getItem("is_logged_In")) return <Redirect to={{path:"/login", state:{from: props.location}}} />;
        }}
        />
     );
}

export default ProtectedRoute;