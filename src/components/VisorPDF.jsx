import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const archivos = [
  {
    nombre: "Promo Uber",
    archivo: "BeneficioUberYPFBOXES.pdf",
  },

  {
    nombre: "Promo Escalonado",
    archivo: "INSTRUCTIVO-NUEVO-ESCALONADO-BOXES-ABRIL.2024.pdf",
  },


  



];

function VisorPDF() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [archivoActual, setArchivoActual] = useState(null);

  const esMovil = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const abrirPDF = (archivo) => {
    const url = `/pdfs/${archivo}`;
    if (esMovil()) {
      window.open(url, "_blank");
    } else {
      setArchivoActual(url);
      setMostrarModal(true);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setArchivoActual(null);
  };

  return (
    <Container className="my-4">
      <h4 className="mb-3">📄 Instructivos/Promociones</h4>
      <Row className="g-3">
        {archivos.map((doc, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{doc.nombre}</Card.Title>
                <Button variant="primary" onClick={() => abrirPDF(doc.archivo)}>
                  Ver PDF
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={mostrarModal} onHide={cerrarModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>📄 Vista previa del PDF</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", padding: 0 }}>
          {archivoActual && (
            <iframe
              src={archivoActual}
              title="Visor PDF"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default VisorPDF;
