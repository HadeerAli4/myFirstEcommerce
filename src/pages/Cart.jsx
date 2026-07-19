import { Badge, Button, ButtonGroup, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { CiShoppingCart, CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decreaseQty, increaseQty, removeFromCart } from "../store/slices/CartSlice";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Cart(){
const {items , totalAmount } = useSelector((store) => store.cart);

const hasData = items.length >0;

const dispatch = useDispatch();

const shippingCost = 25;
const currency = "$";

const totalCost = (Number(totalAmount) + shippingCost).toFixed(2);

    return(
        <>
    
        <div className="d-flex align-items-center gap-2 mb-4">
            <CiShoppingCart size={40} />
            <h1> Cart </h1>
            <span className="text-primary">({items.length})</span>
        </div>

        {!hasData &&  <section className="rounded p-4 mb-4 w-200 fs-3 d-flex gap-2 align-items-center justify-content-center fw-bold" style={{backgroundColor: "pink"}}> 
                <BsCart4 size={100} />
            Cart is Empty !
             </section>}


        {hasData && (
 <Row>
            <Col md={8}>
            
            <Row className="g-2">
                        {items.map((item) => 
                        <Col key={item.id} md={6}>
                            <Card>
                                
                                <Card.Img variant="top" src={item.thumbnail} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="text-danger">
                                        {item.brand}  </Card.Subtitle>
                                    <Card.Text className="fw-bold fs-5">{item.price} {item.currency || "currency"} </Card.Text>
                                <Card.Footer className="d-flex flex-column gap-2">
                                 
                                 <ButtonGroup>
                                    <Button onClick={()=>{
                                         dispatch(decreaseQty(item))}}> <CiSquareMinus size={30} /> </Button>
                                    <Button disabled> Quantity :  {item.quantity}</Button>
                                    <Button onClick={()=>{ 
                                        dispatch(increaseQty(item))}}> < CiSquarePlus size={30} /> </Button>
                                 </ButtonGroup>
                                   
                                   <Button variant="danger" onClick={() =>
                                   dispatch(removeFromCart(item))}
                                   > Remove </Button>
                                </Card.Footer>
                                </Card.Body>
                    </Card>
                         </Col>)}
                    </Row>
            </Col>


            <Col md={4}>
            <section className="rounded p-4 mb-4 w-100 fs-5 fw-bold" style={{backgroundColor: "pink"}}> 
                <div className="d-flex gap-3 align-items-center justify-content-center">
            <p> Order Summary </p>
            <Badge bg="secondary" className="p-2"> Products : {items.length}</Badge>
                </div>
                <div className="d-flex gap-2 align-items-center justify-content-between">
                <p className="text-muted"> Total Amount :  </p>    
                <p>
                    {totalAmount} {"$"}
                </p>
                </div>  
                <div className="d-flex gap-2 align-items-center justify-content-between">
                <p className="text-muted">  Shipping :  </p>    
                <p>
                    {shippingCost} {currency}
                </p>
                </div>  
                 <div className="d-flex gap-2 align-items-center justify-content-between text-semibold">
                <p className="text-muted mb-8">  Total :  </p>    
                <p>
                    {totalCost} {currency}
                </p>
                </div>  

            </section>
            <Button variant="outline-primary" className="rounded p-4 mb-4 w-100 fw-semibold fs-5"variant="success" as={Link}
                                            to={"/checkout"}> Checkout </Button>

            <Button variant="outline-danger" className="rounded p-4 mb-4 w-100 fw-semibold fs-5" 
            onClick={() => {dispatch(clearCart())}}
            >
            Clear </Button>


            <section className="rounded p-4 mb-4 w-100" style={{backgroundColor: "pink"}}> 
            <p> Has Coupon Code ? </p>
            <Form>
                <Form.Group>
                    <InputGroup>
                    <FormControl placeholder="Apply Cupon" />
                    <InputGroup.Text>Apply</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
            </Form>
            </section>

            </Col>        
        </Row>
        )}
       
        </>
    )
}