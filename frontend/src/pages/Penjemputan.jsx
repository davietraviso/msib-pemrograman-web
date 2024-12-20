import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import gimiheader from '../assets/img/jemput/gimi_jemput.png';
import {  useNavigate } from "react-router-dom";
import ColorBlock from '../components/MapComponen';
import React, { useContext, useState, useEffect } from 'react';
import MapComponent2 from '../components/MapComponent2';
import { FormContext } from '../components/FormContext';
import { ProductContext } from '../components/ProductContext';
// import './style.css'; // Import the CSS file

const Penjemputan = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/penjemputan2");
  };

  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Update the specific field
      [name]: type === 'checkbox' ? checked : value, // For checkboxes, save `checked`
    }));
  };

  // MAP

  // MAP STATE
  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [mapKey, setMapKey] = useState(0); // Key to force map re-render

  // Refresh map key when the component mounts
  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1); // Increment key to force remount
  }, []);

  // Function to refresh the map
  const handleMapRefresh = () => {
    setMapKey((prevKey) => prevKey + 1); // Increment key to force map re-render
  };

  // Update pembelianFormData when coordinates are selected
  const handleLocationSelect = (coords) => {
    setFormData((prevData) => ({
      ...prevData,
      coordinate: coords, // Update coordinates
    }));
  };

  const {
    pembelianFormData,
    setPembelianFormData,
  } = useContext(ProductContext);

  // MAP

  // const [location, setLocation] = useState({ lat: '', lng: '' });

  // const handleLocationSelect = (coords) => {
  //   setLocation(coords); // Update location state with selected coordinates
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Coordinates submitted: Lat: ${location.lat}, Lng: ${location.lng}`);
  //   // You can also send this data to your server or handle it as needed
  // };

  // MAP ENDS

  return (
    <div>
      {/* Header */}
      <Container className="top_produkpembelian d-flex align-items-center">
        <div className="produk_pembelian">
          <header className="produk_pembelian_header w-100 d-flex align-items-center">
            <Container className="produk_pembelian_container">
              <Row className="align-items-center">
                <Col xs={8}>
                  <div>
                    <div className="benefit_title">
                      <div className="line_1"></div>
                      <p className="header_subtitle">Form Penjemputan Sampah</p>
                    </div>
                  </div>
                  <h1 className="header_title">Yuk Lengkapi Data Berikut!</h1>
                </Col>
                <Col>
                  <img src={gimiheader} alt="Illustration" className="header_image" />
                </Col>
              </Row>
            </Container>
          </header>
        </div>
      </Container> 

      {/* Form Section */}
      <section className="pembelian_data">
        <Container fluid>
          <section className="pembelian_data_diri_fullwidth">
            <Form>
              <div className="benefit_title mb-4">
                <div className="blue-line"></div> {/* Add this line */}
                <p className="form_section_title">Form 1 - Data Diri</p>
              </div>

              {/* Nama Anda */}
              <Form.Group controlId="name" className="mb-3 position-relative form_group">
                <Form.Label>Nama Anda</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: John Doe"
                  className="form_input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Jenis Kelamin */}

              {/* <Form.Group controlId="gender" className="mb-3 form_group">
                <Form.Label>Jenis Kelamin</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Pria"
                    name="gender"
                    checked={formData.gender === 'Pria'}
                    className="me-3"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Wanita"
                    name="gender"
                    checked={formData.gender === 'Wanita'}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group> */}

              
              <Form.Group controlId="gender" className="mb-3 form_group">
                <Form.Label>Jenis Kelamin</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Pria"
                    name="gender"
                    className="me-3"
                    checked={formData.gender === 'Pria'}
                    onChange={() => setFormData({ ...formData, gender: 'Pria' })}
                  />
                  <Form.Check
                    type="radio"
                    label="Wanita"
                    name="gender"
                    checked={formData.gender === 'Wanita'}
                    onChange={() => setFormData({ ...formData, gender: 'Wanita' })}
                  />
                </div>
              </Form.Group>

              {/* Nomor Telepon */}
              <Form.Group controlId="phone" className="mb-3 position-relative form_group">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: (+62) 812-1234-5678"
                  className="form_input"
                  value={formData.phone}
                  onChange={handleChange}
                />                
              </Form.Group>

              {/* Email */}
              <Form.Group controlId="email" className="mb-3 position-relative form_group">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: johndoe@gmail.com"
                  className="form_input"
                  value={formData.email}
                  onChange={handleChange}
                />                 
              </Form.Group>

              {/* Alamat Lengkap */}
              <Form.Group controlId="address" className="mb-3 position-relative form_group">
                <Form.Label>Alamat Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: Jalan Betutu No. 12"
                  className="form_input"
                  value={formData.address}
                  onChange={handleChange}
                />   
              </Form.Group>       

              <Form.Group controlId="formCoordinates" style={{paddingTop:'10px'}} className="mb-3 position-relative form_group">
                <Form.Label>Peta</Form.Label>    
              </Form.Group>   
 
              {/* Map with Refresh Button */}
              <div key={mapKey} style={{ position: 'relative' }}>
                {/* Map Component */}
                <MapComponent2 onLocationSelect={handleLocationSelect} />

                {/* Force Refresh Button */}
                <Button
                  variant="light"
                  onClick={handleMapRefresh}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000, // Ensure it appears above the map
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Refresh Map
                </Button>
              </div>

              {/* Titik Koordinat */}
              <Form.Group controlId="formCoordinates" style={{paddingTop:'15px'}} className="mb-3 position-relative form_group">
                <Form.Label>Titik Koordinat</Form.Label>
                <Form.Control
                  type="text"
                  value={`${formData.coordinate?.lat || ""}, ${formData.coordinate?.lng || ""}`}
                  readOnly                  
                  // onChange={handleChange}
                  
                />
              </Form.Group>

              {/* Action Buttons */}
              <Row style={{paddingTop:'20px'}}>
                <Col className="d-flex justify-content-start">
                  <Button variant="light" href="/jasa" className="form_button button-kembali">Kembali</Button>
                  <Button variant="primary" type="button" onClick={handleNavigation} className="form_button button-selanjutnya">Selanjutnya</Button>
                </Col>
              </Row>

            </Form>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default Penjemputan;
