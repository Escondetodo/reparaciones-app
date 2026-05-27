import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateGuard = () => {
  const { user } = useAuthStore();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateGuard;
