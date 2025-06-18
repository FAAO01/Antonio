import React, { useState } from "react";

// Datos simulados de ventas
const ventas = [
  { id: 1, usuario: "Juan", fecha: "2024-06-10", total: 200, detalles: [ { producto: "Martillo", cantidad: 2, precio: 100 } ] },
  { id: 2, usuario: "Ana", fecha: "2024-06-10", total: 50, detalles: [ { producto: "Clavos", cantidad: 5, precio: 10 } ] },
  { id: 3, usuario: "Juan", fecha: "2024-06-11", total: 100, detalles: [ { producto: "Destornillador", cantidad: 1, precio: 100 } ] },
  { id: 4, usuario: "Pedro", fecha: "2024-06-11", total: 150, detalles: [ { producto: "Serrucho", cantidad: 1, precio: 150 } ] },
  { id: 5, usuario: "Ana", fecha: "2024-06-12", total: 500, detalles: [ { producto: "Taladro", cantidad: 1, precio: 500 } ] },
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
  tableWrapper: {
    width: '100%',
    overflowX: 'auto' as const,
  },
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
  btn: {
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: width < 600 ? '4px 10px' : '6px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: width < 600 ? 13 : 15,
    transition: 'background 0.2s',
  } as React.CSSProperties,
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as React.CSSProperties,
  modal: {
    background: '#fff',
    borderRadius: 10,
    padding: width < 400 ? 10 : 32,
    minWidth: width < 400 ? 0 : 320,
    width: width < 400 ? "96vw" : undefined,
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    maxWidth: 400,
  } as React.CSSProperties,
  closeBtn: {
    background: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '4px 12px',
    cursor: 'pointer',
    fontWeight: 600,
    float: 'right',
    marginBottom: 12,
    fontSize: width < 600 ? 13 : 15,
  } as React.CSSProperties,
  detallesTitulo: {
    fontWeight: 700,
    fontSize: width < 600 ? 15 : 18,
    margin: '12px 0 8px 0',
    color: '#1976d2',
  } as React.CSSProperties,
  detallesTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 8,
    fontSize: width < 600 ? 13 : 15,
  } as React.CSSProperties,
  detallesTh: {
    background: '#f4f6fb',
    color: '#2d3e50',
    padding: '8px 6px',
    fontWeight: 600,
    textAlign: 'left',
    fontSize: width < 600 ? 13 : 15,
  } as React.CSSProperties,
  detallesTd: {
    padding: '7px 6px',
    borderBottom: '1px solid #e0e6ed',
    color: '#2d3e50',
    fontSize: width < 600 ? 13 : 15,
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
    width: width < 600 ? "100%" : 500,
    minWidth: width < 600 ? 0 : 200,
    background: '#fff',
    color: '#2d3e50',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
    transition: 'border 0.2s',
    maxWidth: width < 600 ? "98vw" : 500,
  } as React.CSSProperties,
});

export default function VentasDiarias() {
  const width = useWindowWidth();
  const styles = getResponsiveStyles(width);

  const [ventaSeleccionada, setVentaSeleccionada] = useState<null | typeof ventas[0]>(null);
  const [busqueda, setBusqueda] = useState("");

  const ventasFiltradas = ventas.filter((venta) => {
    const texto = busqueda.toLowerCase();
    return (
      venta.usuario.toLowerCase().includes(texto) ||
      venta.fecha.includes(texto) ||
      venta.id.toString().includes(texto)
    );
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Registro de Ventas</h2>
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar por nombre, fecha o ID..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>
      <div style={styles.card}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.length === 0 && (
                <tr>
                  <td style={styles.td} colSpan={5} align="center">No se encontraron resultados.</td>
                </tr>
              )}
              {ventasFiltradas.map((venta, idx) => (
                <tr key={venta.id} style={idx % 2 === 0 ? undefined : styles.trHover}>
                  <td style={styles.td}>{venta.id}</td>
                  <td style={styles.td}>{venta.usuario}</td>
                  <td style={styles.td}>{venta.fecha}</td>
                  <td style={styles.td}>${venta.total}</td>
                  <td style={styles.td}>
                    <button style={styles.btn} onClick={() => setVentaSeleccionada(venta)}>
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      {ventaSeleccionada && (
        <div style={styles.modalOverlay} onClick={() => setVentaSeleccionada(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setVentaSeleccionada(null)}>
              Cerrar
            </button>
            <div style={styles.detallesTitulo}>Detalles de la compra</div>
            <table style={styles.detallesTable}>
              <thead>
                <tr>
                  <th style={styles.detallesTh}>Producto</th>
                  <th style={styles.detallesTh}>Cantidad</th>
                  <th style={styles.detallesTh}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {ventaSeleccionada.detalles.map((detalle, i) => (
                  <tr key={i}>
                    <td style={styles.detallesTd}>{detalle.producto}</td>
                    <td style={styles.detallesTd}>{detalle.cantidad}</td>
                    <td style={styles.detallesTd}>${detalle.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}