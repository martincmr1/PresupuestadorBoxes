import React, { useState, useEffect } from 'react';

function BuscarModelo({ setProductos, setVehiculoSeleccionado }) {
  const [modelos, setModelos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setModelos(data))
      .catch(err => console.error('Error cargando modelos:', err));
  }, []);

  const handleSelect = (modelo) => {
    setSeleccionado(modelo);
    setVehiculoSeleccionado(modelo); // ✅ importante para usarlo en App.jsx

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
      {/* 🔻 Se oculta al imprimir/exportar */}
      <div className="ocultar-al-exportar">
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

      {/* ✅ Esto sí se imprime/exporta */}
      {seleccionado && (
        <div className="vehiculo-seleccionado mt-2">
          <p><strong>Vehículo:</strong> {seleccionado.marca} - {seleccionado.modelo}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarModelo;
