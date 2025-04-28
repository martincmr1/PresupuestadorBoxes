import React, { useEffect, useRef, useState } from "react";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import Modal from "react-bootstrap/Modal";

import ListaProductos from "./components/ListaProductos";
import ListaProductosYer from "./components/ListaProductosYer";
import BuscarModelo from "./components/BuscarModelo";
import Configuracion from "./components/Configuracion";
import Promociones from "./components/Promociones";
import Diagnosticos from "./components/Diagnosticos";
import NotaLegal from "./components/NotaLegal";
import CrudVehiculos from "./components/CrudVehiculos";
import Membrete from "./components/Membrete";
import BeneficiosRuta from "./components/BeneficiosRuta";

import "./assets/css/modoUsuario.css";
import "./assets/css/pdfExport.css";
import "./assets/css/printMode.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [direccion, setDireccion] = useState(localStorage.getItem("direccion") || "Bartolomé Mitre 1666");
  const [telefono, setTelefono] = useState(localStorage.getItem("telefono") || "1138110074");
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [esAca, setEsAca] = useState(true);
  const [mostrarAcciones, setMostrarAcciones] = useState(false);
  const [exportandoPDF, setExportandoPDF] = useState(false);
  const exportRef = useRef();

  const actualizarDatos = (nuevaDireccion, nuevoTelefono) => {
    if (nuevaDireccion) setDireccion(nuevaDireccion);
    if (nuevoTelefono) setTelefono(nuevoTelefono);
  };

  const prepararParaExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "none"));
    document.querySelectorAll(".solo-al-exportar").forEach((el) => (el.style.display = "block"));
    document.querySelectorAll(".background-print, .backgrund-membrete, .logo-invertido, .whatsapp-icon").forEach((el) => {
      el.classList.remove("background-print", "backgrund-membrete", "logo-invertido", "whatsapp-icon");
    });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      prepararParaExportar();
      const el = exportRef.current;
      el.classList.add("exportar-forzado");

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

        html2pdf().set(opt).from(el).save().then(() => {
          window.location.reload();
        });
      }, 500);
    }, 500);
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
        window.location.reload();
      }, 500);
    }, 300);
  };

  const renderListaProductos = () => {
    if (vehiculoSeleccionado?.modelo === "YER") {
      return (
        <ListaProductosYer productos={productos} setProductos={setProductos} setMostrarAcciones={setMostrarAcciones} />
      );
    }
    return (
      <ListaProductos productos={productos} setProductos={setProductos} setMostrarAcciones={setMostrarAcciones} />
    );
  };

  return (
    <div className="modo-usuario background-print">
      <div ref={exportRef} className="container mt-2 presupuesto-print">
        <Membrete direccion={direccion} telefono={telefono} />

        <BuscarModelo setProductos={setProductos} setVehiculoSeleccionado={setVehiculoSeleccionado} />

        {renderListaProductos()}

        {mostrarAcciones && (
          <div className="text-end mb-3 ocultar-al-exportar">
            <button className="btn btn-primary me-5 btn-mobile" onClick={imprimir}>
              <FaPrint /> Imprimir
            </button>
            <button className="btn btn-danger me-5 btn-mobile" onClick={exportarPDF}>
              <FaFilePdf /> Exportar PDF
            </button>
          </div>
        )}

        {vehiculoSeleccionado?.modelo === "YER" ? (
          <BeneficiosRuta />
        ) : (
          <Promociones esAca={esAca} />
        )}

        <div className="solo-al-exportar">
          <Diagnosticos />
          <div className="nota-legal border rounded mt-4 bg-light text-center small text-muted" style={{ fontStyle: "italic" }}>
            <NotaLegal />
          </div>
        </div>

        <div className="ocultar-al-exportar">
          <Configuracion actualizarDatos={actualizarDatos} esAca={esAca} setEsAca={setEsAca} />
          <CrudVehiculos />
        </div>
      </div>
    </div>
  );
}

export default App;
