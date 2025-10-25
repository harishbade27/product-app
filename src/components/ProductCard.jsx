import React from "react";
import { Card, Badge } from "react-bootstrap";

const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      onClick={onClick ? () => onClick(product) : null}
      className="mb-3 shadow-sm"
      style={{ cursor: onClick ? "pointer" : "default", borderRadius: "10px" }}
    >
      <Card.Body>
        <Card.Title style={{ color: "#6f42c1" }}>{product.name}</Card.Title>
        <Card.Text style={{ color: "#333" }}>
          <strong>Price:</strong> ₹{product.price} <br />
          <strong>Category:</strong> {product.category} <br />
          <strong>Brand:</strong> {product.brand} <br />
          <strong>Status:</strong>{" "}
          <Badge bg={
            product.status === "Available" ? "success" :
            product.status === "Out of Stock" ? "danger" : "warning"
          }>
            {product.status}
          </Badge>
          <br />
          <strong>Quantity:</strong> {product.quantity} <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
