import ProductsSlider from "./ProductsSlider";

export default function ProductsContainer ({products,title, subtitle}) {
    return(

        <div className="my-4">

        <h1> {title} </h1>
        <p className="mb-3 fs-4"> {subtitle} </p>

        <ProductsSlider products={products}/>
        
        </div>
    )
}