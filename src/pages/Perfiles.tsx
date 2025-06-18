import React, { useState, useEffect } from "react";

// Datos simulados de usuarios
const usuarios = [
  {
    nombre: "Juan Pérez",
    correo: "juan.perez@email.com",
    rol: "Administrador",
    fechaRegistro: "2023-09-15",
    estado: "Activo",
    telefono: "+593 987654321",
    direccion: "Av. Principal 123, Quito, Ecuador",
    cedula: "1723456789",
  },
  {
    nombre: "María García",
    correo: "maria.garcia@email.com",
    rol: "Usuario",
    fechaRegistro: "2023-10-01",
    estado: "Activo",
    telefono: "+593 912345678",
    direccion: "Calle Falsa 456, Guayaquil, Ecuador",
    cedula: "0923456789",
  },
  {
    nombre: "Carlos López",
    correo: "carlos.lopez@email.com",
    rol: "Moderador",
    fechaRegistro: "2023-11-20",
    estado: "Inactivo",
    telefono: "+593 998877665",
    direccion: "Av. Amazonas 789, Cuenca, Ecuador",
    cedula: "1823456789",
  },
  {
    nombre: "Ana Torres",
    correo: "ana.torres@email.com",
    rol: "Usuario",
    fechaRegistro: "2023-12-05",
    estado: "Activo",
    telefono: "+593 911223344",
    direccion: "Calle 10 de Agosto, Loja, Ecuador",
    cedula: "1123456789",
  },
];

// Hook para detectar tamaño de pantalla
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const styles = {
  container: {
    padding: 32,
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    background: '#f4f6fb',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    boxSizing: 'border-box' as const,
  },
  searchBox: {
    marginBottom: 32,
    width: '100%',
    maxWidth: 1200,
    display: 'flex',
    justifyContent: 'flex-start',
    boxSizing: 'border-box' as const,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: '1.5px solid #e0e6ed',
    fontSize: 16,
    outline: 'none',
    boxShadow: '0 2px 8px rgba(44,62,80,0.04)',
    background: '#fff',
    boxSizing: 'border-box' as const,
  },
  grid: (width: number) => ({
    display: 'grid',
    gridTemplateColumns:
      width > 1100
        ? 'repeat(3, 1fr)'
        : width > 700
        ? 'repeat(2, 1fr)'
        : '1fr',
    gap: width < 500 ? 16 : 32,
    width: '100%',
    maxWidth: 1200,
    boxSizing: 'border-box' as const,
  }),
  card: (width: number) => ({
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 4px 24px rgba(44,62,80,0.13)',
    padding: width < 500 ? '28px 10px 18px 10px' : '40px 36px 32px 36px',
    minWidth: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    border: '1.5px solid #e0e6ed',
    position: 'relative' as const,
    boxSizing: 'border-box' as const,
  }),
  titulo: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1a2233',
    marginBottom: 18,
    letterSpacing: 1,
    textAlign: 'center' as const,
  },
  label: {
    fontWeight: 600,
    color: '#1976d2',
    fontSize: 15,
    marginBottom: 2,
    display: 'block',
  },
  valor: {
    fontSize: 16,
    color: '#2d3e50',
    marginBottom: 14,
    display: 'block',
    wordBreak: 'break-word' as const,
  },
  avatar: (width: number) => ({
    width: width < 500 ? 50 : 70,
    height: width < 500 ? 50 : 70,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: width < 500 ? 20 : 30,
    fontWeight: 700,
    margin: '0 auto 18px auto',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.13)',
    border: '3px solid #fff',
    position: 'absolute' as const,
    top: width < 500 ? -25 : -35,
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  infoSection: {
    marginTop: 40,
    width: '100%',
  },
  divider: {
    height: 1,
    background: '#e0e6ed',
    margin: '12px 0 18px 0',
    border: 'none',
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.25)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: (width: number) => ({
    background: '#fff',
    borderRadius: 14,
    padding: width < 500 ? '18px 8px' : '28px 48px',
    minWidth: width < 500 ? 0 : 520,
    maxWidth: 700,
    width: width < 500 ? '98vw' : '90vw',
    boxShadow: '0 4px 32px rgba(44,62,80,0.18)',
    position: 'relative' as const,
    maxHeight: width < 500 ? '90vh' : 520,
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    boxSizing: 'border-box' as const,
  }),
  closeButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    background: 'none',
    border: 'none',
    fontSize: 22,
    color: '#888',
    cursor: 'pointer',
  },
  modalFormGroup: {
    marginBottom: 14,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  modalInput: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1.5px solid #e0e6ed',
    fontSize: 16,
    outline: 'none',
    background: '#fff',
    marginTop: 4,
  },
  modalSelect: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1.5px solid #e0e6ed',
    fontSize: 16,
    outline: 'none',
    background: '#fff',
    marginTop: 4,
  },
  modalSubmit: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 10,
  },
};

