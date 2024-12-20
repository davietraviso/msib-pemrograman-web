import React, { createContext, useState, useEffect } from 'react';

// Create context
export const CartContext = createContext();

// Create provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ quantities: {}, subtotal: 0 });

  // Save to localStorage on every update
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load from localStorage when the app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
