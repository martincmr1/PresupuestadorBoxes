import React, { useState } from 'react';
import BuscarModelo from './components/BuscarModelo.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import Presupuesto from './components/Presupuesto.jsx';

console.log("🚀 App.jsx está funcionando...");

function App() {
  const [productos, setProductos] = useState([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Presupuesto de Cambio de Aceite</h1>
      <BuscarModelo setProductos={setProductos} />
      <ListaProductos productos={productos} setProductos={setProductos} />
      <Presupuesto productos={productos} />
    </div>
  );
}

export default App;
