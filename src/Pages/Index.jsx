import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Index.css';

export default function Index() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('index-view');
        
        return () => {
            document.body.classList.remove('index-view');
        };
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Bienvenido a BiciCaribe</h1>
                <p>La comunidad de amantes de la bicicleta en el Caribe.</p>
            </header>

            <nav>
                <ul>
                    <li>
                        <button type="button" onClick={() => navigate('/login')}>
                            Iniciar Sesión
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={() => navigate('/registro')}>
                            Registrarse
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
