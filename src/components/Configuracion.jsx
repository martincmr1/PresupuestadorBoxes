import React, { useState, useEffect } from "react";

function Configuracion({ actualizarDatos }) {
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  // Cargar datos guardados en localStorage al montar el componente
  useEffect(() => {
    const dirGuardada = localStorage.getItem("direccion") || "Bartolomé Mitre 1666";
    const telGuardado = localStorage.getItem("telefono") || "1138110074";

    setDireccion(dirGuardada);
    setTelefono(telGuardado);
  }, []);

  // Guardar datos en localStorage y actualizar en la app
  const guardarConfiguracion = () => {
    localStorage.setItem("direccion", direccion);
    localStorage.setItem("telefono", telefono);
    actualizarDatos(direccion, telefono);
    alert("Configuración guardada correctamente ✅");
  };

  return (
    <div className="container mt-4 p-3 border rounded shadow-sm">
      <h4 className="text-center">Configuración</h4>

      <div className="mb-3">
        <label className="form-label fw-bold">Dirección</label>
        <input
          type="text"
          className="form-control"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Número de Teléfono</label>
        <input
          type="text"
          className="form-control"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={guardarConfiguracion}>
        Guardar Configuración
      </button>
    </div>
  );
}

export default Configuracion;
