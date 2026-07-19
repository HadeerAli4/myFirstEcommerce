import { useState } from "react";
import { 
    FaUser, FaHistory, FaCog, FaSignOutAlt, 
    FaShoppingBag, FaWallet, FaStar, FaEdit 
} from "react-icons/fa";
import { Button, Card, Col, Row, Badge } from "react-bootstrap";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");

    // Mock Data matching the screenshot
    const user = {
        name: "Hadeer Ibrahim Ali",
        email: "hadeer.ali@example.com",
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
        ]
    };

    return (
        <div className="container py-5">
            <Row className="g-4">
                
                {/* ===== LEFT SIDEBAR ===== */}
                <Col md={3}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body>
                            <h5 className="fw-bold text-primary mb-1">Account</h5>
                            <p className="text-muted small mb-4">Manage your settings</p>
                            
                            <div className="d-flex flex-column gap-2">
                                <Button 
                                    variant={activeTab === "profile" ? "primary" : "light"}
                                    className={`d-flex align-items-center justify-content-start gap-3 ${activeTab === "profile" ? "" : "text-muted"}`}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <FaUser /> My Profile
                                </Button>
                                
                                <Button 
                                    variant="light" 
                                    className="d-flex align-items-center justify-content-start gap-3 text-muted bg-transparent border-0"
                                    onClick={() => setActiveTab("orders")}
                                >
                                    <FaHistory /> Order History
                                </Button>
                                
                                <Button 
                                    variant="light" 
                                    className="d-flex align-items-center justify-content-start gap-3 text-muted bg-transparent border-0"
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

                {/* ===== MAIN CONTENT ===== */}
                <Col md={9}>
                    
                    {/* 1. PROFILE HEADER CARD */}
                    <Card className="border-0 shadow-sm mb-4">
                        <Card.Body className="p-4">
                            <Row className="align-items-center">
                                <Col md={8} className="d-flex align-items-center gap-4">
                                    <div className="position-relative">
                                        <img 
                                            src={user.avatar} 
                                            alt="Profile" 
                                            className="rounded-circle" 
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{width: "24px", height: "24px"}}>
                                            <FaEdit size={12} />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="fw-bold mb-1">{user.name}</h2>
                                        <p className="text-muted mb-2">{user.email}</p>
                                        <div className="d-flex gap-2">
                                            <Badge bg="success" className="rounded-pill px-3 py-2">Premium Member</Badge>
                                            <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border">Member since {user.memberSince}</Badge>
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

                    {/* 2. STATS CARDS */}
                    <Row className="g-3 mb-4">
                        <Col md={4}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="bg-light p-2 rounded text-primary"><FaShoppingBag size={20} /></div>
                                        <small className="text-success fw-bold">{user.stats.ordersChange}</small>
                                    </div>
                                    <p className="text-muted small mb-1">Total Orders</p>
                                    <h3 className="fw-bold mb-0">{user.stats.orders}</h3>
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
                                    <h3 className="fw-bold mb-0">{user.stats.wallet}</h3>
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
                                    <h3 className="fw-bold mb-0">{user.stats.points}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* 3. RECENT ORDERS */}
                    <Card className="border-0 shadow-sm">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold mb-0">Recent Orders</h4>
                                <Button variant="link" className="text-decoration-none text-primary fw-bold">View All</Button>
                            </div>

                            {/* Order Item */}
                            {user.recentOrders.map((order, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between p-3 border rounded mb-2">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-light rounded p-2" style={{width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            {/* Placeholder for product image */}
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