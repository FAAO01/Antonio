
import { useState } from "react";
import { FiSearch, FiPlus, FiEdit, FiTrash, FiEye, FiPrinter, FiX } from "react-icons/fi";

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Factura = {
  id: number;
  cliente: string;
  total: string;
  fecha: string;
  productos: Producto[];
};

const Facturas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [productos, setProductos] = useState<Producto[]>([{ nombre: "", cantidad: 1, precio: 0 }]);
  const [detalleFactura, setDetalleFactura] = useState<Factura | null>(null);

  // Para edición
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Para confirmación de borrado
  const [borrarId, setBorrarId] = useState<number | null>(null);

  const facturaId =
    editandoId !== null
      ? editandoId
      : facturas.length > 0
      ? Math.max(...facturas.map((f) => f.id)) + 1
      : 1;

  const filteredFacturas = facturas.filter((factura) =>
    factura.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setProductos([...productos, { nombre: "", cantidad: 1, precio: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    if (productos.length === 1) return;
    setProductos(productos.filter((_, i) => i !== index));
  };

  const handleGuardarFactura = () => {
    const productosValidos = productos.filter(
      (p) => p.nombre.trim() !== "" && p.cantidad > 0 && p.precio >= 0
    );
    if (!cliente.trim() || productosValidos.length === 0) {
      alert("Debe ingresar un cliente y al menos un producto válido.");
      return;
    }
    const total = productosValidos.reduce((acc, p) => acc + p.cantidad * p.precio, 0);

    if (editandoId !== null) {
      // Editar factura existente
      setFacturas((prev) =>
        prev.map((f) =>
          f.id === editandoId
            ? {
                ...f,
                cliente,
                total: `$${total.toFixed(2)}`,
                fecha: fecha.split("-").reverse().join("/"),
                productos: productosValidos,
              }
            : f
        )
      );
    } else {
      // Crear nueva factura
      setFacturas([
        ...facturas,
        {
          id: facturaId,
          cliente,
          total: `$${total.toFixed(2)}`,
          fecha: fecha.split("-").reverse().join("/"),
          productos: productosValidos,
        },
      ]);
    }
    setCliente("");
    setFecha(new Date().toISOString().split("T")[0]);
    setProductos([{ nombre: "", cantidad: 1, precio: 0 }]);
    setModalOpen(false);
    setEditandoId(null);
  };

  const handleVerDetalle = (factura: Factura) => {
    setDetalleFactura(factura);
  };

  const handleEditar = (factura: Factura) => {
    setCliente(factura.cliente);
    setFecha(factura.fecha.split("/").reverse().join("-")); // Convertir a formato yyyy-mm-dd
    setProductos(factura.productos.map((p) => ({ ...p })));
    setEditandoId(factura.id);
    setModalOpen(true);
  };

  const handleSolicitarBorrar = (id: number) => {
    setBorrarId(id);
  };

  const handleCancelarBorrar = () => {
    setBorrarId(null);
  };

  const handleBorrar = () => {
    if (borrarId !== null) {
      setFacturas((prev) => prev.filter((f) => f.id !== borrarId));
      setBorrarId(null);
    }
  };

  const handleImprimir = (factura: Factura) => {
    
    // Crea una ventana nueva solo con el detalle de la factura
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Factura #${factura.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 32px; }
              h2 { margin-bottom: 8px; }
              table { border-collapse: collapse; width: 100%; margin-top: 16px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
              th { background: #f3f3f3; }
            </style>
          </head>
          <body>
            <h2>Factura #${factura.id}</h2>
            <p><strong>Cliente:</strong> ${factura.cliente}</p>
            <p><strong>Fecha:</strong> ${factura.fecha}</p>
            <p><strong>Total:</strong> ${factura.total}</p>
            <h4>Productos:</h4>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${factura.productos
                  .map(
                    (prod) => `
                  <tr>
                    <td>${prod.nombre}</td>
                    <td>${prod.cantidad}</td>
                    <td>$${prod.precio.toFixed(2)}</td>
                    <td>$${(prod.cantidad * prod.precio).toFixed(2)}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="p-4 h-screen overflow-y-auto bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Gestión de Facturas</h2>

      {/* Contenedor de búsqueda y botón */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-2/3">
          <FiSearch size={20} className="mr-2" />
          <input 
            type="text"
            placeholder="Buscar factura..."
            className="border p-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus size={20} /> Crear Factura
        </button>
      </div>

      {/* Tabla de facturas */}
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Cliente</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Fecha</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredFacturas.map((factura) => (
            <tr key={factura.id} className="text-center">
              <td className="border border-gray-300 p-2">{factura.cliente}</td>
              <td className="border border-gray-300 p-2">{factura.total}</td>
              <td className="border border-gray-300 p-2">{factura.fecha}</td>
              <td className="border border-gray-300 p-2 flex justify-center gap-2">
                <div className="flex justify-center gap-2 w-full">
    <button
      className="text-blue-500 hover:text-blue-700"
      onClick={() => handleVerDetalle(factura)}
      title="Ver detalle"
    >
      <FiEye size={20} />
    </button>
    <button
      className="text-green-500 hover:text-green-700"
      onClick={() => handleEditar(factura)}
      title="Editar"
    >
      <FiEdit size={20} />
    </button>
    <button
      className="text-red-500 hover:text-red-700"
      onClick={() => handleSolicitarBorrar(factura.id)}
      title="Borrar"
    >
      <FiTrash size={20} />
    </button>
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={() => handleImprimir(factura)}
      title="Imprimir"
    >
      <FiPrinter size={20} />
    </button>
  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear/editar factura */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo semi-transparente y borroso */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="bg-white p-6 rounded-lg border-4 border-white shadow-600 shadow-lg w-[500px] max-h-[90vh] overflow-y-auto relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setModalOpen(false);
              }}
              aria-label="Cerrar"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editandoId !== null ? "Editar Factura" : "Nueva Factura"}
            </h3>

            {/* ID de Factura */}
            <p className="text-gray-700 mb-2">
              ID Factura: <strong>{facturaId}</strong>
            </p>

            {/* Cliente y Fecha en una sola línea */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Cliente"
                className="border p-2 rounded w-1/2"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded w-1/2"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            {/* Tabla de productos */}
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Producto</th>
                  <th className="border border-gray-300 p-2">Cantidad</th>
                  <th className="border border-gray-300 p-2">Precio</th>
                  <th className="border border-gray-300 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="Nombre"
                        value={producto.nombre}
                        onChange={(e) => {
                          const newProductos = [...productos];
                          newProductos[index].nombre = e.target.value;
                          setProductos(newProductos);
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        className="w-full border p-2 rounded"
                        min={1}
                        value={producto.cantidad}
                        onChange={(e) => {
                          const newProductos = [...productos];
                          newProductos[index].cantidad = Number(e.target.value);
                          setProductos(newProductos);
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        className="w-full border p-2 rounded"
                        min={0}
                        value={producto.precio}
                        onChange={(e) => {
                          const newProductos = [...productos];
                          newProductos[index].precio = Number(e.target.value);
                          setProductos(newProductos);
                        }}
                      />
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveProduct(index)}
                        disabled={productos.length === 1}
                        title="Eliminar producto"
                      >
                        <FiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
            >
              Agregar Producto
            </button>

            <button
              onClick={handleGuardarFactura}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              {editandoId !== null ? "Guardar Cambios" : "Guardar Factura"}
            </button>
          </div>
        </div>
      )}

      {/* Modal de detalle de factura */}
      {detalleFactura && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Fondo semi-transparente y borroso */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="bg-white p-6 rounded-lg border-4 border-white -600 shadow-lg w-[500px] max-h-[90vh] overflow-y-auto relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setDetalleFactura(null);
              }}
              aria-label="Cerrar"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">Detalle de Factura</h3>
            <p><strong>ID:</strong> {detalleFactura.id}</p>
            <p><strong>Cliente:</strong> {detalleFactura.cliente}</p>
            <p><strong>Fecha:</strong> {detalleFactura.fecha}</p>
            <p><strong>Total:</strong> {detalleFactura.total}</p>
            <h4 className="font-semibold mt-4 mb-2">Productos:</h4>
            <table className="w-full border-collapse border border-gray-300 mb-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Nombre</th>
                  <th className="border border-gray-300 p-2">Cantidad</th>
                  <th className="border border-gray-300 p-2">Precio</th>
                  <th className="border border-gray-300 p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalleFactura.productos.map((prod, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 p-2">{prod.nombre}</td>
                    <td className="border border-gray-300 p-2">{prod.cantidad}</td>
                    <td className="border border-gray-300 p-2">${prod.precio.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">
                      ${(prod.cantidad * prod.precio).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de confirmación de borrado */}
      {borrarId !== null && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Fondo semi-transparente y borroso */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="bg-white p-6 rounded-lg border-4 border-white shadow-600 shadow-lg w-[350px] max-h-[90vh] overflow-y-auto relative z-10 text-center">
            <h3 className="text-xl font-bold mb-4">¿Eliminar factura?</h3>
            <p className="mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleBorrar}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCancelarBorrar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de borrado */}
      {borrarId !== null && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded w-[350px] max-h-[90vh] overflow-y-auto relative shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">¿Eliminar factura?</h3>
            <p className="mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleBorrar}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={handleCancelarBorrar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facturas;
