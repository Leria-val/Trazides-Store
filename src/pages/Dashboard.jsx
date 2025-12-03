import { useEffect, useState } from "react";
import * as yup from "yup";
import api from "../services/api";
import BackButton from "./BackButton"; 


const productSchema = yup.object().shape({
  title: yup.string().required("Título obrigatório"),
  price: yup.number().required("Preço obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  image: yup.string().url("URL inválida").required("Imagem obrigatória"),
  category: yup.string().required("Categoria obrigatória"),
});

export default function Dashboard({ logout }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("userToken");

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => alert("Erro ao carregar produtos ⚠"));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productSchema.validate(formData);
    } catch (err) {
      return alert(err.message);
    }

    const method = editingProduct ? "PUT" : "POST";
    const endpoint = editingProduct
      ? "https://fakestoreapi.com/products/${editingProduct.id}"
      : "https://fakestoreapi.com/products";

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer `${token}`, // se um dia precisar
      },
      body: JSON.stringify(formData),

    }).then(res => res.json())

      .then(() => {
        alert(editingProduct ? "Produto atualizado!" : "Produto criado!");
        fetchProducts();
        resetForm();
      })
      .catch(() => alert("Erro ao salvar produto ⚠"));
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setFormData(p);
  };

  const handleDelete = (id) => {
    if (!confirm("Tem certeza?")) return;

    fetch(`https://fakestoreapi.com/products/${id}`), {
      method: "DELETE",
    }
      .then(() => {
        alert("Produto excluído!");
        fetchProducts();
      })
      .catch(() => alert("Erro ao excluir ⚠"));
  };

 const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

 return (
  <div className="main-content">
    <div style={{ padding: "20px" }}>
      <h2>Dashboard 🛍</h2>
      <button onClick={logout}>Logout</button>

      <h3>{editingProduct ? "Editar Produto" : "Novo Produto"}</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Imagem (URL)"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />

        <textarea
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button type="submit">
          {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
        {editingProduct && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Produtos</h3>

      {/* 🔍 Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          padding: "10px",
          width: "60%",
          marginRight: "10px",
          borderRadius: "6px"
        }}
      />

      {/*  Filtro de categoría */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px"
        }}
      >
        <option value="">Todas las categorías</option>
        <option value="electronics">Electrónica</option>
        <option value="jewelery">Joyas</option>
        <option value="men's clothing">Ropa Hombre</option>
        <option value="women's clothing">Ropa Mujer</option>
      </select>

      {/* 🛍 Lista de productos */}
      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id} style={{ marginBottom: "10px" }}>
            <img src={p.image} width="50" /> {p.title} - ${p.price}
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <BackButton />

    </div>
    </div>
  );
}