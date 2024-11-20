import React, { useState, useEffect } from 'react';
import '../assets/Styles/ListarGrupos.css'; // Asegúrate de que la ruta del archivo CSS sea correcta

export default function ListadoTorneos() {
  const [torneos, setTorneos] = useState([]);

  // Cargar los torneos cuando el componente se monte
  useEffect(() => {
    // Aquí deberías hacer la solicitud para obtener los torneos desde tu API
    // Este es solo un ejemplo con datos ficticios
    const fetchTorneos = async () => {
      try {
        const response = await fetch('/api/torneos'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();
        setTorneos(data); // Asigna los torneos recibidos al estado
      } catch (error) {
        console.error('Error al obtener los torneos:', error);
      }
    };

    fetchTorneos();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez cuando el componente se monte

  return (
    <div className="torneos-container">
      <h1>Listado de Torneos</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Patrocinador</th>
          </tr>
        </thead>
        <tbody>
          {torneos.length > 0 ? (
            torneos.map((torneo) => (
              <tr key={torneo.idTorneo}>
                <td>{torneo.idTorneo}</td>
                <td>{torneo.nombre}</td>
                <td>{torneo.descripcion}</td>
                <td>{torneo.patrocinador || 'Ninguno por ahora'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No hay torneos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
