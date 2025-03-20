import React, { useRef } from "react";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";

function ExportarPresupuesto({ productos }) {
  const presupuestoRef = useRef();

  // 🔹 Oculta elementos antes de imprimir/exportar
  const prepararParaExportar = () => {
    const elementosOcultar = document.querySelectorAll(".busqueda-vehiculo, .eliminar-btn, .agregar-btn");
    elementosOcultar.forEach((el) => (el.style.display = "none"));
    
    document.querySelectorAll(".cantidad-input").forEach((input) => {
      input.style.appearance = "none";
      input.style.border = "none";
    });

    document.querySelectorAll(".descripcion-input").forEach((input) => {
      input.style.border = "none";
    });
  };

  // 🔹 Restaura la vista después de imprimir/exportar
  const restaurarDespuesDeExportar = () => {
    const elementosOcultar = document.querySelectorAll(".busqueda-vehiculo, .eliminar-btn, .agregar-btn");
    elementosOcultar.forEach((el) => (el.style.display = "block"));

    document.querySelectorAll(".cantidad-input").forEach((input) => {
      input.style.appearance = "auto";
      input.style.border = "1px solid #ccc";
    });

    document.querySelectorAll(".descripcion-input").forEach((input) => {
      input.style.border = "1px solid #ccc";
    });
  };

  // 🔹 Función para imprimir
  const imprimirPresupuesto = () => {
    prepararParaExportar();
    setTimeout(() => {
      window.print();
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  // 🔹 Función para exportar a PDF
  const exportarPDF = () => {
    prepararParaExportar();
    setTimeout(() => {
      html2pdf().from(presupuestoRef.current).save("Presupuesto.pdf");
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  return (
    <div>
      <div className="text-end my-3">
        <button className="btn btn-primary me-2" onClick={imprimirPresupuesto}>
          <FaPrint /> Imprimir
        </button>
        <button className="btn btn-danger" onClick={exportarPDF}>
          <FaFilePdf /> Exportar PDF
        </button>
      </div>

      <div ref={presupuestoRef} className="p-3 border bg-white">
        <h4 className="text-center fw-bold">Presupuesto de Cambio de Aceite</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th className="text-end">Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={producto.descripcion}
                    className="descripcion-input form-control-plaintext"
                    readOnly
                  />
                </td>
                <td className="text-end">
                  <input
                    type="number"
                    min="1"
                    value={producto.cantidad || 1}
                    className="cantidad-input form-control text-end"
                    readOnly
                  />
                </td>
                <td className="text-end">
                  <strong>${(producto.precio * (producto.cantidad || 1)).toFixed(2)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5 className="text-end fw-bold">
          Total: ${productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2)}
        </h5>
      </div>
    </div>
  );
}

export default ExportarPresupuesto;
