import React, {useState} from 'react'
import '../App.css'
import axios from "axios";

const AdminLogin = ({ token, setToken, setRole }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        .then(res=> {
            console.log(res.data.token);
            setToken(res.data.token)
            setRole('admin')
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem('userRole', 'admin');

            setPassword("")
            setUserName ("")
        })
        .catch((err) => {
            console.log(err?.response);
            setError(err?.response?.data || 'Erro ao autenticar');
    });

};
 

    return (
        <div className= "login"> 

        <div className='login-inputs'>

            <input value={userName} 
            onChange={(e) =>setUserName(e.target.value)} 
            type='text' 
            placeholder="Admin Username" 
            />

            <input value={password} 
            onChange={(e) =>setPassword(e.target.value)} 
            type='password'
            placeholder='Admin Password'
            />


            {error && <small> {error} </small>}


    <button onClick={loginHandler}>Entrar como Admin</button>  


        </div> 
        </div>
    );
};

export default AdminLogin;
