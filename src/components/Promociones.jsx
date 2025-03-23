import React from "react";
import "../assets/css/Promociones.css"; // Estilos personalizados

function Promociones() {
  const promociones = [
    {
      id: 1,
      imagen: "./nacion.jpg",
      descripcion: "Club La Nación – 30% de descuento (tope $10.000).",
    },
    {
      id: 2,
      imagen: "./Promoescalonado.jpg",
      descripcion: "Escalonada ServiClub (ahorrá hasta $49.000).",
    },
    {
      id: 3,
      imagen: "./Promo20porciento.jpg",
      descripcion: "20% de descuento con ELAION sintético y semisintético.",
    },
    {
      id: 4,
      imagen: "./Promo_uber.png",
      descripcion: "Uber DIAMANTE - 30% de descuento (tope $23.000).",
    },
    {
      id: 5,
      imagen: "./Promo_cuotas.png",
      descripcion: "3 y 6 cuotas sin interés (Pagando con App YPF VISA/MASTERCARD).",
    },
  ];

  return (
    <div className="container mt-4 promociones-container promos-mobile">
      <h2 className="text-dark fw-bold fs-5 mb-3">
        <i className="bi bi-camera me-2"></i> PROMOCIONES VIGENTES
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-2">
        {promociones.map((promo) => (
          <div key={promo.id} className="col">
            <div className="card h-100 shadow-sm promo-card">
              <img src={promo.imagen} className="card-img-top" alt={promo.titulo} />
              <div className="card-body p-2 d-flex flex-column justify-content-between">
                <p className="card-text text-center mb-1">{promo.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promociones;
