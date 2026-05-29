import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../customInput";
import { type FormValues, registerSchema } from "../../schemas/auth";
import { useAuthStore } from "../../store/auth";
import Button from "../button";
import Alert from "../Alert";

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

  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);
  const register = useAuthStore((state) => state.register);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await register(data.email, data.password, data.nombre);
    } catch {
      // el error ya se manejó en el store
    }
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
          disabled={loading}
          size="lg"
          variant="primary"
          type="submit"
          fullWidth
        >
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </div>
      {error && <Alert className="mt-4" description={error} variant="danger" />}
    </form>
  );
};

export default RegisterForm;