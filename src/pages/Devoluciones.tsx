import React, { useState } from "react";

// Datos simulados de devoluciones
const devoluciones = [
  { id: 1, usuario: "Juan", fecha: "2024-06-10", producto: "Martillo", cantidad: 1, motivo: "Defectuoso" },
  { id: 2, usuario: "Ana", fecha: "2024-06-11", producto: "Clavos", cantidad: 2, motivo: "No era el tamaño correcto" },
  { id: 3, usuario: "Pedro", fecha: "2024-06-12", producto: "Taladro", cantidad: 1, motivo: "No funcionaba" },
];

// Hook para detectar ancho de pantalla
function useWindowWidth() {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const getResponsiveStyles = (width: number) => ({
  container: {
    padding: width < 600 ? 10 : 32,
    fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
    background: '#f4f6fb',
    minHeight: '100vh',
  } as React.CSSProperties,
  card: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    marginBottom: width < 600 ? 16 : 32,
    padding: width < 600 ? 10 : 24,
    transition: 'box-shadow 0.2s',
    overflowX: 'auto' as const,
  } as React.CSSProperties,
  table: {
    width: '100%',
    minWidth: 500,
    borderCollapse: 'collapse',
    marginTop: 12,
    fontSize: width < 600 ? 13 : 16,
  } as React.CSSProperties,
  th: {
    background: '#2d3e50',
    color: '#fff',
    padding: width < 600 ? '8px 4px' : '12px 8px',
    fontWeight: 600,
    textAlign: 'left',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    fontSize: width < 600 ? 13 : 15,
  } as React.CSSProperties,
  td: {
    padding: width < 600 ? '7px 4px' : '10px 8px',
    borderBottom: '1px solid #e0e6ed',
    color: '#2d3e50',
    background: '#f9fafc',
    fontSize: width < 600 ? 13 : 15,
  } as React.CSSProperties,
  trHover: {
    background: '#eaf1fb',
  } as React.CSSProperties,
  titulo: {
    fontSize: width < 600 ? 20 : 28,
    fontWeight: 800,
    color: '#1a2233',
    marginBottom: width < 600 ? 16 : 32,
    letterSpacing: 1,
    textAlign: width < 600 ? "center" : "left",
  } as React.CSSProperties,
  searchBox: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: width < 600 ? 'center' : 'flex-start',
  } as React.CSSProperties,
  input: {
    padding: width < 600 ? '8px 8px' : '8px 14px',
    borderRadius: 6,
    border: '1px solid #b0b8c1',
    fontSize: width < 600 ? 14 : 16,
    outline: 'none',
    width: width < 600 ? "100%" : 420,
    minWidth: width < 600 ? 0 : 200,
    background: '#fff',
    color: '#2d3e50',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    transition: 'border 0.2s',
    maxWidth: width < 600 ? "98vw" : 420,
  } as React.CSSProperties,
});

export default function Devoluciones() {
  const width = useWindowWidth();
  const styles = getResponsiveStyles(width);

  const [busqueda, setBusqueda] = useState("");

  const devolucionesFiltradas = devoluciones.filter((dev) => {
    const texto = busqueda.toLowerCase();
    return (
      dev.usuario.toLowerCase().includes(texto) ||
      dev.producto.toLowerCase().includes(texto) ||
      dev.fecha.includes(texto) ||
      dev.motivo.toLowerCase().includes(texto) ||
      dev.id.toString().includes(texto)
    );
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Productos Devueltos por Usuario</h2>
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar por usuario, producto, fecha, motivo o ID..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Usuario</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Producto</th>
              <th style={styles.th}>Cantidad</th>
              <th style={styles.th}>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {devolucionesFiltradas.length === 0 && (
              <tr>
                <td style={styles.td} colSpan={6} align="center">No hay devoluciones registradas.</td>
              </tr>
            )}
            {devolucionesFiltradas.map((dev, idx) => (
              <tr key={dev.id} style={idx % 2 === 0 ? undefined : styles.trHover}>
                <td style={styles.td}>{dev.id}</td>
                <td style={styles.td}>{dev.usuario}</td>
                <td style={styles.td}>{dev.fecha}</td>
                <td style={styles.td}>{dev.producto}</td>
                <td style={styles.td}>{dev.cantidad}</td>
                <td style={styles.td}>{dev.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}