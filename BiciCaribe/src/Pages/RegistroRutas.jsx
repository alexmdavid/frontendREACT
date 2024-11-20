import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Formularios.css'; // Asegúrate de que la ruta de CSS sea correcta

export default function AgregarRuta() {
  const [nombreRuta, setNombreRuta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto de la ruta
    const ruta = {
      nombreRuta,
      descripcion,
    };

    // Enviar los datos al backend
    try {
      const response = await fetch('/api/rutas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ruta),
      });

      if (response.ok) {
        // Redirigir al usuario o mostrar un mensaje de éxito
        alert('Ruta agregada exitosamente');
        navigate('/rutas'); // Cambia la ruta de redirección si es necesario
      } else {
        alert('Hubo un error al agregar la ruta');
      }
    } catch (error) {
      console.error('Error al agregar la ruta:', error);
    }
  };

  return (
    <div className="container">
      <h1>Agregar Ruta</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombreRuta">Nombre de la Ruta:</label>
        <input
          type="text"
          id="nombreRuta"
          name="nombreRuta"
          value={nombreRuta}
          onChange={(e) => setNombreRuta(e.target.value)}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <button type="submit">Agregar Ruta</button>
      </form>
    </div>
  );
}
