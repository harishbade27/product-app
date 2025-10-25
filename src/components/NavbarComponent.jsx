import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarComponent = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const navLinkStyle = {
    color: "#6f42c1",
    textDecoration: "none",
    fontWeight: "500",
    marginRight: "1rem",
    transition: "all 0.3s ease",
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        padding: "0.5rem 1rem",
        zIndex: 999,
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/products"
          style={{
            color: "#6f42c1",
            fontWeight: "600",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          ProductApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {currentUser ? (
              <div className="d-flex flex-row align-items-center gap-2">
                {location.pathname !== "/add-product" && (
                  <Button
                    as={Link}
                    to="/add-product"
                    style={{
                      backgroundColor: "#f0e6ff",
                      color: "#6f42c1",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "500",
                      padding: "0.35rem 0.8rem",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Add Product
                  </Button>
                )}

                <Button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#6f42c1",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "500",
                    padding: "0.35rem 0.8rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a35a5")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#6f42c1")}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={navLinkStyle}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={navLinkStyle}>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
