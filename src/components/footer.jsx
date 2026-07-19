import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function Footer() {
    return (
        <>
            <div className="pt-5 pb-4" style={{ backgroundColor: "#FADADD" }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">

                            <h4 className="fw-bold mb-3" style={{ color: "#333333" }}>E-commerce</h4>
                            
                            <p className="text-muted small" style={{ maxWidth: "300px" }}>
                                A premium e-commerce experience dedicated to delivering the world's most innovative electronics right to your doorstep.
                            </p>
                            <div className="d-flex gap-3 mt-3">
                                <a href="#" className="text-dark fs-5"><FaFacebookF /></a>
                                <a href="#" className="text-dark fs-5"><FaTwitter /></a>
                                <a href="#" className="text-dark fs-5"><FaInstagram /></a>
                                <a href="#" className="text-dark fs-5"><FaLinkedinIn /></a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="fw-bold mb-3 text-uppercase small text-dark">Shop</h6>
                            <ul className="list-unstyled text-muted small">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">All Electronics</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Wearables</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Home Office</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">New Arrivals</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="fw-bold mb-3 text-uppercase small text-dark">Support</h6>
                            <ul className="list-unstyled text-muted small">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Contact Us</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Shipping Info</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Returns</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="fw-bold mb-3 text-uppercase small text-dark">Legal</h6>
                            <ul className="list-unstyled text-muted small">
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
                                <li className="mb-2"><a href="#" className="text-decoration-none text-muted">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div> 
                    
                    <hr className="my-4 border-secondary-subtle" />
                    
                    <div className="text-center text-muted small">
                        &copy; {new Date().getFullYear()} E-commerce. All rights reserved.
                    </div>
                </div> 
            </div> 
        </>
    );
}