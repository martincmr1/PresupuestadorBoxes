import React from "react";
import "../assets/css/Promociones.css"; // Estilos personalizados

function Promociones() {
  const promociones = [
   /*{
      id: 1,
      imagen: "./acapromo.png",
      descripcion: "20% de descuento con ELAION sintético y semisintético reservando turno en App YPF. <strong>Vigencia: hasta el 31/03/2025</strong>",
    },
    */
    
    {
      id: 1,
      imagen: "./acapromo.png",
      descripcion: "10% de descuento en Lubricantes Elaion de 1 y 4 litros . <strong>Exclusivo linea auto (tope mensual ACA)</strong>",
    },
    
    
    
    {
      id: 2,
      imagen: "./servi50.jpg",
      descripcion: "Escalonada ServiClub 50% puntos(Exclusivo para servicios reservados con App YPF).<strong>Vigencia: hasta el 15/04/2025</strong>",
    },
    {
      id: 3,
      imagen: "./Promo_cuotas.png",
      descripcion:
        "3 y 6 cuotas sin interés Pagando con App YPF (VISA/MASTERCARD).<strong>Vigencia: hasta el 30/04/2025</strong>",
      
      
    },
    {
      id: 4,
      imagen: "./nacion.jpg",
      descripcion:
        "30% de descuento en tu cambio con aceites sintéticos (tope $25.000) Pagando a travez de App YPF. <strong>Vigencia: hasta el 30/04/2025</strong>",
    },
    {
      id: 5,
      imagen: "./Promo_uber.png",
      descripcion: "Uber DIAMANTE - 30% de descuento (tope $23.000 Exclusivo linea Elaion Auro y Fs)  ó  (tope $8500 con linea Elaion Ts) .<strong>Vigencia: hasta el 30/04/2025</strong>",
     
    },
  ];

  return (
    <div className="container mt-4 promociones-container promos-mobile">
      <h2 className="text-dark fw-bold fs-5 mb-3">
        <i className="bi bi-gift me-2"></i> PROMOCIONES VIGENTES
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-2">
        {promociones.map((promo) => (
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
        ))}
      </div>
    </div>
  );
}

export default Promociones;
