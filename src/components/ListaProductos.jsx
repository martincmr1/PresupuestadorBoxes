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
    const valorNormalizado = valorTrim.replace(/\s+/g, "").toLowerCase();
    const esCodigoValido = /^[0-9]{5,}$/.test(valorTrim);

    let productoEncontrado = null;

    if (esCodigoValido) {
      productoEncontrado = baseProductos.find(
        (p) => p.codigo?.toString() === valorTrim
      );
    } else {
      productoEncontrado = baseProductos.find((p) => {
        const descNormalizada = p.descripcion?.toLowerCase().replace(/\s+/g, "");
        return descNormalizada === valorNormalizado;
      });
    }

    const nuevos = [...productos];

    if (productoEncontrado && productoEncontrado.precio > 0) {
      nuevos[index] = {
        ...productoEncontrado,
        cantidad: productos[index].cantidad || 1,
      };
      setProductos(nuevos);
    } else {
      nuevos.splice(index, 1); // eliminar si no es válido
      setProductos(nuevos);
    }
  };

  const CODIGOS_PREMIUM = ["12167", "12168", "12160", "12179", "16448", "12177"];
  const contienePremium = productos.some((p) =>
    CODIGOS_PREMIUM.includes(p.codigo?.toString())
  );

  const maximoProductos = 7;
  const puedeAgregarProducto = productos.length < maximoProductos;

  return (
    <div className="container p-0 m-0">
      <ul className="list-group ocultar-al-exportar">
        {productos.map((producto, index) => (
          <li
            key={index}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <input
              type="text"
              list="sugerencias-productos"
              value={producto.descripcion}
              className="form-control form-control-sm border-0"
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const nuevos = [...productos];
                nuevos[index].descripcion = e.target.value;
                setProductos(nuevos);
              }}
              onBlur={(e) => actualizarProductoPorDescripcion(index, e.target.value)}
              inputMode="text"
              autoComplete="off"
              style={{ textAlign: "left", paddingLeft: "8px", paddingRight: "8px" }}
            />

            <div className="d-flex align-items-center btn-group mx-2" role="group">
              <select
                className="form-select form-select-sm"
                value={producto.cantidad || 1}
                onChange={(e) => {
                  const nuevos = [...productos];
                  nuevos[index].cantidad = Number(e.target.value);
                  setProductos(nuevos);
                }}
                style={{ width: "60px" }}
              >
                {[...Array(9)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

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
                const nuevos = productos.filter((_, i) => i !== index);
                setProductos(nuevos);
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
            label={`Cód: ${p.codigo} | ${p.descripcion} | $${p.precio?.toLocaleString("es-AR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replace(/,/g, ".")}`}
          />
        ))}
      </datalist>

      <div className="text-end mt-2 ocultar-al-exportar">
        <button
          className="btn btn-primary btn-mobile"
          onClick={() =>
            setProductos([...productos, { descripcion: "", cantidad: 1, precio: 0 }])
          }
          disabled={!puedeAgregarProducto}
        >
          Agregar Producto
        </button>
        {!puedeAgregarProducto && (
          <small className="text-danger d-block mt-1">
            Límite máximo de 7 productos alcanzado.
          </small>
        )}
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

        <h5 className="text-end fw-bold text-price">
          Total {contienePremium ? "Servicio Premium" : "Servicio Completo o Express"}: $
          {total
            .toLocaleString("es-AR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
            .replace(/,/g, ".")}
        </h5>
        <h6 className="text-end text-muted">
          Total en 6 cuotas sin interés con Visa o Mastercard (Exclusivo App YPF): {" "}
          <strong>
            $
            {totalCuotas
              .toLocaleString("es-AR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
              .replace(/,/g, ".")} x 6
          </strong>
        </h6>
      </div>
    </div>
  );
}

export default ListaProductos;