function getInitials(nombre: string) {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

type Usuario = typeof usuarios[0];

function PerfilCard({ usuario, onEditar, width }: { usuario: Usuario, onEditar: (usuario: Usuario) => void, width: number }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuAbierto((prev) => !prev);
  };

  const handleEditar = () => {
    setMenuAbierto(false);
    onEditar(usuario);
  };

  return (
    <div style={styles.card(width)}>
      {/* Botón de 3 puntitos */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          cursor: 'pointer',
          padding: 4,
          borderRadius: 6,
          background: menuAbierto ? '#f0f4fa' : 'transparent',
          transition: 'background 0.2s',
        }}
        onClick={handleMenuClick}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="12" r="2" fill="#888" />
          <circle cx="12" cy="12" r="2" fill="#888" />
          <circle cx="19" cy="12" r="2" fill="#888" />
        </svg>
      </div>
      {/* Menú desplegable */}
      {menuAbierto && (
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 16,
            background: '#fff',
            border: '1px solid #e0e6ed',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(44,62,80,0.13)',
            zIndex: 3,
            minWidth: 100,
          }}
        >
          <div
            style={{
              padding: '10px 18px',
              cursor: 'pointer',
              color: '#1976d2',
              fontWeight: 600,
              borderRadius: 8,
              transition: 'background 0.2s',
            }}
            onClick={handleEditar}
            onMouseDown={e => e.preventDefault()}
          >
            Editar
          </div>
        </div>
      )}
      <div style={styles.avatar(width)}>{getInitials(usuario.nombre)}</div>
      <div style={styles.infoSection}>
        <h2 style={styles.titulo}>{usuario.nombre}</h2>
        <hr style={styles.divider} />
        <span style={styles.label}>Correo electrónico:</span>
        <span style={styles.valor}>{usuario.correo}</span>

        <span style={styles.label}>Rol:</span>
        <span style={styles.valor}>{usuario.rol}</span>

        <span style={styles.label}>Cédula:</span>
        <span style={styles.valor}>{usuario.cedula}</span>

        <span style={styles.label}>Teléfono:</span>
        <span style={styles.valor}>{usuario.telefono}</span>

        <span style={styles.label}>Dirección:</span>
        <span style={styles.valor}>{usuario.direccion}</span>

        <span style={styles.label}>Fecha de registro:</span>
        <span style={styles.valor}>{usuario.fechaRegistro}</span>

        <span style={styles.label}>Estado:</span>
        <span style={styles.valor}>{usuario.estado}</span>
      </div>
    </div>
  );
}

function EditarUsuarioModal({ usuario, abierto, onClose, onGuardar, width }: {
  usuario: Usuario | null,
  abierto: boolean,
  onClose: () => void,
  onGuardar: (usuarioEditado: Usuario) => void,
  width: number,
}) {
  const [form, setForm] = useState<Usuario | null>(usuario);

  useEffect(() => {
    setForm(usuario);
  }, [usuario]);

  if (!abierto || !form) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form) onGuardar(form);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent(width)}>
        <button
          onClick={onClose}
          style={styles.closeButton}
          aria-label="Cerrar"
        >×</button>
        <h2 style={{ marginBottom: 18, color: '#1976d2', fontSize: width < 500 ? 18 : 22 }}>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.modalFormGroup}>
            <label>Nombre:
              <input name="nombre" value={form.nombre} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Correo:
              <input name="correo" value={form.correo} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Rol:
              <input name="rol" value={form.rol} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Cédula:
              <input name="cedula" value={form.cedula} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Teléfono:
              <input name="telefono" value={form.telefono} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Dirección:
              <input name="direccion" value={form.direccion} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Fecha de registro:
              <input name="fechaRegistro" value={form.fechaRegistro} onChange={handleChange} style={styles.modalInput} />
            </label>
          </div>
          <div style={styles.modalFormGroup}>
            <label>Estado:
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                style={styles.modalSelect}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </label>
          </div>
          <button type="submit" style={styles.modalSubmit}>Guardar</button>
        </form>
      </div>
    </div>
  );
}

export default function Perfiles() {
  const width = useWindowWidth();
  const [busqueda, setBusqueda] = useState("");
  const [usuariosState, setUsuariosState] = useState(usuarios);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const usuariosFiltrados = usuariosState.filter((u) =>
    [u.nombre, u.correo, u.cedula]
      .join(" ")
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleEditarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const handleGuardarUsuario = (usuarioEditado: Usuario) => {
    setUsuariosState((prev) =>
      prev.map((u) => u.cedula === usuarioEditado.cedula ? usuarioEditado : u)
    );
    setModalAbierto(false);
    setUsuarioEditando(null);
  };

  return (
    <div style={styles.container}>
      <EditarUsuarioModal
        usuario={usuarioEditando}
        abierto={modalAbierto}
        onClose={() => { setModalAbierto(false); setUsuarioEditando(null); }}
        onGuardar={handleGuardarUsuario}
        width={width}
      />
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar por nombre, correo o cédula..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div style={styles.grid(width)}>
        {usuariosFiltrados.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
            No se encontraron perfiles.
          </div>
        ) : (
          usuariosFiltrados.map((usuario) => (
            <PerfilCard key={usuario.cedula} usuario={usuario} onEditar={handleEditarUsuario} width={width} />
          ))
        )}
      </div>
    </div>
  );
}