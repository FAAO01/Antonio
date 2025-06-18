import React, { useState } from 'react';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  documento: string;
  correo: string;
  telefono: string;
  direccion: string;
  fechaCreacion: string;
  estado: 'Activo' | 'Inactivo';
}

const initialClientes: Cliente[] = [];

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>(initialClientes);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClienteId, setEditingClienteId] = useState<number | null>(null);
  const [formCliente, setFormCliente] = useState<Omit<Cliente, 'id'>>({
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaCreacion: '',
    estado: 'Activo',
  });

  const filteredClientes = clientes.filter(
    c =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.apellido.toLowerCase().includes(search.toLowerCase()) ||
      c.correo.toLowerCase().includes(search.toLowerCase()) ||
      c.documento.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCliente = () => {
    const nextId = clientes.length ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    setClientes([...clientes, { ...formCliente, id: nextId }]);
    resetForm();
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingClienteId(cliente.id);
    setFormCliente({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      documento: cliente.documento,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      fechaCreacion: cliente.fechaCreacion,
      estado: cliente.estado,
    });
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (editingClienteId !== null) {
      setClientes(clientes.map(c => (c.id === editingClienteId ? { ...c, ...formCliente } : c)));
      resetForm();
    }
  };

  const resetForm = () => {
    setFormCliente({
      nombre: '',
      apellido: '',
      documento: '',
      correo: '',
      telefono: '',
      direccion: '',
      fechaCreacion: '',
      estado: 'Activo',
    });
    setEditingClienteId(null);
    setShowForm(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">👤 Gestión de Clientes</h2>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido, correo o cédula"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:max-w-md"
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditingClienteId(null);
            setFormCliente({
              nombre: '',
              apellido: '',
              documento: '',
              correo: '',
              telefono: '',
              direccion: '',
              fechaCreacion: '',
              estado: 'Activo',
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          ➕ Agregar Cliente
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xl mx-2">
            <h3 className="text-xl font-bold mb-4">
              {editingClienteId ? '✏️ Editar cliente' : '➕ Agregar nuevo cliente'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border px-3 py-2 rounded w-full" placeholder="Nombre" value={formCliente.nombre} onChange={e => setFormCliente({ ...formCliente, nombre: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" placeholder="Apellido" value={formCliente.apellido} onChange={e => setFormCliente({ ...formCliente, apellido: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" placeholder="Cédula" value={formCliente.documento} onChange={e => setFormCliente({ ...formCliente, documento: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" type="email" placeholder="Correo" value={formCliente.correo} onChange={e => setFormCliente({ ...formCliente, correo: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" placeholder="Teléfono" value={formCliente.telefono} onChange={e => setFormCliente({ ...formCliente, telefono: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" placeholder="Dirección" value={formCliente.direccion} onChange={e => setFormCliente({ ...formCliente, direccion: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" type="date" value={formCliente.fechaCreacion} onChange={e => setFormCliente({ ...formCliente, fechaCreacion: e.target.value })} />
              <select className="border px-3 py-2 rounded w-full" value={formCliente.estado} onChange={e => setFormCliente({ ...formCliente, estado: e.target.value as Cliente['estado'] })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full sm:w-auto">Cancelar</button>
              {editingClienteId ? (
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">Guardar Cambios</button>
              ) : (
                <button onClick={handleAddCliente} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">Guardar</button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Nombre</th>
              <th className="px-4 py-3 border-b">Apellido</th>
              <th className="px-4 py-3 border-b">Cédula</th>
              <th className="px-4 py-3 border-b">Correo</th>
              <th className="px-4 py-3 border-b">Teléfono</th>
              <th className="px-4 py-3 border-b">Dirección</th>
              <th className="px-4 py-3 border-b">Fecha Creación</th>
              <th className="px-4 py-3 border-b">Estado</th>
              <th className="px-4 py-3 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-400">No hay clientes registrados.</td>
              </tr>
            ) : (
              filteredClientes.map(cliente => (
                <tr key={cliente.id} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 border-b">{cliente.id}</td>
                  <td className="px-4 py-2 border-b">{cliente.nombre}</td>
                  <td className="px-4 py-2 border-b">{cliente.apellido}</td>
                  <td className="px-4 py-2 border-b">{cliente.documento}</td>
                  <td className="px-4 py-2 border-b">{cliente.correo}</td>
                  <td className="px-4 py-2 border-b">{cliente.telefono}</td>
                  <td className="px-4 py-2 border-b">{cliente.direccion}</td>
                  <td className="px-4 py-2 border-b">{cliente.fechaCreacion}</td>
                  <td className={`px-4 py-2 border-b font-semibold ${cliente.estado === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>{cliente.estado}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleEditCliente(cliente)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setClientes(clientes.filter(c => c.id !== cliente.id))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;