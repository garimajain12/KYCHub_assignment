import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [comparableProducts, setComparableProducts] = useState([]);
  const [productsData , setProductsData] = useState([]);

  return (
    <ProductsContext.Provider
      value={{ comparableProducts, setComparableProducts, productsData, setProductsData }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
