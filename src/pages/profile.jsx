import { useEffect, useState } from "react";
import { FaUser, FaHistory, FaCog, FaSignOutAlt,FaShoppingBag, FaWallet, FaStar, FaEdit } from "react-icons/fa";
import { Button, Card, Col, Row, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const go = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

  useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://dummyjson.com/users/1");
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading profile...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <Card className="border-0 shadow-sm">
                    <Card.Body>
                        <h5 className="text-danger">Error loading profile</h5>
                        <p className="text-muted">{error}</p>
                        <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    const userData = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        avatar: "https://tse2.mm.bing.net/th/id/OIP.BR_P-s2KtVqO1Jfwht53NgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        memberSince: "2022",
        stats: {
            orders: 24,
            ordersChange: "+2 this month",
            wallet: "$1,248.50",
            points: "4,800"
        },
        recentOrders: [
        { id: "#SS-2024-001", item: "StreamX Pro Wireless Headphones", price: "$299.00", status: "Delivered", date: "Oct 24, 2023" }
        ,{ id: "#SS-2024-001", item: "Iphone 17", price: "$999.00", status: "Delivered", date: "Oct 24, 2023" }
        ,{ id: "#SS-2024-001", item: "Recharger", price: "$159.00", status: "Delivered", date: "Oct 24, 2023" }

        ]
    };

    function goCart() {
        go("/checkout");
    }

    return (
        <div className="container py-5">
            <Row className="g-4">
                    <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="fw-bold text-primary mb-1">Account</h5>
                            <p className="text-muted small mb-4">Manage your settings</p>
                            
                            <div className="d-flex flex-column gap-2">
                                <Button 
                                    variant={activeTab === "profile" ? "primary" : "light"}
                                    className={`d-flex align-items-center justify-content-start gap-3 
                                    ${activeTab === "profile" ? "" : "text-muted"}`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <FaUser /> My Profile
                                </Button>
                                
                                <Button 
                                    variant={activeTab === "order-history" ? "primary" : "light"}
                                    className={`d-flex align-items-center justify-content-start gap-3 
                                    ${activeTab === "order-history" ? "" : "text-muted"}`}
                                    onClick={() => {go("/cart")}}
                                >
                                    <FaHistory /> Order History
                                </Button>
                                
                                <Button 
                                    variant={activeTab === "settings" ? "primary" : "light"}
                                    className={`d-flex align-items-center justify-content-start gap-3 
                                    ${activeTab === "settings" ? "" : "text-muted"}`}
                                    onClick={() => setActiveTab("settings")}
                                >
                                    <FaCog /> Account Settings
                                </Button>
                            </div>

                            <hr className="my-4" />

                            <Button variant="danger" className="d-flex align-items-center 
                            gap-3 w-100 justify-content-start bg-transparent border-0 text-danger"
                            as="Link" to="/Home" >
                                <FaSignOutAlt /> Logout
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body className="p-4">
                            <Row className="align-items-center">
                                <Col md={8} className="d-flex align-items-center gap-4">
                                    <div className="position-relative">
                                        <img 
                                            src={userData.avatar} 
                                            alt="Profile" 
                                            className="rounded-circle" 
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                    <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" 
                                    style={{width: "24px", height: "24px"}}>
                                            <FaEdit size={12} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="fw-bold mb-1">{userData.name}</h2>
                                        <p className="text-muted mb-2">{userData.email}</p>
                                        <div className="d-flex gap-2">
                                            <Badge bg="success" className="rounded-pill px-3 py-2">Premium Member</Badge>
                                            <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border">Member since {userData.memberSince}</Badge>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4} className="text-md-end mt-3 mt-md-0">
                                    <Button variant="primary" className="mb-2 w-100 w-md-auto px-4">Edit Profile</Button>
                                    <br />
                                    <Button variant="outline-primary" className="w-100 w-md-auto px-4">View Analytics</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Row className="g-3 mb-4">
                        <Col md={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="bg-light p-2 rounded text-primary"><FaShoppingBag size={20} /></div>
                                        <small className="text-success fw-bold">{userData.stats.ordersChange}</small>
                                    </div>
                                    <p className="text-muted small mb-1">Total Orders</p>
                                    <h3 className="fw-bold mb-0">{userData.stats.orders}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="bg-light p-2 rounded text-success"><FaWallet size={20} /></div>
                                    </div>
                                    <p className="text-muted small mb-1">Wallet Balance</p>
                                    <h3 className="fw-bold mb-0">{userData.stats.wallet}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="bg-light p-2 rounded text-warning"><FaStar size={20} /></div>
                                    </div>
                                    <p className="text-muted small mb-1">Loyalty Points</p>
                                    <h3 className="fw-bold mb-0">{userData.stats.points}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0">Recent Orders</h4>
                                <Button variant="link" className="text-decoration-none text-primary fw-bold"
                                onClick={() => {goCart()}}>
                                    View All</Button>
                            </div>

                            {userData.recentOrders.map((order, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between p-3 border rounded mb-2">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-light rounded p-2" style={{width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <FaShoppingBag className="text-muted" size={24} />
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">{order.item}</h6>
                                            <small className="text-muted">{order.id} • {order.date}</small>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className="fw-bold text-primary mb-1">{order.price}</h6>
                                        <Badge bg="success" className="rounded-pill mb-1">{order.status}</Badge>
                                        <br />
                                        <small className="text-primary text-decoration-underline" style={{cursor: "pointer"}}>Track Package</small>
                                    </div>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </div>
    );
}