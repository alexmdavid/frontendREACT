import React, { useEffect } from 'react';
import '../assets/Styles/Login.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
  useEffect(() => {
    document.body.classList.add('login-view');

    return () => {
      document.body.classList.remove('login-view');
    };
  }, []);

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      
      <form method="POST" action="UsuarioControlador?action=login">
        <div className="input-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input type="text" id="username" name="correo" required />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="contrasena" required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <div className="links">
        <a href="/registro">¿No tienes cuenta? Regístrate aquí</a>
        
        <a href='/'>Volver a la página principal</a>
      </div>
    </div>
  );
}
