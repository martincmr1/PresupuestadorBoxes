import React, { useState } from 'react';
import Membrete from "./components/Membrete";

import BuscarModelo from './components/BuscarModelo.jsx';
import ListaProductos from './components/ListaProductos.jsx';
import Presupuesto from './components/Presupuesto.jsx';
import ExportarPresupuesto from "./components/ExportarPresupuesto";


console.log("🚀 App.jsx está funcionando...");

function App() {
  const [productos, setProductos] = useState([]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Presupuesto de Cambio de Aceite</h1>
      <Membrete />
      <BuscarModelo setProductos={setProductos} />
      <ListaProductos productos={productos} setProductos={setProductos} />
      <ExportarPresupuesto productos={productos} />
      <Presupuesto productos={productos} />
    </div>
  );
}

export default App;
