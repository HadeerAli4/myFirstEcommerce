import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function NotFound(){
   
    const go = useNavigate();
    
    function handleHome(){
        go("/");
    }


    return(
        <>

        <h1 mb-5 align-items-center> Page Not Found</h1>
        <br />
        <br />
        <Button variant="success" onClick={handleHome} > go back to Home </Button>
        </>
    )
}