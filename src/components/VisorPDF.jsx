import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa"; // 👈 Agregamos el ícono

const archivos = [
{
    nombre: "Promo Pick Up 20%",
    archivo: "PromoPickup.pdf",
  },


  {
    nombre: "Promo Uber",
    archivo: "BeneficioUberYPFBOXES.pdf",
  },
  {
    nombre: "Promo Escalonado",
    archivo: "INSTRUCTIVO-NUEVO-ESCALONADO-BOXES-ABRIL.2024.pdf",
  },
  {
    nombre: "Promo Raspadita",
    archivo: "RaspaditaYPFBOXES.pdf",
  },
  {
    nombre: "Guía de Lubricación 2024",
    archivo: "GuíadeLubricaciónLivianos2024.pdf",
  },
  {
    nombre: "Codigos DTC OBD2",
    archivo: "obd2codigos.pdf",
  },


  {
    nombre: "Lista YER",
    archivo: "ListaEESSYER.pdf",
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
      <h4 className="mb-3">📄 Instructivos/Promociones/Guías</h4>
      <Row className="g-3">
        {archivos.map((doc, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{doc.nombre}</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => abrirPDF(doc.archivo)}
                  className="d-flex align-items-center gap-2"
                >
                  <FaFilePdf /> Ver PDF
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
