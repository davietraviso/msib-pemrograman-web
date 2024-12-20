import React from 'react';

const ColorBlock = ({ color = '#f4f4f4', width = '100%', height = '100px' }) => {
  return (
    <div >
        <div 
        style={{
            backgroundColor: color,
            width: width,
            height: height,
            borderRadius: '5px', // Optional, for rounded corners
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px'
        }}
        >
            Gambar Koordinat
        </div>
    </div>
  );
};

export default ColorBlock;
