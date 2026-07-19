import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import { API, searchForProducts } from "../api/api";
import { ErrorHandler } from "../utils/errorhandler";
import { FaStar } from "react-icons/fa";
import { useSearchParams, useNavigate, Link } from "react-router-dom"; 
import Loading from "../components/loading.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice.js";

export default function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchTermRef = useRef();

    const [noPages, setNoPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRating, setSelectedRating] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category") || ""; 

    const LIMIT = 10;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSearch(ev) {
        ev.preventDefault();
        setSearchTerm(searchTermRef.current.value);
        setCurrentPage(1); 
    }

    useEffect(() => {
        async function fetchProductsData() {
            try {
                setLoading(true);
                let response;
                
                const currentSkip = (currentPage - 1) * LIMIT;

                if (categoryFilter) {
                    response = await API.get(`/products/category/${categoryFilter}`);
                } else {
                    response = await API.get(searchForProducts(searchTerm, LIMIT, currentSkip));
                }

                const fetchedProducts = response.data.products || response.data;
                setProducts(fetchedProducts);
                
                const totalItems = response.data.total || fetchedProducts.length;
                setNoPages(Math.ceil(totalItems / LIMIT));
            } catch (error) {
                ErrorHandler(error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchProductsData();
    }, [categoryFilter, searchTerm, currentPage]); 

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        setCurrentPage(1);
        if (val === "") {
            searchParams.delete("category");
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: val });
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesRating = !selectedRating || product.rating >= selectedRating;
        return matchesPrice && matchesRating;
    });

    if (loading) return <Loading />;

    return (

        <>

        <div className="container-fluid py-2">
            <Row className="g-4">
                <Col xs={12} md={3} lg={3} xl={2}>
                    <div
                        style={{
                            position: "sticky",
                            top: "20px",
                            padding: "1rem",
                            border: "1px solid #dee2e6",
                            borderRadius: "8px",
                            background: "#fff",
                        }}
                    >
                        <h5 className="mb-3">Filters</h5>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Category</Form.Label>
                            <Form.Select
                                value={categoryFilter}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                <option value="smartphones">Smartphones</option>
                                <option value="fragrances">Fragrances</option>
                                <option value="watches">Watches</option>
                                <option value="beauty">Beauty</option>
                                <option value="furniture">Furniture</option>
                                <option value="groceries">Groceries</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">
                                Price: ${priceRange[0]} - ${priceRange[1]}
                            </Form.Label>
                            <Form.Range
                                min={0}
                                max={1000}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([priceRange[0], Number(e.target.value)])
                                } />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Rating</Form.Label>
                            <Form.Check
                                type="radio"
                                label="4 stars & up"
                                name="rating"
                                id="rating-4"
                                checked={selectedRating === 4}
                                onChange={() => setSelectedRating(4)} />

                            <Form.Check
                                type="radio"
                                label="3 stars & up"
                                name="rating"
                                id="rating-3"
                                checked={selectedRating === 3}
                                onChange={() => setSelectedRating(3)}/>

                            <Form.Check
                                type="radio"
                                label="Any"
                                name="rating"
                                id="rating-0"
                                checked={selectedRating === 0}
                                onChange={() => setSelectedRating(0)}/>
                                
                        </Form.Group>
                        <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => {
                                navigate("/products"); 
                                setPriceRange([0, 1000]);
                                setSelectedRating(0); }}>
                            Reset Filters
                        </Button>
                    </div>
                </Col>
                <Col xs={12} md={9} lg={9} xl={10}>
                    <Row>
                        <Col>
                            <Form className="mb-4" onSubmit={handleSearch}>
                                <Form.Group className="d-flex gap-2 align-items-center">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search products..."
                                        ref={searchTermRef}
                                        defaultValue={searchTerm}
                                    />
                                    <Button type="submit" variant="outline-success">
                                        Search
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="g-3">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Col key={product.id} sm={6} md={6} lg={4} xl={3}>
                                    <Card className="h-100 position-relative shadow-sm">
                                        <p className="fw-bold fs-6 d-flex align-items-center gap-1 position-absolute top-0 end-0 m-2 bg-white px-2 py-1 rounded shadow-sm" style={{ zIndex: 10 }}>
                                            <span>{product.rating}</span>
                                            <FaStar className="text-warning" />
                                        </p>
                                        <Card.Img 
                                            variant="top" 
                                            src={product.thumbnail} 
                                            style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                                            onClick={() => navigate(`/product-details/${product.id}`)}
                                        />
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            {/* ✅ Fixed: Added backticks and proper spacing */}
                                            <Card.Title 
                                                className="fs-6 text-truncate" 
                                                style={{ cursor: "pointer" }} 
                                                onClick={() => navigate(`/product-details/${product.id}`)}
                                            >
                                                {product.title}
                                            </Card.Title>
                                            
                                            <Card.Text className="text-muted small text-truncate-2">
                                                {product.description}
                                            </Card.Text>
                                            
                                            <p className="fw-bold mb-2">${product.price}</p>
                                            <Card.Footer className="d-flex flex-column gap-2">
                                        <Button
                                            variant="primary"
                                            className="w-100"
                                            disabled={product.stock == 0}
                                            onClick={() => dispatch(addToCart(product))}
                                        >
                                            Add to Cart
                                        </Button>

                                        <Button
                                            variant="success"
                                            className="w-100"
                                            as={Link}
                                            to={`/product-details/${product.id}`}
                                        >
                                            Show more
                                        </Button>
                                    </Card.Footer>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col className="text-center py-5">
                                <h3>No products match your active filtration options.</h3>
                            </Col>
                        )}
                    </Row>

                    {noPages > 1 && !categoryFilter && (
                        <div className="d-flex justify-content-center my-4">
                            <Pagination>
                                <Pagination.Prev 
                                    disabled={currentPage === 1} 
                                    onClick={() => setCurrentPage(prev => prev - 1)} 
                                />
                                {[...Array(noPages)].map((_, idx) => (
                                    <Pagination.Item 
                                        key={idx + 1} 
                                        active={idx + 1 === currentPage} 
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next 
                                    disabled={currentPage === noPages} 
                                    onClick={() => setCurrentPage(prev => prev + 1)} 
                                />
                            </Pagination>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
        </>
    );
}