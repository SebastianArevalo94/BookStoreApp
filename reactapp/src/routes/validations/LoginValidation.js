import { Navigate } from "react-router-dom";

const AuthValidation = ({ children }) => {
    const hasToken = localStorage.getItem("token") ? true : false;
    return hasToken ? children : <Navigate to="/login" />
};

export default AuthValidation