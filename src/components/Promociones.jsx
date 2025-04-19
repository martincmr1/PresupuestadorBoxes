import React from "react";
import "../assets/css/Promociones.css";

function Promociones({ esAca }) {
  const promociones = [
    {
      id: 1,
      imagen: "./acapromo.png",
      descripcion: "10% de descuento en Lubricantes Elaion de 1 y 4 litros. <strong>Exclusivo línea auto (tope mensual ACA)</strong>",
    },
    {
      id: 2,
      imagen: "./Promoescalonado.jpg",
      descripcion: "Escalonada ServiClub (ahorrá hasta $49.000). <strong>Vigencia: hasta el 30/04/2025</strong>",
    },
    {
      id: 3,
      imagen: "./Promo_cuotas.png",
      descripcion: "3 y 6 cuotas sin interés Pagando con App YPF (VISA/MASTERCARD).<strong>Vigencia: hasta el 30/04/2025</strong>",
    },
    {
      id: 4,
      imagen: "./nacion.jpg",
      descripcion: "30% de descuento en tu cambio con aceites sintéticos (tope $25.000) Pagando a través de App YPF. <strong>Vigencia: hasta el 30/04/2025</strong>",
    },
    {
      id: 5,
      imagen: "./Promo_uber.png",
      descripcion: "Uber DIAMANTE - 30% de descuento (tope $23.000 Exclusivo línea Elaion Auro y Fs) ó (tope $8500 con línea Elaion Ts). <strong>Vigencia: hasta el 30/04/2025</strong>",
    },
  ];

  return (
    <div className="container mt-4 promociones-container promos-mobile">
      <h2 className="text-dark fw-bold fs-5 mb-3">
        <i className="bi bi-gift me-2"></i> PROMOCIONES VIGENTES
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-2">
        {promociones.map((promo) => {
          if (promo.id === 1 && !esAca) {
            return (
              <div key="imagen-alternativa" className="col">
                <div className="card h-100 shadow-sm promo-card">
                  <img
                    src="./elaion-auro-cuadrada.png"
                    className="card-img-top"
                    alt="Promoción alternativa sin ACA"
                  />
                   <p className="card-text text-center mb-1 p-2">
  <strong>ELAION AURO</strong>: El lubricante premium de YPF con Tecnología en Evolución Constante (TEC®) 
</p>


                </div>
              </div>
            );
          }

          if (promo.id === 1 && !esAca) return null;

          return (
            <div key={promo.id} className="col">
              <div className="card h-100 shadow-sm promo-card">
                <img
                  src={promo.imagen}
                  className="card-img-top"
                  alt={`Promo ${promo.id}`}
                />
                <div className="card-body p-2 d-flex flex-column justify-content-between">
                  <p
                    className="card-text text-center mb-1"
                    dangerouslySetInnerHTML={{ __html: promo.descripcion }}
                  ></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Promociones;
