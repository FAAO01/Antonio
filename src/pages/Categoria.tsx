import React, { useState } from 'react';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo';
}

const initialCategorias: Categoria[] = [];

const Categoria: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>(initialCategorias);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Categoria, 'id'>>({
    nombre: '',
    descripcion: '',
    estado: 'Activo',
  });

  const filtered = categorias.filter(cat =>
    cat.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (editId !== null) {
      setCategorias(categorias.map(cat =>
        cat.id === editId ? { ...cat, ...formData } : cat
      ));
    } else {
      const nextId = categorias.length ? Math.max(...categorias.map(c => c.id)) + 1 : 1;
      setCategorias([...categorias, { ...formData, id: nextId }]);
    }
    setShowForm(false);
    setEditId(null);
    setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
  };

  const handleEdit = (categoria: Categoria) => {
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: categoria.estado,
    });
    setEditId(categoria.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      setCategorias(categorias.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Categorías</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar categoría"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:max-w-md"
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
        >
          ➕ Agregar Categoría
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {editId !== null ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}
            </h3>
            <div className="space-y-4">
              <input
                className="border px-3 py-2 rounded w-full"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
              />
              <textarea
                className="border px-3 py-2 rounded w-full"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
              />
              <select
                className="border px-3 py-2 rounded w-full"
                value={formData.estado}
                onChange={e => setFormData({ ...formData, estado: e.target.value as Categoria['estado'] })}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editId !== null ? 'Guardar Cambios' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Nombre</th>
              <th className="px-4 py-3 border-b">Descripción</th>
              <th className="px-4 py-3 border-b">Estado</th>
              <th className="px-4 py-3 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 text-gray-800">
                <td className="px-4 py-2 border-b">{cat.id}</td>
                <td className="px-4 py-2 border-b">{cat.nombre}</td>
                <td className="px-4 py-2 border-b">{cat.descripcion}</td>
                <td className={`px-4 py-2 border-b font-semibold ${cat.estado === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                  {cat.estado}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categoria;
