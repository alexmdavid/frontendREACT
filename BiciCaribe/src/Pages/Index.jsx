import React from 'react'

export default function Index() {
    return (
        <>
            <div className="container">
                <header>
                    <h1>Bienvenido a BiciCaribe</h1>
                    <p>La comunidad de amantes de la bicicleta en el Caribe.</p>
                </header>

                <nav>
                    <ul>
                        <li>
                            <form action="login.jsp" method="get">
                                <button type="submit">Iniciar Sesión</button>
                            </form>
                        </li>
                        <li>
                            <form action="registro.jsp" method="get">
                                <button type="submit">Registrarse</button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
