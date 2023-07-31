import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const BookCard = ({ infoBook, open }) => {
  return (
    <Card style={{ width: "15rem" }}>
      <Card.Img variant="top" src={infoBook.imagen} />
      <Card.Body>
        <Card.Title>{infoBook.titulo}</Card.Title>
        <Card.Text>{infoBook.resumen.slice(0, 100) + "..."}</Card.Text>
        <div className="d-flex">
          <Button className="m-auto" variant="primary" onClick={open}>
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
