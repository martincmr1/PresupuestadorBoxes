import React, { useState, useEffect } from 'react';

function BuscarModelo({ setProductos, setVehiculoSeleccionado }) {
  const [modelos, setModelos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarPatente, setMostrarPatente] = useState(false);
  const [patente, setPatente] = useState('');
  const [modoManual, setModoManual] = useState(false);
  const [vehiculoManual, setVehiculoManual] = useState('');

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setModelos(data))
      .catch(err => console.error('Error cargando modelos:', err));
  }, []);

  const handleSelect = (modelo) => {
    setSeleccionado(modelo);
    setVehiculoSeleccionado(modelo);
    setFiltro('');
    setMostrarPatente(false);
    setPatente('');
    setModoManual(false);
    setVehiculoManual('');

    fetch('https://api-boxes-default-rtdb.firebaseio.com/productos.json')
      .then(res => res.json())
      .then(data => {
        const productosMap = {};
        const productosOrdenados = [];

        modelo.codigos.forEach((codigo) => {
          const codStr = codigo.toString();
          const producto = data.find(p => p.codigo === codStr);
          if (producto) {
            if (!productosMap[codStr]) {
              productosMap[codStr] = { ...producto, cantidad: 1 };
              productosOrdenados.push(productosMap[codStr]);
            } else {
              productosMap[codStr].cantidad += 1;
            }
          }
        });

        setProductos(productosOrdenados);
      })
      .catch(err => console.error('Error cargando productos:', err));
  };

  const handleReset = () => {
    setSeleccionado(null);
    setVehiculoSeleccionado(null);
    setFiltro('');
    setProductos([]);
    setMostrarPatente(false);
    setPatente('');
    setModoManual(false);
    setVehiculoManual('');
  };

  const normalizarTexto = (texto) => texto.toLowerCase().replace(/\s+/g, '');

  const modelosFiltrados = modelos.filter((m) =>
    filtro.length > 0 &&
    normalizarTexto(m.modelo).includes(normalizarTexto(filtro))
  );

  return (
    <div className="mb-3">
      <div className="ocultar-al-exportar">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar modelo del vehiculo..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          disabled={!!seleccionado || modoManual}
        />

        {filtro && !seleccionado && !modoManual && (
          <ul className="list-group mt-2">
            {modelosFiltrados.map((modelo, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelect(modelo)}
              >
                {modelo.modelo}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vehículo seleccionado o manual */}
      {(seleccionado || modoManual) && (
        <div className="vehiculo-seleccionado mt-2">
          <p>
            <strong>Vehículo:</strong>{" "}
            {modoManual ? vehiculoManual : `${seleccionado.marca} - ${seleccionado.modelo}`}
            {patente && <span> | Patente: {patente}</span>}
          </p>

          {/* Mostrar input de patente si se habilitó */}
          {mostrarPatente && (
            <input
              type="text"
              className="form-control mb-2 ocultar-al-exportar"
              placeholder="Ingresar patente"
              value={patente}
              onChange={(e) => setPatente(e.target.value.toUpperCase())}
            />
          )}

          <div className="d-flex gap-2 flex-wrap ocultar-al-exportar">
            {!mostrarPatente && (
              <button
                className="btn btn-secondary btn-sm ocultar-al-exportar btn-mobile"
                onClick={() => setMostrarPatente(true)}
              >
                Ingresar patente
              </button>
            )}
            <button className="btn btn-primary btn-sm ocultar-al-exportar btn-mobile" onClick={handleReset}>
              Nueva búsqueda
            </button>
          </div>
        </div>
      )}

      {/* Ingreso manual del vehículo */}
      {!seleccionado && !modoManual && (
        <div className="text-end mt-3 ocultar-al-exportar">
          <button
            className="btn btn-outline-dark btn-sm ocultar-al-exportar btn-mobile manual-v"
            onClick={() => {
              setModoManual(true);
              setFiltro('');
              setSeleccionado(null);
            }}
          >
            Ingresar vehículo manualmente
          </button>
        </div>
      )}

      {modoManual && !seleccionado && (
        <div className="mt-2 ocultar-al-exportar">
          <input
            type="text"
            className="form-control"
            placeholder="Escriba marca y modelo del vehículo"
            value={vehiculoManual}
            onChange={(e) => setVehiculoManual(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default BuscarModelo;
