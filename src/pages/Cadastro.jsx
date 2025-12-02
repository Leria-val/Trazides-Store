// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.form`
  background: #fafcff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 12px #0003;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
  width: 100%;
  max-width: 370px;

  @media (max-width: 500px) {
    min-width: 0;
    padding: 1.3rem 0.5rem;
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.13rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 7px;
  padding: 11px 10px;
  font-size: 1rem;
  margin-bottom: 3px;
  outline: none;

  &:focus {
    border-color: #111;
  }
`;

const Btn = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 13px 0;
  margin-top: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background 0.2s;
  &:hover {
    background: #333;
  }
`;

const Error = styled.div`
  color: #e14c4c;
  font-weight: 600;
  font-size: 1rem;
  margin-top: -7px;
`;

const Success = styled.div`
  color: #2cbf73;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

// Função utilitária para validar e-mail
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Signup() {
  const [fields, setFields] = useState({
    nome: "", email: "", senha: "",
    rua: "", numero: "", cidade: "", estado: "", cep: ""
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  function handleInput(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setError(""); setFeedback("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setFeedback("");
    setLoading(true);
    navigate("/pagamento")

    if (
      !fields.nome.trim() || !fields.email.trim() ||
      !fields.senha.trim() || !fields.rua.trim() || !fields.numero.trim() ||
      !fields.cidade.trim() || !fields.estado.trim() || !fields.cep.trim()
    ) {
      setError("Preencha todos os campos!");
      setLoading(false);
      return;
    }

    if (!validateEmail(fields.email)) {
      setError("Email inválido");
      setLoading(false);
      return;
    }
    if (fields.senha.length < 5) {
      setError("A senha precisa ter ao menos 5 caracteres.");
      setLoading(false);
      return;
    }

    // Enviar dados para FakeStoreAPI (criação do usuário)
    try {
      const resp = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: fields.email,
          username: fields.email,
          password: fields.senha,
          name: { firstname: fields.nome, lastname: "" },
          address: {
            city: fields.cidade, street: fields.rua, number: fields.numero,
            zipcode: fields.cep, geolocation: { lat: "0", long: "0" }
          },
          phone: "",
        })
      });
      if (!resp.ok) throw new Error();
      setFeedback("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/cart"), 1300);
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    }
    setLoading(false);
  }

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit} autoComplete="off">
        <h1 style={{ color: "#111", fontWeight: 900, textAlign: "center", fontSize: "2rem", letterSpacing: ".5px" }}>
          Criar Conta
        </h1>
        <Label htmlFor="nome">Nome</Label>
        <Input name="nome" id="nome" value={fields.nome} onChange={handleInput} placeholder="Seu nome" />

        <Label htmlFor="email">Email</Label>
        <Input name="email" id="email" value={fields.email} onChange={handleInput} placeholder="Seu email" type="email" />

        <Label htmlFor="senha">Senha</Label>
        <Input name="senha" id="senha" value={fields.senha} onChange={handleInput} placeholder="Senha (mín. 5 caracteres)" type="password" />

        <Label htmlFor="rua">Rua</Label>
        <Input name="rua" id="rua" value={fields.rua} onChange={handleInput} placeholder="Rua/avenida" />
        <Label htmlFor="numero">Número</Label>
        <Input name="numero" id="numero" value={fields.numero} onChange={handleInput} placeholder="Número" type="number"/>
        <Label htmlFor="cidade">Cidade</Label>
        <Input name="cidade" id="cidade" value={fields.cidade} onChange={handleInput} placeholder="Cidade" />
        <Label htmlFor="estado">Estado</Label>
        <Input name="estado" id="estado" value={fields.estado} onChange={handleInput} placeholder="Estado" />
        <Label htmlFor="cep">CEP</Label>
        <Input name="cep" id="cep" value={fields.cep} onChange={handleInput} placeholder="CEP" />

        {error && <Error>{error}</Error>}
        {feedback && <Success>{feedback}</Success>}

        <Btn type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? "Criando conta..." : "Criar Conta"}
        </Btn>
      </FormWrapper>
    </Container>
  );
}
