import { Outlet, Navigate } from "react-router-dom";    
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";

const PrivateRoutes = () => {
    const { isAuthenticated } = useContext(LoginContext);

    let auth = {"token": isAuthenticated}
    return (
        auth.token ? <Outlet /> : <Navigate to="/login-register" />
    )

}


export default PrivateRoutes