import React from 'react';
import panah from '../assets/img/footer/arrow.png';

const FormField = ({ label, placeholder, ariaLabel, disabled }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontWeight: 'bold' }}>{label}</p>
      <div className="input-group" style={{ width: '100%', height: '51px', position: 'relative' }}>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled}
          style={{
            backgroundColor: '#f4f4f4',
            border: 'none',
            paddingRight: '40px',
            borderRadius: '10px',
          }}
        />
        <img
          src={panah}
          alt="Send Icon"
          style={{
            position: 'absolute',
            right: '25px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
          }}
        />
      </div>
    </div>
  );
};

export default FormField;
