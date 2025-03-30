import React, { useEffect, useState } from 'react';

function Diagnosticos() {
  const [precioEscaneo, setPrecioEscaneo] = useState(null);

  useEffect(() => {
    fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const producto = data.find((p) => p.codigo?.toString() === "12167");
        if (producto?.precio) {
          setPrecioEscaneo(producto.precio);
        }
      })
      .catch((err) => console.error("Error cargando producto escaneo:", err));
  }, []);

  return (
    <div className="p-0 mt-2">
      <h4 className="fw-bold mb-2">
        <i className="bi bi-clipboard-check me-2"></i>ACERCA DE YPF BOXES
      </h4>
      <p className="mb-0 diagnostico-texto">
        En <strong>BOXES</strong>, además de cambiarte el aceite con <strong>ELAION</strong>, que es el <strong>recomendado</strong> en Argentina por las principales automotrices y <strong>formulado especialmente</strong> para tu vehículo brindando la <strong>máxima protección al motor</strong>,
        un <strong>ESPECIALISTA</strong> te revisa los <strong>27 puntos</strong> más importantes de tu auto <strong>sin costo de mano de obra</strong> : partes mecánicas, fluidos y filtros, elementos de seguridad y lubricantes. Además tenés la posibilidad de ampliar el diagnóstico con un <strong>Escaneo Electrónico</strong> (Servicio Premium) con <strong>9 puntos</strong> de control por un adicional de <strong>
          {precioEscaneo !== null
            ? `$${precioEscaneo.toLocaleString("es-AR").replace(/,/g, ".")}`
            : "cargando..."}
        </strong>.
        Se entrega un <strong>certificado de producto y servicio</strong> garantizando la <strong>calidad del Lubricante</strong> utilizado. También se genera un <strong>historial del vehículo</strong> que te facilitará el mantenimiento y podrás consultarlo en <strong>APP YPF</strong> y en toda la <strong>RED Boxes</strong> a nivel nacional.
      </p>
    </div>
  );
}

export default Diagnosticos;
