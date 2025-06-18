import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import CrearFactura from "./pages/CrearFactura";
import VentasDiarias from "./pages/VentasDiarias";
import Devoluciones from "./pages/Devoluciones";
import Descuentos from "./pages/Descuentos";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Perfiles";
import User from "./pages/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas de Facturas */}
        <Route path="/facturas/crear" element={<Layout><CrearFactura /></Layout>} />
        <Route path="/facturas/ventas-diarias" element={<Layout><VentasDiarias /></Layout>} />
        <Route path="/facturas/devoluciones" element={<Layout><Devoluciones /></Layout>} />
        <Route path="/facturas/descuentos" element={<Layout><Descuentos /></Layout>} />

        {/* Rutas de usuario */}
        <Route path="/Profile/perfiles" element={<Layout><Profile /></Layout>} />
        <Route path="/Profile/nuevo-usuario" element={<Layout><User /></Layout>} />

        {/* Rutas de dashboard */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

        {/* Rutas de configuracion */}
        <Route path="/settings" element={<Layout><h2>Configuración</h2></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;