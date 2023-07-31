import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export const SelectCalification = () => {
  // State para guardar la calificación seleccionada
  const [rating, setRating] = useState(1);

  // Generar las opciones para el select de 1 a 5 estrellas
  const starOptions = [...Array(5)].map((_, index) => {
    const starCount = index + 1;
    return (
      <option key={starCount} value={starCount}>
        {starCount} estrella{starCount !== 1 ? 's' : ''}
      </option>
    );
  });

  // Función para manejar el cambio de la calificación seleccionada
  const handleRatingChange = (e) => {
    const selectedRating = parseInt(e.target.value, 10);
    setRating(selectedRating);
  };

  return (
    <Form.Group controlId="formRating">
      <Form.Label>Calificación:</Form.Label>
      <Form.Select value={rating} onChange={handleRatingChange}>
        {starOptions}
      </Form.Select>
    </Form.Group>
  );
};