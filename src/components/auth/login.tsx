import { useState } from "react";
import Button from "../ui/button";
import Text from "../ui/text";
import LoginForm from "./LoginForm";
import RecoverForm from "./RecoverForm";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [formMode, setFormMode] = useState<"login" | "forgot">("login");

  const handleForgotPassword = () => {
    setFormMode("forgot");
  };

  const handleBackToLogin = () => {
    setFormMode("login");
  };

  return (
    <AuthLayout
      title={
        formMode === "login"
          ? "¡Bienvenido de nuevo, técnico!"
          : "¿Olvidaste tu contraseña?"
      }
      subtitle={
        formMode === "login"
          ? "Accede al panel de control técnico"
          : "No te preocupes... Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña."
      }
      backButton={
        formMode === "forgot" ? (
          <Button
            className="pl-0"
            variant="ghost"
            icon="ArrowLeft"
            onClick={handleBackToLogin}
          >
            Volver al login
          </Button>
        ) : undefined
      }
    >
      {formMode === "login" ? (
        <LoginForm onSwitchToRecover={handleForgotPassword} />
      ) : (
        <RecoverForm />
      )}
      {formMode === "login" && (
        <div className="mt-8 pt-8 border-t border-outline-variant/30 text-center">
          <Text
            as="span"
            size="lg"
            fontWeight="semibold"
            color="text-zinc-700"
            align="center"
          >
            ¿Eres cliente?
          </Text>
          <Button icon="Search" size="md" variant="tertiary" fullWidth>
            Verifica el estado de tu reparación
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
