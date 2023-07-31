import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SelectCalification } from "./SelectCalification";
import { useSelector } from "react-redux";
import {
  CreateResenia,
  GetReseniasByBook,
  GetReseniasByBookAndUser,
} from "../services/Resenias.service";
import Swal from "sweetalert2";

export const AddResenia = ({ show, onHide, infoBook, closeDetail }) => {
  const user = useSelector((store) => store.user.user);

  const [rating, setRating] = useState(1);

  const [resenia, setResenia] = useState({
    Comentario: "",
    Calificacion: rating,
    fecha: new Date(),
    IdUsuario: user.id,
    IdLibro: infoBook.id,
  });

  // Función para manejar el cambio de valores en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResenia((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const starOptions = [...Array(5)].map((_, index) => {
    const starCount = index + 1;
    return (
      <option key={starCount} value={starCount}>
        {starCount} estrella{starCount !== 1 ? "s" : ""}
      </option>
    );
  });

  const handleRatingChange = (e) => {
    const selectedRating = parseInt(e.target.value, 10);
    //setRating(selectedRating);
    setResenia((prevData) => ({
      ...prevData,
      Calificacion: selectedRating,
    }));
    //console.log(selectedRating);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateResenia(resenia).then((resp) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: resp.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeDetail();
    });
    // Cerrar el modal después de enviar el formulario
    onHide();
  };

  return (
    <>
      {/* <Modal show={true} onHide={handleCloseModal}> */}
      <Modal style={{ marginTop: "100px" }} show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar resenia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <Form.Group controlId="formRating">
              <Form.Label>Calificación:</Form.Label>
              <Form.Select
                value={resenia.Calificacion}
                onChange={handleRatingChange}
              >
                {starOptions}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                name="Comentario"
                value={resenia.Comentario}
                onChange={handleChange}
                required
                style={{ height: "100px" }}
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              {/* Botón de envío */}
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </div>
          </Form>
        </Modal.Body>
        {/* Opcional: puedes agregar un Modal.Footer con botones adicionales si lo deseas */}
      </Modal>
    </>
  );
};

export default AddResenia;
