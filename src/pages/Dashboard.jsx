import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (productData) => {
    if (editing) {
      await fetch(`https://fakestoreapi.com/products/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
      });
      setEditing(null);
      getProducts();
    } else {
      await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });
      getProducts();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    getProducts();
  };

  return (
    <div className="p-6">
      <h1
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#500106" }}
      >
        Dashboard — CRUD Completo 🛍️
      </h1>

      <ProductForm onSubmit={handleSubmit} editingProduct={editing} />

      <h2
        className="text-2xl font-semibold mt-10 mb-4"
        style={{ color: "#500106" }}
      >
        Produtos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onEdit={(prod) => setEditing(prod)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
