import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { login } from "../api/authApi";
import { registrarUsuario } from "../api/usuariosApi";

const REGIONES = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena"
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    rut: "",
    region: "",
    contraseña: "",
    repetir: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
  const rutRegex = /\b[0-9|.]{1,10}\-[K|k|0-9]/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Ingresa tus datos");
      return;
    }

    try {

      const response = await login(email, password);
      const data = response.data;

      if (data.token) {
        localStorage.setItem("token", data.token);


        const usuarioData = {
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          rol: (data.rol || "USER").toUpperCase(),
        };

        localStorage.setItem("usuario", JSON.stringify(usuarioData));

        if (usuarioData.rol === "ADMIN" || usuarioData.rol === "VENDEDOR") {
          window.location.href = "/BackOF";
        } else {
          window.location.href = "/";
        }

      } else {
        setError("Error: No se recibió token del servidor");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Credenciales incorrectas");
      } else {
        setError("Error en el servidor o conexión");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { nombres, apellidos, correo, direccion, rut, region, contraseña, repetir } = registerData;

    setError("");
    setSuccess("");

    if (!nombres || !apellidos || !correo || !direccion || !rut || !region || !contraseña || !repetir) {
      setError("Completa todos los campos");
      return;
    }

    if (!emailRegex.test(correo)) {
      setError("Correo electrónico no válido");
      return;
    }

    if (!rutRegex.test(rut)) {
      setError("El RUT no es válido (Ej: 12.345.678-9)");
      return;
    }

    if (!passwordRegex.test(contraseña)) {
      setError("La contraseña no cumple los requisitos");
      return;
    }

    if (contraseña !== repetir) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registrarUsuario({
        nombre: `${nombres} ${apellidos} `,
        email: correo,
        direccion: direccion,
        rut: rut,       // Enviamos el RUT
        region: region, // Enviamos un string con el nombre de la región
        contrasena: contraseña,
      });

      setSuccess("Usuario registrado correctamente");
      setRegisterData({
        nombres: "",
        apellidos: "",
        correo: "",
        direccion: "",
        rut: "",
        region: "",
        contraseña: "",
        repetir: "",
      });
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario");
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-5 form-box">
            <h3 className="form-title">Iniciar Sesión</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-login w-100">
                Iniciar sesión
              </button>
            </form>
          </div>

          <div className="col-md-5 form-box">
            <h3 className="form-title">Registrar Usuario</h3>
            <form onSubmit={handleRegister}>
              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={registerData.nombres}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={registerData.apellidos}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="email"
                  name="correo"
                  placeholder="Correo"
                  value={registerData.correo}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={registerData.direccion}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="rut"
                  placeholder="RUT (ej: 12.345.678-9)"
                  value={registerData.rut}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <select
                  className="form-control"
                  name="region"
                  value={registerData.region}
                  onChange={handleRegisterChange}
                >
                  <option value="">Selecciona una región</option>
                  {REGIONES.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                  value={registerData.contraseña}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group mb-3">
                <input
                  className="form-control"
                  type="password"
                  name="repetir"
                  placeholder="Repetir Contraseña"
                  value={registerData.repetir}
                  onChange={handleRegisterChange}
                />
              </div>

              <button type="submit" className="btn-login w-100">
                Crear cuenta
              </button>
            </form>
          </div>

          <div className="col-12 text-center mt-3">
            {error && <p className="text-danger fw-bold">{error}</p>}
            {success && <p className="text-success fw-bold">{success}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
