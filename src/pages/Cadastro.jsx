// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  page: {
    background: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "inherit"
  },
  header: {
    background: "#111",
    color: "#fff",
    fontSize: 38,
    fontWeight: 700,
    textAlign: "center",
    width: "100%",
    padding: "24px 0 17px",
    marginBottom: 33
  },
  formContainer: {
    background: "#fafcff",
    borderRadius: 16,
    boxShadow: "0 2px 12px #0003",
    padding: 32,
    minWidth: 320,
    width: "100%",
    maxWidth: 370,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    margin: "auto",
    transition: "all 0.5s"
  },
  label: {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 6
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: 7,
    fontSize: 16,
    padding: "11px 10px",
    marginBottom: 18,
    outline: "none"
  },
  btn: {
    background: "#111",
    color: "#fff",
    border: 0,
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 18,
    padding: "13px 0",
    marginTop: 8,
    cursor: "pointer",
    marginBottom: 7,
    transition: "background 0.2s"
  },
  switch: {
    background: "#111",
    color: "#fff",
    borderRadius: 8,
    padding: "8px 24px",
    border: "2px solid #111",
    fontWeight: 600,
    fontSize: 18,
    textDecoration: "none",
    transition: "background 0.2s",
    cursor: "pointer",
    margin: "16px auto 0",
    textAlign: "center",
    display: "block",
    width: "fit-content"
  },
  error: {
    color: "#e14c4c",
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 8
  },
  success: {
    color: "#2cbf73",
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8
  },
  fade: {
    animation: "fadeIn 0.33s",
  }
};

const keyframes = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateX(18px);}
  100% { opacity: 1; transform: translateX(0);}
}
`;

const validateEmail = (email) =>
  /^.+@.+\..+$/.test(email);

export default function Cadastro() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formKey, setFormKey] = useState(0);

  const handleInput = (e) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
    setFeedback("");
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setFeedback("");
    setError("");
    setFields({ name: "", email: "", password: "" });
    setFormKey(Math.random());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFeedback("");
    setLoading(true);

    if (mode === "register" && !fields.name.trim()) {
      setError("Informe seu nome.");
      setLoading(false);
      return;
    }
    if (!fields.email.trim() || !validateEmail(fields.email)) {
      setError("E-mail inválido.");
      setLoading(false);
      return;
    }
    if (fields.password.length < 5) {
      setError("Senha precisa ter ao menos 5 caracteres.");
      setLoading(false);
      return;
    }

    if (mode === "login") {
      // FakeStore API simulando POST
      try {
        const res = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: fields.email,
            password: fields.password,
          }),
        });
        if (res.status === 200) {
          setFeedback("Login realizado! Redirecionando...");
          setTimeout(() => navigate("/"), 1300);
        } else {
          throw new Error();
        }
      } catch {
        setError("Falha ao entrar. Dados incorretos!");
      }
    } else {
      setFeedback("Conta criada! Acesse o login.");
      setTimeout(switchMode, 1500);
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>
      <div style={styles.header}>Trazides Store</div>
      <form
        key={formKey}
        style={{ ...styles.formContainer, ...styles.fade }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div
          style={{
            fontSize: 26,
            textAlign: "center",
            fontWeight: 700,
            marginBottom: 22
          }}
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </div>

        {mode === "register" && (
          <div>
            <label style={styles.label} htmlFor="name">
              Nome
            </label>
            <input
              style={styles.input}
              id="name"
              name="name"
              value={fields.name}
              onChange={handleInput}
              placeholder="Seu nome"
              autoFocus
            />
          </div>
        )}

        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.input}
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleInput}
          placeholder="Seu email"
          autoFocus={mode === "login"}
        />

        <label style={styles.label} htmlFor="password">
          Senha
        </label>
        <input
          style={styles.input}
          id="password"
          name="password"
          type="password"
          value={fields.password}
          onChange={handleInput}
          placeholder="Senha (mín. 5 caracteres)"
        />

        {error && <div style={styles.error}>{error}</div>}
        {feedback && <div style={styles.success}>{feedback}</div>}

        <button
          style={styles.btn}
          type="submit"
          disabled={loading}
          onMouseOver={e => (e.target.style.background = "#333")}
          onMouseOut={e => (e.target.style.background = "#111")}
        >
          {loading
            ? "Carregando..."
            : mode === "login"
            ? "Entrar"
            : "Criar Conta"}
        </button>
        {/* Botão de alternância de modo */}
        <button
          type="button"
          style={styles.switch}
          onClick={switchMode}
          onMouseOver={e => (e.target.style.background = "#333")}
          onMouseOut={e => (e.target.style.background = "#111")}
        >
          {mode === "login"
            ? "Ainda não tem conta? Cadastre-se"
            : "Já tem conta? Entrar"}
        </button>
      </form>
    </div>
  );
}