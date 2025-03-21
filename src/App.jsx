import React, { useState, useRef } from 'react';
import Membrete from "./components/Membrete";
import BuscarModelo from './components/BuscarModelo.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import Configuracion from "./components/Configuracion.jsx";
import Promociones from './components/Promociones.jsx';
import Diagnosticos from './components/Diagnosticos.jsx';
import "./assets/css/styles.css";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";

function App() {
  const [productos, setProductos] = useState([]);
  const [direccion, setDireccion] = useState(localStorage.getItem("direccion") || "Bartolomé Mitre 1666");
  const [telefono, setTelefono] = useState(localStorage.getItem("telefono") || "1138110074");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

  const exportRef = useRef();

  const actualizarDatos = (nuevaDireccion, nuevoTelefono) => {
    setDireccion(nuevaDireccion);
    setTelefono(nuevoTelefono);
  };

  const prepararParaExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "none"));
  };

  const restaurarDespuesDeExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "block"));
  };

  // 🔹 Generar nombre dinámico para el archivo PDF con fecha y hora
  const generarNombreArchivo = () => {
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(/[-:T\s]/g, '');

    const modelo = vehiculoSeleccionado
      ? `${vehiculoSeleccionado.marca}-${vehiculoSeleccionado.modelo}`.replace(/\s+/g, '-')
      : 'Presupuesto';

    return `${modelo}_${fechaHora}.pdf`;
  };

  // 🔹 Exportar a PDF con márgenes reducidos
  const exportarPDF = () => {
    prepararParaExportar();
    setTimeout(() => {
      const opt = {
        margin: [2, 5, 2, 5], // 🔹 Márgenes aún más reducidos [top, left, bottom, right]
        filename: generarNombreArchivo(),
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(exportRef.current).save();
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  // 🔹 Función para imprimir sin margen extra
  const imprimir = () => {
    prepararParaExportar();
    setTimeout(() => {
      window.print();
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  return (
    <>
      {/* Botones de acción (ocultos al imprimir/exportar) */}
      <div className="text-end mb-3 ocultar-al-exportar container">
        <button className="btn btn-primary me-2" onClick={imprimir}>
          <FaPrint /> Imprimir
        </button>
        <button className="btn btn-danger" onClick={exportarPDF}>
          <FaFilePdf /> Exportar PDF
        </button>
      </div>

      {/* Contenido que se exporta a PDF e imprime */}
      <div ref={exportRef} className="container mt-2 presupuesto-print">
        <Membrete direccion={direccion} telefono={telefono} />
        <BuscarModelo setProductos={setProductos} setVehiculoSeleccionado={setVehiculoSeleccionado} />
        <ListaProductos productos={productos} setProductos={setProductos} />
       
        <Diagnosticos />
        <Promociones />

        {/* Configuración se oculta tanto al imprimir como al exportar */}
        <div className="no-print ocultar-al-exportar">
          <Configuracion actualizarDatos={actualizarDatos} />
        </div>
      </div>
    </>
  );
}

export default App;
