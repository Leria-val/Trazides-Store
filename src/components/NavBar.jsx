import React, { useContext } from 'react'
import '../App.css'
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const NavBar = ({ token, role, setToken, setRole }) => {
    const navigate = useNavigate();
    const { totalItems } = useContext(CartContext);

    const logOutHandler  = () => {
        setToken(null);
        setRole?.(null);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userRole');
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

                        {/* Dashboard — apenas visível para admins */}
                        {role === 'admin' && (
                            <button
                                className="dashboard-btn"
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </button>
                        )}

                        {/* Quick access ao admin-login se o usuário não for admin */}
                        {role !== 'admin' && (
                            <button className="admin-login-btn" onClick={() => navigate('/admin-login')}>Entrar como admin</button>
                        )}

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
 