import React, { useState, useEffect } from 'react';
import { FaTools, FaCar } from 'react-icons/fa';

function CrudVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ marca: '', modelo: '', codigos: '' });
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarCRUD, setMostrarCRUD] = useState(false);
  const [clave, setClave] = useState('');
  const [claveIncorrecta, setClaveIncorrecta] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const vehiculosPorPagina = 12;
  const dbURL = 'https://basevehiculos-9f3c5-default-rtdb.firebaseio.com';

  useEffect(() => {
    actualizarVehiculos();
    fetch('https://api-boxes-default-rtdb.firebaseio.com/productos.json')
      .then(res => res.json())
      .then(data => setProductos(data || []));
  }, []);

  const obtenerDescripcion = (codigo) => {
    const prod = productos.find(p => p.codigo === codigo);
    return prod ? ` - ${prod.descripcion}` : '';
  };

  const actualizarVehiculos = () => {
    fetch(`${dbURL}/.json`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const lista = Object.entries(data)
            .filter(([_, val]) => val && typeof val.marca === 'string' && typeof val.modelo === 'string' && Array.isArray(val.codigos))
            .map(([id, val]) => ({ dbId: id, ...val }));
          lista.sort((a, b) => (a.marca || '').localeCompare(b.marca || ''));
          setVehiculos(lista);
        }
      });
  };

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(''), 3000);
  };

  const obtenerNuevoId = () => {
    const ids = vehiculos.map(v => parseInt(v.dbId)).filter(n => !isNaN(n)).sort((a, b) => a - b);
    let nuevoId = 1;
    for (let i = 0; i <= ids.length; i++) {
      if (!ids.includes(i)) {
        nuevoId = i;
        break;
      }
    }
    return nuevoId;
  };

  const guardarVehiculo = () => {
    const nuevoId = obtenerNuevoId();

    const nuevoVehiculo = {
      año: '',
      codigos: nuevo.codigos.split(',').map(c => c.trim()),
      imagen: '',
      marca: nuevo.marca,
      modelo: nuevo.modelo
    };

    fetch(`${dbURL}/${nuevoId}.json`, {
      method: 'PUT',
      body: JSON.stringify(nuevoVehiculo)
    })
      .then(res => res.json())
      .then(() => {
        setVehiculos(prev => [...prev, { dbId: String(nuevoId), ...nuevoVehiculo }]);
        setNuevo({ marca: '', modelo: '', codigos: '' });
        setPaginaActual(1);
        mostrarMensaje('✅ Vehículo agregado correctamente');
      });
  };

  const eliminarVehiculo = (id) => {
    fetch(`${dbURL}/${id}.json`, {
      method: 'DELETE'
    })
      .then(() => {
        setVehiculos(prev => prev.filter(v => v.dbId !== id));
        mostrarMensaje('🗑️ Vehículo eliminado correctamente');
      });
  };

  const editarVehiculo = (id, campo, valor) => {
    fetch(`${dbURL}/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ [campo]: valor })
    })
      .then(() => setVehiculos(prev => prev.map(v => v.dbId === id ? { ...v, [campo]: valor } : v)));
  };

  const editarCodigos = (id, codigosStr) => {
    const codigos = codigosStr.split(',').map(c => c.trim());
    fetch(`${dbURL}/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({ codigos })
    })
      .then(() => setVehiculos(prev => prev.map(v => v.dbId === id ? { ...v, codigos } : v)));
  };

  const vehiculosFiltrados = vehiculos.filter(v =>
    v.modelo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceInicio = (paginaActual - 1) * vehiculosPorPagina;
  const vehiculosPaginados = vehiculosFiltrados.slice(indiceInicio, indiceInicio + vehiculosPorPagina);
  const totalPaginas = Math.ceil(vehiculosFiltrados.length / vehiculosPorPagina);

  const manejarAcceso = () => {
    if (clave === '1980') {
      setMostrarCRUD(true);
      setClaveIncorrecta(false);
    } else {
      setClaveIncorrecta(true);
    }
  };

  return (
    <div className="mt-5">
      {!mostrarCRUD ? (
        <div className="text-center">
          <button className="btn btn-dark" onClick={() => document.getElementById('claveInput').style.display = 'block'}>
            <FaCar className="me-1" /> <FaTools className="me-1" /> Administración de Vehículos
          </button>
          <div id="claveInput" className="mt-3" style={{ display: 'none' }}>
            <input
              type="password"
              placeholder="Ingresar contraseña"
              className="form-control mb-2"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            <button className="btn btn-primary" onClick={manejarAcceso}>Acceder</button>
            {claveIncorrecta && <p className="text-danger mt-2">Contraseña incorrecta</p>}
          </div>
        </div>
      ) : (
        <>
          <h5 className="fw-bold">🛠️ Administrar Vehículos</h5>

          {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}

          <div className="border rounded p-3 mb-4">
            <h6>➕ Agregar nuevo vehículo</h6>
            <input
              type="text"
              placeholder="Marca"
              className="form-control mb-2"
              value={nuevo.marca}
              onChange={(e) => setNuevo({ ...nuevo, marca: e.target.value })}
            />
            <input
              type="text"
              placeholder="Modelo"
              className="form-control mb-2"
              value={nuevo.modelo}
              onChange={(e) => setNuevo({ ...nuevo, modelo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Códigos separados por coma"
              className="form-control mb-2"
              value={nuevo.codigos}
              onChange={(e) => setNuevo({ ...nuevo, codigos: e.target.value })}
            />
            <button className="btn btn-success" onClick={guardarVehiculo}>Guardar</button>
          </div>

          <input
            type="text"
            placeholder="Buscar por modelo..."
            className="form-control mb-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="row g-3">
            {vehiculosPaginados.map(v => (
              <div key={v.dbId} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div className="card h-100">
                  <div className="card-body">
                    <input
                      type="text"
                      value={v.marca || ''}
                      onChange={(e) => editarVehiculo(v.dbId, 'marca', e.target.value)}
                      className="form-control mb-1"
                    />
                    <input
                      type="text"
                      value={v.modelo || ''}
                      onChange={(e) => editarVehiculo(v.dbId, 'modelo', e.target.value)}
                      className="form-control mb-1"
                    />
                    <input
                      type="text"
                      value={v.codigos?.join(', ') || ''}
                      onChange={(e) => editarCodigos(v.dbId, e.target.value)}
                      className="form-control mb-2"
                    />
                    <ul className="list-group mb-2">
                      {v.codigos?.map((cod, idx) => (
                        <li key={idx} className="list-group-item py-1 px-2">
                          <strong>{cod}</strong>{obtenerDescripcion(cod)}
                        </li>
                      ))}
                    </ul>
                    <button className="btn btn-sm btn-danger w-100" onClick={() => eliminarVehiculo(v.dbId)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-4 gap-2">
            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${paginaActual === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPaginaActual(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CrudVehiculos;
