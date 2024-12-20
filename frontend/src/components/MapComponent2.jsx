import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent2 = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Define map options
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };
  const center = { lat: -6.200000, lng: 106.816666 }; // Default center for Jakarta

  const handleMapClick = (event) => {
    const { lat, lng } = event.latLng;
    const coords = {
      lat: lat(),
      lng: lng(),
    };
    setSelectedLocation(coords);
    onLocationSelect(coords); // Pass coordinates to parent component
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedLocation && (
          <Marker position={selectedLocation} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent2;
