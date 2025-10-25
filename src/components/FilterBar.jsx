import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  status,
  setStatus,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sortBy,
  setSortBy,
  categories = [],
  brands = [],
}) {
  const inputStyle = {
    borderRadius: "6px",
    border: "1px solid #ccc",
    padding: "6px 10px",
    outline: "none",
  };

  return (
    <Row className="g-2 mb-3">
      <Col md={3}>
        <Form.Control
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </Col>

      <Col md={2}>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2}>
        <Form.Select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </Form.Select>
      </Col>

      <Col md={2}>
        <Form.Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="">All Status</option>
          <option>Available</option>
          <option>Out of Stock</option>
          <option>Coming Soon</option>
        </Form.Select>
      </Col>

      <Col md={1}>
        <Form.Control
          type="number"
          placeholder="Min"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          style={inputStyle}
        />
      </Col>
      <Col md={1}>
        <Form.Control
          type="number"
          placeholder="Max"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          style={inputStyle}
        />
      </Col>

      <Col md={1}>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={inputStyle}
        >
          <option value="">Sort</option>
          <option value="rating-high">High → Low</option>
          <option value="rating-low">Low → High</option>
        </Form.Select>
      </Col>
    </Row>
  );
}
