import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/VerPerfil.css'; 

export default function VerPerfil() {
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    sexo: '',
    tipoSangre: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Suponiendo que tienes un servicio para obtener el perfil del usuario
    const obtenerPerfil = async () => {
      try {
        const response = await fetch('/api/usuario/perfil', { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setPerfil(data);
        } else {
          console.error('Error al obtener el perfil');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    obtenerPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar los datos al backend para actualizar el perfil
    try {
      const response = await fetch('/api/usuario/actualizarPerfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(perfil),
      });

      if (response.ok) {
        alert('Perfil actualizado correctamente');
        navigate('/perfil'); // Redirigir a la página de perfil después de la actualización
      } else {
        alert('Hubo un problema al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="ver-perfil-container">
      <form id="formEditarPerfil" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={perfil.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={perfil.apellido}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="sexo">Sexo</label>
          <input
            type="text"
            id="sexo"
            name="sexo"
            value={perfil.sexo}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="tipoSangre">Tipo de Sangre</label>
          <input
            type="text"
            id="tipoSangre"
            name="tipoSangre"
            value={perfil.tipoSangre}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
}
