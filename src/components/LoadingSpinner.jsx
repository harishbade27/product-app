import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100px" }}>
      <Spinner
        animation="border"
        style={{ color: "#6f42c1", width: "3rem", height: "3rem" }}
      />
    </div>
  );
}
