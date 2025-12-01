import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await axios.put(
          `https://fakestoreapi.com/products/${editingId}`,
          form
        );
        setProducts(
          products.map((p) => (p.id === editingId ? updated.data : p))
        );
        setEditingId(null);
      } else {
        const created = await axios.post(
          "https://fakestoreapi.com/products",
          form
        );
        setProducts([...products, created.data]);
      }

      setForm({
        title: "",
        price: "",
        description: "",
        image: "",
        category: ""
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.image,
      category: p.category
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 drop-shadow-sm">
        🔵🔴 Dashboard Azul & Vermelho
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blue-200 p-5 rounded-2xl shadow-md grid gap-3"
      >
        <input
          placeholder="Título"
          className="p-3 rounded-xl border border-blue-300 bg-blue-50"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Preço"
          className="p-3 rounded-xl border border-blue-300 bg-blue-50"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Categoria"
          className="p-3 rounded-xl border border-blue-300 bg-blue-50"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="URL da Imagem"
          className="p-3 rounded-xl border border-blue-300 bg-blue-50"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <textarea
          placeholder="Descrição"
          className="p-3 rounded-xl border border-blue-300 bg-blue-50 h-24"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md">
          {editingId ? "Salvar edição" : "Criar produto"}
        </button>
      </form>

      {/* Grid estilo Pinterest */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="break-inside-avoid bg-white p-4 rounded-2xl shadow-md border border-blue-200 mb-5"
          >
            <img
              src={p.image}
              className="w-full h-52 object-contain rounded-xl mb-3"
            />

            <h3 className="font-semibold text-lg text-blue-700">{p.title}</h3>
            <p className="font-bold text-red-500">R$ {p.price}</p>

            <button
              onClick={() => handleEdit(p)}
              className="w-full bg-red-300 hover:bg-red-400 transition rounded-xl py-2 mt-3 font-medium"
            >
              ✏️ Editar
            </button>

            <button
              onClick={() => handleDelete(p.id)}
              className="w-full bg-red-500 hover:bg-red-600 transition text-white rounded-xl py-2 mt-2 font-medium"
            >
              🗑️ Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
