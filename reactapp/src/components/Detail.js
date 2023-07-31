import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Resenia from "./Resenia";
import AddResenia from "./AddResenia";

const Detail = ({
  show,
  close,
  infoBook,
  resenias,
  handleOwnResenias,
  handleSetAllResenias,
  canEdit,
}) => {
  const [showForm, setShowForm] = useState(false);

  const hideModal = () => {
    setShowForm(false);
  };

  const ShowResenias = () => {
    // No hay reseñas generales para mostrar
    if (resenias.length === 0 && !canEdit) {
      return <h5 className="mt-3">No existen reseñas aún</h5>;
    } else if (resenias.length === 0 && canEdit) {
      // No hay reseña propia para mostrar
      return (
        <div className="d-flex flex-column mt-3 gap-3">
          <h5 className="mt-2">No has dejado tu reseña</h5>
          <Button
            variant="success"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Agregar una
          </Button>
          <AddResenia
            show={showForm}
            onHide={hideModal}
            infoBook={infoBook}
            closeDetail={close}
          />
        </div>
      );
    } else if (resenias.length > 0 && !canEdit) {
      // Hay reseñas generales para mostrar
      return resenias.map((resenia) => {
        return (
          <Resenia
            key={resenia.id}
            data={resenia}
            edit={false}
            closeDetail={close}
          />
        );
      });
    } else if (resenias.length > 0 && canEdit) {
      // Hay reseña personal para mostrar
      return resenias.map((resenia) => {
        return (
          <Resenia
            key={resenia.id}
            data={resenia}
            edit={true}
            closeDetail={close}
          />
        );
      });
    }
  };

  const CategoryName = (id) => {
    switch (id) {
      case 1:
        return "Fantasía";
        break;
      case 2:
        return "Realismo mágico";
        break;
      case 3:
        return "Ciencia ficción";
        break;
      case 4:
        return "Clásico";
        break;
      case 5:
        return "Romance";
        break;
    }
  };

  return (
    <Modal
      show={show}
      onHide={close}
      dialogClassName="custom-modal"
      aria-labelledby="example-custom-modal-styling-title"
      className="mt-2"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Detalles del libro: {infoBook.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <div className="d-flex">
          <div className="custom-image mr-3">
            <img width="230px" className="" src={infoBook.imagen} alt="Book cover" />
          </div>
          <div className="mt-4">
            <Table striped bordered hover responsive>
              <tbody>
                <tr>
                  <td>
                    <b>Titulo</b>
                  </td>
                  <td>{infoBook.titulo}</td>
                </tr>
                <tr>
                  <td>
                    <b>Autor</b>
                  </td>
                  <td>{infoBook.autor}</td>
                </tr>
                <tr>
                  <td>
                    <b>Categoria</b>
                  </td>
                  <td>{CategoryName(infoBook.categoria)}</td>
                </tr>
              </tbody>
            </Table>
            <b>Resumen</b>
            <p className="mt-1">{infoBook.resumen}</p>
          </div>
        </div>
        <div>
          <h3 className="text-center">Reseñas</h3>
          <div className="mt-3 d-flex justify-content-center gap-3">
            <Button variant="primary" onClick={handleSetAllResenias}>
              Todas las reseñas
            </Button>
            <Button variant="success" onClick={handleOwnResenias}>
              Mi reseña
            </Button>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          <ShowResenias />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Detail;
