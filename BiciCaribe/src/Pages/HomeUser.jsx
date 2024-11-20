import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function HomeUser() {
  const navigate = useNavigate();

  // Redirección al perfil
  const handleProfileRedirect = () => {
    navigate('/profile'); // Cambia '/profile' según tu ruta real
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src="/img/logo-bicicaribe.jpg" alt="Logo Bicicleta" className="zoom" />
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
          <button className="login-btn" onClick={() => navigate ('/VerPerfil')}>
            Mi perfil
          </button>
        </div>
      </header>

      <nav className="barra">
        <ul>
          <li>
            <button type="button" onClick={() => navigate('/')}>
              INICIO
            </button>
          </li>
          <li className="dropdown">
            <button type="button">
              RUTAS <i className="fa fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" onClick={() => navigate('/VerRutas')}>
                  Ver Rutas
                </button>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <button type="button">
              GRUPOS DE SALIDA <i className="fa fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" onClick={() => navigate('/grupos')}>
                  Ver Grupos
                </button>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <button type="button">
              TORNEOS <i className="fa fa-chevron-down"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button type="button" onClick={() => navigate('/torneos')}>
                  Ver Torneos
                </button>
              </li>
            </ul>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/contact')}>
              CONTACTANOS
            </button>
          </li>
          <li>
            <a
            className="fa-brands fa-facebook fa-xl"
            href="https://laberinto-bicicaribe.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          ><button> JUEGO </button></a>
          </li>
        </ul>
      </nav>

      <main>
        <div className="search-bar">
          <input type="text" id="buscarRuta" placeholder="Buscar ruta" />
        </div>
        <div id="resultadoRutas"></div>

        <div className="routes">
          <div className="route-card">
            <img src="/img/minca.jpg" alt="Minca - Cerro Kennedy - Arimaca" className="zoom" />
            <h3>Minca - Cerro Kennedy - Arimaca</h3>
            <button>Ver más</button>
          </div>
          <div className="route-card">
            <img src="/img/cerro-kennedy.jpg" alt="Minca - Cerro Kennedy" className="zoom" />
            <h3>Minca - Cerro Kennedy</h3>
            <button>Ver más</button>
          </div>
          <div className="route-card">
            <img src="/img/rio.jpg" alt="Rio Frio" className="zoom" />
            <h3>Rio Frio</h3>
            <button>Ver más</button>
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
