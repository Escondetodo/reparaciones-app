import { Route, Navigate } from "react-router-dom";
import Dashbord from "../components/inicio/dashbord";
import RepairsList from "../components/product/repairsList";
import ProductIntaketNew from "../components/product/productIntaketNew";
import DetailRepair from "../components/product/detailRepair";
import EditRepairProduct from "../components/product/editRepairProduct";
import { RoutesNotFound } from "../components/RoutesNotFound";

export const PrivateRouter = () => {
  return (
    <RoutesNotFound>
      <Route path="/" element={<Navigate to="/admin" />} />
      <Route path="/admin" element={<Dashbord />}>
        <Route index element={<RepairsList />} />
        <Route path="reparacion/nueva" element={<ProductIntaketNew />} />
        <Route path="reparacion/:repairId" element={<DetailRepair />} />
        <Route
          path="reparacion/editar/:repairId"
          element={<EditRepairProduct />}
        />
      </Route>
    </RoutesNotFound>
  );
};
