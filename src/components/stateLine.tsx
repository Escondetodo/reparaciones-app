import clsx from "clsx";
import Text from "./text";
import Icon from "./icon";

interface StateLineProps {
  state: string | undefined;
}

export default function StateLine({ state }: StateLineProps) {
  return (
    <div className=" flex flex-col items-start">
      <Text as="h1" size="xl" fontWeight="bold" color="text-teal-600">
        Estado del Servicio
      </Text>
      <div className="relative w-full mt-6">
        <div
          className={clsx(
            "absolute top-5 left-0 right-0 h-0.5 bg-[#e2e8f0] z-0",
            state === "proceso" && "w-1/2 bg-emerald-800",
            state === "finalizado" && "w-full bg-emerald-800",
          )}
        ></div>
        <div className="absolute top-5 left-0 h-0.5 bg-primary z-0 transition-[width] duration-300 ease-in-out "></div>
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center px-2 z-10 bg-white dark:bg-slate-900 ">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-4 ring-white dark:ring-slate-900 shadow-md">
              <Icon name="ScanText" className="text-lg text-white" />
            </div>
            <div className="mt-3 text-center">
              <Text size="xs" fontWeight="bold" color="text-teal-600">
                Análisis
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-center z-10  bg-white dark:bg-slate-900 px-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-4 ring-white dark:ring-slate-900 shadow-lg scale-110">
              <Icon name="Settings" className="text-lg text-white" />
            </div>
            <div className="mt-3 text-center">
              <Text size="xs" fontWeight="bold" color="text-teal-600">
                En Proceso
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-center z-10 bg-white dark:bg-slate-900 px-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold ring-4 ring-white dark:ring-slate-900 shadow-lg scale-110">
              <Icon name="CircleCheck" className="text-lg text-white" />
            </div>
            <div className="mt-3 text-center">
              <Text size="xs" fontWeight="bold" color="text-teal-600">
                Finalizado
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
