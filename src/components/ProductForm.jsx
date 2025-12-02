import { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, editingProduct }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price);
      setImage(editingProduct.image);
    } else {
      setTitle("");
      setPrice("");
      setImage("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      price,
      image,
      description: "Produto criado no projeto React :)"
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow max-w-md mx-auto"
      style={{ border: "2px solid #8babc5" }}
    >
      <h2
        className="text-xl font-bold mb-3 text-center"
        style={{ color: "#500106" }}
      >
        {editingProduct ? "Editar Produto" : "Novo Produto"}
      </h2>

      <input
        className="w-full border p-2 rounded mb-3"
        style={{ borderColor: "#8babc5" }}
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-3"
        style={{ borderColor: "#8babc5" }}
        placeholder="Preço"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-4"
        style={{ borderColor: "#8babc5" }}
        placeholder="URL da Imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button
        className="w-full text-white p-2 rounded"
        style={{ backgroundColor: "#8babc5" }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#7a99ae")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#8babc5")}
      >
        {editingProduct ? "Salvar Alterações" : "Adicionar"}
      </button>
    </form>
  );
}