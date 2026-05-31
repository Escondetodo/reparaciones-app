import { Route, BrowserRouter } from "react-router-dom";
import Inicio from "./components/landing/inicio";
import Login from "./components/auth/login";
import RegisterlUser from "./components/auth/RegisterlUser";
import PrivateGuard from "./guard/PrivateGuard";
import { PrivateRouter } from "./private/PrivateRouter";
import { RoutesNotFound } from "./components/ui/RoutesNotFound";
import RepairStatus from "./components/client/RepairStatus";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesNotFound>
        {/* aca van las rutas publicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/consulta" element={<RepairStatus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<RegisterlUser />} />
        {/* aca van las rutas privadas */}
        <Route element={<PrivateGuard />}>
          <Route path="private/*" element={<PrivateRouter />} />
        </Route>
      </RoutesNotFound>
    </BrowserRouter>
  );
};
