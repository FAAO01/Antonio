import React, { useState } from "react";
import type { FormEvent, ChangeEvent, MouseEvent } from "react";
import { FiSearch, FiPlus, FiX, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descuento: number;
  imagen: string;
}

const Descuentos: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenUrl, setImagenUrl] = useState("");
  const [useFile, setUseFile] = useState(true);

  // Menu state for each card
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  // Edit state
  const [editId, setEditId] = useState<number | null>(null);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const resetForm = () => {
    setNombre("");
    setPrecio("");
    setDescuento("");
    setImagenFile(null);
    setImagenUrl("");
    setUseFile(true);
    setEditId(null);
  };

  const handleImagenFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleAgregarProducto = (e: FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!nombre.trim()) return;
    const precioNum = Number(precio);
    const descuentoNum = Number(descuento);
    if (isNaN(precioNum) || precioNum <= 0) return;
    if (isNaN(descuentoNum) || descuentoNum < 0) return;

    let imagenSrc = "/logo.png";
    if (useFile && imagenFile) {
      imagenSrc = URL.createObjectURL(imagenFile);
    } else if (!useFile && imagenUrl.trim()) {
      imagenSrc = imagenUrl.trim();
    }

    if (editId !== null) {
      // Edit mode
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editId
            ? {
                ...p,
                nombre: nombre.trim(),
                precio: precioNum,
                descuento: descuentoNum,
                imagen: imagenSrc,
              }
            : p
        )
      );
    } else {
      // Add mode
      setProductos((prev) => [
        ...prev,
        {
          id: Date.now(),
          nombre: nombre.trim(),
          precio: precioNum,
          descuento: descuentoNum,
          imagen: imagenSrc,
        },
      ]);
    }
    setModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    setMenuOpenId(null);
  };

  const handleEdit = (producto: Producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio.toString());
    setDescuento(producto.descuento.toString());
    setImagenFile(null);
    setImagenUrl("");
    setUseFile(true);
    setEditId(producto.id);
    setModalOpen(true);
    setMenuOpenId(null);
  };

  // Close menu on outside click
  React.useEffect(() => {
    const handleClick = () => setMenuOpenId(null);
    if (menuOpenId !== null) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [menuOpenId]);

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">Descuentos</h2>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-2/3">
          <FiSearch size={20} className="mr-2" />
          <input 
            type="text"
            placeholder="Buscar descuentos..."
            className="border p-2 rounded w-full"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus size={20} /> Agregar Descuento
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred semi-transparent backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setModalOpen(false);
                resetForm();
              }}
              aria-label="Cerrar"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-lg font-bold mb-4">
              {editId !== null ? "Editar Producto con Descuento" : "Agregar Producto con Descuento"}
            </h3>
            <form onSubmit={handleAgregarProducto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del producto</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={nombre || ""}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Imagen</label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    className={`px-2 py-1 rounded ${useFile ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setUseFile(true)}
                  >
                    Archivo
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-1 rounded ${!useFile ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setUseFile(false)}
                  >
                    URL
                  </button>
                </div>
                {useFile ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagenFileChange}
                    className="block"
                  />
                ) : (
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="border p-2 rounded w-full"
                    value={imagenUrl || ""}
                    onChange={(e) => setImagenUrl(e.target.value)}
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={precio || ""}
                  onChange={(e) => setPrecio(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descuento (%)</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={descuento || ""}
                  onChange={(e) => setDescuento(e.target.value)}
                  min={0}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold mt-2"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid de productos en 3 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productosFiltrados.map((p) => (
          <div key={p.id} className="bg-white shadow rounded p-4 flex flex-col items-center relative">
            {/* Three dots menu */}
            <div className="absolute top-2 right-2 z-10">
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  setMenuOpenId(menuOpenId === p.id ? null : p.id);
                }}
                aria-label="Opciones"
              >
                <FiMoreVertical size={20} />
              </button>
              {menuOpenId === p.id && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleEdit(p)}
                  >
                    <FiEdit2 className="mr-2" /> Editar
                  </button>
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={() => handleDelete(p.id)}
                  >
                    <FiTrash2 className="mr-2" /> Eliminar
                  </button>
                </div>
              )}
            </div>
            <img
              src={p.imagen}
              alt={p.nombre}
              className="w-[70px] h-[70px] object-cover mb-4 rounded"
            />
            <h3 className="text-md font-semibold">{p.nombre}</h3>
            <div className="text-gray-600 mb-1 text-sm">
              Precio: <span className="line-through">${p.precio}</span>{" "}
              <span className="text-green-700 font-bold">
                ${p.precio - (p.precio * p.descuento) / 100}
              </span>
            </div>
            {p.descuento > 0 && (
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">
                {p.descuento}% OFF
              </span>
            )}
          </div>
        ))}

        {productosFiltrados.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No hay productos disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default Descuentos;