import { useParams } from "react-router-dom";
import { userRepairsState } from "../../store/repairs";
import { useEffect, useState } from "react";
import { stateOptions } from "../../utils/constants";
import clsx from "clsx";
import { type SubmitHandler, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditFormValues,
  editSchema,
} from "../../schemas/editRepair";
import Button from "../ui/button";
import CardList from "../ui/cardList";
import Text from "../ui/text";
import TextArea from "../ui/textArea";
import ModalSuccessError from "./modalSuccessError";
import Option from "../ui/option";
import CustomInput from "../ui/customInput";
import CardClient from "./cardClient";
import CardInfo from "../ui/cardInfo";
import Icon from "../ui/icon";

const EditRepairProduct = () => {
  const repairById = userRepairsState((state) => state.repairById);
  const loadRepairById = userRepairsState((state) => state.loadRepairById);
  const updateRepair = userRepairsState((state) => state.updateRepair);
  // consultar por el repair en el useState
  //const [repair, setRepair] = useState<Repair | null>(null);
  const [modalConfig, setModalConfig] = useState<{
    show: boolean;
    type: "success" | "error" | null;
  }>({ show: false, type: null });

  const { repairId } = useParams();



  useEffect(() => {
    if (repairId) {
      loadRepairById(repairId);
    }
  }, [repairId]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      nombreCliente: "",
      apellidoCliente: "",
      telefonoCliente: "",
      emailCliente: "",
      nombreProducto: "",
      marcaModelo: "",
      estado: "analisis",
      precioPresupuestado: "",
      problemaReportado: "",
    },
  });

  useEffect(() => {
    if (repairById) {
      reset(repairById);
    }
  }, [repairById, reset]);

  const onSubmit: SubmitHandler<EditFormValues> = async (data) => {
    if (repairId && repairById) {
      try {
        const repairToUpdate = {
          ...repairById,
          ...data,
        };
        await updateRepair(repairId, repairToUpdate);
        // Si llegó hasta acá sin errores, fue un éxito
        setModalConfig({ show: true, type: "success" });
      } catch (error) {
        // Hubo un error en la base de datos
        setModalConfig({ show: true, type: "error" });
      }
    }
  };

  return (
    <div>
      {repairById?.ticket_code && (
        <div className="mb-4 px-1">
          <Text as="span" size="sm" color="text-teal-600" fontWeight="bold">
            Ticket: {repairById.ticket_code}
          </Text>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx("text-on-surface antialiased pb-2", {
          "opacity-40 grayscale-[0.5] pointer-events-none": modalConfig.show,
        })}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            {/* <!-- Status Selection Section --> */}
            <section className="bg-white dark:bg-[#2a3636] p-6 rounded-xl border border-secondary-container dark:border-[#3a4a4a] shadow-sm transition-transform">
              <label className="block font-label text-[11px] font-bold uppercase tracking-wider text-primary mb-4">
                Estado de la Reparación
              </label>
              <div className="flex flex-col gap-3">
                <Controller
                  name="estado"
                  control={control}
                  render={({ field }) => (
                    <>
                      {stateOptions.map((status) => (
                        <Option
                          key={status.value}
                          label={status.label}
                          name="estado"
                          value={status.value}
                          checked={field.value === status.value}
                          isStatusBase={repairById?.estado === status.value}
                          onChange={field.onChange}
                        />
                      ))}
                    </>
                  )}
                />
              </div>
            </section>
            {/* <!-- Budget Section --> */}
            <CardList className="bg-white dark:bg-[#2a3636] p-6 rounded-xl border border-secondary-container dark:border-[#3a4a4a] shadow-sm">
              <div className="flex flex-col  gap-2 w-full">
                <Text
                  as="h3"
                  color="text-teal-600"
                  size="sm"
                  className="uppercase "
                  fontWeight="bold"
                >
                  Presupuesto Estimado
                </Text>
                <CustomInput
                  control={control}
                  name="precioPresupuestado"
                  type="number"
                  error={errors?.precioPresupuestado}
                />
                <Text
                  as="p"
                  size="xs"
                  className=" text-outline tracking-tighter"
                  fontWeight="normal"
                >
                  Sujeto a cambios según diagnóstico final
                </Text>
              </div>
            </CardList>
          </div>
          <div className="md:col-span-2 space-y-6">
            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,148,136,0.04)]">
              <CardClient control={control} errors={errors} />
            </section>
            <section className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,148,136,0.04)] mb-8">
              <CardInfo>
                <CardInfo.Header>
                  <Icon name="User" className="text-primary-dark" size={24} />
                  <Text
                    as="h3"
                    size="lg"
                    className="text-primary"
                    fontWeight="bold"
                  >
                    Detalles del Producto
                  </Text>
                </CardInfo.Header>
                <CardInfo.Body>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="flex gap-4">
                      <CustomInput
                        control={control}
                        name="nombreProducto"
                        label="Nombre de producto"
                        placeholder="Producto"
                        type="text"
                        error={errors?.nombreProducto}
                      />
                      <CustomInput
                        control={control}
                        name="marcaModelo"
                        label="Modelo"
                        placeholder="Modelo"
                        type="text"
                        error={errors?.marcaModelo}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Controller
                        control={control}
                        name="problemaReportado"
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            name="problemaReportado"
                            placeholder="Describa el problema según lo informado por el cliente..."
                            isIcon={true}
                            nameIcon="TriangleAlert"
                            title="Problema reportado"
                          />
                        )}
                      />
                    </div>
                  </div>
                </CardInfo.Body>
              </CardInfo>
            </section>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end">
          <Button
            className="sm:w-auto"
            type="submit"
            icon="Hourglass"
            fullWidth
          >
            Guardar Cambios
          </Button>
        </div>
      </form>
      {modalConfig.show && <ModalSuccessError typeModal={modalConfig.type} />}
    </div>
  );
};

export default EditRepairProduct;