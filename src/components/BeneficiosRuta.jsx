import React from "react";
import "../assets/css/Promociones.css";

function BeneficiosRuta() {
  const beneficios = [
    {
      id: 1,
      imagen: "./beneficios1.jpg",
      descripcion: "Chequeo gratuito de niveles y presión de neumáticos en ruta. <strong>¡Tu seguridad primero!</strong>",
    },
    {
      id: 2,
      imagen: "./beneficios2.jpg",
      descripcion: "Wi-Fi gratuito en boxes seleccionados. <strong>Conectado estés donde estés</strong>",
    },
    {
      id: 3,
      imagen: "./beneficios3.jpg",
      descripcion: "Café de cortesía mientras esperás. <strong>Porque merecés una pausa</strong>",
    },
    {
      id: 4,
      imagen: "./beneficios4.jpg",
      descripcion: "Diagnóstico electrónico básico sin cargo. <strong>Viaje más seguro</strong>",
    },
    {
      id: 5,
      imagen: "./beneficios5.jpg",
      descripcion: "Descuento especial en ruta. <strong>Mostrá este presupuesto y accedé</strong>",
    },
  ];

  return (
    <div className="container mt-4 promociones-container promos-mobile">
      <h2 className="text-dark fw-bold fs-5 mb-3">
        <i className="bi bi-signpost-split me-2"></i> BENEFICIOS YPF EN RUTA
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-2">
        {beneficios.map((beneficio) => (
          <div key={beneficio.id} className="col">
            <div className="card h-100 shadow-sm promo-card">
              <img
                src={beneficio.imagen}
                className="card-img-top"
                alt={`Beneficio ${beneficio.id}`}
              />
              <div className="card-body p-2 d-flex flex-column justify-content-between">
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeneficiosRuta;
