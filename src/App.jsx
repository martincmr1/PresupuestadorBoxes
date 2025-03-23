import React, { useState, useRef } from 'react';
import Membrete from "./components/Membrete";
import BuscarModelo from './components/BuscarModelo.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import Configuracion from "./components/Configuracion.jsx";
import Promociones from './components/Promociones.jsx';
import Diagnosticos from './components/Diagnosticos.jsx';
import NotaLegal from './components/NotaLegal.jsx';

import './assets/css/modoUsuario.css';
import './assets/css/pdfExport.css';
import './assets/css/printMode.css';

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
    document.querySelectorAll(".solo-al-exportar").forEach((el) => (el.style.display = "block"));
  };

  const restaurarDespuesDeExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "block"));
    document.querySelectorAll(".solo-al-exportar").forEach((el) => (el.style.display = "none"));
  };

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

  const exportarPDF = () => {
    prepararParaExportar();

    // 👉 Activar atributos para aplicar estilos especiales en PDF
    document.documentElement.setAttribute("data-pdf-export", "true");

    setTimeout(() => {
      const opt = {
        margin: 0,
        filename: generarNombreArchivo(),
        html2canvas: {
          scale: 1.3,
          useCORS: true,
          scrollY: 0
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      html2pdf().set(opt).from(exportRef.current).save();

      setTimeout(() => {
        // 👈 Restaurar luego del export
        restaurarDespuesDeExportar();
        document.documentElement.removeAttribute("data-pdf-export");
      }, 500);
    }, 300);
  };

  const imprimir = () => {
    prepararParaExportar();

    const style = document.createElement("style");
    style.innerHTML = `
      @page { size: A4; margin: 0; }
      html, body { overflow: hidden !important; }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.head.removeChild(style);
        restaurarDespuesDeExportar();
      }, 500);
    }, 300);
  };

  return (
    <div className="modo-usuario">
      <div className="text-end mb-3 ocultar-al-exportar container">
        <button className="btn btn-primary me-2" onClick={imprimir}>
          <FaPrint /> Imprimir
        </button>
        <button className="btn btn-danger" onClick={exportarPDF}>
          <FaFilePdf /> Exportar PDF
        </button>
      </div>

      <div ref={exportRef} className="container mt-2 presupuesto-print">
        <Membrete direccion={direccion} telefono={telefono} />
        <BuscarModelo setProductos={setProductos} setVehiculoSeleccionado={setVehiculoSeleccionado} />
        <ListaProductos productos={productos} setProductos={setProductos} />




        
        <Promociones />

        {/* 🔥 Diagnóstico y NotaLegal solo visibles al exportar */}
        <div className="solo-al-exportar">
          <Diagnosticos />
          <div className="nota-legal border rounded mt-4 bg-light text-center small text-muted" style={{ fontStyle: "italic" }}>
            <NotaLegal />
          </div>
        </div>

        <div className="ocultar-al-exportar">
          <Configuracion actualizarDatos={actualizarDatos} />
        </div>
      </div>
    </div>
  );
}

export default App;
