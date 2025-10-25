import React, { useState } from "react";
import { Container, Card, Form, Button, Nav, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    setSuccessMessage("");
    setLoading(true);

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      setErrors({});
      setSuccessMessage("Login successful!");
      setTimeout(() => navigate("/products"), 1500);
    } catch (error) {
      console.error("Firebase login error:", error);
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
        setFirebaseError("Invalid email or password. Please try again.");
      } else if (error.code === "auth/wrong-password") {
        setFirebaseError("Incorrect password. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        setFirebaseError("Too many failed attempts. Please try again later.");
      } else {
        setFirebaseError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card
        style={{
          width: "400px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.08)",
        }}
        className="p-4"
      >
        <Nav
          variant="tabs"
          className="justify-content-center mb-3 border-0"
          style={{ borderBottom: "none" }}
        >
          <Nav.Item>
            <Nav.Link
              active
              style={{
                fontWeight: "600",
                color: "#6f42c1",
                border: "none",
                textDecoration: "none",
              }}
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => navigate("/signup")}
              style={{
                color: "#999",
                border: "none",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#6f42c1")}
              onMouseLeave={(e) => (e.target.style.color = "#999")}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
                setFirebaseError("");
              }}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
                setFirebaseError("");
              }}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </Form.Group>

          {firebaseError && (
            <div className="text-danger text-center mb-2">{firebaseError}</div>
          )}
          {successMessage && (
            <div className="text-success text-center mb-2">{successMessage}</div>
          )}

          <Button
            type="submit"
            className="w-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#6f42c1",
              border: "none",
              fontWeight: "500",
              padding: "12px",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  className="me-2"
                />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </Form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#666",
            fontSize: "0.9rem",
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#6f42c1",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
