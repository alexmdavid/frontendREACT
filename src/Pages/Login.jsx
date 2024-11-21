import React, { useState, useEffect } from 'react';
import '../assets/Styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('login-view');

    return () => {
      document.body.classList.remove('login-view');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', formData);
    console.log(formData);
    console.log(response.statusCode )
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); 
        setSuccess(true); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
      setError('Credenciales incorrectas o problema en el servidor.');
    }
  };
  

  if (success) {
    return navigate("/HomeAdmin");
  }

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>

      <div className="links">
        <a href="/registro">¿No tienes cuenta? Regístrate aquí</a>
        <a href="/">Volver a la página principal</a>
      </div>
    </div>
  );
}
