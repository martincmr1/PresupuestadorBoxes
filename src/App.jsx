import React, { useState, useRef } from 'react';
import Membrete from "./components/Membrete";
import BuscarModelo from './components/BuscarModelo.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import Configuracion from "./components/Configuracion.jsx";
import Promociones from './components/Promociones.jsx';
import Diagnosticos from './components/Diagnosticos.jsx';
import "./assets/css/styles.css";

console.log("🚀 App.jsx está funcionando...");

function App() {
  const [productos, setProductos] = useState([]);
  const [direccion, setDireccion] = useState(localStorage.getItem("direccion") || "Bartolomé Mitre 1666");
  const [telefono, setTelefono] = useState(localStorage.getItem("telefono") || "1138110074");

  const presupuestoRef = useRef();

  const actualizarDatos = (nuevaDireccion, nuevoTelefono) => {
    setDireccion(nuevaDireccion);
    setTelefono(nuevoTelefono);
  };

  return (
    <div className="container mt-5">
      <Membrete direccion={direccion} telefono={telefono} />
      <BuscarModelo setProductos={setProductos} />

      {/* Presupuesto (mismo contenido exportado e impreso) */}
      <div ref={presupuestoRef} className="presupuesto-print">
        <ListaProductos
          productos={productos}
          setProductos={setProductos}
          presupuestoRef={presupuestoRef}
        />
      </div>

      <Promociones />
      <Diagnosticos />

      {/* Configuración solo visible en pantalla */}
      <div className="no-print">
        <Configuracion actualizarDatos={actualizarDatos} />
      </div>
    </div>
  );
}

export default App;
