import { Route, Navigate } from "react-router-dom";
import Dashbord from "../components/dashboard/dashbord";
import RepairsList from "../components/repairs/repairsList";
import ProductIntaketNew from "../components/repairs/productIntaketNew";
import DetailRepair from "../components/repairs/detailRepair";
import EditRepairProduct from "../components/repairs/editRepairProduct";
import { RoutesNotFound } from "../components/ui/RoutesNotFound";

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
