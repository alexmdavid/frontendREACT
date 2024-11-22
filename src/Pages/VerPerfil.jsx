import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Styles/VerPerfil.css";
import axios from "axios";

export default function VerPerfil() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    tipoSangre: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Suponiendo que tienes un servicio para obtener el perfil del usuario
    const obtenerPerfil = async () => {
      try {
        const usuarioString = localStorage.getItem("usuario"); // Recupera el string del usuario en localStorage
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString); // Convierte el string a un objeto
          const idUsuario = usuario.idUsuario; // Asigna el ID del usuario al objeto formData

          const response = await axios.get(
            `http://localhost:8080/api/usuarios/${idUsuario}`
          );
          if (response.status === 200) {
            const data = await response.data;
            setPerfil(data);
            console.log("Perfil obtenido:", data);
          } else {
            console.error("Error al obtener el perfil");
          }
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    obtenerPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar los datos al backend para actualizar el perfil
    try {
      const response = await fetch("/api/usuario/actualizarPerfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(perfil),
      });

      if (response.ok) {
        alert("Perfil actualizado correctamente");
        navigate("/perfil"); // Redirigir a la página de perfil después de la actualización
      } else {
        alert("Hubo un problema al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  const obtenerTipoSangre = () => {
    switch (perfil.tipoSangre) {
      case "O+":
        return "O+";
      case "O-":
        return "O-";
      case "A+":
        return "A+";
      case "A-":
        return "A-";
      case "AB+":
        return "AB+";
      case "AB-":
        return "AB-";
      case "B+":
        return "B+";
      case "B-":
        return "B-";
      default:
        return "";
    }
  };

  console.log("sexo", perfil.sexo);

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
          <select
            value={
              perfil.sexo === null || perfil.sexo === ""
                ? "" // "Sin definir"
                : perfil.sexo === "MASCULINO"
                ? "MASCULINO"
                : "FEMENINO"
            }
            onChange={handleChange}
            name="sexo"
          >
            <option value="">Sin definir</option>
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMENINO">FEMENINO</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="tipoSangre">Tipo de Sangre</label>
          <select
            value={perfil.tipoSangre === "" || perfil.tipoSangre === null ? "" : perfil.tipoSangre}
            onChange={handleChange}
            name="tipoSangre"
          >
            <option value="">Sin definir</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
          </select>
        </div>

        <button type="submit">Actualizar Perfil</button>
      </form>
    </div>
  );
}
