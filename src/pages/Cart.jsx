import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Tu carrito está vacío 😢</h2>;
  }

  return (
    <div className="cart-container">

      <h2>Carrito ({totalItems} items)</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-img" />

          <div className="cart-info">
            <h4>{item.title}</h4>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.qty}</p>

            <div className="cart-buttons">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <button onClick={() => increaseQty(item.id)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}

      <h3>Total: ${totalPrice}</h3>

      <button className="clear-btn" onClick={clearCart}>
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Cart;
