import React from "react";
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn")
    console.log("ProtectRoute", isLoggedIn)
    return isLoggedIn === 'true' ? children : <Navigate to="/signin" />
};

export default ProtectedRoute;