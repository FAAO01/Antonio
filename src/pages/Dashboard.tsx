import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler, // <-- Importa Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Filler // <-- Registra Filler aquí
);

// Datos de ejemplo
const ventasPorDia = {
  labels: [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
  ],
  datasets: [
    {
      label: "Ventas",
      data: [
        5, 8, 6, 10, 12, 7, 9, 11, 13, 15,
        14, 12, 10, 8, 9, 11, 13, 14, 16, 18,
        17, 15, 14, 13, 12, 10, 9, 8, 7, 6
      ],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const productosMasVendidos = {
  labels: ["Producto A", "Producto B", "Producto C", "Producto D", "Producto E"],
  datasets: [
    {
      label: "Unidades vendidas",
      data: [120, 90, 75, 60, 45],
      backgroundColor: [
        "#2563eb",
        "#22d3ee",
        "#f59e42",
        "#f43f5e",
        "#a3e635",
      ],
    },
  ],
};

const ingresosDelMes = {
  labels: [
    "Semana 1", "Semana 2", "Semana 3", "Semana 4"
  ],
  datasets: [
    {
      label: "Ingresos ($)",
      data: [1200, 1800, 1500, 2000],
      borderColor: "#16a34a",
      backgroundColor: "rgba(22,163,74,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const totalVentas = {
  labels: ["Ventas realizadas", "Meta restante"],
  datasets: [
    {
      label: "Total Ventas",
      data: [420, 80], // 420 ventas realizadas, meta 500
      backgroundColor: ["#f59e42", "#e5e7eb"],
      borderWidth: 0,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Ventas por día */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Ventas por Día (Mes Actual)</h3>
        <Line data={ventasPorDia} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
        }} />
      </div>

      {/* Productos más vendidos */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Productos Más Vendidos</h3>
        <Bar data={productosMasVendidos} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
          indexAxis: "y" as const,
        }} />
      </div>

      {/* Ingresos del mes */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-bold mb-2">Ingresos del Mes</h3>
        <Line data={ingresosDelMes} options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: false },
          },
        }} />
      </div>

      {/* Total de ventas */}
      <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center">
        <h3 className="text-lg font-bold mb-2">Total de Ventas</h3>

<div className="w-48 h-48 relative">
  <Doughnut
    data={totalVentas}
    options={{
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    }}
  />
  <div className="absolute flex flex-col items-center justify-center w-48 h-48 top-0 left-0 pointer-events-none">
    <span className="text-3xl font-bold text-orange-500">420</span>
    <span className="text-gray-500 text-sm">/ 500 meta</span>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;