

import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks.ts";

 const ProtectedRoutes = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
 }

 export default ProtectedRoutes