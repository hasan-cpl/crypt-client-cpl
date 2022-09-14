import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../../auth/auth";

const AdminRoute = () => {
    //let isLoggedIn = false;

    return (

        isAdmin() ? <Outlet /> : <Navigate to={"/user/dashboard"} />
    );


}

export default AdminRoute;