import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import productsData from "../data/products.json";

import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import PaginationComponent from "../components/PaginationComponent";
import ProductModal from "../components/ProductModal";
import LoadingSpinner from "../components/LoadingSpinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const storedProducts = localStorage.getItem("products");
  let localProducts = [];
  if (storedProducts) {
    localProducts = JSON.parse(storedProducts);
    localProducts = localProducts.map(p => ({
      ...p,
      rating: p.rating !== undefined ? p.rating : 0
    }));
  }

  const mergedProducts = [...localProducts, ...productsData];
  setProducts(mergedProducts);
  setFilteredProducts(mergedProducts);
}, []);



  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...products];

      if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      if (brand) filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
      if (status) filtered = filtered.filter(p => p.status === status);
      if (priceMin) filtered = filtered.filter(p => p.price >= Number(priceMin));
      if (priceMax) filtered = filtered.filter(p => p.price <= Number(priceMax));

      if (sortBy === "rating-high") filtered.sort((a, b) => b.rating - a.rating);
      else if (sortBy === "rating-low") filtered.sort((a, b) => a.rating - b.rating);

      setFilteredProducts(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category, brand, status, priceMin, priceMax, sortBy, products]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const openModal = (product) => { setSelectedProduct(product); setShowModal(true); };

  return (
    <Container className="mt-4">
      <FilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        brand={brand} setBrand={setBrand}
        status={status} setStatus={setStatus}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        sortBy={sortBy} setSortBy={setSortBy}
        categories={["Electronics", "Clothing", "Books", "Home"]}
        brands={["Apple", "Samsung", "Nike", "Adidas", "Sony"]}
      />


      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Row>
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <Col key={product.sku} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} onClick={openModal} />
                </Col>
              ))
            ) : (
              <p className="mt-3 text-center fw-bold" style={{ color: "#6f42c1" }}>
                No products found
              </p>
            )}
          </Row>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        product={selectedProduct}
      />
    </Container>
  );
};

export default Products;
