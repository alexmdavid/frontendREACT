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

  // Cargar la lista de patrocinadores desde la API
  useEffect(() => {
    const fetchPatrocinadores = async () => {
      try {
        const response = await fetch('/api/patrocinadores'); // Cambia la URL por la que corresponda
        const data = await response.json();
        setPatrocinadores(data);
      } catch (error) {
        console.error('Error al obtener los patrocinadores:', error);
      }
    };

    fetchPatrocinadores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto del torneo
    const torneo = {
      nombre,
      descripcion,
      idPatrocinador,
    };

    // Enviar los datos al backend (se puede usar fetch para enviar el formulario)
    try {
      const response = await fetch('/api/torneos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(torneo),
      });

      if (response.ok) {
        // Redirigir a otra página o mostrar mensaje de éxito
        alert('Torneo registrado exitosamente');
        navigate('/torneos'); // Redirigir a la lista de torneos o donde desees
      } else {
        alert('Hubo un error al registrar el torneo');
      }
    } catch (error) {
      console.error('Error al registrar el torneo:', error);
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            placeholder="Describa el torneo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="idPatrocinador">Patrocinador:</label>
          <select
            id="idPatrocinador"
            name="idPatrocinador"
            value={idPatrocinador}
            onChange={(e) => setIdPatrocinador(e.target.value)}
            required
          >
            <option value="">-- Seleccione un patrocinador --</option>
            {patrocinadores.map((patrocinador) => (
              <option key={patrocinador.id} value={patrocinador.id}>
                {patrocinador.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Registrar Torneo</button>
      </form>
    </div>
  );
}
