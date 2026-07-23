import { Badge, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import {  useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";


export default function CartMangement(){
    
const {items , totalAmount } = useSelector((store) => store.cart);

const hasData = items.length >0;

const shippingCost = 25;
const currency = "$";

const totalCost = (Number(totalAmount) + shippingCost).toFixed(2);

    return(
        <>
    
        <div className="d-flex align-items-center gap-2 mb-4">
            <CiShoppingCart size={40} />
            <h1> Cart Mangement </h1>
            <span className="text-primary">({items.length})</span>
        </div>

        {!hasData &&  <section className="rounded p-4 mb-4 w-200 fs-3 d-flex gap-2 align-items-center justify-content-center fw-bold"
         style={{backgroundColor: "pink"}}> 
                <BsCart4 size={100} />
            Cart is Empty !
             </section>}


        {hasData && (
 <Row>
            <Col md={8}>
            
            <Row className="g-2">
                        {items.map((item) => 
                        <Col key={item.id} md={6}>
                            <Card className="h-100 position-relative shadow-sm">
                                <Card.Body>
                                    <span> Rating: {item.rating}</span>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Subtitle className="text-danger">
                                        {item.brand}  </Card.Subtitle>
                                    <Card.Text className="fw-bold fs-5">{item.price} {item.currency || "currency"} </Card.Text>
                                <Card.Footer className="d-flex flex-column gap-2">
                                 
                                 <ButtonGroup>
                                   
                                    <Button disabled> Quantity :  {item.quantity}</Button>
                                    
                                 </ButtonGroup>
                                </Card.Footer>
                                </Card.Body>
                    </Card>
                         </Col>)}
                    </Row>
            </Col>


            <Col md={4}>
            <section className="rounded p-4 mb-4 w-300 fs-5 fw-bold" style={{backgroundColor: "pink"}}> 
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

            <section className="rounded p-4 mb-4 w-300 fs-5 fw-bold" style={{backgroundColor: "pink"}}> 
                <div className="d-flex gap-3 align-items-center justify-content-center">
            <p> Order Summary </p>
            <Badge bg="secondary" className="p-2">  {items.length}</Badge>
                </div>
              
                 <div className="d-flex gap-2 align-items-center justify-content-between text-semibold">

                <p className="text-muted mt-15">  Fund :  </p>    
                <p>
                    {totalCost} {currency}
                </p>
                </div>  

            </section>
            </Col>        
        </Row>
        )}
        </>
    )
}