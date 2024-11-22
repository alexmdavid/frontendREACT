import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    sexo: "",
    tipoDeSangre: "",
  });
  const [idUsuario, setIdUsuario] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Recuperar el idUsuario del administrador del localStorage
  const usuarioString = localStorage.getItem("usuario");
  let adminId = null;
  if (usuarioString) {
    const admin = JSON.parse(usuarioString);
    adminId = admin.idUsuario;
  }

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (idusuario) => {
    const usuario = usuarios.find((u) => u.idUsuario === idusuario);
    if (usuario) {
      setPerfil({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        sexo: usuario.sexo,
        tipoDeSangre: usuario.tipoDeSangre,
        correo: usuario.correo,
      });
      setIdUsuario(idusuario);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPerfil({
      nombre: "",
      apellido: "",
      sexo: "",
      tipoDeSangre: "",
    });
    setIdUsuario(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idUsuario) {
      alert("No se encontró el ID del usuario para actualizar.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/usuarios/${idUsuario}`,
        perfil
      );
      if (response.status === 200) {
        alert("Usuario actualizado correctamente");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.idUsuario === idUsuario
              ? { ...usuario, ...perfil }
              : usuario
          )
        );
        closeModal();
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (idusuario) => {
    try {
      await axios.delete(`http://localhost:8080/api/usuarios/${idusuario}`);
      setUsuarios(usuarios.filter((usuario) => usuario.idUsuario !== idusuario));
      alert("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="listar-usuarios-container">
      <h1>Lista de Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios
              .filter((usuario) => usuario.idUsuario !== adminId) // Excluir al admin
              .map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {usuario.nombre}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {usuario.apellido}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={() => handleEdit(usuario.idUsuario)}
                    >
                      Editar
                    </button>

                    <button
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={() => handleDelete(usuario.idUsuario)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                No se encontraron usuarios.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            borderRadius: "8px",
          }}
        >
          <h2>Editar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Nombre:
                <input
                  type="text"
                  name="nombre"
                  value={perfil.nombre}
                  onChange={handleChange}
                  style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Apellido:
                <input
                  type="text"
                  name="apellido"
                  value={perfil.apellido}
                  onChange={handleChange}
                  style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Sexo:
                <input
                  type="text"
                  name="sexo"
                  value={perfil.sexo}
                  onChange={handleChange}
                  style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>
                Tipo de Sangre:
                <input
                  type="text"
                  name="tipoDeSangre"
                  value={perfil.tipoDeSangre}
                  onChange={handleChange}
                  style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
                />
              </label>
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeModal}
        />
      )}
    </div>
  );
}
