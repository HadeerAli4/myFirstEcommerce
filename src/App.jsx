import AppNavbar from "./components/navbar.jsx";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Footer } from "./components/footer.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { API, VERIFY_TOKEN_API } from "./api/api.js";
import { saveUser } from "./store/slices/userSlice.js";
import { useDispatch } from "react-redux";
import { ErrorHandler } from "./utils/errorhandler.js";
import Loading from "./components/loading.jsx";
import Checkout from "./pages/checkout.jsx";
import Profile from "./pages/profile.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem("theme") === "dark" // 
  );
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light"); 
  };

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function verifyToken() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.accessToken;
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await API.get(VERIFY_TOKEN_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        dispatch(saveUser(response.data));
      } catch (error) {
        ErrorHandler(error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    }
    verifyToken();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Toaster position="top-right" />

      <div 
        data-bs-theme={isDarkMode ? "dark" : "light"} 
        className="min-vh-100 d-flex flex-column"
        style={{ backgroundColor: isDarkMode ? "#1a1a2e" : "#ffffff" }} 
      >
        <AppNavbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <main className="flex-grow-1 min-vh-100 p-3 p-md-4">

           
           <div 
          className="container rounded-4 shadow-sm p-4 p-md-5"
          style={{ 
          border: isDarkMode ? "1px solid #33334d" : "1px solid #dee2e6",
          backgroundColor: isDarkMode ? "#1f1f38" : "#ffffff", 
          minHeight: "80vh" }}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orderPlaced" element={<OrderPlaced />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
            
            </div>
            <Footer />

        </main>

      </div>
    </>
  );
}