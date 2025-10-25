import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    console.log("storedProducts",storedProducts)
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addProduct = (newProduct) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setProducts((prevProducts) => {
          const updatedProducts = [...prevProducts, newProduct];
          localStorage.setItem("products", JSON.stringify(updatedProducts));
          return updatedProducts;
        });
        resolve();
      }, 500);
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
