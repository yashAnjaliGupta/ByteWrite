import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    if (!auth) return <Navigate to='/signin' />;

    const { isAuthenticated, loading } = auth;

    if (loading) return <div>Loading....</div>;
    return isAuthenticated ? children : <Navigate to='/signin' />;
}
export const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();

    if (!auth) return <Navigate to='/signin' />;

    const { isAuthenticated, loading } = auth;

    if (loading) return <div>Loading....</div>;
    return !isAuthenticated ? children : <Navigate to='/blogs' />;
}