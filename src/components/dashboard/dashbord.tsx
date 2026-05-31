import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../utils/constants";
import Sidebar from "../ui/sidebar";
import NavbarMobile from "../ui/navbarMobile";
import Header from "./header";

const Dashbord = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentHeaderData = routes.find((route) =>
    pathname.startsWith(route.path),
  ) || {
    title: "Panel de Administración",
    icon: "FolderCog",
    hasButtonClick: false,
    onClick: undefined,
  };


  return (
    <div className="flex bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen">
      <div className="flex w-full h-screen overflow-hidden">
        {/* <!-- Persistent Sidebar (Desktop) --> */}
        <Sidebar />
        {/* Main Content Wrapper */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <Header
            title={currentHeaderData.title}
            icon={currentHeaderData.icon}
            hasButtonClick={currentHeaderData.hasButtonClick}
            onClick={
              currentHeaderData.hasButtonClick ? () => navigate(-1) : undefined
            }
          />
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 pb-24 lg:pb-8">
            {/* Aca van las metricas */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              
            </div> */}
            {/* Aca van las tablas */}
            {/* <div className="bg-white dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <Outlet />
            </div> */}
            <Outlet />
          </div>
          {/* Mobile Bottom Nav */}
          <NavbarMobile />
        </main>
      </div>
    </div>
  );
};

export default Dashbord;