import type { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [horaActual, setHoraActual] = useState("");
  const [facturasAbierto, setFacturasAbierto] = useState(false);
  const [usuariosAbierto, setUsuariosAbierto] = useState(false);
  const [productosAbierto, setProductosAbierto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const usuario = "Admin";

  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const actualizarHora = () => {
      const hora = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setHoraActual(hora);
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const sidebarWidth = isSidebarOpen ? "w-50" : "w-20";
  const contentPadding = isSidebarOpen ? "pl-[200px]" : "pl-[80px]";

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => location.pathname === path;

  // Función para verificar si estamos en alguna subruta de facturas
  const isSubRutaFactura = location.pathname.startsWith("/facturas");

  // Función para verificar si estamos en alguna subruta de usuarios
  const isSubRutaUsuarios = location.pathname.startsWith("/profile");

  return (
    <div className="min-h-screen bg-gray-0">
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${sidebarWidth} p-3 z-50`}
      >
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className="mt-6 flex-grow space-y-3">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
              isActive("/dashboard") ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <FiHome size={20} /> {isSidebarOpen && "Dashboard"}
          </Link>

          {/* Facturas con submenú */}
          <div>
            <button
              onClick={() => setFacturasAbierto(!facturasAbierto)}
              className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 w-full text-left ${
                isSubRutaFactura ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              <FiFileText size={20} />
              {isSidebarOpen && (
                <>
                  <span className="flex-grow">Facturas</span>
                  {facturasAbierto ? <FiChevronUp /> : <FiChevronDown />}
                </>
              )}
            </button>

            {/* Submenú desplegable */}
            {facturasAbierto && isSidebarOpen && (
              <div className="ml-7 mt-2 space-y-2 text-sm">
                <Link
                  to="/facturas/crear"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/facturas/crear") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Crear factura
                </Link>
                <Link
                  to="/facturas/ventas-diarias"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/facturas/ventas-diarias") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Clientes
                </Link>
                <Link
                  to="/facturas/devoluciones"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/facturas/devoluciones") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Devoluciones
                </Link>
                <Link
                  to="/facturas/descuentos"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/facturas/descuentos") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Descuentos
                </Link>
              </div>
            )}
          </div>

          {/* Gestión de Productos con submenú */}
          <div>
            <button
              onClick={() => setProductosAbierto(!productosAbierto)}
              className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 w-full text-left ${
                location.pathname.startsWith("/productos") ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              <FiSettings size={20} />
              {isSidebarOpen && (
                <>
                  <span className="flex-grow">Gestión de Productos</span>
                  {productosAbierto ? <FiChevronUp /> : <FiChevronDown />}
                </>
              )}
            </button>
            {productosAbierto && isSidebarOpen && (
              <div className="ml-7 mt-2 space-y-2 text-sm">
                <Link
                  to="/productos/categoria"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/productos/categoria") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Categoría
                </Link>
                <Link
                  to="/productos/productos"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/productos/productos") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Productos
                </Link>
                <Link
                  to="/productos/proveedores"
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    isActive("/productos/proveedores") ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  Proveedores
                </Link>
              </div>
            )}
          </div>

          {/* Usuarios como ruta directa */}
          <Link
            to="/Profile/nuevo-usuario"
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
              isActive("/Profile/nuevo-usuario") ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <FiUser size={20} /> {isSidebarOpen && "Usuarios"}
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-3 p-3 rounded hover:bg-gray-700 ${
              isActive("/settings") ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            <FiSettings size={20} /> {isSidebarOpen && "Configuración"}
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <FiLogOut size={20} /> {isSidebarOpen && "Salir"}
          </button>
        </div>
      </aside>

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${contentPadding}`}
      >
        <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Control</h1>
          <div className="text-sm text-right leading-tight">
            <div>{fechaActual}</div>
            <div>{horaActual}</div>
            <div className="font-semibold">Usuario: {usuario}</div>
          </div>
        </header>

        <main className="p-6 flex-grow">{children}</main>
      </div>
    </div>
  );
};

export default Layout;