import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Formularios.css'; // Asegúrate de que la ruta de CSS sea correcta
import axios from 'axios';

export default function AgregarRuta() {

  const navigate = useNavigate();

  // Construir el objeto de la ruta
  const[ruta, setRUta]= useState({
  nombreRuta:"",
  descripcion:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRUta((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar los datos al backend
    try {
      const response = await axios.post('http://localhost:8080/api/rutas', ruta);

      if (response.status =201) {
        // Redirigir al usuario o mostrar un mensaje de éxito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ruta agregada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/rutas'); // Cambia la ruta de redirección si es necesario
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al agregar la ruta",
        });
      }
    } catch (error) {
      console.error('Error al agregar la ruta:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al conectar con el backend",
      });
    }
  };

  return (
    <div className="agregar-ruta-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreRuta">nombreRuta de la Ruta:</label>
          <input
            type="text"
            id="nombreRuta"
            name="nombreRuta"
            value={ruta.nombreRuta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={ruta.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Agregar Ruta</button>
      </form>
    </div>
  );
}
