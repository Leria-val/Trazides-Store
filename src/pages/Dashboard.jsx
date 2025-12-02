import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [columns, setColumns] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const updateColumns = () => {
      const w = window.innerWidth;
      setColumns(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleCreate = async (data) => {
    try {
      const res = await api.post('/products', data);
      setProducts(prev => [res.data, ...prev]);
      toast.success('Produto criado');
      setShowForm(false);
    } catch {
      toast.error('Erro ao criar produto');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await api.put(`/products/${id}`, data);
      setProducts(prev => prev.map(p => (p.id === id ? res.data : p)));
      toast.success('Produto atualizado');
      setEditing(null);
      setShowForm(false);
    } catch {
      toast.error('Erro ao atualizar produto');
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm('Deseja realmente excluir este produto?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produto excluído');
    } catch {
      toast.error('Erro ao excluir produto');
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Produtos</h3>
        <div>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Novo produto
          </button>
        </div>
      </div>

      {showForm && (
        <ProductForm
          initialData={editing ?? undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}

      {loading ? (
        <div>Carregando...</div>
      ) : products.length === 0 ? (
        <div>Nenhum produto encontrado.</div>
      ) : (
        <div className="masonry" style={{ columnCount: columns, columnGap: '1rem' }}>
          {products.map(p => (
            <div key={p.id} className="masonry-item mb-4 break-inside-avoid">
              <ProductCard
                product={p}
                onEdit={() => {
                  setEditing(p);
                  setShowForm(true);
                }}
                onDelete={() => handleDelete(p.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}