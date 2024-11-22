import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Formularios.css'; 
import axios from 'axios';

export default function RegistrarTorneo() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idPatrocinador, setIdPatrocinador] = useState('');
  const [patrocinadores, setPatrocinadores] = useState([]);
  const navigate = useNavigate();

  const [torneo, setTorneo] = useState({
    nombre: '',
    descripcion: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTorneo((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/torneos',torneo); 

      if (response.status=201) {
        // Redirigir a otra página o mostrar mensaje de éxito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Torneo registrado exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/torneos'); // Redirigir a la lista de torneos o donde desees
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al agregar el torneo",
        });
      }
    } catch (error) {
      console.error('Error al registrar el torneo:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al agregar el torneo",
      });
    }
  };

  return (
    <div className="registrar-torneo-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Torneo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={torneo.nombre}
            onChange={handleChange}
            required
            placeholder="Ingrese el nombre del torneo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={torneo.descripcion}
            onChange={handleChange}
            required
            placeholder="Describa el torneo"
          />
        </div>



        <button type="submit">Registrar Torneo</button>
      </form>
    </div>
  );
}
