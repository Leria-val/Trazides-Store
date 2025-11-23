
import './App.css';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Products from './components/Products';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart"; 
import { CartProvider } from './context/CartContext';

function App() {
  const [token, setToken] =
    useState(localStorage.getItem("userToken") ?? null);

  return (
    <CartProvider>
      <div className="App">

        <NavBar setToken={setToken} />
<Routes>


  <Route 
    path="/login" 
    element={<Login token={token} setToken={setToken} />} 
  />

  <Route 
    path="/" 
    element={
      token 
        ? <Products /> 
        : <Login token={token} setToken={setToken} />
    } 
  />


  <Route 
    path="/products/:id" 
    element={
      token 
        ? <ProductDetails /> 
        : <Login token={token} setToken={setToken} />
    } 
  />

  <Route path="/cart" 
      element={
           token 
           ? <Cart />
          : <Login token={token} setToken={setToken} />
      }/>
</Routes>
        <Footer />

      </div>
    </CartProvider>
  );
}

export default App;






