import React, { useState, useEffect } from 'react';
import '../assets/Styles/ListarUsuarios.css';
import axios from 'axios';

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const handleEdit = (idusuario) => {
    console.log(`Editar usuario con ID: ${idusuario}`);
    // Aquí puedes implementar la lógica de edición
  };

  const handleDelete = async (idusuario) => {
    // console.log(`Eliminar usuario con ID: ${idusuario}`);
    // try {
    //   await axios.delete(`http://localhost:8080/api/usuarios/${idusuario}`);
    //   setUsuarios(usuarios.filter((usuario) => usuario.idusuario !== idusuario));
    // } catch (error) {
    //   console.error('Error al eliminar el usuario:', error);
    // }
  };

  // Cargar los usuarios cuando el componente se monte
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/usuarios'); // URL de la API
        const data = response.data;

        // Verifica si la respuesta es un string y parsearlo
        if (typeof data === 'string') {
          try {
            const parsedData = JSON.parse(data); // Parsear el string JSON
            if (Array.isArray(parsedData)) {
              setUsuarios(parsedData);
            } else {
              console.error('La respuesta no es un arreglo válido:', parsedData);
            }
          } catch (error) {
            console.error("Error al parsear el JSON:", error);
          }
        } else if (Array.isArray(data)) {
          // Si ya es un arreglo, setéalo directamente
          setUsuarios(data);
        } else {
          console.error('La respuesta no es un arreglo:', data);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="listar-usuarios-container">
      <h1>Lista de Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.idusuario}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <button
                    style={{
                      marginRight: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleEdit(usuario.idusuario)}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                    onClick={() => handleDelete(usuario.idusuario)}
                  >
                    Eliminar
                  </button>
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
