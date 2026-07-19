import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ErrorHandler } from "../utils/errorhandler";
import Loading from "../components/loading.jsx";
import { API, fetchSingleProduct } from "../api/api";
import { Button, Col, Row, Card, Badge } from "react-bootstrap"; // Added Card for reviews
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice.js";
import { MdGppGood } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { TbTruckReturn } from "react-icons/tb";
import { FcOnlineSupport } from "react-icons/fc";

export default function ProductDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [mainImage, setMainImage] = useState(null);

    const hasImages = product?.images?.length > 1;
    const filledStars = Math.round(product.rating);
    //const emptyStars = 5 - filledStars;

    const dispatch = useDispatch(); 

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await API.get(fetchSingleProduct(id));
                const data = response.data;
                setProduct(data);
                setMainImage(data.images?.[0]);
            } catch (error) {
                ErrorHandler(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <>
            <Row className="g-4">
                {/* ===== LEFT COLUMN: IMAGES ===== */}
                <Col md={6}>
                    <div className="main-image text-center mb-3">
                        <img
                            src={mainImage}
                            alt="Main"
                            style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain" }}
                        />
                    </div>
                    {hasImages && (
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={10}
                            className="mt-2"
                        >
                            {product.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        onClick={() => setMainImage(image)}
                                        src={image}
                                        width={80}
                                        style={{ cursor: "pointer" }}
                                        className={`img-thumbnail ${mainImage === image ? 'border-primary' : ''}`}
                                        alt={`Thumb-${index}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </Col>

                {/* ===== RIGHT COLUMN: DETAILS ===== */}
                <Col md={6}>
                    <h1>{product.title}</h1>
                    <p className="text-muted">{product.description}</p>

                    {/* Rating & Reviews Link */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="d-flex text-warning">
                            {[...Array(5)].map((_, i) =>
                                i < filledStars ? <FaStar key={i} /> : <FaRegStar key={i} />
                            )}
                        </div>
                        <span className="fw-bold">{product.rating}</span>
                        <span className="text-secondary">|</span>
                        <a href="#reviews-section" className="text-decoration-none">
                            {product.reviews?.length || 0} Reviews
                        </a>
                    </div>

                    {/* Price */}
                    <h3 className="text-primary fw-bold my-3">${product.price}</h3>
                    <Row>
                        <Col className="md-6">
                    <Badge bg="success" className="p-2">{product.warrantyInformation} </Badge>
                    </Col>
                    </Row>
                    {/* Features Icons */}
                    <div className="d-flex justify-content-between my-4 bg-light p-3 rounded">
                        <div className="text-center"><MdGppGood size={25} /><br /><small>Warranty</small></div>
                        <div className="text-center"><GrDeliver size={25} /><br /><small>Delivery</small></div>
                        <div className="text-center"><TbTruckReturn size={25} /><br /><small>Returns</small></div>
                        <div className="text-center"><FcOnlineSupport size={25} /><br /><small>Support</small></div>
                    </div>

                    {/* Specs List */}
                    <ul className="list-unstyled">
                        <li><strong>Category:</strong> {product.category}</li>
                        <li><strong>Brand:</strong> {product.brand}</li>
                        <li><strong>Stock:</strong> {product.stock} units</li>
                        <li><strong>Shipping:</strong> {product.shippingInformation}</li>
                    </ul>

                    {/* Add to Cart Button */}
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-100 mt-3"
                        disabled={product.stock === 0}
                        onClick={() => dispatch(addToCart(product))}
                    >
                        Add to Cart
                    </Button>

                    <Button
                       as={Link}
                       to="/checkout"
                       variant="outline-primary"
                       size="lg"
                       className="w-100 mt-3"
                       disabled={product.stock === 0}
                    >
                        CheckoutPage
                    </Button>

                </Col>
            </Row>

            <Row id="reviews-section" className="mt-5 pt-4 border-top">
                <Col>
                    <h3>Customer Reviews ({product.reviews?.length || 0})</h3>
                    
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="d-flex flex-column gap-3 mt-3">
                            {product.reviews.map((review, index) => (
                                <Card key={index} className="p-3 bg-light border-0">
                                    <div className="d-flex justify-content-between">
                                        <strong>{review.reviewerName}</strong>
                                        <small className="text-muted">
                                            {new Date(review.date).toLocaleDateString()}
                                        </small>
                                    </div>
                                    
                                    <div className="text-warning my-1">
                                        {[...Array(5)].map((_, i) => 
                                            i < review.rating ? <FaStar key={i} size={14}/> : <FaRegStar key={i} size={14}/>
                                        )}
                                    </div>
                                    
                                    <p className="mb-0">{review.comment}</p>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </Col>
            </Row>
        </>
    );
}