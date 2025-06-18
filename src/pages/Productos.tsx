import React, { useState } from "react";

type Producto = {
  id_producto: number;
  id_categoria: number;
  id_proveedor: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  factor_conversion: number;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  stock_minimo: number;
  imagen: string;
  estado: "activo" | "inactivo";
  fecha_creacion: string;
};

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Producto, "id_producto" | "fecha_creacion">>({
    id_categoria: 1,
    id_proveedor: 1,
    codigo_barras: "",
    nombre: "",
    descripcion: "",
    factor_conversion: 1,
    precio_compra: 0,
    precio_venta: 0,
    stock: 0,
    stock_minimo: 0,
    imagen: "",
    estado: "activo",
  });

  // Simulando listas para selects
  const categorias = [
    { id: 1, nombre: "Herramientas" },
    { id: 2, nombre: "Materiales" },
  ];

  const proveedores = [
    { id: 1, nombre: "Proveedor A" },
    { id: 2, nombre: "Proveedor B" },
  ];

  const filtrarProductos = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name.includes("precio") || name.includes("factor") || name.includes("stock") ? Number(value) : value });
  };

  const handleSubmit = () => {
    if (editandoId !== null) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id_producto === editandoId ? { ...p, ...formData } : p
        )
      );
    } else {
      const nuevo: Producto = {
        id_producto: productos.length > 0 ? productos[productos.length - 1].id_producto + 1 : 1,
        ...formData,
        fecha_creacion: new Date().toISOString(),
      };
      setProductos((prev) => [...prev, nuevo]);
    }

    setFormData({
      id_categoria: 1,
      id_proveedor: 1,
      codigo_barras: "",
      nombre: "",
      descripcion: "",
      factor_conversion: 1,
      precio_compra: 0,
      precio_venta: 0,
      stock: 0,
      stock_minimo: 0,
      imagen: "",
      estado: "activo",
    });
    setEditandoId(null);
    setModalVisible(false);
  };

  const handleEditar = (prod: Producto) => {
    setFormData({ ...prod });
    setEditandoId(prod.id_producto);
    setModalVisible(true);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Eliminar este producto?")) {
      setProductos((prev) => prev.filter((p) => p.id_producto !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded w-1/2"
        />
        <button
          onClick={() => {
            setFormData({
              id_categoria: 1,
              id_proveedor: 1,
              codigo_barras: "",
              nombre: "",
              descripcion: "",
              factor_conversion: 1,
              precio_compra: 0,
              precio_venta: 0,
              stock: 0,
              stock_minimo: 0,
              imagen: "",
              estado: "activo",
            });
            setEditandoId(null);
            setModalVisible(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          Agregar Producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Código</th>
              <th className="border px-2 py-1">Categoría</th>
              <th className="border px-2 py-1">Proveedor</th>
              <th className="border px-2 py-1">P. Compra</th>
              <th className="border px-2 py-1">P. Venta</th>
              <th className="border px-2 py-1">Stock</th>
              <th className="border px-2 py-1">Estado</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarProductos.map((p) => (
              <tr key={p.id_producto}>
                <td className="border px-2 py-1">{p.id_producto}</td>
                <td className="border px-2 py-1">{p.nombre}</td>
                <td className="border px-2 py-1">{p.codigo_barras}</td>
                <td className="border px-2 py-1">{categorias.find(c => c.id === p.id_categoria)?.nombre}</td>
                <td className="border px-2 py-1">{proveedores.find(pr => pr.id === p.id_proveedor)?.nombre}</td>
                <td className="border px-2 py-1">${p.precio_compra}</td>
                <td className="border px-2 py-1">${p.precio_venta}</td>
                <td className="border px-2 py-1">{p.stock}</td>
                <td className="border px-2 py-1">{p.estado}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button onClick={() => handleEditar(p)} className="text-blue-600 hover:underline">
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(p.id_producto)} className="text-red-600 hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filtrarProductos.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-2">No hay productos encontrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">{editandoId ? "Editar Producto" : "Nuevo Producto"}</h2>
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Código de barras</label>
                  <input name="codigo_barras" value={formData.codigo_barras} onChange={handleChange} placeholder="Código de barras" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Nombre</label>
                  <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Categoría</label>
                  <select name="id_categoria" value={formData.id_categoria} onChange={handleChange} className="border p-2 rounded">
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Proveedor</label>
                  <select name="id_proveedor" value={formData.id_proveedor} onChange={handleChange} className="border p-2 rounded">
                    {proveedores.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-xs font-semibold mb-1">Descripción</label>
                  <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Factor de conversión</label>
                  <input name="factor_conversion" type="number" value={formData.factor_conversion} onChange={handleChange} placeholder="Factor conversión" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Precio de compra</label>
                  <input name="precio_compra" type="number" value={formData.precio_compra} onChange={handleChange} placeholder="Precio de compra" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Precio de venta</label>
                  <input name="precio_venta" type="number" value={formData.precio_venta} onChange={handleChange} placeholder="Precio de venta" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Stock</label>
                  <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold mb-1">Stock mínimo</label>
                  <input name="stock_minimo" type="number" value={formData.stock_minimo} onChange={handleChange} placeholder="Stock mínimo" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-xs font-semibold mb-1">URL de imagen</label>
                  <input name="imagen" value={formData.imagen} onChange={handleChange} placeholder="URL de imagen" className="border p-2 rounded" />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-xs font-semibold mb-1">Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleChange} className="border p-2 rounded">
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={() => setModalVisible(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancelar</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
