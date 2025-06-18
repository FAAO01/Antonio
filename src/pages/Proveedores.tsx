  import React, { useState } from "react";

type Proveedor = {
  id_proveedor: number;
  nombre: string;
  ruc: string;
  telefono: string;
  email: string;
  direccion: string;
  estado: "activo" | "inactivo";
  fecha_registro: string;
};

const Proveedores: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState<Omit<Proveedor, "id_proveedor" | "fecha_registro">>({
    nombre: "",
    ruc: "",
    telefono: "",
    email: "",
    direccion: "",
    estado: "activo",
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const filtrarProveedores = proveedores.filter((prov) =>
    prov.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editandoId !== null) {
      setProveedores((prev) =>
        prev.map((prov) =>
          prov.id_proveedor === editandoId
            ? { ...prov, ...formData }
            : prov
        )
      );
    } else {
      const nuevoProveedor: Proveedor = {
        id_proveedor: proveedores.length > 0 ? proveedores[proveedores.length - 1].id_proveedor + 1 : 1,
        ...formData,
        fecha_registro: new Date().toISOString().split("T")[0],
      };
      setProveedores((prev) => [...prev, nuevoProveedor]);
    }

    setFormData({
      nombre: "",
      ruc: "",
      telefono: "",
      email: "",
      direccion: "",
      estado: "activo",
    });
    setEditandoId(null);
    setModalVisible(false);
  };

  const handleEditar = (prov: Proveedor) => {
    setFormData({ ...prov });
    setEditandoId(prov.id_proveedor);
    setModalVisible(true);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Eliminar este proveedor?")) {
      setProveedores((prev) => prev.filter((p) => p.id_proveedor !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Proveedores</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded w-1/2"
        />
        <button
          onClick={() => {
            setFormData({
              nombre: "",
              ruc: "",
              telefono: "",
              email: "",
              direccion: "",
              estado: "activo",
            });
            setEditandoId(null);
            setModalVisible(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          Agregar Proveedor
        </button>
      </div>

      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nombre</th>
            <th className="border px-2 py-1">RUC</th>
            <th className="border px-2 py-1">Teléfono</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Dirección</th>
            <th className="border px-2 py-1">Estado</th>
            <th className="border px-2 py-1">Registro</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarProveedores.map((prov) => (
            <tr key={prov.id_proveedor}>
              <td className="border px-2 py-1">{prov.id_proveedor}</td>
              <td className="border px-2 py-1">{prov.nombre}</td>
              <td className="border px-2 py-1">{prov.ruc}</td>
              <td className="border px-2 py-1">{prov.telefono}</td>
              <td className="border px-2 py-1">{prov.email}</td>
              <td className="border px-2 py-1">{prov.direccion}</td>
              <td className="border px-2 py-1">{prov.estado}</td>
              <td className="border px-2 py-1">{prov.fecha_registro}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEditar(prov)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(prov.id_proveedor)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filtrarProveedores.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center py-2">
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editandoId ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h2>
            <div className="grid gap-3">
              {["nombre", "ruc", "telefono", "email", "direccion"].map((campo) => (
                <input
                  key={campo}
                  type="text"
                  name={campo}
                  placeholder={campo[0].toUpperCase() + campo.slice(1)}
                  value={(formData as any)[campo]}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded w-full"
                />
              ))}
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setModalVisible(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proveedores;
