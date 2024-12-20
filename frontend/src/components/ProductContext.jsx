import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Create the provider
export const ProductProvider = ({ children }) => {
  const [productQuantities, setProductQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [pembelianFormData, setPembelianFormData] = useState({
    nama: '',
    phone: '',
    email: '',
    address: '',
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state to track loading

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProductQuantities = localStorage.getItem('productQuantities');
    const savedSubtotal = localStorage.getItem('subtotal');
    const savedPembelianFormData = localStorage.getItem('pembelianFormData');

    if (savedProductQuantities) {
      setProductQuantities(JSON.parse(savedProductQuantities));
    }
    if (savedSubtotal) {
      setSubtotal(parseInt(savedSubtotal, 10) || 0);
    }
    if (savedPembelianFormData) {
      setPembelianFormData(JSON.parse(savedPembelianFormData));
    }

    setIsDataLoaded(true); // Mark data as loaded
  }, []);

  // Save product data and subtotal to localStorage whenever they change
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
      localStorage.setItem('subtotal', subtotal.toString());
    }
  }, [productQuantities, subtotal, isDataLoaded]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem('pembelianFormData', JSON.stringify(pembelianFormData));
    }
  }, [pembelianFormData, isDataLoaded]);

  return (
    <ProductContext.Provider
      value={{
        productQuantities,
        setProductQuantities,
        subtotal,
        setSubtotal,
        pembelianFormData,
        setPembelianFormData,
        isDataLoaded, // Expose the loading state
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
