import { Container, Spinner } from "react-bootstrap";

export default function Loading(){

    return(

        <Container className="min-vh-100 d-felx align-items-center justify-content-center">
        <Spinner></Spinner>
        </Container>
    )
}