import React from 'react';

function ListaProductos({ productos, setProductos }) {
  const actualizarDescripcion = (index, nuevaDescripcion) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].descripcion = nuevaDescripcion;
    setProductos(nuevosProductos);
  };

  const actualizarCantidad = (index, cantidad) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index].cantidad = cantidad;
    setProductos(nuevosProductos);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  return (
    <ul className="list-group">
      {productos.map((producto, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <input
            type="text"
            value={producto.descripcion}
            onChange={(e) => actualizarDescripcion(index, e.target.value)}
            className="form-control form-control-sm me-2"
            style={{ flex: '1' }}
          />
          <input
            type="number"
            min="1"
            value={producto.cantidad || 1}
            onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
            className="form-control form-control-sm mx-2 text-end"
            style={{ width: '50px' }}
          />
          <strong>${producto.precio * (producto.cantidad || 1)}</strong>
          <button className="btn btn-danger btn-sm ms-2" onClick={() => eliminarProducto(index)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

export default ListaProductos;