import React, { useState, useEffect } from 'react';
import '../assets/Styles/ListarGrupos.css'; 
import axios from 'axios';

export default function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Llamada a la API para obtener los grupos (simulación de fetch)
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        // Aquí simulas la obtención de los grupos, puedes reemplazarlo por una llamada a tu API
        const response = await fetch('/api/grupos'); // Reemplaza con la URL correcta
        const data = await response.json();
        setGrupos(data);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGrupos();
  }, []);

  // Función para manejar la unión al grupo
  const handleUnirse = (idGrupo) => {
    // Aquí podrías hacer una solicitud POST para unirte al grupo
    console.log(`Unido al grupo con ID: ${idGrupo}`);
    // Si tienes una API, enviarías algo como:
    // fetch('/api/unirse', {
    //   method: 'POST',
    //   body: JSON.stringify({ idGrupo }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  return (
    <div className="grupos-container">
      <h1>Todos los grupos</h1>
      <br />

      {loading ? (
        <p>Cargando...</p>
      ) : grupos.length === 0 ? (
        <p className="no-grupos">No se encontraron grupos.</p>
      ) : (
        <table className="grupo-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Modalidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((grupo) => (
              <tr key={grupo.idGrupo}>
                <td>{grupo.nombre}</td>
                <td>{grupo.descripcion}</td>
                <td>{grupo.modalidad}</td>
                <td>
                  <button 
                    className="btn-unirse" 
                    onClick={() => handleUnirse(grupo.idGrupo)}
                  >
                    Unirme
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
