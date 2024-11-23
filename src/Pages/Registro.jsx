import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Styles/Registro.css";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("register-view");

    return () => {
      document.body.classList.remove("register-view");
    };
  }, []);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleApellidoChange = (e) => setApellido(e.target.value);
  const handleCorreoChange = (e) => setCorreo(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateForm = () => {
    let valid = true;
    if (!correo.includes("@")) {
      setEmailError("Por favor, ingresa un correo electrónico válido");
      valid = false;
    } else {
      setEmailError("");
    }

    if (contrasena.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  // Manejo del submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/usuarios",
          {
            nombre,
            apellido,
            correo,
            contrasena,
          }
        );

        if (response.status == 200 || response.status == 201) {
          navigate("/home");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ruta agregada exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un problema al registrar el usuario",
        });
      }
    } else {
      console.error(
        "Error al registrar el usuario:",
        emailError ? emailError : passwordError
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un problema al registrar el usuario",
      });
    }
  };

  return (
    <div className="container">
      <h2>Crear Cuenta</h2>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={handleNombreChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={apellido}
            onChange={handleApellidoChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="correo"
            value={correo}
            onChange={handleCorreoChange}
            required
          />
          <small id="emailError">{emailError}</small>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="contrasena"
              value={contrasena}
              onChange={handleContrasenaChange}
              required
            />
            <span
              id="togglePassword"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              👀
            </span>
          </div>
          <small id="passwordError">{passwordError}</small>
        </div>
        <button type="submit">Registrate</button>
      </form>
    </div>
  );
}
