import React, { createContext, useState, useEffect } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Array of product data (quantities, etc.)
  const [subtotal, setSubtotal] = useState(0); // Subtotal for products
  const [formData, setFormData] = useState({
    nama: "",
    phone: "",
    email: "",
    address: "",
    coordinates: "",
  });

  // Load saved data from localStorage when the app starts
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedSubtotal = localStorage.getItem("subtotal");
    const savedFormData = localStorage.getItem("formData");

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSubtotal) setSubtotal(JSON.parse(savedSubtotal));
    if (savedFormData) setFormData(JSON.parse(savedFormData));
  }, []);

  // Save product and form data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
  }, [products, subtotal]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider
      value={{ products, setProducts, subtotal, setSubtotal, formData, setFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
