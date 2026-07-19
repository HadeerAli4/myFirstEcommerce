import { useEffect, useState } from "react"

import ProductsContainer from "./ProductsContainer";
import { ErrorHandler } from "../utils/errorhandler";
import { API, GET_DISCOUNT_PRODUCTS } from "../api/api";

export default function DiscountProducts(){

const [products, setProducts] =useState([]);

useEffect(function(){
    async function fetchProducts() {
        try{
            const response = await API.get(GET_DISCOUNT_PRODUCTS);
            setProducts(response.data.products);
        }catch(error){
            ErrorHandler(error);
        }
    }
    fetchProducts();
},[])

    return(
        <>
     <ProductsContainer products={products} title=" Amazing Discounts "
      subtitle="Pick your favourite Products !" />
                
        </>
    )
}