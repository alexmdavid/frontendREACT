import React, { useState } from 'react';
import '../assets/Styles/Formularios.css'; 
import axios from 'axios';

export default function AgregarGrupo() {
  const [formData, setFormData] = useState({
    nombreGrupo: '',
    descripcion: '',
    modalidad: ''
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Reemplaza la URL por la correcta de tu backend
      const response = await fetch('/api/grupos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Grupo agregado exitosamente');
        // Aquí puedes redirigir o limpiar el formulario si es necesario
        setFormData({
          nombreGrupo: '',
          descripcion: '',
          modalidad: ''
        });
      } else {
        alert('Error al agregar el grupo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div className="agregar-grupo-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreGrupo">Nombre del grupo:</label>
          <input
            type="text"
            id="nombreGrupo"
            name="nombreGrupo"
            value={formData.nombreGrupo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="modalidad">Modalidad:</label>
          <textarea
            id="modalidad"
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Agregar grupo</button>
      </form>
    </div>
  );
}
