import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import BackButton from "./BackButton"; 



const ProductDetails = () => {
  const { id } = useParams(); // obtiene el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // ADICIONE esta linha

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>No product found</h2>;

  return (
    <div className="main-content">
      
    <div className="details-container">
      <img src={product.image} alt={product.title} className="details-img" />

      <div className="details-info">
        <h2>{product.title}</h2>
        <h3>Price: ${product.price}</h3>
        <p>{product.description}</p>
        <h4>Category: {product.category}</h4>
        <div>
          <button 
            className="add-btn"
            onClick={() => {
            addToCart(product); 
           alert("Producto agregado al carrito ✅"); 
            }}>          
            Agregar al carrito
          </button>

          {/* Botão Comprar Agora */}
          <button
            className="add-btn"
            style={{ marginLeft: '12px', background: "#222" }}
            onClick={() => {
              const token = localStorage.getItem("userToken");
              if (!token) {
                navigate("/signup"); // ou "/cadastro" se esse for seu cadastro
              } else {
                addToCart(product);
                alert("Compra simulada 🎉 ¡Pago realizado!"); 
                navigate("/cart");
              }}}>            
              Comprar Ahora
            </button>

        </div>
      </div>
      <BackButton />
    </div>
    </div>
    
  );
};

export default ProductDetails;