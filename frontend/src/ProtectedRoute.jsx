import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
}