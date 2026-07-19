import { Badge, Card } from "react-bootstrap";

export default function ProductCard({product = {product}}){

        const discountPercentage = product?.discountPercentage || 0;
        const priceAfterDiscount = product?.price - (product?.price * discountPercentage) /100;

        const currency = product?.currency || "$";

        return(

    <>
    <Card style={{height:"100%"}} className="d-flex felx-column gap-2" >
        <Card.Img varient ="top" src ={product.thumbnail} />
        <Card.Body>
            <Card.Title> {product?.title} </Card.Title>
            <Card.Subtitle className="d-flex gap-2 mb-2 align-items-center">
                <Badge bg="danger"> Discount {discountPercentage} % </Badge>
                <span className="text-danger"> Special Offer </span>
                </Card.Subtitle>
            <Card.Text className="d-flex gap-2 align-items-center"> 
               <del className="text-muted"> {product?.price} </del>
                <span className="fw-bold"> Price Now: {priceAfterDiscount.toFixed(2)} {currency} </span>
            </Card.Text>
        </Card.Body>
    </Card>

    </>
)

}