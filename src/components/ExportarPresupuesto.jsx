import React, { useRef } from "react";
import { FaPrint, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";

function ExportarPresupuesto({ productos }) {
  const presupuestoRef = useRef();

  // 🔹 Oculta elementos antes de exportar
  const prepararParaExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "none"));
  };

  // 🔹 Restaura la vista después de exportar
  const restaurarDespuesDeExportar = () => {
    document.querySelectorAll(".ocultar-al-exportar").forEach((el) => (el.style.display = "block"));
  };

  // 🔹 Imprimir
  const imprimirPresupuesto = () => {
    prepararParaExportar();
    setTimeout(() => {
      window.print();
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  // 🔹 Exportar a PDF
  const exportarPDF = () => {
    prepararParaExportar();
    setTimeout(() => {
      html2pdf().from(presupuestoRef.current).save("Presupuesto.pdf");
      setTimeout(restaurarDespuesDeExportar, 500);
    }, 300);
  };

  // 🔹 Cálculo de Totales
  const total = productos.reduce((acc, p) => acc + (p.precio * (p.cantidad || 1)), 0);
  const totalCuotas = total / 6; // 🔹 Total en 6 cuotas sin interés

  return (
    <div>
      {/* 🔹 Botones de acción (NO se imprimen ni exportan) */}
      <div className="text-end my-3 ocultar-al-exportar">
        <button className="btn btn-primary me-2" onClick={imprimirPresupuesto}>
          <FaPrint /> Imprimir
        </button>
        <button className="btn btn-danger" onClick={exportarPDF}>
          <FaFilePdf /> Exportar PDF
        </button>
      </div>

      {/* 🔹 Solo toma los datos sin volver a renderizar la lista */}
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
                <td>{producto.descripcion}</td>
                <td className="text-end">{producto.cantidad || 1}</td>
                <td className="text-end">
                  <strong>${(producto.precio * (producto.cantidad || 1)).toFixed(2)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔹 Mostrar totales sin re-renderizar la lista */}
        <h5 className="text-end fw-bold">
          Total: ${total.toFixed(2)}
        </h5>
        <h6 className="text-end text-muted">
          Total en 6 cuotas sin interés con Visa o Mastercard (Exclusivo App YPF): 
          <strong> ${totalCuotas.toFixed(2)} x 6</strong>
        </h6>
      </div>
    </div>
  );
}

export default ExportarPresupuesto;
