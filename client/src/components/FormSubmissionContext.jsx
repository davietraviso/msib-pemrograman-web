import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Context untuk form submission
const FormSubmissionContext = createContext();

export const FormSubmissionProvider = ({ children }) => {
  // State untuk menyimpan data dari berbagai form
  const [formData, setFormData] = useState({});

  // Fungsi untuk mengupdate form data secara dinamis
  const updateFormData = (formName, data) => {
    setFormData((prev) => ({
      ...prev,
      [formName]: data,
    }));
  };

  // Fungsi untuk mengirim data ke server
  const submitFormData = async (formName, endpoint) => {
    if (!formData[formName]) {
      console.error("No data found for the form:", formName);
      return;
    }
    try {
      const response = await axios.post(endpoint, formData[formName]);
      console.log("Data submitted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting form data:", error);
      throw error;
    }
  };

  return (
    <FormSubmissionContext.Provider value={{ formData, updateFormData, submitFormData }}>
      {children}
    </FormSubmissionContext.Provider>
  );
};

export const useFormSubmission = () => useContext(FormSubmissionContext);
