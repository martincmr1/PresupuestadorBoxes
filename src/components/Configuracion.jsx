import React, { useState, useEffect } from "react";
import { Accordion, Form, Row, Col, Button } from "react-bootstrap";

function Configuracion({ actualizarDatos, esAca, setEsAca }) {
  const [direccionLocal, setDireccionLocal] = useState("");
  const [telefonoLocal, setTelefonoLocal] = useState("");
  const [esAcaLocal, setEsAcaLocal] = useState(true);
  const [variante, setVariante] = useState("1");

  useEffect(() => {
    setDireccionLocal(localStorage.getItem("direccion") || "");
    setTelefonoLocal(localStorage.getItem("telefono") || "");
    const guardado = localStorage.getItem("esAca");
    const valor = guardado === null ? true : guardado === "true";
    setEsAcaLocal(valor);
    setEsAca(valor);
    setVariante(localStorage.getItem("variante") || "1");
  }, []);

  const handleGuardar = () => {
    localStorage.setItem("direccion", direccionLocal);
    localStorage.setItem("telefono", telefonoLocal);
    localStorage.setItem("esAca", esAcaLocal);
    localStorage.setItem("variante", variante);

    actualizarDatos(direccionLocal, telefonoLocal);
    setEsAca(esAcaLocal);

    window.location.reload();
  };

  return (
    <div className="container my-3">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i className="bi bi-gear-fill me-2"></i> Configuración
          </Accordion.Header>
          <Accordion.Body>
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

            <Row className="mb-3">
              <Col>
                <Form.Label>Seleccionar Cluster de Lubricantes</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Cluster Variante 1"
                    name="variante"
                    type="radio"
                    id="variante1"
                    value="1"
                    checked={variante === "1"}
                    onChange={(e) => setVariante(e.target.value)}
                  />
                  <Form.Check
                    inline
                    label="Cluster Variante 2"
                    name="variante"
                    type="radio"
                    id="variante2"
                    value="2"
                    checked={variante === "2"}
                    onChange={(e) => setVariante(e.target.value)}
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <Button variant="success" onClick={handleGuardar}>
                  Guardar configuración
                </Button>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Configuracion;
