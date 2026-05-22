import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, loginSchema } from "./models/form.model";
import CustomInput from "../customInput/customInput";
import { useState } from "react";
import Button from "../button";

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login exitoso", data);
    } catch {
      console.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <CustomInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          type="text"
          error={errors.email}
        />
      </div>
      <div className="space-y-2">
        <CustomInput
          control={control}
          name="password"
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          error={errors.password}
          isIcon={true}
          iconPosition="right"
          nameIcon="Eye"
          onIconClick={handleTogglePassword}
        />
        <a
          className="text-primary font-label text-sm font-semibold hover:underline decoration-2 underline-offset-4"
          href="#"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <div className="flex items-center space-x-3 px-1">
        <div className="relative flex items-center h-5">
          <input
            className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer"
            id="remember"
            name="remember"
            type="checkbox"
          />
        </div>
        <label className="font-body text-sm text-on-surface-variant cursor-pointer select-none">
          Recordarme
        </label>
      </div>
      <Button
        disabled={isLoading}
        size="lg"
        variant="primary"
        type="submit"
        fullWidth
      >
        {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
