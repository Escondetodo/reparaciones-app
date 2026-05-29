import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateGuard = () => {
  const { user, loading } = useAuthStore();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  } else {
    return user ? <Outlet /> : <Navigate to="/" />;
  }
};

export default PrivateGuard;
