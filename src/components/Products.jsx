import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../App.css'
import axios from 'axios'
import { CartContext } from '../context/CartContext';


const Products = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState ([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

useEffect(() => {
    setLoading(true);
    axios ({
        method:"GET",
        url: "https://fakestoreapi.com/products",
    })
    .then((res) => {
        console.log(res.data)
        setData(res.data)
    })
    .catch((e )=> console.log(e))
    .finally(() => setLoading(false));
    }, []);


    return (
        <div className='products-container'>
        {loading && (
            <div>
                {" "}
                <h1> Loading...</h1>  
            </div>
        )}

        {data.map((product)=> (
            <div key={product.id} className="card">
            <div> <img src={product.image} alt="#"/> </div>
            <div className="card-description"> 

<h5> {product.title}</h5>  
<h6> {`Price: ${product.price}`}</h6>  
<h6> {`Category: ${product.category}`}</h6>  

            </div>
            <div>
            <button 
                className="add-btn"
                onClick={() => addToCart(product)}
             > Agregar al carrito
            </button>

         </div> 
    

         <button 
         onClick={() => navigate(`/products/${product.id}`)
         }> Ver Detalles
</button>
</div>



        ))}
     </div>
   )
}

export default Products

//12:15 https://www.youtube.com/watch?v=biBvOHB4M6k