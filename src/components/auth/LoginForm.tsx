import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, loginSchema } from "../../schemas/auth";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import CustomInput from "../ui/customInput";
import Button from "../ui/button";
import Alert from "../ui/Alert";

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

  const error = useAuthStore((state) => state.error);
  //const loading = useAuthStore((state) => state.loading);
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    useAuthStore.setState({ error: null });
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);

    try {
      await login(data.email, data.password);
      navigate("/private/admin");
    } catch {
      // el error ya lo maneja el store
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
        size="lg"
        variant="primary"
        type="submit"
        fullWidth
      >
        {isSubmitting ? "Iniciando Sesión..." : "Iniciar Sesión"}
      </Button>
      {error && <Alert className="mt-4" description={error} variant="danger" />}
    </form>
  );
};

export default LoginForm;