import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const ProtectedRoute = ({ children }) => {

    const {
        isLoggedIn,
        isAuthLoading
    } = useContext(AppContext);

    if (isAuthLoading) {
        return <div>Yükleniyor...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;