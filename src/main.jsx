import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./assets/css/index.css";

import 'bootstrap/dist/css/bootstrap.min.css';

console.log("🚀 React está funcionando...");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
