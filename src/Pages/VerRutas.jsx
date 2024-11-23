import React, { useState, useEffect } from 'react';
import '../assets/Styles/VerRutas.css'; // Asegúrate de que la ruta del CSS sea correcta
import axios from 'axios';

export default function ListarRutas() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    // Función para obtener las rutas del backend
    const obtenerRutas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/rutas')
        if (response.status == 200) {
          const data = await response.data;
          setRutas(data); 
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al btener las rutas",
          });
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la solicitud",
        });
      }
    };

    obtenerRutas(); // Llamada a la función al montar el componente
  }, []);

  return (
    <div className="ver-rutas-container">
      <h1>Lista de Rutas</h1>

      {rutas.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta) => (
              <tr key={ruta.idRuta}>
                <td>{ruta.idRuta}</td>
                <td>{ruta.nombreRuta}</td>
                <td>{ruta.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron rutas.</p>
      )}
    </div>
  );
}
