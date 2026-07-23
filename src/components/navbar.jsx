import { Button, Container, Nav, Navbar, NavbarCollapse, NavItem } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgTikcode } from "react-icons/cg";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { Auth } from "./Auth";
import { GiNightSky } from "react-icons/gi";
import { BiSun } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export default function AppNavbar({ isDarkMode, toggleTheme }) {


  const go = useNavigate();

  function handleProfile(){
       const raw = localStorage.getItem("user");
    const user = raw ? JSON.parse(raw) : null;

    if (!user) {
      go("/login");
      return;
    }

    const role = (user.role || "").toString().toLowerCase().trim();

    if (role === "admin") {
      go("/DashBoard");
    } else {
      go("/profile");
    }
  }

  return (
    <Navbar expand="md" bg={isDarkMode ? "dark" : "danger-subtle"} className="border-bottom border-secondary-subtle">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <span><CgTikcode /></span>
          <span>E-commerce</span>
        </Navbar.Brand>
        
        <Navbar.Toggle />
        <NavbarCollapse>
          <Nav className="me-auto gap-3">
            <NavItem>
              <NavLink as={Link} to="/" className="text-decoration-none text-reset">
                <IoHomeOutline /> Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink as={Link} to="/products" className="text-decoration-none text-reset">
                <AiOutlineProduct /> Products
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink as={Link} to="/cart" className="text-decoration-none text-reset">
                <IoCartOutline /> Cart
              </NavLink>
            </NavItem>
          </Nav>
          <div className="d-flex gap-2 align-items-center">
            <Auth />
            
            <Button 
              variant={isDarkMode ? "outline-light" : "outline-dark"} 
              size="sm"
              onClick={toggleTheme}
            >
              {isDarkMode ? <BiSun size={30} /> : <GiNightSky size={30} />}
            </Button>
            <Button onClick={handleProfile} 
            variant="outline-primary" 
            size="md"> <FaUser /> </Button>
          </div>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}