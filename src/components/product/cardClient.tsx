import CardInfo from "../cardInfo";
import Icon from "../icon";
import CustomInput from "../customInput";
import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { RepairFormValues } from "../../schemas/repair";

interface ClientFields {
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
  emailCliente: string;
}

interface CardClientProps<T extends FieldValues & ClientFields> {
  control: Control<T>;
  errors?: FieldErrors<T>;
}

export default function CardClient<T extends FieldValues & ClientFields>({
  control,
  errors,
}: CardClientProps<T>) {
  return (
    <CardInfo>
      <CardInfo.Header>
        <Icon name="User" className="text-primary-dark" size={24} />
        <p className="text-lg font-bold text-on-surface dark:text-white leading-none">
          Informacion del cliente
        </p>
      </CardInfo.Header>
      <CardInfo.Body>
        <div className="grid grid-cols-1 gap-5">
          <div className="flex gap-4">
            <CustomInput
              control={control}
              name={"nombreCliente" as Path<T>}
              label="Nombre"
              placeholder="Nombre"
              type="text"
              error={errors?.nombreCliente as any}
            />
            <CustomInput
              control={control}
              name={"apellidoCliente" as Path<T>}
              label="Apellido"
              placeholder="Apellido"
              type="text"
              error={errors?.apellidoCliente as any}
            />
          </div>
          <div className="flex flex-col gap-4">
            <CustomInput
              control={control}
              name={"telefonoCliente" as Path<T>}
              label="Telefono"
              placeholder="Numero de telefono"
              type="text"
              error={errors?.telefonoCliente as any}
            />
            <CustomInput
              control={control}
              name={"emailCliente" as Path<T>}
              label="Email"
              placeholder="Email"
              type="text"
              error={errors?.emailCliente as any}
            />
          </div>
        </div>
      </CardInfo.Body>
    </CardInfo>
  );
}
