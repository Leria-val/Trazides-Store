import React, {useState} from 'react'
import '../App.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ({ token, setToken}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

const navigate = useNavigate();


    const loginHandler = () => {
        setError("")
        
        
        axios ({
            url:"https://fakestoreapi.com/auth/login",
            method:"POST",
            data: {
             username: userName,
             password: password,
            },
        })
        
      .then((res) => {
        const token = res.data.token;
        console.log("Token:", token);

        // Guardar token correctamente
        localStorage.setItem("userToken", token);
        setToken(token);

        // Limpiar campos
        setUserName("");
        setPassword("");

        // ⬅ REDIRECCIÓN DESPUÉS DEL LOGIN EXITOSO
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setError("Usuario o contraseña inválidos");
      });
  };
 

    return (
      <div className="main-content">
        <div className= "login"> 

        <div className='login-inputs'>

            <input value={userName} 
            onChange={(e) =>setUserName(e.target.value)} 
            type='text' 
            placeholder="Username" 
            />

            <input value={password} 
            onChange={(e) =>setPassword(e.target.value)} 
            type='password'
            placeholder='Password'
            />


            {error && <small> {error} </small>}


    <button onClick={loginHandler}>Login</button>  



<p>
          ¿No tienes cuenta?
          <button 
            onClick={() => navigate("/cadastro")}
            className="link-button"
            > Ir a Cadastro
          </button>
      </p>


      <p className="test-user-text">
         Usuario de prueba:<br />
      <strong>mor_2314</strong> / <strong>83r5^_</strong>
      </p>
    </div> 
  </div>
</div>
    );
};

export default Login;