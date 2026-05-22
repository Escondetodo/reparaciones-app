import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../customInput/customInput";
import { type FormValues, registerSchema } from "./models/form.model";
import Button from "../button";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registro exitoso", data);
    } catch {
      console.error("Error al registrar");
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <CustomInput
          control={control}
          name="nombre"
          label="Nombre"
          placeholder="Nombre"
          type="text"
          error={errors.nombre}
        />
        <CustomInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          type="text"
          error={errors.email}
        />
        <CustomInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          error={errors.password}
          isIcon={true}
          iconPosition="right"
          nameIcon="Eye"
        />
        <CustomInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirmar Password"
          type="password"
          error={errors.confirmPassword}
          isIcon={true}
          iconPosition="right"
          nameIcon="Eye"
        />
      </div>
      <div className="mt-4">
        <Button
          disabled={isLoading}
          size="lg"
          variant="primary"
          type="submit"
          fullWidth
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
