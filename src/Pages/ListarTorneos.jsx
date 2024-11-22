import React, { useState, useEffect } from 'react';
import "../assets/Styles/ListarTorneos.css";
import axios from 'axios';

export default function ListadoTorneos() {
  const [torneos, setTorneos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    idUsuario: '',
    idTorneo: ''
  });



  // Cargar los torneos cuando el componente se monte
  useEffect(() => {
    // Aquí deberías hacer la solicitud para obtener los torneos desde tu API
    const fetchTorneos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/torneos"); // Reemplaza con la URL correcta
        const data = await response.data;
        setTorneos(data); // Asigna los torneos recibidos al estado
      } catch (error) {
        console.error('Error al obtener los torneos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneos();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez cuando el componente se monte
  const handleUnirse = async (idTorneo) => {
    console.log(`Unido al grupo con ID: ${idTorneo}`);
    formData.idTorneo = idTorneo;

    // Recupera el string

    const usuarioString = localStorage.getItem("usuario"); // Recupera el string del usuario en localStorage
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString); // Convierte el string a un objeto
      formData.idUsuario = usuario.idUsuario; // Asigna el ID del usuario al objeto formData

      const response = await axios.post(`http://localhost:8080/api/usuarios/${usuario.idUsuario}/torneos/${idTorneo}/inscribir`, formData);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inscripción exitosa",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error("Error al inscribirse al torneo:", response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al inscribirse al torneo",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontró usuario en localStorage",
      });
    }

 
  };
  return (
    <div className="torneos-container">
      <h1>Listado de Torneos</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Patrocinador</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {torneos.length > 0 ? (
            torneos.map((torneo) => (
              <tr key={torneo.idTorneo}>
                <td className="celda-grupo">{torneo.nombre}</td>
                <td className="celda-grupo">{torneo.descripcion}</td>
                <td className="celda-grupo">{torneo.patrocinador || 'Ninguno por ahora'}</td>
                <td>
                  <button
                    className="btn-unirse"
                    onClick={() => handleUnirse(torneo.idTorneo)}
                  >
                    Unirme
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
