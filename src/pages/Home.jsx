import { useState, useEffect } from "react"; 
import CategoryList from "../components/Categorylist";
import SliderImages from "../components/SliderImages";
import LatestProducts from "../components/LatestProducts.jsx";
import TopratedProducts from "../components/TopratedProducts.jsx";
import DiscountProducts from "../components/DiscountProducts.jsx";
import ProductsContainer from "../components/ProductsContainer.jsx";

export default function Home(){
    const [allProducts, setAllProducts] = useState([]); 

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {

                setAllProducts(data.products); 
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <>
        <CategoryList />
        <SliderImages />
        
        <ProductsContainer 
            products={allProducts} 
            title="Our Latest Products" 
            subtitle="Check out what just arrived" 
        />
        
        <LatestProducts />
        <TopratedProducts />
        <DiscountProducts />        

        <section 
            className="container my-5 rounded-4 text-white position-relative overflow-hidden"
            style={{ backgroundColor: "black", minHeight: "300px" }} >

            <div className="position-absolute top-0 end-0 h-100 w-50 opacity-25" 
                 style={{ background: 'radial-gradient(circle at center, #FADADD 10%, transparent 10%)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="row align-items-center h-100 p-5 position-relative" style={{ zIndex: 2 }}>
                <div className="col-lg-7 mb-4 mb-lg-0">
                    <h2 className="display-5 fw-bold mb-3">Stay Ahead of the Stream</h2>
                    <p className="fs-5 text-light opacity-75 mb-4" style={{ maxWidth: "600px" }}>
                        Join our inner circle for exclusive early access to product launches, seasonal deals, and curated tech trends. No spam, just high-quality updates.
                    </p>
                    
                    <div className="d-flex flex-column flex-sm-row gap-3" style={{ maxWidth: "500px" }}>
                        <input 
                            type="email" 
                            className="form-control form-control-lg border-0 px-4" 
                            placeholder="Enter your email" 
                            style={{ backgroundColor: "#FADADD", color: "white" }}
                        />
                        <button className="btn btn-lg text-white fw-bold px-4 rounded-1" 
                                style={{ backgroundColor: "#e0c0c3" }}>
                            Join Now
                        </button>
                    </div>
                </div>
                
                <div className="col-lg-5 d-none d-lg-block"></div>
            </div>
        </section>
        </>
    );
}
