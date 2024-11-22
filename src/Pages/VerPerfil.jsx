import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Styles/VerPerfil.css";
import axios from "axios";

export default function VerPerfil() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    sexo: "",
    tipoDeSangre: "",
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
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al obtener el perfil",
            });
          }
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en la solicitud",
        });
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
      const usuarioString = localStorage.getItem("usuario"); // Recupera el string del usuario en localStorage
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString); // Convierte el string a un objeto
          const idUsuario = usuario.idUsuario;
          const response = await axios.put(`http://localhost:8080/api/usuarios/${idUsuario}`,perfil);

          if (response.status==200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Perfil actualizado correctamente",
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/verPerfil"); // Redirigir a la página de perfil después de la actualización
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un problema al actualizar el perfil",
            });
          }
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Se encontro un error",
          });
          return;
        }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al actualizar el perfil",
      });
    }
  };

  const obtenertipoDeSangre = () => {
    switch (perfil.tipoDeSangre) {
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
          <label htmlFor="tipoDeSangre">Tipo de Sangre</label>
          <select
            value={perfil.tipoDeSangre === "" || perfil.tipoDeSangre === null ? "" : perfil.tipoDeSangre}
            onChange={handleChange}
            name="tipoDeSangre"
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
