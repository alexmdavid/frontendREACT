import React from 'react';
import './App.css';
import Index from './Pages/Index';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Registro from './Pages/Registro';
import Grupos from './Pages/ListarGrupos';
import RegistroGrupos from './Pages/RegistroGrupos';
import ListadoTorneos from './Pages/ListarTorneos';
import ListaUsuarios from './Pages/LIstarUsuarios';
import EditarUserAdmin from './Pages/EditarUser-Admin';
import RegistrarTorneo from './Pages/RegistroTorneos';
import RegistroRutas from './Pages/RegistroRutas'
import VerPerfil from './Pages/VerPerfil';
import VerRutas from './Pages/VerRutas'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define las rutas de tu aplicación */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/registro' element={<Registro/>} />
        <Route path='/grupos' element={<Grupos/>} />
        <Route path='/grupos/registro' element={<RegistroGrupos/>} />
        <Route path='/torneos' element={<ListadoTorneos/>} />
        <Route path='/usuarios' element={<ListaUsuarios/>} />
        <Route path='/editar/user' element={<EditarUserAdmin/>} />
        <Route path='/registro/torneo' element={<RegistrarTorneo/>} />
        <Route path='/rutas/registrar' element={<RegistroRutas/>} />
        <Route path='/VerPerfil' element={<VerPerfil/>} />
        <Route path='/VerRutas' element={<VerRutas/>} />

      </Routes>
    </Router>
  );
}

export default App;
