import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Products from './components/Products';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart"; 
import Cadastro from './pages/Cadastro';
import { CartProvider } from './context/CartContext';
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);

  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("userToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <CartProvider>
      <div className="App">

        {/* 👇 Solo aparece si hay login */}
        {token && <NavBar setToken={setToken} />}

        <Routes>
          {/* Login */}
          <Route 
            path="/login" 
            element={<Login setToken={setToken} />} 
          />

          {/* Cadastro */}
          <Route 
            path="/cadastro"
            element={<Cadastro setToken={setToken} />} 
          />

          {/* Página inicial protegida */}
          <Route 
            path="/" 
            element={
              token ? <Products /> : <Navigate to="/login" replace />
            }
          />

          <Route 
            path="/products/:id" 
            element={
              token ? <ProductDetails /> : <Navigate to="/login" replace />
            }
          />

          <Route 
            path="/cart" 
            element={
              token ? <Cart /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/dashboard"
            element={
              token ? <Dashboard logout={logout} /> : <Navigate to="/login" replace />
            }
          />
        </Routes>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;