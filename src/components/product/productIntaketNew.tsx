import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { type SubmitHandler, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type RepairFormValues,
  repairSchema,
} from "../customForm/models/repair.model";
import { userRepairsState } from "../../store/repairs";
import CardClient from "./cardClient";
import TextArea from "../textArea";
import CardProduct from "./cardProduct";
import CardInfo from "../cardInfo";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";

export default function ProductIntaketNew() {
  const loading = userRepairsState((state) => state.loading);
  const addRepair = userRepairsState((state) => state.addRepair);
  const loadRepairs = userRepairsState((state) => state.loadRepairs);

  const [showToast, setShowToast] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RepairFormValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      nombreCliente: "",
      apellidoCliente: "",
      telefonoCliente: "",
      emailCliente: "",
      nombreProducto: "",
      marcaModelo: "",
      estado: "analisis",
      precioPresupuestado: "",
      observacionesTecnicas: "",
      problemaReportado: "",
    },
  });

  const onSubmit: SubmitHandler<RepairFormValues> = (data) => {
    console.log("date", data);
    addRepair({
      ...data,
      fechaIngreso: new Date().toISOString(),
    });
    reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10000);
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    loadRepairs();
  }, []);

  return (
    <>
      {/* <!-- Page Heading --> */}
      <div className="mb-8">
        <Text
          as="h2"
          size="lg"
          color="text-teal-600"
          align="left"
          fontWeight="bold"
        >
          Nueva reparación
        </Text>
        <Text
          as="p"
          size="sm"
          color="text-zinc-500"
          align="left"
          fontWeight="normal"
        >
          Registra un nuevo problema técnico y el dispositivo del cliente.
        </Text>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* <!-- Section 1: Client Information --> */}
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <CardClient control={control} errors={errors} />
          </div>
          {/* <!-- Section 2: Product & Status --> */}
          <div className="md:col-span-12 lg:col-span-7 space-y-6">
            <CardProduct control={control} errors={errors} />
            {/* <!-- Problem & Observations --> */}
          </div>
          <div className="md:col-span-12 space-y-6">
            <CardInfo>
              <div className="space-y-6">
                <Controller
                  control={control}
                  name="problemaReportado"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Describa el problema según lo informado por el cliente..."
                      isIcon={true}
                      nameIcon="TriangleAlert"
                      title="Problema reportado"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="observacionesTecnicas"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Daños físicos visibles, tornillos faltantes, intentos de reparación previos..."
                      isIcon={true}
                      nameIcon="Eye"
                      title="Observaciones Técnicas"
                    />
                  )}
                />
              </div>
            </CardInfo>
          </div>
        </div>

        {/* <!-- Form Actions --> */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 py-6 border-t border-secondary-container dark:border-[#3a4a4a] mt-8">
          <Button
            className="sm:w-auto"
            variant="primary"
            size="md"
            type="submit"
            fullWidth
          >
            Crear Orden
          </Button>
        </div>
      </form>
      <div
        className={clsx(
          "fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto",
          "bg-zinc-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl transition-all duration-300",
          showToast
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <Icon name="CircleCheck" className="text-emerald-400" />
        <Text size="sm" fontWeight="semibold" color="text-white">
          La reparación se ha creado correctamente
        </Text>
      </div>
    </>
  );
}
