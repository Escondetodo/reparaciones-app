import CardInfo from "../cardInfo";
import CustomInput from "../customInput/customInput";
import { type Control, type FieldErrors, Controller } from "react-hook-form";
import type { RepairFormValues } from "../customForm/models/repair.model";
import Icon from "../icon";

interface CardProductProps {
  control: Control<RepairFormValues>;
  errors?: FieldErrors<RepairFormValues>;
}

export default function CardProduct({ control, errors }: CardProductProps) {
  return (
    <CardInfo>
      <CardInfo.Header>
        <Icon name="MonitorSmartphone" size={24} className="text-primary-dark" />
        <p className="text-lg font-bold text-on-surface dark:text-white leading-none">
          Informacion del producto
        </p>
      </CardInfo.Header>
      <CardInfo.Body>
        <div className="grid grid-cols-1 gap-5 ">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <CustomInput
              control={control}
              name="precioPresupuestado"
              label="Precio estimado"
              placeholder="0.00"
              type="text"
              error={errors?.precioPresupuestado}
            />
            <label className="w-full">
              <p className="text-xs text-left font-bold uppercase tracking-wider text-secondary mb-2">
                Estado
              </p>
              <div className="relative">
                <Controller
                  control={control}
                  name="estado"
                  render={({ field }) => (
                    <select
                      {...field}
                      name="estado"
                      className="w-full rounded-lg border-outline-variant dark:border-[#3a4a4a] bg-slate-100 dark:bg-slate-800 h-14 px-4 focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="analysis">Analisis</option>
                      <option value="process">En Proceso</option>
                      <option value="finished">Terminado</option>
                    </select>
                  )}
                />
                <Icon
                  name="ChevronDown"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary"
                />
              </div>
            </label>
          </div>
        </div>
      </CardInfo.Body>
    </CardInfo>
  );
}
