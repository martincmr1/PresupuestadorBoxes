import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function Configuracion({ actualizarDatos, esAca, setEsAca }) {
  const [direccionLocal, setDireccionLocal] = useState("");
  const [telefonoLocal, setTelefonoLocal] = useState("");
  const [esAcaLocal, setEsAcaLocal] = useState(true);

  useEffect(() => {
    setDireccionLocal(localStorage.getItem("direccion") || "");
    setTelefonoLocal(localStorage.getItem("telefono") || "");
    const guardado = localStorage.getItem("esAca");
    const valor = guardado === null ? true : guardado === "true";
    setEsAcaLocal(valor);
    setEsAca(valor);
  }, []);

  const handleGuardar = () => {
    localStorage.setItem("direccion", direccionLocal);
    localStorage.setItem("telefono", telefonoLocal);
    localStorage.setItem("esAca", esAcaLocal);

    actualizarDatos(direccionLocal, telefonoLocal);
    setEsAca(esAcaLocal);

    // 🔄 Recargar la página para aplicar cambios globalmente
    window.location.reload();
  };

  return (
    <div className="container my-3">
      <Row className="align-items-center mb-3">
        <Col xs={12} md={6}>
          <Form.Check
            type="switch"
            id="switch-aca"
            label="¿Estación ACA?"
            checked={esAcaLocal}
            onChange={() => setEsAcaLocal(!esAcaLocal)}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccionLocal}
              onChange={(e) => setDireccionLocal(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefonoLocal}
              onChange={(e) => setTelefonoLocal(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Button variant="success" onClick={handleGuardar}>
            Guardar configuración
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Configuracion;
