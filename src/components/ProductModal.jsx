import React from "react";
import { Modal, Button, Badge } from "react-bootstrap";

const ProductModal = ({ show, onHide, product }) => {
  if (!product) return null;

  const textStyle = { color: "#333" };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ borderBottom: "1px solid #eee" }}>
        <Modal.Title style={{ color: "#6f42c1" }}>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={textStyle}><strong>Price:</strong> ₹{product.price}</p>
        <p style={textStyle}><strong>Category:</strong> {product.category}</p>
        <p style={textStyle}><strong>Brand:</strong> {product.brand}</p>
        <p style={textStyle}>
          <strong>Status:</strong>{" "}
          <Badge bg={
            product.status === "Available" ? "success" :
            product.status === "Out of Stock" ? "danger" : "warning"
          }>
            {product.status}
          </Badge>
        </p>
        <p style={textStyle}><strong>Quantity:</strong> {product.quantity}</p>
        <p style={textStyle}><strong>SKU:</strong> {product.sku}</p>
        <p style={textStyle}><strong>Color:</strong> {product.color || "N/A"}</p>
        <p style={textStyle}><strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}</p>
        <p style={textStyle}><strong>Rating:</strong> {product.rating || 0} ⭐</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          style={{
            borderRadius: "6px",
            fontWeight: "500",
            padding: "0.35rem 0.8rem",
            backgroundColor: "#6f42c1",
            border: "none",
            color: "#fff",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a35a5")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6f42c1")}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
