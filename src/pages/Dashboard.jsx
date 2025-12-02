import { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import * as yup from "yup";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const schema = yup.object({
    title: yup.string().required("Título é obrigatório"),
    price: yup
      .number()
      .typeError("Preço deve ser um número")
      .required("Preço é obrigatório")
      .positive("Preço deve ser maior que zero"),
    description: yup
      .string()
      .required("Descrição é obrigatória")
      .min(10, "Descrição muito curta"),
    image: yup
      .string()
      .url("Deve ser uma URL válida")
      .required("URL da imagem é obrigatória"),
    category: yup.string().required("Categoria é obrigatória"),
  });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await schema.validate(form, { abortEarly: false });
    } catch (validationError) {
      const formErrors = {};
      validationError.inner.forEach((err) => {
        if (err.path) formErrors[err.path] = err.message;
      });
      setErrors(formErrors);
      return;
    }

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

        setToasts((t) => [
          ...t,
          { id: Date.now(), type: "success", message: "Produto atualizado" },
        ]);
      } else {
        const created = await axios.post(
          "https://fakestoreapi.com/products",
          form
        );

        setProducts([...products, created.data]);

        setToasts((t) => [
          ...t,
          { id: Date.now(), type: "success", message: "Produto criado" },
        ]);
      }

      setForm({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (err) {
      setToasts((t) => [
        ...t,
        { id: Date.now(), type: "error", message: "Erro ao salvar" },
      ]);
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);

      setProducts(products.filter((p) => p.id !== id));

      setToasts((t) => [
        ...t,
        { id: Date.now(), type: "success", message: "Produto excluído" },
      ]);

      setDeleteConfirmId(null);
    } catch (err) {
      setToasts((t) => [
        ...t,
        { id: Date.now(), type: "error", message: "Erro ao excluir" },
      ]);
      console.log(err);
    }
  };

  function removeToast(id) {
    setToasts((s) => s.filter((t) => t.id !== id));
  }

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      price: p.price,
      description: p.description,
      image: p.image,
      category: p.category,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Dashboard
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border p-5 rounded-2xl shadow-md grid gap-3"
      >
        <input
          placeholder="Título"
          className="p-3 rounded-xl border bg-blue-50"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {errors.title && (
          <small className="text-red-600">{errors.title}</small>
        )}

        <input
          placeholder="Preço"
          className="p-3 rounded-xl border bg-blue-50"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        {errors.price && (
          <small className="text-red-600">{errors.price}</small>
        )}

        <input
          placeholder="Categoria"
          className="p-3 rounded-xl border bg-blue-50"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        {errors.category && (
          <small className="text-red-600">{errors.category}</small>
        )}

        <input
          placeholder="URL da Imagem"
          className="p-3 rounded-xl border bg-blue-50"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        {errors.image && (
          <small className="text-red-600">{errors.image}</small>
        )}

        <textarea
          placeholder="Descrição"
          className="p-3 rounded-xl border bg-blue-50 h-24"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />
        {errors.description && (
          <small className="text-red-600">{errors.description}</small>
        )}

        <button className="bg-blue-600 text-white py-3 rounded-xl">
          {editingId ? "Salvar edição" : "Criar produto"}
        </button>
      </form>

      {/* Grid */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="break-inside-avoid bg-white p-4 rounded-2xl shadow-md border mb-5"
          >
            <img
              src={p.image}
              className="w-full h-52 object-contain rounded-xl mb-3"
            />

            <h3 className="font-semibold text-lg text-blue-700">
              {p.title}
            </h3>
            <p className="font-bold text-red-500">R$ {p.price}</p>

            <button
              onClick={() => handleEdit(p)}
              className="w-full bg-red-300 rounded-xl py-2 mt-3"
            >
              Editar
            </button>

            <button
              onClick={() => setDeleteConfirmId(p.id)}
              className="w-full bg-red-500 text-white rounded-xl py-2 mt-2"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      {/* Modal delete */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-semibold mb-3">
              Confirmar exclusão?
            </h3>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="fixed inset-0 flex items-start justify-end p-6 pointer-events-none">
        <div className="flex flex-col gap-2 w-full max-w-xs pointer-events-auto">
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              message={t.message}
              type={t.type}
              onClose={removeToast}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
