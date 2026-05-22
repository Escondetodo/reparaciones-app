import { Outlet, Navigate } from "react-router-dom";

const isLogged = true;

const PrivateGuard = () => {
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateGuard;
