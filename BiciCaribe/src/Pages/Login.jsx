import React from 'react'
import '../assets/Styles/Login.css'

export default function login() {
  return (
    <div className="container">
            <h1>Iniciar Sesión</h1>
            <br />
            <form method="POST" action="UsuarioControlador?action=login">
                <div className="input-group">
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input type="text" id="username" name="correo" required />
                </div>
                <br />

                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="contrasena" required />
                </div>
                <br />

                <button type="submit">Iniciar Sesión</button>
            </form>

            <div className="links">
                <a href="registro.jsp">¿No tienes cuenta? Regístrate aquí</a>
                <br />
                <a href="index.jsp">Volver a la página principal</a>
            </div>
    </div>
  )
}
