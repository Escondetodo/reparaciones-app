import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../../schemas/auth";
import { useState } from "react";
import { useAuthStore } from "../../store/auth";
import CustomInput from "../ui/customInput";
import Button from "../ui/button";
import Alert from "../ui/Alert";

const RecoverForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const error = useAuthStore((state) => state.error);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onForgotSubmit: SubmitHandler<ForgotPasswordFormValues> = async (
    data,
  ) => {
    setIsSubmitting(true);
    setShowSuccessMessage(false);
    try {
      await forgotPassword(data.email);
      setShowSuccessMessage(true);
    } catch {
      // el error ya lo maneja el store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onForgotSubmit)}>
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
      <Button size="lg" variant="primary" type="submit" fullWidth>
        {isSubmitting ? "Recuperando..." : "Recuperar contraseña"}
      </Button>
      {showSuccessMessage && (
        <Alert
          className="mt-4"
          description="Te enviamos un link para restablecer tu contraseña."
          variant="success"
        />
      )}
      {error && <Alert className="mt-4" description={error} variant="danger" />}
    </form>
  );
};

export default RecoverForm;
