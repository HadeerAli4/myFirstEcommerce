import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const API = axios.create({
    baseURL: BASE_URL,
});


export const LOGIN_API = "/auth/login"; 
export const VERIFY_TOKEN_API = "/auth/me";
export const ADD_USER = "/users/add";

export const GET_ALL_CATEGORIES_API ="/products/categories";

export const GET_DISCOUNT_PRODUCTS = "/products?sortBy=discountPercentage&order=desc";

export const TOP_RATED_PRODUCTS = "/products?sortBy=rating&order=desc";

export const LATEST_PRODUCTS = "/products?sortBy=new&order=desc";

export const searchForProducts = (searchTerm, limit = 60, skip = 0) =>
  `/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`;

export const fetchSingleProduct = (id) => `https://dummyjson.com/products/${id}`;