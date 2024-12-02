import React, { useState } from 'react';
import '../assets/Styles/Formularios.css'; 
import axios from 'axios';

export default function AgregarGrupo() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    modalidad: ''
  });


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
      const response = await axios.post('http://localhost:8080/api/grupos', formData );

      if (response.status == 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grupo agregado exitosamente",
          showConfirmButton: false,
          timer: 1500
        });
        
      
        setFormData({
          nombre: '',
          descripcion: '',
          modalidad: ''
        });

        navigate("./ListarGrupos");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al agregar el grupo",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Error al enviar el formulario',
      });
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
            name="nombre"
            value={formData.nombre}
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
