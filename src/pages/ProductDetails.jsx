import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";


const ProductDetails = () => {
  const { id } = useParams();        // obtiene el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);

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
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
