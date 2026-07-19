import { useState } from "react";
import {  useSelector } from "react-redux"; 
import { Container, Row, Col, Card, Badge, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaCreditCard, FaPaypal, FaShieldAlt, FaUndo, FaTruck, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Checkout() {

  const { items, totalAmount } = useSelector((store) => store.cart);
  
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shippingCost = 25;
  const tax = 31.18; 
  const totalCost = (Number(totalAmount) + shippingCost + tax).toFixed(2);

  return (
    <>

      <div className="min-vh-100 py-5" style={{ backgroundColor: "#FADADD" }}>
        <Container>
          
          <div className="mb-5">
            <h2 className="fw-bold mb-1">Secure Checkout</h2>
            <p className="text-muted mb-4">Complete your order with Ecommerce's verified protection.</p>
            

            <div className="d-flex align-items-center gap-2 text-muted small fw-bold">
              <span className="d-flex align-items-center gap-2 text-primary">
                <span className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>1</span>
                Shipping
              </span>
              <div className="flex-grow-1 bg-secondary" style={{height: "2px", opacity: 0.2}}></div>
              <span className="d-flex align-items-center gap-2">
                <span className="border rounded-circle d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>2</span>
                Payment
              </span>
              <div className="flex-grow-1 bg-secondary" style={{height: "2px", opacity: 0.2}}></div>
              <span className="d-flex align-items-center gap-2">
                <span className="border rounded-circle d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>3</span>
                Review
              </span>
            </div>
          </div>

          <Row className="g-4">


            <Col lg={8}>
              
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <FaTruck className="text-primary" /> Shipping Information
                  </h5>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">First Name</Form.Label>
                        <Form.Control type="text" placeholder="Hadeer" defaultValue="Hadeer" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Ali" defaultValue="Ali" />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">Address</Form.Label>
                        <Form.Control type="text" placeholder="123 Alexandria Egypt" defaultValue="123 Alexandria Egypt" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">City</Form.Label>
                        <Form.Control type="text" placeholder="city" defaultValue="Egypt" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">Zip Code</Form.Label>
                        <Form.Control type="text" placeholder="0000" defaultValue="00000" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label className="small fw-bold text-muted">Phone Number</Form.Label>
                        <Form.Control type="text" placeholder="phone" defaultValue="+20 000-0000" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>


              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <FaCreditCard className="text-primary" /> Payment Method
                  </h5>
                  
                  <div 
                    className={`border rounded p-3 mb-3 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-light' : 'border-light'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="form-check m-0">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'card'} 
                          readOnly 
                        />
                        <label className="form-check-label fw-bold ms-2">Credit or Debit Card</label>
                      </div>
                      <FaCreditCard className="text-muted" />
                    </div>

                    {paymentMethod === 'card' && (
                      <Row className="g-3 mt-1">
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label className="small text-muted">Card Number</Form.Label>
                            <Form.Control type="text" placeholder="0000 0000 0000 0000" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="small text-muted">Expiry Date</Form.Label>
                            <Form.Control type="text" placeholder="MM/YY" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="small text-muted">CVC</Form.Label>
                            <Form.Control type="text" placeholder="123" />
                          </Form.Group>
                        </Col>
                      </Row>
                    )}
                  </div>

                  <div 
                    className={`border rounded p-3 d-flex justify-content-between align-items-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-primary bg-light' : 'border-light'}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className="form-check m-0">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'paypal'} 
                        readOnly 
                      />
                      <label className="form-check-label fw-bold ms-2">PayPal</label>
                    </div>
                    <FaPaypal className="text-muted fs-4" />
                  </div>

                </Card.Body>
              </Card>

              <Button variant="primary" size="lg" className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              as={Link} to={"/orderPlaced"}>
                Place Order <FaChevronRight size={14} />
              </Button>

            </Col>

            <Col lg={4}>
              <section className="rounded p-4 mb-4 w-100 fs-5 fw-bold" style={{backgroundColor: "pink"}}> 
                  <div className="d-flex gap-3 align-items-center justify-content-center mb-3">
                      <p className="mb-0">Order Summary</p>


                      <Badge bg="secondary" className="p-2">Products: {items?.length || 0}</Badge>
                  </div>
                  
                  <div className="d-flex gap-2 align-items-center justify-content-between mb-2">
                      <p className="text-muted mb-0 fs-6">Total Amount:</p>    
                      <p className="mb-0 fs-6">{totalAmount} $</p>
                  </div>  
                  
                  <div className="d-flex gap-2 align-items-center justify-content-between mb-2">
                      <p className="text-muted mb-0 fs-6">Shipping:</p>    
                      <p className="mb-0 fs-6">{shippingCost} $</p>
                  </div>  

                  <div className="d-flex gap-2 align-items-center justify-content-between mt-3 pt-3 border-top">
                      <p className="mb-0">Total:</p>    
                      <p className="mb-0 text-primary">{totalCost} $</p>
                  </div>  
              </section>

              <InputGroup className="mb-4">
                <FormControl placeholder="Promo Code" />
                <Button variant="outline-primary">Apply</Button>
              </InputGroup>


              <div className="bg-light p-3 rounded text-muted small">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <FaShieldAlt className="text-success" /> 256-bit SSL Secure Payment
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaUndo className="text-success" /> 30-Day Money Back Guarantee
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}