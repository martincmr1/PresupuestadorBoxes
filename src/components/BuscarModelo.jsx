 // BuscarModelo integrado con botón Presupuesto YER que activa carga manual
import React, { useState, useEffect } from 'react';

function BuscarModelo({ setProductos, setVehiculoSeleccionado }) {
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [modeloFiltro, setModeloFiltro] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarPatente, setMostrarPatente] = useState(false);
  const [patente, setPatente] = useState('');
  const [modoManual, setModoManual] = useState(false);
  const [vehiculoManual, setVehiculoManual] = useState('');

  useEffect(() => {
    fetch('https://basevehiculos-9f3c5-default-rtdb.firebaseio.com/.json')
      .then(res => res.json())
      .then(data => {
        if (data) {
          const lista = Object.values(data).filter(
            v => v && typeof v.modelo === 'string' && typeof v.marca === 'string' && Array.isArray(v.codigos)
          );
          setModelos(lista);

          const marcasUnicas = Array.from(new Set(lista.map(m => m.marca))).sort();
          setMarcas(marcasUnicas);
        }
      })
      .catch(err => console.error('Error cargando modelos:', err));
  }, []);

  const handleSelectMarca = (marca) => {
    setMarcaSeleccionada(marca);
    setMarcaFiltro('');
    setModeloFiltro('');
  };

  const handleSelectModelo = (modelo) => {
    setSeleccionado(modelo);
    setVehiculoSeleccionado(modelo);
    setMarcaFiltro('');
    setMarcaSeleccionada('');
    setModeloFiltro('');
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

  const handlePresupuestoYER = () => {
    setModoManual(true);
    setSeleccionado(null);
    setMarcaFiltro('');
    setMarcaSeleccionada('');
    setModeloFiltro('');
   
    setVehiculoSeleccionado({ marca: 'Presupuesto', modelo: 'YER' });
    setProductos([]);
  };

  const handleReset = () => {
    setSeleccionado(null);
    setVehiculoSeleccionado(null);
    setMarcaFiltro('');
    setMarcaSeleccionada('');
    setModeloFiltro('');
    setProductos([]);
    setMostrarPatente(false);
    setPatente('');
    setModoManual(false);
    setVehiculoManual('');
  };

  const normalizarTexto = (texto) => texto.toLowerCase().replace(/\s+/g, '');

  const marcasFiltradas = marcas.filter(m =>
    normalizarTexto(m).includes(normalizarTexto(marcaFiltro))
  );

  const modelosFiltrados = modelos.filter(m =>
    m.marca === marcaSeleccionada &&
    normalizarTexto(m.modelo).includes(normalizarTexto(modeloFiltro))
  );

  return (
    <div className="mb-3">
      <div className="ocultar-al-exportar">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Buscar marca del vehículo..."
          value={marcaFiltro}
          onChange={(e) => {
            setMarcaFiltro(e.target.value);
            setMarcaSeleccionada('');
            setModeloFiltro('');
          }}
          disabled={!!seleccionado || modoManual}
        />

        {marcaFiltro && !marcaSeleccionada && (
          <ul className="list-group mb-2">
            {marcasFiltradas.length > 0 ? (
              marcasFiltradas.map((marca, i) => (
                <li
                  key={i}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSelectMarca(marca)}
                >
                  {marca}
                </li>
              ))
            ) : (
              <li className="list-group-item">No se encontraron marcas</li>
            )}
          </ul>
        )}

        {marcaSeleccionada && (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder={`Buscar modelo de ${marcaSeleccionada}...`}
              value={modeloFiltro}
              onChange={(e) => setModeloFiltro(e.target.value)}
              disabled={!!seleccionado || modoManual}
            />

            {modeloFiltro && !seleccionado && (
              <ul className="list-group">
                {modelosFiltrados.length > 0 ? (
                  modelosFiltrados.map((modelo, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelectModelo(modelo)}
                    >
                      {modelo.modelo}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No se encontraron modelos</li>
                )}
              </ul>
            )}
          </>
        )}

        {/* Botón extra para Presupuesto YER */}
        {!seleccionado && !modoManual && (
          <div className="text-start mt-2">
         <button
  className="btn p-0 border-0 bg-transparent"
  onClick={handlePresupuestoYER}
  title="Presupuesto YER"
  style={{
    outline: "none",
    borderRadius: "6px" // ✅ bordes suavemente redondeados
  }}
>
  <img
    src="/logoruta.jpg"
    alt="Presupuesto YER"
    style={{
      height: "35px",
      cursor: "pointer",
      borderRadius: "6px" // ✅ también aplica al borde de la imagen
    }}
  />
</button>


          </div>
        )}
      </div>

      {(seleccionado || modoManual) && (
        <div className="vehiculo-seleccionado mt-2">
          <p>
            <strong>Vehículo:</strong>{' '}
            {modoManual ? vehiculoManual : `${seleccionado.marca} - ${seleccionado.modelo}`}
            {patente && <span> | Patente: {patente}</span>}
          </p>

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
                className="btn btn-secondary btn-sm ocultar-al-exportar"
                onClick={() => setMostrarPatente(true)}
              >
                Ingresar patente
              </button>
            )}
            <button className="btn btn-primary btn-sm ocultar-al-exportar" onClick={handleReset}>
              Nueva búsqueda
            </button>
          </div>
        </div>
      )}

      {!seleccionado && !modoManual && (
        <div className="text-start mt-3 ocultar-al-exportar">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => {
              setModoManual(true);
              setModeloFiltro('');
              setMarcaFiltro('');
              setMarcaSeleccionada('');
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
