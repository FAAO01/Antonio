import React, { useState } from 'react';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  nivelAcceso: string;
  fechaCreacion: string;
  contrasena: string;
  estado: 'Activo' | 'Inactivo';
}

// Inicialmente vacío
const initialUsers: User[] = [];

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [formUser, setFormUser] = useState<Omit<User, 'id'>>({
    nombre: '',
    apellido: '',
    correo: '',
    nivelAcceso: '',
    fechaCreacion: '',
    contrasena: '',
    estado: 'Activo',
  });
  const [showPassword, setShowPassword] = useState(false);

  const filteredUsers = users.filter(
    u =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.apellido.toLowerCase().includes(search.toLowerCase()) ||
      u.correo.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { ...formUser, id: nextId }]);
    resetForm();
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormUser({
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      nivelAcceso: user.nivelAcceso,
      fechaCreacion: user.fechaCreacion,
      contrasena: user.contrasena,
      estado: user.estado,
    });
    setShowPassword(false);
    setShowForm(true);
  };

  const handleSaveEdit = () => {
    if (editingUserId !== null) {
      setUsers(users.map(u => (u.id === editingUserId ? { ...u, ...formUser } : u)));
      resetForm();
    }
  };

  const resetForm = () => {
    setFormUser({
      nombre: '',
      apellido: '',
      correo: '',
      nivelAcceso: '',
      fechaCreacion: '',
      contrasena: '',
      estado: 'Activo',
    });
    setEditingUserId(null);
    setShowForm(false);
    setShowPassword(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center sm:text-left">👥 Gestión de Usuarios</h2>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o correo"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:max-w-md"
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditingUserId(null);
            setFormUser({
              nombre: '',
              apellido: '',
              correo: '',
              nivelAcceso: '',
              fechaCreacion: '',
              contrasena: '',
              estado: 'Activo',
            });
            setShowPassword(false);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          ➕ Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-4 sm:p-6 rounded shadow-md w-full max-w-xl mx-2">
            <h3 className="text-xl font-bold mb-4">
              {editingUserId ? '✏️ Editar usuario' : '➕ Agregar nuevo usuario'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border px-3 py-2 rounded w-full" placeholder="Nombre" value={formUser.nombre} onChange={e => setFormUser({ ...formUser, nombre: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" placeholder="Apellido" value={formUser.apellido} onChange={e => setFormUser({ ...formUser, apellido: e.target.value })} />
              <input className="border px-3 py-2 rounded w-full" type="email" placeholder="Correo" value={formUser.correo} onChange={e => setFormUser({ ...formUser, correo: e.target.value })} />
              <select className="border px-3 py-2 rounded w-full" value={formUser.nivelAcceso} onChange={e => setFormUser({ ...formUser, nivelAcceso: e.target.value })}>
                <option value="">Selecciona un rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Consulta">Consulta</option>
              </select>
              <input className="border px-3 py-2 rounded w-full" type="date" value={formUser.fechaCreacion} onChange={e => setFormUser({ ...formUser, fechaCreacion: e.target.value })} />
              <div className="relative flex items-center">
                <input
                  className="border px-3 py-2 rounded w-full pr-10"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={formUser.contrasena}
                  onChange={e => setFormUser({ ...formUser, contrasena: e.target.value })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <span role="img" aria-label="Ocultar">🙈</span>
                  ) : (
                    <span role="img" aria-label="Mostrar">👁️</span>
                  )}
                </button>
              </div>
              <select className="border px-3 py-2 rounded w-full" value={formUser.estado} onChange={e => setFormUser({ ...formUser, estado: e.target.value as User['estado'] })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button onClick={resetForm} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full sm:w-auto">Cancelar</button>
              {editingUserId ? (
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">Guardar Cambios</button>
              ) : (
                <button onClick={handleAddUser} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto">Guardar</button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded shadow mt-4">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-left font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Nombre</th>
              <th className="px-4 py-3 border-b">Apellido</th>
              <th className="px-4 py-3 border-b">Correo</th>
              <th className="px-4 py-3 border-b">Acceso</th>
              <th className="px-4 py-3 border-b">Creado</th>
              <th className="px-4 py-3 border-b">Contraseña</th>
              <th className="px-4 py-3 border-b">Estado</th>
              <th className="px-4 py-3 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-400">No hay usuarios registrados.</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 border-b">{user.id}</td>
                  <td className="px-4 py-2 border-b">{user.nombre}</td>
                  <td className="px-4 py-2 border-b">{user.apellido}</td>
                  <td className="px-4 py-2 border-b">{user.correo}</td>
                  <td className="px-4 py-2 border-b">{user.nivelAcceso}</td>
                  <td className="px-4 py-2 border-b">{user.fechaCreacion}</td>
                  <td className="px-4 py-2 border-b text-gray-400">{user.contrasena}</td>
                  <td className={`px-4 py-2 border-b font-semibold ${user.estado === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.estado}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setUsers(users.filter(u => u.id !== user.id))}
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

export default User;