import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

function Membrete() {
  const [direccion, setDireccion] = useState("Bartolomé Mitre 1666");
  const [telefono, setTelefono] = useState("1138110074");

  // 🔹 Cargar valores almacenados en localStorage
  useEffect(() => {
    const dirGuardada = localStorage.getItem("direccion");
    const telGuardado = localStorage.getItem("telefono");

    if (dirGuardada) setDireccion(dirGuardada);
    if (telGuardado) setTelefono(telGuardado);
  }, []);

  const fecha = new Date().toLocaleDateString();
  const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="container-fluid bg-white p-3 shadow-sm">
      <div className="row align-items-center justify-content-between">
        {/* 🔵 Logo en la esquina superior izquierda */}
        <div className="col-auto d-flex align-items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
            <img 
              src="./logo boxes@200x.png" 
              className="logo-boxes"
              alt="YPF Boxes" 
              style={{ height: "30px" }}
              
            />
          </a>
        </div>

        {/* 📌 Texto Centrado */}
        <div className="col text-center texto-membrete">
          <h5 className="fw-bold mb-0 ">
            <span className="text-muted fs-6">
              27 PUNTOS DE REVISIÓN + ESCANEO ELECTRÓNICO
            </span>
          </h5>
        </div>

        {/* 📅 Fecha y Hora */}
        <div className="col-auto text-end fecha-hora">
          <span className="fw-bold d-block">{fecha}</span>
          <span className="text-muted">{hora}</span>
        </div>
      </div>

      {/* Segunda fila con Dirección, Turnos y Teléfono */}
      <div className="row align-items-center justify-content-between mt-2">
        {/* 📍 Dirección */}
        <div className="col-auto d-flex align-items-center">
          <FaMapMarkerAlt size={18} className="text-dark me-2" />
          <span className="me-4">{direccion}</span>
        </div>

        {/* 📱 Turnos, APP YPF y Teléfono */}

       
        <div className="col-auto d-flex align-items-center ">
          <span className="fw-bold text-dark me-2 turnos-text">Turnos</span> <span className="app-text">👉</span>

          <div className="d-flex align-items-center ms-3  ">
            <img  className="app-text" src="./applogo.png" alt="APP YPF" style={{ height: "20px", marginRight: "5px" }} />
            <span className="text-dark fw-bold app-text">APP YPF</span>
          </div>
         

          <div className="d-flex align-items-center ms-3">
            <FaWhatsapp size={22} className="text-success " />
            <span className="ms-1 fw-bold">{telefono}</span> {/* 🔹 Teléfono ahora es texto normal */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membrete;
