import React from "react";

function ListaProductos({ productos, setProductos }) {
  const total = productos.reduce((acc, p) => acc + (p.precio * (p.cantidad || 1)), 0);
  const totalCuotas = total / 6;

  return (
    <div>
      <ul className="list-group ocultar-al-exportar">
        {productos.map((producto, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <input
              type="text"
              value={producto.descripcion}
              className="form-control form-control-sm border-0"
              readOnly
            />
            <input
              type="number"
              min="1"
              value={producto.cantidad || 1}
              className="form-control form-control-sm mx-2 text-end border-0"
              readOnly
            />
            <strong>${(producto.precio * (producto.cantidad || 1)).toFixed(2)}</strong>
            <button
              className="btn btn-danger btn-sm ms-2 ocultar-al-exportar"
              onClick={() => {
                setProductos(productos.filter((_, i) => i !== index));
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="text-end mt-2 ocultar-al-exportar">
        <button
          className="btn btn-primary"
          onClick={() =>
            setProductos([...productos, { descripcion: "", cantidad: 1, precio: 0 }])
          }
        >
          Agregar Producto
        </button>
      </div>

      <div className="p-3 border bg-white mt-4 presupuesto-print-inner">
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
                  <strong>${(producto.precio * (producto.cantidad || 1)).toFixed(0)}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5 className="text-end fw-bold">Total Servicio Premium: ${total.toFixed(0)}</h5>
        <h6 className="text-end text-muted">
          Total en 6 cuotas sin interés con Visa o Mastercard (Exclusivo App YPF): 
          <strong> ${totalCuotas.toFixed(0)} x 6</strong>
        </h6>
      </div>
    </div>
  );
}

export default ListaProductos;
