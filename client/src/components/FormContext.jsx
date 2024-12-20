import React, { createContext, useState, useEffect } from 'react';

// Create the context
const FormContext = createContext();

// Create the provider
const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {
      nama: '',
      name:'',
      gender: '',
      phone: '',
      email: '',
      address: '',
      coordinate: { lat: '', lng: '' },
      jenisSampah: '',
      volumeSampah: '',
      tanggal: '',
      jam: '',
      metodeInsentif: '',
      nomorRekening: '',
      notifikasi: '',
      notifikasi: '',
      termsAccepted: false, // New field
    };
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
