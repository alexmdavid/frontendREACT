import React, { useState, useEffect } from "react";
import "../assets/Styles/ListarGrupos.css";
import axios from "axios";

export default function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    idUsuario: '',
    idGrupo: ''
  });


  // Llamada a la API para obtener los grupos (simulación de fetch)
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        // Aquí simulas la obtención de los grupos, puedes reemplazarlo por una llamada a tu API
        const response = await axios.get("http://localhost:8080/api/grupos"); // Reemplaza con la URL correcta
        const data = await response.data;
        setGrupos(data);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();
  }, []);

  const handleUnirse = async (idGrupo) => {
    console.log(`Unido al grupo con ID: ${idGrupo}`);
    formData.idGrupo = idGrupo;

    // Recupera el string

    const usuarioString = localStorage.getItem("usuario"); // Recupera el string del usuario en localStorage
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString); // Convierte el string a un objeto
      formData.idUsuario = usuario.idUsuario; // Asigna el ID del usuario al objeto formData

      const response = await axios.post(`http://localhost:8080/api/usuarios/${usuario.idUsuario}/grupos/${idGrupo}/inscribir`, formData);
      if (response.status === 200) {
        alert("Inscripción exitosa");
      } else {
        console.error("Error al inscribirse al grupo:", response.data);
      }
    } else {
      console.log("No se encontró usuario en localStorage");
    }

 
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
                <td className="celda-grupo">{grupo.nombre}</td>
                <td className="celda-grupo">{grupo.descripcion}</td>
                <td className="celda-grupo">{grupo.modalidad}</td>
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
