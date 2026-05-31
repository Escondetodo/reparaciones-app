import { useState } from "react";
import { useRepairSearch } from "../../hooks/useRepairSearch";
import StateLine from "../ui/stateLine";
import CardPrice from "../repairs/cardPrice";
import Input from "../ui/input";
import Text from "../ui/text";
import Button from "../ui/button";
import Alert from "../ui/Alert";
import Navbar from "../ui/navbar";
import Icon from "../ui/icon";
import Modal from "../ui/modal";
import LabelText from "../repairs/LabelText";

export default function RepairStatus() {
  const [showModal, setShowModal] = useState(false);
  const {
    ticketId,
    loading,
    repairById,
    error,
    formatDate,
    handleOnChangeRepair,
    handleLoadRepairById,
  } = useRepairSearch();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 sticky top-0 z-50">
        <div className="flex justify-between items-center px-8 py-6 w-full">
          <Text as="span" size="xl3" fontWeight="bold" color="text-teal-600">
            TechRepair
          </Text>
          <Navbar />
          <Button className="md:hidden" variant="primary" size="sm">
            Menu
          </Button>
        </div>
      </header>
      <main
        className={`flex-1 flex flex-col max-w-6xl mx-auto px-6 py-12 w-full ${repairById === null && !loading && "justify-center items-center"}`}
      >
        <section className=" mb-16">
          <div className="flex flex-col items-center mb-9">
            <Text
              as="h1"
              className="mb-3"
              size="xl3"
              fontWeight="bold"
              color="text-teal-600"
            >
              Consultar Estado de mi Reparación
            </Text>
            <Text as="p" size="lg" color="text-zinc-700">
              Ingresa el ID de seguimiento de tu orden para conocer los detalles
              del avance técnico y el presupuesto de tu equipo.
            </Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end max-w-2xl mx-auto">
            <div className="sm:w-full">
              <Input
                isIcon={true}
                label="ID de Reparación"
                placeholder="ID de Reparación (ej: ORD-2024)"
                type="text"
                value={ticketId}
                name="ticketId"
                onChange={handleOnChangeRepair}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleLoadRepairById}
              size="lg"
              disabled={!ticketId.trim()}
            >
              Consultar
            </Button>
          </div>
        </section>
        {error && (
          <Alert nameIcon="CircleAlert" description={error} variant="danger" />
        )}
        {loading && <p>Cargando...</p>}
        {repairById !== null && !loading && (
          <section>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <Text
                    as="span"
                    size="lg"
                    fontWeight="bold"
                    color="text-zinc-600"
                  >
                    Orden: {repairById?.id}
                  </Text>
                </div>
                {repairById?.estado && (
                  <div className="flex gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 uppercase">
                    <Text
                      as="span"
                      size="sm"
                      fontWeight="bold"
                      color="text-primary"
                    >
                      {repairById?.estado}
                    </Text>
                  </div>
                )}
              </div>
              <div className="p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                      <LabelText
                        className="flex-1"
                        title="Tipo de Producto"
                        value={repairById?.nombreProducto}
                      />
                      <LabelText
                        className="flex-1"
                        title="Marca y Modelo"
                        value={repairById?.marcaModelo}
                      />
                      <div className="flex justify-between">
                        <LabelText
                          className="flex-1"
                          title="Nombre y Apellido"
                          value={`${repairById?.nombreCliente ?? ""} ${repairById?.apellidoCliente ?? ""}`}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <LabelText
                          className="flex-1"
                          title="Fecha de ingreso"
                          value={formatDate(repairById?.fechaIngreso)}
                        />
                      </div>
                    </div>
                    <StateLine state={repairById?.estado} />
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800 ">
                        <LabelText
                          className="flex-1"
                          title="Problema reportado"
                          value={repairById?.problemaReportado}
                        />
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-800 ">
                        <LabelText
                          className="flex-1"
                          title="Observaciones Técnicas"
                          value={repairById?.observacionesTecnicas}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <CardPrice
                      titlePrecio={repairById?.precioPresupuestado ?? "0.00"}
                    />
                    <div className="space-y-4">
                      <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => setShowModal(true)}
                      >
                        <Icon size={22} name="MessageSquareText" />
                        Contactar Soporte
                      </Button>
                      <Alert
                        nameIcon="CircleAlert"
                        description=" Su equipo estará listo aproximadamente en 48 horas hábiles tras la finalización del proceso técnico."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="w-full py-10 mt-auto border-t border-slate-200">
        <div className="flex items-start space-y-6 px-8">
          <Text as="span" size="xl" fontWeight="semibold" color="text-zinc-900">
            © {new Date().getFullYear()} Technical Repair Administration. Todos
            los derechos reservados.
          </Text>
        </div>
      </footer>
      {showModal && (
        <Modal
          icon="MessageSquareText"
          title="Contactar Soporte"
          description="Envíanos un mensaje y te responderemos a la brevedad. Por ahora esta función está en desarrollo."
          onClose={() => setShowModal(false)}
          actions={
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </Button>
          }
        />
      )}
    </div>
  );
}
