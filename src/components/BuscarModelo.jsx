import React, { useState, useEffect } from 'react';

function BuscarModelo({ setProductos }) {
  const [modelos, setModelos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null); // 🔹 Guarda el vehículo seleccionado

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setModelos(data))
      .catch(err => console.error('Error cargando modelos:', err));
  }, []);

  const handleSelect = (modelo) => {
    setVehiculoSeleccionado(modelo); // 🔹 Guarda el vehículo seleccionado

    fetch('https://api-boxes-default-rtdb.firebaseio.com/productos.json')
      .then(res => res.json())
      .then(data => {
        const productosSeleccionados = modelo.codigos
          .map(codigo => data.find(p => p.codigo === codigo.toString()))
          .filter(Boolean);
        setProductos(productosSeleccionados);
      })
      .catch(err => console.error('Error cargando productos:', err));
  };

  return (
    <div className="mb-3">
      {/* 🔹 Input de búsqueda que se oculta al imprimir */}
      <div className="no-print">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar modelo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <ul className="list-group mt-2">
          {modelos
            .filter(m => filtro.length > 0 && m.modelo.toLowerCase().includes(filtro.toLowerCase()))
            .map((modelo, index) => (
              <li 
                key={index} 
                className="list-group-item list-group-item-action" 
                onClick={() => handleSelect(modelo)}
              >
                {modelo.marca} - {modelo.modelo}
              </li>
            ))}
        </ul>
      </div>

      {/* 🔹 Solo muestra "Vehículo:" seguido del modelo seleccionado */}
      {vehiculoSeleccionado && (
        <div className="vehiculo-seleccionado mt-3">
          <p><strong>Vehículo:</strong> {vehiculoSeleccionado.marca} - {vehiculoSeleccionado.modelo}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarModelo;
