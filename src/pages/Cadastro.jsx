// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Cadastro = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleCadastro = () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("Completa todos los campos");
      return;
    }

  fetch("https://fakestoreapi.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, username, password })
})
      .then((res) => {
        if (!res.ok) throw new Error("Error al registrar");
        return res.json();
      })
      .then(() => {
        // Registro OK!
        const fakeToken = "token-" + Date.now();

        localStorage.setItem("userToken", fakeToken);
        setToken(fakeToken);

        setSuccess("¡Registro exitoso! Redirigiendo...");
        
        // Limpia campos
        setUsername("");
        setEmail("");
        setPassword("");

        // Ir al Dashboard
        setTimeout(() => navigate("/dashboard"), 1500);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="main-content">
    <div className="login">
      <div className="login-inputs">
        <h2>Cadastro</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <small style={{ color: "red" }}>{error}</small>}
        {success && <small style={{ color: "green" }}>{success}</small>}

        <button onClick={handleCadastro}>Registrar</button>

        <p>
          ¿Ya tienes una cuenta?
          <button
            onClick={() => navigate("/login")}
            style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Cadastro;