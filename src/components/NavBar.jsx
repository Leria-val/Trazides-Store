import React, { useContext } from 'react'
import '../App.css'
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const NavBar = ({setToken}) => {
    const navigate = useNavigate();
    const { totalItems } = useContext(CartContext);

    const logOutHandler  = () => {
        setToken("");
        localStorage.clear();
    };
    return (
        <div className='navbar'>
            <h1>Trazides Store</h1>


      <div className="cart-info"
      onClick={() => navigate("/cart")}
      style={{ cursor: "pointer" }}
      >
        🛒 {totalItems}
      </div>


            <button 
            className='log-out-btn' 
            onClick= {() => logOutHandler()}> 
            Log Out 
            </button>
            </div>
    )
}

export default NavBar
 