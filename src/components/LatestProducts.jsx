import { useEffect, useState } from "react"
import ProductsContainer from "./ProductsContainer"
import { ErrorHandler } from "../utils/errorhandler";
import { API, LATEST_PRODUCTS } from "../api/api";

export default function LatestProducts(){

const [products, setProducts]= useState([]);

useEffect(function(){

    async function fetchProducts() {
        try{
            const response = await API.get(LATEST_PRODUCTS);
            setProducts(response.data.products);
            
        }catch(error){
            ErrorHandler(error);
        }
    } 
    fetchProducts();
},[])

    return(
        <>
        <ProductsContainer products={products} title="Our Lateset Products"
        subtitle="Pick you Item and get it now !"/>
        </>
    )
}