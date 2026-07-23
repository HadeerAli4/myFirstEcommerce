import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../store/slices/userSlice";
export function Auth(){


    const { isLoggedIn } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    return(
        <>
        {! isLoggedIn ? (<>
        
        <Button variant="outline-primary" as={Link} to="/Login"> Login </Button>
        <Button variant="success" as={Link} to="/signup"> Register </Button>
        </>) : (
        <Button variant="outline-danger" onClick={() => {
            
        dispatch(clearUser());
        
        localStorage.removeItem("user");
        }}> Logout </Button>

        )}

        </>
    )
}