import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Home.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../assets/img/logo-bicicaribe.jpg';
import image1 from '../assets/img/cerro-kennedy.jpg';
import image2 from '../assets/img/minca.jpg';
import image3 from '../assets/img/rio.jpg';

export default function HomeUser() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('home-view');

    
    return () => {
      document.body.classList.remove('home-view');
    };
  }, []);

  // Función para redirigir al perfil
  const handleProfileRedirect = () => {
    navigate('/profile'); // Cambia la ruta a la que quieras redirigir al perfil
  };

 
  const handleRouteDetails = (routeName) => {
    navigate(`/rutas/${routeName}`);
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={ logo } alt="Logo Bicicleta" className="zoom" />
        </div>
        <div className="social-media">
          <a
            className="fa-brands fa-facebook fa-xl"
            href="https://www.facebook.com/profile.php?id=61569125060880&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
          ><FontAwesomeIcon icon={faFacebook} /></a>
          <a
            className="fa-brands fa-instagram fa-xl"
            href="https://www.instagram.com/bici_caribe/?igsh=MWN6ZDM4b2VremhvaQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          ><FontAwesomeIcon icon={faInstagram} /></a>
          <a className="fa-brands fa-twitter fa-xl"><FontAwesomeIcon icon={faTwitter}/></a>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate('/VerPerfil')}>
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
            <a href="#">RUTAS <i className="fa fa-chevron-down"><FontAwesomeIcon icon={faChevronDown}  /></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/VerRutas')} href="#">Ver Ruta</a></li>
            </ul>
          </li>

          {/* Menú de Grupos de Salida */}
          <li className="dropdown">
            <a href="#">GRUPOS DE SALIDA <i className="fa fa-chevron-down"><FontAwesomeIcon icon={faChevronDown} /></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/grupos')} href="#">Ver Grupos</a></li>
            </ul>
          </li>

          {/* Menú de Torneos */}
          <li className="dropdown">
            <a href="#">TORNEOS <i className="fa fa-chevron-down"><FontAwesomeIcon icon={faChevronDown}  /></i></a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/torneos')} href="#">Ver Torneos</a></li>
            </ul>
          </li>

          <li><a onClick={() => navigate('/usuarios')} href="#">VER USUARIOS</a></li>
          <li><a onClick href="https://wa.me/+573045853090/">CONTACTANOS</a></li>
          <li><a onClick href="https://laberinto-bicicaribe.vercel.app/">JUEGO</a> </li>
        </ul>
      </nav>

      <main>
        <div className="search-bar">
          <input type="text" id="buscarRuta" placeholder="Buscar ruta" />
        </div>
        <div id="resultadoRutas"></div>

        <div className="routes">
          <div className="route-card">
            <img src={ image1 } alt="Minca - Cerro Kennedy - Arimaca" className="zoom" />
            <h3>Minca - Cerro Kennedy - Arimaca</h3>
            <button onClick={() => handleRouteDetails('minca')}>Ver más</button>
          </div>
          <div className="route-card">
            <img src={image2} alt="Minca - Cerro Kennedy" className="zoom" />
            <h3>Minca - Cerro Kennedy</h3>
            <button onClick={() => handleRouteDetails('cerro-kennedy')}>Ver más</button>
          </div>
          <div className="route-card">
            <img src={ rio } alt="Rio Frio" className="zoom" />
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
