import { useState } from "react";
import Card from "react-bootstrap/Card";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import { DeleteResenia, GetReseniaById } from "../services/Resenias.service";
import Swal from "sweetalert2";

const Resenia = ({ data, edit = false, closeDetail }) => {
  function StarArray(numero) {
    const arreglo = [0, 0, 0, 0, 0];

    for (let i = 0; i < numero && i < 5; i++) {
      arreglo[i] = 1;
    }

    return arreglo;
  }

  const ReadDateTime = (datetime) => {
    const año = datetime.getFullYear();
    const mes = String(datetime.getMonth() + 1).padStart(2, "0"); // El mes está basado en cero, por lo que se suma 1
    const dia = String(datetime.getDate()).padStart(2, "0");
    const horas = String(datetime.getHours()).padStart(2, "0");
    const minutos = String(datetime.getMinutes()).padStart(2, "0");
    const segundos = String(datetime.getSeconds()).padStart(2, "0");

    return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "La reseña se eliminara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteResenia(data.id).then((resp) => {
          Swal.fire("Eliminada!", resp.message, "success");
          closeDetail();
        });
      }
    });
  };

  return (
    <Card style={{ width: "18rem", marginTop: "20px" }}>
      <Card.Body>
        <div className="d-flex flex-column align-items-center">
          <Card.Title className="d-flex gap-3">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="profile-image"
            />
            <p className="mt-2">{data.usuario.nombre}</p>
          </Card.Title>
          <Card.Text>
            <i>"{data.comentario}"</i>
          </Card.Text>
          <div className="d-flex">
            {StarArray(data.calificacion).map((star) => {
              return star == 1 ? (
                <AiFillStar
                  className="text-warning"
                  style={{ fontSize: "30px" }}
                />
              ) : (
                <AiOutlineStar
                  className="text-warning"
                  style={{ fontSize: "30px" }}
                />
              );
            })}
          </div>
          <Card.Text className="mt-2">
            {ReadDateTime(new Date(data.fecha))}
          </Card.Text>
        </div>
        {edit ? (
          <div className="d-flex justify-content-evenly mt-2">
            <MdDelete style={{ fontSize: "30px" }} onClick={handleDelete} />
          </div>
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
};

export default Resenia;
