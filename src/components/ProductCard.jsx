export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
      className="bg-white border-2 rounded-2xl p-4 shadow 
      transition hover:-translate-y-1 hover:shadow-lg"
      style={{ borderColor: "#8babc5" }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain mb-3"
      />

      <h2
        className="font-semibold text-lg mb-1 line-clamp-2"
        style={{ color: "#500106" }}
      >
        {product.title}
      </h2>

      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
        {product.description}
      </p>

      <p className="font-bold mb-3" style={{ color: "#8babc5" }}>
        R$ {product.price}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 text-white px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#8babc5" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#7a99ae")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#8babc5")}
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 text-white px-3 py-2 rounded-lg"
          style={{ backgroundColor: "#500106" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3d0104")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#500106")}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}