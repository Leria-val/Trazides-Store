import React from "react";

export default function Dashboard() {
  const produtosFake = [
    { id: 1, nome: "Camisa Oversized", preco: 79.9 },
    { id: 2, nome: "Tênis Branco", preco: 249.9 },
    { id: 3, nome: "Moletom Preto", preco: 129.9 },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard Administrativo ⚙️</h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "20px",
            background: "#f2f2f7",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Total de Produtos</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold" }}>58</p>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "20px",
            background: "#f2f2f7",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Usuários Cadastrados</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold" }}>1.243</p>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "200px",
            padding: "20px",
            background: "#f2f2f7",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Pedidos Realizados</h3>
          <p style={{ fontSize: "26px", fontWeight: "bold" }}>219</p>
        </div>
      </div>

      {/* Tabela */}
      <h2>Produtos cadastrados</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          background: "white",
          marginTop: "15px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#d8d8e3" }}>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtosFake.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>
                <button>Editar</button>
                <button style={{ marginLeft: "10px" }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}