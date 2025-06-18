import React, { useState } from "react";

interface UsuarioFormData {
  nombre: string;
  email: string;
  password: string;
  rol: string;
  fechaRegistro: string;
  estado: string;
  telefono: string;
  direccion: string;
  cedula: string;
}

const roles = [
  { value: "admin", label: "Administrador" },
  { value: "user", label: "Usuario" },
];

const estados = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];

// Hook para detectar el ancho de la ventana
function useWindowWidth() {
  const isClient = typeof window === "object";
  const getWidth = () => (isClient ? window.innerWidth : 1024);
  const [width, setWidth] = React.useState<number>(getWidth());

  React.useEffect(() => {
    if (!isClient) return;
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);
  return width;
}

const styles = {
  container: {
    maxWidth: 820,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    padding: "32px 28px",
    fontFamily: "Segoe UI, Arial, sans-serif",
  } as React.CSSProperties,
  title: {
    textAlign: "center" as const,
    marginBottom: 28,
    color: "#222",
    fontWeight: 600,
    fontSize: 24,
    letterSpacing: 0.5,
  },
  formRow: (width: number) => ({
    display: "flex",
    gap: 24,
    marginBottom: 0,
    flexWrap: "wrap" as const,
    flexDirection: width < 700 ? "column" : "row",
  }),
  formColumn: (width: number) => ({
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: 18,
    width: width < 700 ? "100%" : undefined,
  }),
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    marginBottom: 6,
    fontWeight: 500,
    color: "#333",
    fontSize: 15,
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
    background: "#fafbfc",
  },
  select: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 15,
    background: "#fafbfc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px 0",
    background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    marginTop: 24,
    boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
    transition: "background 0.2s",
  },
  error: {
    color: "#dc2626",
    marginTop: 10,
    textAlign: "center" as const,
    fontWeight: 500,
    fontSize: 15,
  },
  success: {
    color: "#16a34a",
    marginTop: 10,
    textAlign: "center" as const,
    fontWeight: 500,
    fontSize: 15,
  },
};

const NuevoUsuario: React.FC = () => {
  const width = useWindowWidth() || 1024; // fallback para SSR o valores undefined

  const [formData, setFormData] = useState<UsuarioFormData>({
    nombre: "",
    email: "",
    password: "",
    rol: "user",
    fechaRegistro: "",
    estado: "activo",
    telefono: "",
    direccion: "",
    cedula: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.password ||
      !formData.rol ||
      !formData.fechaRegistro ||
      !formData.estado ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.cedula
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos al backend
    setSuccess("Usuario agregado exitosamente.");
    setFormData({
      nombre: "",
      email: "",
      password: "",
      rol: "user",
      fechaRegistro: "",
      estado: "activo",
      telefono: "",
      direccion: "",
      cedula: "",
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div style={styles.formRow(width)}>
          <div style={styles.formColumn(width)}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre</label>
              <input
                style={styles.input}
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Correo electrónico</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rol</label>
              <select
                style={styles.select}
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                {roles.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Fecha de Registro</label>
              <input
                style={styles.input}
                type="date"
                name="fechaRegistro"
                value={formData.fechaRegistro}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Estado</label>
              <select
                style={styles.select}
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
              >
                {estados.map((estado) => (
                  <option key={estado.value} value={estado.value}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={styles.formColumn(width)}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Teléfono</label>
              <input
                style={styles.input}
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 0999999999"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Dirección</label>
              <input
                style={styles.input}
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Dirección"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Cédula</label>
              <input
                style={styles.input}
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Cédula"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
               style={styles.input}
               type="password"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="********"
               required
              />
            </div>
          </div>
        </div>
        <button type="submit" style={styles.button}>
          Agregar Usuario
        </button>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default NuevoUsuario;