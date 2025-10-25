import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sanitizeInput } from "../utils/sanitizeInput";
import { validateProduct } from "../utils/validation";
import { useProducts } from "../context/ProductContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const { products, addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    sku: "",
    category: "",
    brand: "",
    status: "",
    color: "",
    inStock: true,
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Electronics", "Clothing", "Books", "Home"];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];
  const statuses = ["Available", "Out of Stock", "Coming Soon"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(formData, products);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await addProduct(formData);

      setSuccessMsg("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        quantity: "",
        sku: "",
        category: "",
        brand: "",
        status: "",
        color: "",
        inStock: true,
      });

      setTimeout(() => navigate("/products"), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card
        style={{ width: "600px", borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.08)" }}
        className="p-4"
      >
        <h3 style={{ color: "#6f42c1", textAlign: "center", marginBottom: "1.5rem" }}>
          Add Product
        </h3>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Product name"
                  onChange={handleChange}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="sku">
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={formData.sku}
                  placeholder="Unique SKU"
                  onChange={handleChange}
                />
                {errors.sku && <small className="text-danger">{errors.sku}</small>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  placeholder="Price"
                  onChange={handleChange}
                />
                {errors.price && <small className="text-danger">{errors.price}</small>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  placeholder="Quantity"
                  onChange={handleChange}
                />
                {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Select name="brand" value={formData.brand} onChange={handleChange}>
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                  <option value="">Select Status</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  placeholder="Color"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex align-items-center mt-2">
              <Form.Check
                type="switch"
                id="inStock"
                label="In-stock"
                name="inStock"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
                }
              />
            </Col>
          </Row>

          <Button
            type="submit"
            className="w-100 mt-4"
            style={{ backgroundColor: "#6f42c1", border: "none", fontWeight: "500", padding: "12px" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Adding...
              </>
            ) : (
              "Add Product"
            )}
          </Button>

          {successMsg && <div className="text-success text-center mt-3">{successMsg}</div>}
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
