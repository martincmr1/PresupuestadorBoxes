import React, { useEffect, useState } from "react";

function ListaProductos({ productos, setProductos }) {
  const [baseProductos, setBaseProductos] = useState([]);

  const total = productos.reduce(
    (acc, p) => acc + p.precio * (p.cantidad || 1),
    0
  );
  const totalCuotas = total / 6;

  useEffect(() => {
    fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json")
      .then((res) => res.json())
      .then((data) => setBaseProductos(data || []))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const actualizarProductoPorDescripcion = (index, valor) => {
    const valorTrim = valor.trim();
    const esCodigo = /^\d{5,}$/.test(valorTrim);

    const productoEncontrado = baseProductos.find((p) =>
      esCodigo
        ? p.codigo?.toString().trim() === valorTrim
        : p.descripcion?.toLowerCase().trim() === valorTrim.toLowerCase()
    );

    if (productoEncontrado) {
      const nuevos = [...productos];
      nuevos[index] = {
        ...productoEncontrado,
        descripcion: productoEncontrado.descripcion || productos[index].descripcion,
        precio: productoEncontrado.precio || 0,
        codigo: productoEncontrado.codigo, // 👈 se actualiza el código
        cantidad: productos[index].cantidad || 1,
      };
      setProductos(nuevos);
    }
  };

  const CODIGOS_PREMIUM = ["12167", "12168", "12160", "12179", "16448", "12177"];
  const contienePremium = productos.some((p) =>
    CODIGOS_PREMIUM.includes(p.codigo?.toString())
  );

  return (
    <div>
      <ul className="list-group ocultar-al-exportar">
        {productos.map((producto, index) => (
          <li
            key={index}
            className="list-group-item d-flex align-items-center"
          >
            <input
              type="text"
              list="sugerencias-productos"
              value={producto.descripcion}
              className="form-control form-control-sm border-0"
              onChange={(e) => {
                const nuevos = [...productos];
                nuevos[index].descripcion = e.target.value;
                setProductos(nuevos);
              }}
              onBlur={(e) =>
                actualizarProductoPorDescripcion(index, e.target.value)
              }
            />
            <input
              type="number"
              min="1"
              value={producto.cantidad || 1}
              className="form-control form-control-sm mx-2 text-end border-0"
              onChange={(e) => {
                const nuevos = [...productos];
                nuevos[index].cantidad = Number(e.target.value);
                setProductos(nuevos);
              }}
            />
            <strong>
              $
              {(producto.precio * (producto.cantidad || 1))
                .toLocaleString("es-AR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
                .replace(/,/g, ".")}
            </strong>
            <button
              className="btn btn-danger btn-sm ms-2 ocultar-al-exportar"
              title="Eliminar producto"
              onClick={() => {
                setProductos(productos.filter((_, i) => i !== index));
              }}
            >
              <i className="bi bi-trash text-white"></i>
            </button>
          </li>
        ))}
      </ul>

      <datalist id="sugerencias-productos">
        {baseProductos.map((p, i) => (
          <option
            key={i}
            value={p.descripcion}
            label={`$${p.precio?.toLocaleString("es-AR")} | Cód: ${p.codigo}`}
          />
        ))}
      </datalist>

      <div className="text-end mt-2 ocultar-al-exportar">
        <button
          className="btn btn-primary"
          onClick={() =>
            setProductos([
              ...productos,
              { descripcion: "", cantidad: 1, precio: 0 },
            ])
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
                  <strong>
                    $
                    {(producto.precio * (producto.cantidad || 1))
                      .toLocaleString("es-AR", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      .replace(/,/g, ".")}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h5 className="text-end fw-bold">
          Total {contienePremium ? "Servicio Premium" : "Servicio Completo o Express"}: $
          {total
            .toLocaleString("es-AR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
            .replace(/,/g, ".")}
        </h5>
        <h6 className="text-end text-muted">
          Total en 6 cuotas sin interés con Visa o Mastercard (Exclusivo App YPF):{" "}
          <strong>
            $
            {totalCuotas
              .toLocaleString("es-AR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
              .replace(/,/g, ".")}{" "}
            x 6
          </strong>
        </h6>
      </div>
    </div>
  );
}

export default ListaProductos;
