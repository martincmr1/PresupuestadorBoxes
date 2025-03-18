import React from 'react';

function Presupuesto({ productos }) {
  const total = productos.reduce((sum, p) => sum + (p.precio * (p.cantidad || 1)), 0);

  return (
    <div className="text-end mt-3">
      <h4>Total: ${total}</h4>
    </div>
  );
}

export default Presupuesto;