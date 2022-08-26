import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../auth/auth";

const PrivateRoute = () => {
    //let isLoggedIn = false;

    return (
        isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
    );


}

export default PrivateRoute;