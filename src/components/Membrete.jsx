import React from "react";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa"; // ✅ Iconos corregidos

function Membrete() {
  return (
    <div className="container-fluid bg-white p-3 shadow-sm">
      <div className="row align-items-center">
        {/* 🔵 Logo YPF */}
        <div className="col-md-4 d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e8/YPF-Logo.svg"
            alt="YPF Boxes"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <h5 className="fw-bold mb-0">
            BOXES <span className="text-muted fs-6">27 PUNTOS DE REVISIÓN + ESCANEO ELECTRÓNICO</span>
          </h5>
        </div>

        {/* 📅 Fecha y Hora */}
        <div className="col-md-4 text-center d-none d-md-block">
          <span className="fw-bold">{new Date().toLocaleDateString()}</span>,{" "}
          {new Date().toLocaleTimeString()}
        </div>

        {/* 📍 Ubicación y Contacto */}
        <div className="col-md-4 d-flex justify-content-end align-items-center">
          <FaMapMarkerAlt size={18} className="text-dark me-2" />
          <span className="me-3">Bartolomé Mitre 1666</span>

          <a
            href="https://api.whatsapp.com/send?phone=1138110074"
            target="_blank"
            rel="noopener noreferrer"
            className="text-success me-3"
          >
            <FaWhatsapp size={22} />
            <span className="ms-1">1138110074</span>
          </a>

          {/* 📱 App YPF */}
          <a href="https://www.ypf.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.ypf.com/favicon.ico"
              alt="App YPF"
              style={{ height: "25px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Membrete;
