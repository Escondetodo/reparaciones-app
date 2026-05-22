import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userRepairsState } from "../../store/repairs";
import { stateOptions } from "../../utils/constants";
import { formatDate, formatCurrency } from "../../utils/helpers";
import clsx from "clsx";
import Button from "../button";
import CardInfo from "../cardInfo";
import Icon from "../icon";
import CardList from "../cardList";
import Text from "../text";
import LabelText from "./LabelText";

export default function DetailRepair() {
  const repairById = userRepairsState((state) => state.repairById);
  const setSelectedRepair = userRepairsState(
    (state) => state.setSelectedRepair,
  );
  const loadRepairById = userRepairsState((state) => state.loadRepairById);
  const { repairId } = useParams();
  const navigate = useNavigate();

  console.log("repairById", repairById);

  useEffect(() => {
    if (repairId) {
      loadRepairById(repairId);
    }
  }, [repairId]);

  const handleEditRepair = () => {
    setSelectedRepair(repairById);
    navigate(`/private/admin/reparacion/editar/${repairById?.id}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <Text
          as="h2"
          size="lg"
          color="text-teal-600"
          align="left"
          fontWeight="bold"
        >
          Ticket de Reparación: {repairId}
        </Text>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* <!-- Left Column: Status & Budget --> */}
        <div className="md:col-span-4 space-y-6">
          {/* <!-- Status Plate --> bg-surface-container-low */}
          <section className=" bg-[#eff4ff] p-6 rounded-3xl border border-white/20">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Columns3Cog" className="text-primary" />
              <Text as="h3" size="md" color="text-zinc-900" fontWeight="bold">
                Estado Actual
              </Text>
            </div>
            <div className="space-y-4">
              {stateOptions.map((state) => (
                <div
                  className={clsx(
                    "flex items-center justify-between p-4 rounded-2xl ",
                    {
                      "bg-white border border-primary/20 opacity-50 grayscale":
                        state.value !== repairById?.estado,
                    },
                    {
                      "bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50":
                        state.value === repairById?.estado,
                    },
                  )}
                >
                  <Text
                    as="span"
                    size="sm"
                    className={clsx("text-[#121c2a]", {
                      "text-primary": state.value === repairById?.estado,
                    })}
                    fontWeight="bold"
                  >
                    {state.label}
                  </Text>
                  <Icon
                    name={
                      repairById?.estado === state.value
                        ? "CircleCheck"
                        : "Circle"
                    }
                    className="text-primary"
                  />
                </div>
              ))}
            </div>
          </section>
          {/* <!-- Budget Card --> */}
          <CardList className="bg-primary">
            <div className="flex flex-col items-start gap-2 w-full">
              <h3 className="text-[10px] text-white uppercase font-bold tracking-widest opacity-80">
                Presupuesto Estimado
              </h3>
              <span className="text-4xl text-white font-extrabold">
                {formatCurrency(repairById?.precioPresupuestado)}
              </span>
              <div className="w-full mt-3 border-t border-white/10 space-y-3">
                <div className="flex justify-between mt-3 text-sm">
                  <span className="text-white opacity-70">Repuestos</span>
                  <span className="text-white font-bold">$97.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white opacity-70">Mano de Obra</span>
                  <span className="text-white font-bold">$47.50</span>
                </div>
              </div>
            </div>
          </CardList>
        </div>
        {/* <!-- Right Column: Product & Client Information --> */}
        <div className="md:col-span-8 space-y-6">
          {/* <!-- Product Detail Section --> */}
          <section className="overflow-hidden">
            {/* Aca va el componente de detalle de producto*/}
            <CardInfo>
              <CardInfo.Header>
                <Icon
                  name="MonitorSmartphone"
                  size={24}
                  className="text-[#00685f]"
                />
                <Text
                  as="h3"
                  size="md"
                  className="text-primary"
                  fontWeight="bold"
                >
                  Detalle de Producto
                </Text>
              </CardInfo.Header>
              <CardInfo.Body>
                <div className="flex flex-col justify-between md:flex-row gap-4">
                  <LabelText
                    className="flex-1"
                    title="Tipo de Producto"
                    value={repairById?.nombreProducto}
                  />
                  <LabelText
                    className="flex-1"
                    title="Marca y Modelo"
                    value={repairById?.marcaModelo}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <LabelText
                    className="flex-1"
                    title="Fecha de ingreso"
                    value={formatDate(repairById?.fechaIngreso)}
                  />
                  <LabelText
                    className="flex-1"
                    title="Problema reportado"
                    value={repairById?.problemaReportado}
                  />
                </div>
              </CardInfo.Body>
            </CardInfo>
          </section>
          {/* Merged Client Information Section */}
          <section className="py-3 ">
            {/* Aca va el componente de detalle de cliente*/}
            <CardInfo>
              <CardInfo.Header>
                <Icon name="User" size={24} className="text-[#00685f]" />
                <Text as="h3" size="md" color="text-zinc-900" fontWeight="bold">
                  Datos del Cliente
                </Text>
              </CardInfo.Header>
              <CardInfo.Body>
                <div className="flex flex-col md:flex-row gap-4">
                  <LabelText
                    className="flex-1"
                    title="Nombre y Apellido"
                    value={`${repairById?.nombreCliente ?? ""} ${repairById?.apellidoCliente ?? ""}`}
                  />
                  <LabelText
                    className="flex-1"
                    title="Telefono del Cliente"
                    value={repairById?.telefonoCliente}
                  />
                </div>
                <LabelText
                  className="flex-1"
                  title="Email del Cliente"
                  value={repairById?.emailCliente}
                />
              </CardInfo.Body>
            </CardInfo>
          </section>
          <div className="flex flex-col sm:flex-row items-center justify-end">
            <Button
              className="sm:w-auto"
              fullWidth
              icon="Wrench"
              size="lg"
              disabled={repairById?.estado === "finalizado"}
              onClick={handleEditRepair}
            >
              Editar Información
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
