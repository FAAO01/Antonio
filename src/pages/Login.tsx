import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email === "admin@demo.com" && password === "1234") {
      navigate("/dashboard"); // Redirigir al Layout después de login
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Iniciar sesión</h2>

        {/* Imagen debajo del título */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="Login" className="w-24 h-24" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
