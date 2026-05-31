import { useNavigate } from "react-router-dom";
import Modal from "../ui/modal";
import Button from "../ui/button";

interface ModalSuccessErrorProps {
  typeModal: "success" | "error" | null;
}

const ModalSuccessError = ({ typeModal }: ModalSuccessErrorProps) => {
  const navigate = useNavigate();
  return (
    <>
      {typeModal === "success" && (
        <Modal
          icon="CircleCheck"
          title="Reparación actualizada"
          description="La reparación se ha actualizado correctamente"
          actions={
            <Button
              variant="primary"
              onClick={() => navigate("/private/admin")}
            >
              Aceptar
            </Button>
          }
          onClose={() => navigate("/private/admin")}
        />
      )}
      {typeModal === "error" && (
        <Modal
          icon="CircleX"
          title="Error al actualizar la reparación"
          description="La reparación no se ha podido actualizar"
          actions={
            <>
              <Button
                variant="ghost"
                icon="ArrowLeft"
                onClick={() => navigate("/private/admin")}
              >
                Reintentar
              </Button>
              <Button
                variant="ghost"
                icon="ArrowLeft"
                onClick={() => navigate("/private/admin")}
              >
                Ir a la lista
              </Button>
            </>
          }
          onClose={() => navigate("/private/admin")}
        />
      )}
    </>
  );
};
export default ModalSuccessError;
