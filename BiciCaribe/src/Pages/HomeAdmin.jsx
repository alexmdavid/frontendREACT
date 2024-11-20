import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Home.css'; // Asegúrate de que la ruta de la hoja de estilo sea correcta

export default function HomeUser() {
  const navigate = useNavigate();

  // Función para redirigir al perfil
  const handleProfileRedirect = () => {
    navigate('/profile'); // Cambia la ruta a la que quieras redirigir al perfil
  };

  // Función para ver las rutas, grupos o torneos (más detalles)
  const handleRouteDetails = (routeName) => {
    navigate(`/rutas/${routeName}`);
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src="./img/logo-bicicaribe.jpg" alt="Logo Bicicleta" className="zoom" />
        </div>
        <div className="social-media">
          <a
            className="fa-brands fa-facebook fa-xl"
            href="https://www.facebook.com/profile.php?id=61569125060880&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className="fa-brands fa-instagram fa-xl"
            href="https://www.instagram.com/bici_caribe/?igsh=MWN6ZDM4b2VremhvaQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a className="fa-brands fa-twitter fa-xl"></a>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleProfileRedirect}>
            Mi perfil
          </button>
        </div>
      </header>

      <nav className="barra">
        <ul>
          <li>
            <a onClick={() => navigate('/')} href="#">INICIO</a>
          </li>

          {/* Menú de Rutas */}
          <li className="dropdown">
            <a href="#">RUTAS <i className="fa fa-chevron-down"></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/rutas')} href="#">Ver Ruta</a></li>
              <li><a onClick={() => navigate('/rutas/registrar')} href="#">Registrar Ruta</a></li>
            </ul>
          </li>

          {/* Menú de Grupos de Salida */}
          <li className="dropdown">
            <a href="#">GRUPOS DE SALIDA <i className="fa fa-chevron-down"></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/grupos')} href="#">Ver Grupos</a></li>
              <li><a onClick={() => navigate('/grupos/registrar')} href="#">Registrar Grupo</a></li>
            </ul>
          </li>

          {/* Menú de Torneos */}
          <li className="dropdown">
            <a href="#">TORNEOS <i className="fa fa-chevron-down"></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/torneos')} href="#">Ver Torneos</a></li>
              <li><a onClick={() => navigate('/torneos/registrar')} href="#">Registrar Torneo</a></li>
            </ul>
          </li>

          <li><a onClick={() => navigate('/usuarios')} href="#">VER USUARIOS</a></li>
          <li><a onClick={() => navigate('/contact')} href="#">CONTACTANOS</a></li>
        </ul>
      </nav>

      <main>
        <div className="search-bar">
          <input type="text" id="buscarRuta" placeholder="Buscar ruta" />
        </div>
        <div id="resultadoRutas"></div>

        <div className="routes">
          <div className="route-card">
            <img src="./img/minca.jpg" alt="Minca - Cerro Kennedy - Arimaca" className="zoom" />
            <h3>Minca - Cerro Kennedy - Arimaca</h3>
            <button onClick={() => handleRouteDetails('minca')}>Ver más</button>
          </div>
          <div className="route-card">
            <img src="./img/cerro-kennedy.jpg" alt="Minca - Cerro Kennedy" className="zoom" />
            <h3>Minca - Cerro Kennedy</h3>
            <button onClick={() => handleRouteDetails('cerro-kennedy')}>Ver más</button>
          </div>
          <div className="route-card">
            <img src="./img/rio.jpg" alt="Rio Frio" className="zoom" />
            <h3>Rio Frio</h3>
            <button onClick={() => handleRouteDetails('rio-frio')}>Ver más</button>
          </div>
        </div>
      </main>

      <footer>
        <h2>BiciCaribe</h2>
        <p>
          <small>&copy; 2024 BiciCaribe. Todos los derechos reservados.</small>
        </p>
      </footer>
    </div>
  );
}
