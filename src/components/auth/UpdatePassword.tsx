import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type UpdatePasswordFormValues,
  updatePasswordSchema,
} from "../../schemas/auth";
import { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import CustomInput from "../ui/customInput";
import Button from "../ui/button";
import Alert from "../ui/Alert";
import AuthLayout from "./AuthLayout";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const updatePassword = useAuthStore((state) => state.updatePassword);
  const error = useAuthStore((state) => state.error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm: SubmitHandler<UpdatePasswordFormValues> = async (
    data,
  ) => {
    setIsSubmitting(true);
    try {
      await updatePassword(data.password);
      navigate("/login");
    } catch {
      // el error ya lo maneja el store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Cambiar contraseña"
      subtitle="Ingresá tu nueva contraseña para acceder al panel de control técnico."
    >
      <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="space-y-2">
          <CustomInput
            control={control}
            name="password"
            label="Nueva contraseña"
            placeholder="Nueva contraseña"
            type={showPassword ? "text" : "password"}
            error={errors.password}
            isIcon={true}
            iconPosition="right"
            nameIcon="Eye"
            onIconClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="space-y-2">
          <CustomInput
            control={control}
            name="confirmPassword"
            label="Confirmar contraseña"
            placeholder="Confirmar contraseña"
            type={showConfirmPassword ? "text" : "password"}
            error={errors.confirmPassword}
            isIcon={true}
            iconPosition="right"
            nameIcon="Eye"
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        <Button
          disabled={isSubmitting}
          size="lg"
          variant="primary"
          type="submit"
          fullWidth
        >
          {isSubmitting ? "Actualizando contraseña..." : "Actualizar contraseña"}
        </Button>
        {error && (
          <Alert className="mt-4" description={error} variant="danger" />
        )}
      </form>
    </AuthLayout>
  );
};

export default UpdatePassword;
