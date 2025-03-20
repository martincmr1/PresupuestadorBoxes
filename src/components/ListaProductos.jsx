import React, { useState, useEffect } from "react";

function ListaProductos({ productos, setProductos }) {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [sugerencias, setSugerencias] = useState({});
  const [edicionIndex, setEdicionIndex] = useState(null);

  // ✅ Cargar productos desde Firebase
  useEffect(() => {
    fetch("https://api-boxes-default-rtdb.firebaseio.com/productos.json")
      .then((res) => res.json())
      .then((data) => setProductosDisponibles(data || []))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  // ✅ Buscar coincidencias por descripción o código
  const actualizarDescripcion = (index, nuevoTexto) => {
    setEdicionIndex(index);
    const esBusquedaPorCodigo = /^\d{5,}$/.test(nuevoTexto.trim());

    if (nuevoTexto.length > 1) {
      const coincidencias = productosDisponibles
        .filter((p) =>
          esBusquedaPorCodigo
            ? p.codigo.includes(nuevoTexto.trim())
            : p.descripcion.toLowerCase().includes(nuevoTexto.toLowerCase())
        )
        .slice(0, 5); // Solo mostrar 5 resultados

      setSugerencias((prev) => ({ ...prev, [index]: coincidencias }));
    } else {
      setSugerencias((prev) => ({ ...prev, [index]: [] }));
    }

    setProductos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, descripcion: nuevoTexto } : p))
    );
  };

  // ✅ Manejo de selección de productos
  const seleccionarProducto = (index, productoSeleccionado) => {
    setProductos((prev) => {
      const productoExistente = prev.find(
        (p) => p.descripcion === productoSeleccionado.descripcion
      );

      if (productoExistente) {
        // Si ya existe, solo aumentar la cantidad
        return prev.map((p) =>
          p.descripcion === productoSeleccionado.descripcion
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        ).filter((p, i) => i !== index); // Eliminar el duplicado anterior
      } else {
        // Si no existe, reemplazar el producto actual
        return prev.map((p, i) =>
          i === index
            ? {
                descripcion: productoSeleccionado.descripcion,
                precio: parseFloat(productoSeleccionado.precio),
                cantidad: 1,
              }
            : p
        );
      }
    });

    setSugerencias((prev) => ({ ...prev, [index]: [] })); // Ocultar sugerencias
    setEdicionIndex(null);
  };

  // ✅ Manejo de actualización de cantidad
  const actualizarCantidad = (index, cantidad) => {
    if (cantidad > 0) {
      setProductos((prev) =>
        prev.map((p, i) =>
          i === index ? { ...p, cantidad: cantidad } : p
        )
      );
    }
  };

  // ✅ Eliminar productos por índice
  const eliminarProducto = (index) => {
    setProductos((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Agregar un nuevo producto vacío para edición
  const agregarProducto = () => {
    setProductos((prev) => [
      ...prev,
      {
        descripcion: "",
        precio: 0,
        cantidad: 1,
      },
    ]);
  };

  return (
    <div>
      <ul className="list-group">
        {productos.map((producto, index) => (
          <li key={index} className="list-group-item d-flex align-items-center">
            <div className="position-relative flex-grow-1">
              <input
                type="text"
                value={producto.descripcion}
                onChange={(e) => actualizarDescripcion(index, e.target.value)}
                className="form-control form-control-sm"
              />
              {sugerencias[index] &&
                sugerencias[index].length > 0 &&
                edicionIndex === index && (
                  <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{ zIndex: 10 }}
                  >
                    {sugerencias[index].map((sugerencia, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action"
                        onClick={() => seleccionarProducto(index, sugerencia)}
                        style={{ cursor: "pointer" }}
                      >
                        {sugerencia.codigo} - {sugerencia.descripcion} - ${sugerencia.precio}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <input
              type="number"
              min="1"
              value={producto.cantidad || 1}
              onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
              className="form-control form-control-sm mx-2 text-end"
              style={{ width: "50px" }}
            />
            <strong>${(producto.precio * (producto.cantidad || 1)).toFixed(2)}</strong>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarProducto(index)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Botón para agregar más productos */}
      <button className="btn btn-primary mt-3" onClick={agregarProducto}>
        Agregar Producto
      </button>
    </div>
  );
}

export default ListaProductos;
