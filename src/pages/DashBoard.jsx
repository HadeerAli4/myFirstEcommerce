import { useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import {  FaEdit, FaHistory, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { GoTrash } from "react-icons/go";

export default function DashBoard(){

        const [activeTab, setActiveTab] = useState("profile");

        const go = useNavigate();
        
        const dispatch = useDispatch();

        function setProfile(){
            setActiveTab("profile")
            go("/profile");
        }
    return(

        <>

            <div className="container py-5">
            <Row className="g-4">
                    <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h1 className="fw-bold text-primary mb-1"> E-commerce </h1>
                            <p className="text-muted small mb-4"> Admin Panel </p>
                            <div className="d-flex flex-column gap-2">
    
    <Button 
        variant={activeTab === "profile" ? "primary" : "light"}
        className={`d-flex align-items-center justify-content-start gap-3
        ${activeTab === "profile" ? "" : "text-muted border-0 bg-transparent"}`}
        onClick={() => setProfile() } >
        <FaUser /> My Profile
    </Button>
    
    <Button 
        variant={activeTab === "orders" ? "primary" : "light"}
        className={`d-flex align-items-center justify-content-start gap-3 
        ${activeTab === "orders" ? "" : "text-muted border-0 bg-transparent"}`}
        onClick={() => setActiveTab("orders")}  onClick={() => go("/CartMangement")}>
        <FaHistory /> Order History
    </Button>
    
    <Button 
        variant={activeTab === "customers" ? "primary" : "light"}
        className={`d-flex align-items-center justify-content-start gap-3 
        ${activeTab === "customers" ? "" : "text-muted border-0 bg-transparent"}`}
        onClick={() => setActiveTab("customers")} 
    >
        <FaUsers /> Customers
    </Button>
</div>

   <Button variant="danger" className="d-flex align-items-center 
                            gap-3 w-100 justify-content-start bg-transparent border-0 text-danger"
                            onClick={() => {
                                dispatch(clearUser());
                                localStorage.removeItem("user");
                                go("/")
                                }}>
            
                                <FaSignOutAlt /> Logout
                            </Button>
                        </Card.Body>
                    </Card>
            </Col>

            <Col md={8}>
            <h1> Admin Panel </h1>
            <h1> ________________________________________________________</h1>

            <table className="table table-hover table-lg">
  <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Email Adress</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  emilys</th>
      <td>emily.johnson@x.dummyjson.com</td>
      <td><Badge bg="success" className="rounded-pill px-3 py-2 border">Admin</Badge></td>
      <td> Active </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> </td>
    </tr>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  jacksone</th>
      <td>jackson.evans@x.dummyjson.com</td>
      <td><Badge  bg="danger" className="rounded-pill px-3 py-2 border">User</Badge></td>
      <td> Active </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> <GoTrash color="red" size={20}  style={{cursor: "pointer"}}/> </td>
    </tr>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  sophiab</th>
      <td >sophia.brown@x.dummyjson.com</td>
      <td><Badge bg="success" className="rounded-pill px-3 py-2 border">Admin</Badge></td>
      <td> Inactive </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> </td>
    </tr>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  Madison</th>
      <td >madison.collins@x.dummyjson.com</td>
      <td><Badge bg="danger" className="rounded-pill px-3 py-2 border">User</Badge></td>
      <td> Inactive </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> <GoTrash color="red" size={20}  style={{cursor: "pointer"}}/> </td>
    </tr>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  evelyns</th>
      <td >evelyn.sanchez@x.dummyjson.com</td>
      <td><Badge bg="danger" className="rounded-pill px-3 py-2 border">User</Badge></td>
      <td> Active </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> <GoTrash color="red" size={20}  style={{cursor: "pointer"}}/> </td>
    </tr>
    <tr>
      <th scope="row"> <FaUser color="pink" size={30} />  averyp</th>
      <td >avery.perez@x.dummyjson.com</td>
      <td><Badge bg="danger" className="rounded-pill px-3 py-2 border">User</Badge></td>
      <td> Inactive </td>
      <td><FaEdit color ="green" size={20} style={{cursor: "pointer"}}/> <GoTrash color="red" size={20} style={{cursor: "pointer"}} /> </td>
    </tr>
  </tbody>
</table>
            </Col>
        </Row>
        </div>
        </>
    )
}