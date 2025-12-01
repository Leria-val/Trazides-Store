import React, { useContext } from 'react'
import '../App.css'
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
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

            {/* Dashboard link: always visible. If no token, redirect user to /login */}
            <button
                className="dashboard-btn"
                onClick={() => navigate(token ? '/dashboard' : '/login')}
            >
                Dashboard
            </button>

            {/* Login / Logout */}
            {token ? (
                <button 
                    className='log-out-btn' 
                    onClick= {() => logOutHandler()}> 
                    Log Out 
                </button>
            ) : (
                <button className='login-btn' onClick={() => navigate('/login')}>Login</button>
            )}
            </div>
    )
}

export default NavBar
 