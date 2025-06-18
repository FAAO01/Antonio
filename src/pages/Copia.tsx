import React, { useRef } from 'react';

const Copia: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulación: obtener todos los datos de localStorage
  const getAllData = () => {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key);
      }
    }
    return data;
  };

  // Descargar datos como archivo JSON
  const handleExport = () => {
    const data = getAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'copia_seguridad.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar datos desde archivo JSON
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        Object.keys(data).forEach((key) => {
          localStorage.setItem(key, data[key]);
        });
        alert('Restauración completada.');
      } catch (err) {
        alert('Archivo inválido.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: 32,
        maxWidth: 400,
        margin: '40px auto',
      }}
    >
      <h2 style={{ color: '#22223b', marginBottom: 32, fontWeight: 700, letterSpacing: 1 }}>
        Copia de Seguridad y Restauración
      </h2>
      <button
        onClick={handleExport}
        style={{
          background: 'linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 20,
          boxShadow: '0 2px 8px rgba(79,140,255,0.08)',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #38b6ff 0%, #4f8cff 100%)')}
        onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #4f8cff 0%, #38b6ff 100%)')}
      >
        Exportar copia de seguridad
      </button>
      <input
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImport}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
          color: '#22223b',
          border: 'none',
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 0,
          boxShadow: '0 2px 8px rgba(67,233,123,0.08)',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)')}
        onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)')}
      >
        Restaurar copia de seguridad
      </button>
    </div>
  );
};

export default Copia;
