import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import { API, searchForProducts } from "../api/api";
import { ErrorHandler } from "../utils/errorhandler";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
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
    const [skip, setSkip] = useState(0);

    // Sidebar filter states
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedRating, setSelectedRating] = useState(0);

    const LIMIT = 10;

    const dispatch = useDispatch();

    function calcSkip(page) {
        setSkip((page - 1) * LIMIT);
    }

    function handleSearch(ev) {
        ev.preventDefault();
        setSearchTerm(searchTermRef.current.value);
    }

    useEffect(function Products() {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await API.get(searchForProducts(searchTerm, LIMIT, skip));
                setProducts(response.data.products);
                setNoPages(Math.ceil(response.data.total / LIMIT));
            } catch (error) {
                ErrorHandler(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [searchTerm, skip]);

    useEffect(
        function () {
            calcSkip(currentPage);
        },
        [currentPage],
    );

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesRating = !selectedRating || product.rating >= selectedRating;
        
        return matchesCategory && matchesPrice && matchesRating;
    });

    const hasData = filteredProducts.length > 0;

    if (loading) return <Loading />;

    return (
        <>
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
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="smartphones">Smartphones</option>
                                <option value="fragrances">Fragrances</option>
                                <option value="watches">Watches</option>
                                <option value="beauty">Beauty</option>
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
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Rating</Form.Label>
                            <Form.Check
                                type="radio"
                                label="4 stars & up"
                                name="rating"
                                checked={selectedRating === 4}
                                onChange={() => setSelectedRating(4)}
                            />
                            <Form.Check
                                type="radio"
                                label="3 stars & up"
                                name="rating"
                                checked={selectedRating === 3}
                                onChange={() => setSelectedRating(3)}
                            />
                            <Form.Check
                                type="radio"
                                label="Any"
                                name="rating"
                                checked={selectedRating === 0}
                                onChange={() => setSelectedRating(0)}
                            />
                        </Form.Group>

                        <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => {
                                setSelectedCategory("");
                                setPriceRange([0, 1000]);
                                setSelectedRating(0);
                            }}
                        >
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
                                        placeholder="search"
                                        ref={searchTermRef}
                                    />
                                    <Button type="submit" variant="outline-success">
                                        Search
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    <Row className="g-2">
                        {filteredProducts.map((product) => (
                            <Col key={product.id} md={6} lg={4} xl={3}>
                                <Card>
                                    <p className="fw-bold fs-5 d-flex align-items-center gap-1 position-absolute top-0 end-0 m-2">
                                        <span> {product.rating}</span>
                                        <FaStar className="text-warning" />
                                    </p>
                                    <Card.Img variant="top" src={product.thumbnail} />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Subtitle className="text-danger">
                                            {product.category} . {product.availabilityStatus}
                                        </Card.Subtitle>
                                        <Card.Text className="fw-bold fs-5">
                                            {product.price} {product.currency || "$"}{" "}
                                        </Card.Text>
                                    </Card.Body>
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
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {!hasData && (
                        <h2 className="text-center mt-5">" No Products found "</h2>
                    )}

                    {hasData && (
                        <>
                            <Pagination className="d-flex justify-content-center my-4 flex-wrap">
                                {currentPage !== 1 && (
                                    <Pagination.First onClick={() => setCurrentPage(1)} />
                                )}

                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                />

                                {Array.from({ length: noPages }).map((_, index) => {
                                    const pageNum = index + 1;
                                    const PAGE_RANGE = 2;

                                    if (
                                        pageNum === 1 ||
                                        pageNum === noPages ||
                                        (pageNum >= currentPage - PAGE_RANGE &&
                                            pageNum <= currentPage + PAGE_RANGE)
                                    ) {
                                        return (
                                            <Pagination.Item
                                                active={pageNum === currentPage}
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                            >
                                                {pageNum}
                                            </Pagination.Item>
                                        );
                                    }

                                    if (pageNum === 2 && currentPage - PAGE_RANGE > 2) {
                                        return (
                                            <Pagination.Ellipsis
                                                key="ellipsis-start"
                                                disabled
                                            />
                                        );
                                    }

                                    if (
                                        pageNum === noPages - 1 &&
                                        currentPage + PAGE_RANGE < noPages - 1
                                    ) {
                                        return (
                                            <Pagination.Ellipsis
                                                key="ellipsis-end"
                                                disabled
                                            />
                                        );
                                    }

                                    return null;
                                })}

                                <Pagination.Next
                                    disabled={currentPage === noPages}
                                    onClick={() => setCurrentPage((next) => next + 1)}
                                />

                                {currentPage !== noPages && (
                                    <Pagination.Last
                                        onClick={() => setCurrentPage(noPages)}
                                    />
                                )}
                            </Pagination>
                        </>
                    )}
                </Col>
            </Row>
        </>
    );
}
