import { useEffect, useState } from "react"
import ProductsContainer from "./ProductsContainer"
import { ErrorHandler } from "../utils/errorhandler";
import { API, TOP_RATED_PRODUCTS } from "../api/api";


export default function TopratedProducts(){

const [products, setProducts] = useState([]);

useEffect(function(){

    async function fetchProducts() {
        try{
            const response = await API.get(TOP_RATED_PRODUCTS);
            setProducts(response.data.products);
            
        }catch(error){
            ErrorHandler(error);
        }
    } 
    fetchProducts();
},[])

    return(
        <>

        <ProductsContainer  products={products} title= "Our Customers Reviews"
        subtitle="Listen to our Customers"/>

        </>
    )
}