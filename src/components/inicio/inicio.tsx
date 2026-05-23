import CardTypeUser from "./cardTypeUser";
import { useNavigate } from "react-router-dom";
import Icon from "../icon";
import Navbar from "../navbar";
import Text from "../text";
import Button from "../button";
import Footer from "./footer";

const Inicio = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface dark:bg-background-dark/50 shadow-none">
        <div className="flex justify-between items-center px-8 py-6 w-full">
          <Text as="span" size="xl3" fontWeight="bold" color="text-primary">
            TechRepair
          </Text>
          <Navbar />
          <Button className="md:hidden" variant="primary" size="sm">
            Menu
          </Button>
        </div>
      </header>
      {/*  Main Content Canvas */}
      <main className="flex items-center justify-center px-6 pt-24 pb-12">
        <div className="max-w-5xl w-full">
          {/*  Main Content Canvas */}
          <div className="flex flex-col items-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-secondary-container rounded-full mb-2 mt-4">
              <div className="flex items-center justify-center w-14 h-14 bg-primary-dark rounded-lg shadow-md shadow-black/20">
                <Icon name="Wrench" className="text-white text-4xl" />
              </div>
            </div>
            <Text as="h1" size="xl3" fontWeight="bold" color="text-primary">
              Administración de Reparaciones
            </Text>
            <Text as="span" size="md" fontWeight="normal" color="text-on-surface">
              Bienvenido a TechRepair Administration. Selecciona tu tipo de
              acceso para continuar con la gestión técnica.
            </Text>
          </div>
          {/* Bento Grid Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Portal Cliente */}
            <CardTypeUser
              nameIcon="Search"
              ctaIcon="ArrowRight"
              title="CONSULTAR ESTADO"
              ctaText="Ingresar ahora"
              type="User"
              value="Accede como cliente para verificar el progreso en tiempo real de tu equipo en reparación y ver detalles técnicos."
              className="text-white text-4xl"
              onClick={() => navigate("/consulta")}
            />
            {/* Portal Administrativo */}
            <CardTypeUser
              nameIcon="LockKeyhole"
              ctaIcon="LogIn"
              ctaText="Panel de control"
              type="Admin"
              title="ACCESO ADMINISTRATIVO"
              value="Espacio exclusivo para personal técnico y administrativo. Gestiona órdenes, inventario y reportes de sistema."
              className="text-4xl"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </main>
      <Footer
        textLabel={
          "© " +
          new Date().getFullYear() +
          " Technical Repair Administration. Todos los derechos reservados."
        }
      />
    </div>
  );
};

export default Inicio;
