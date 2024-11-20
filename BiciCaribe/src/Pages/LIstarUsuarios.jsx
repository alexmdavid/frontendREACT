import React, { useState, useEffect } from 'react';
import '../assets/Styles/ListarUsuarios.css'; // Asegúrate de que la ruta del archivo CSS sea correcta

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  // Cargar los usuarios cuando el componente se monte
  useEffect(() => {
    // Aquí deberías hacer la solicitud para obtener los usuarios desde tu API
    // Este es solo un ejemplo con datos ficticios
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios'); // Reemplaza con la URL correcta de tu API
        const data = await response.json();
        setUsuarios(data); // Asigna los usuarios recibidos al estado
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []); // El arreglo vacío asegura que se ejecute solo una vez cuando el componente se monte

  return (
    <div className="container">
      <h1>Lista de Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Sexo</th>
            <th>Tipo de Sangre</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.sexo}</td>
                <td>{usuario.tipoDeSangre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
