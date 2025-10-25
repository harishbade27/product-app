import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
        style={{
          borderRadius: "6px",
          textDecoration: "none",
          color: i === currentPage ? "#fff" : "#6f42c1",
        }}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ textDecoration: "none", color: "#6f42c1" }}
        />
        {pages}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ textDecoration: "none", color: "#6f42c1" }}
        />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
