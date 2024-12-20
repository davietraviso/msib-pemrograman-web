import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import gimiheader from '../assets/img/produk/gimi_kelengkapan.png'
import panah from '../assets/img/footer/arrow.png'
import ColorBlock from '../components/MapComponen';
import productsData from '../data/produkData';
import FormField from '../components/ProductFormField';
import PaymentMethods from '../components/ProductPayments';
import MapComponent2 from '../components/MapComponent2';
import { ProductContext } from '../components/ProductContext';
import axios from 'axios';
 
const ProdukPembelian = () => {

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


  const handleLocationSelect = (coords) => {
    setLocation(coords); // Update location state with selected coordinates
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Coordinates submitted: Lat: ${location.lat}, Lng: ${location.lng}`);
    // You can also send this data to your server or handle it as needed
  };

  // MAP ENDS

  const {
    productQuantities,
    subtotal,
    pembelianFormData,
    setPembelianFormData,
  } = useContext(ProductContext);

  const serviceFee = 5000;
  const totalPayment = subtotal + serviceFee;

  // State to hold selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // State to track if all required fields are filled
  const [isDataDiriComplete, setIsDataDiriComplete] = useState(false);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setPembelianFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
 

  // Check if all required fields are filled
  useEffect(() => {
    const { nama, phone, email, address, coordinate, radioOption, isChecked } = pembelianFormData;

    if (
      nama &&
      phone &&
      email &&
      address &&
      coordinate?.lat &&
      coordinate?.lng && // Ensure coordinates are valid
      radioOption && // Ensure radio button is selected
      isChecked // Ensure checkbox is checked
    ) {
      setIsDataDiriComplete(true);
    } else {
      setIsDataDiriComplete(false);
    }
  }, [pembelianFormData]);

  // Payment

  const createTransaction = async () => {
    try {
      const items = Object.entries(productQuantities).map(([id, quantity]) => ({
        id,
        price: productsData.find((p) => p.id === parseInt(id))?.price || 0,
        quantity,
        name: productsData.find((p) => p.id === parseInt(id))?.name || 'Unknown Item',
      }));

      if (!selectedPaymentMethod) {
        console.error("Please select a payment method.");
        return; // Don't proceed if no payment method is selected
      }

      const response = await axios.post("http://localhost:5174/api/create-transaction", {
        orderId: `ORDER-${Date.now()}`,
        totalPrice: totalPayment,
        items,
        email: pembelianFormData.email,
        paymentType: selectedPaymentMethod, // Pass the selected payment method
      });

      setPaymentUrl(response.data.paymentUrl); // Use the payment URL response from backend
    } catch (error) {
      console.error('Error generating payment details:', error);
    }
  };

  // // Update selected payment method when user selects a payment option
  // const handlePaymentMethodChange = (paymentType) => {
  //   setSelectedPaymentMethod(paymentType);
  // };
  
   
  useEffect(() => {
    createTransaction(); // Generate Snap Token when the page loads
  }, [selectedPaymentMethod]);



  return (
        <>
        {/* Header */}
        <Container className="top_produkpembelian d-flex  align-items-center ">
          <div className="produk_pembelian">
            <header className="produk_pembelian_header w-100 d-flex align-items-center">
              <Container className='produk_pembelian_container'>
                <Row className='align-items-center'>
                  <Col xs={8}>
                    <div >
                      <div className="benefit_title">
                          <div className="line_1"></div>
                          <p style={{margin:'0', fontSize:'20px'}}>
                            Yuk lakukan pembayaran!
                          </p>
                      </div>
                    </div>
                    <h1 style={{fontWeight:'bold', paddingTop:'8px'}}>
                      Isi Data Kelengkapan Belanja mu
                    </h1>
                  </Col>
                  <Col className=''>
                    <img src={gimiheader} alt="" />
                  </Col>
                </Row>
              </Container>
              
            </header>
          </div>
        </Container>

        <section className='pembelian_data ' style={{backgroundColor:'#f4f4f4', width:'100%'}}>
          <Container className='d-flex  align-items-center '>
            <section className='pembelian_data_diri'>
              <Row className="justify-content-md-between" style={{marginTop:'24px'}}>

                {/* Data Diri */}
                <Col xs lg="7" style={{backgroundColor:'#FFF', padding:'16px 16px', borderRadius:'8px', marginBottom:'40px', maxHeight:'1250px', overflow:'clip'}}>
                  <Row style={{paddingBottom:'16px'}}>
                    <div className="benefit_title">
                        <div className="line_1"></div>
                        Data Diri
                    </div>
                  </Row>
                  <Form>
                    <Form.Group controlId="nama">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        value={pembelianFormData.nama}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="phone">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        type="text"
                        value={pembelianFormData.phone}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={pembelianFormData.email}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="address">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        value={pembelianFormData.address}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </Form>
 
                  {/* Titik Koordinat */}
                  <Form.Group onSubmit={handleSubmit} controlId="formCoordinates" className="mb-4 form_group">
                    <Form.Label>Titik Koordinat</Form.Label>
                    <Form.Control
                      type="text"
                      value={`${location.lat || ''}, ${location.lng || ''}`} // Combine lat and lng in one field
                      readOnly
                    />
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

                  <Row>
                    <p>
                      Saya setuju untuk menerima notifikasi terkait pengiriman melalui nomor Whatsapp saya.
                    </p>
                    <Form>
                      <Form.Check
                        inline
                        label="Ya, Setuju"
                        name="group1"
                        type="radio"
                        id="radioOption"
                        onChange={() => setPembelianFormData((prev) => ({ ...prev, radioOption: "yes" }))}
                      />
                      <Form.Check
                        inline
                        label="Tidak, Terima Kasih"
                        name="group1"
                        type="radio"
                        id="radioOption"
                        onChange={() => setPembelianFormData((prev) => ({ ...prev, radioOption: "no" }))}
                      />
                  </Form>
                  </Row>
                  <Row>
                    <div style={{borderTop:'2px solid #f2f2f2', margin:'0px 16px', width:'100%'}}></div>
                  <Form style={{paddingTop:'16px'}}>
                    {['checkbox'].map((type) => (
                      <div key={`inline-${type}`}>
                         <Form.Check
                            inline
                            label="Dengan mengklik “Lanjut”, kamu menyetujui Syarat dan Ketentuan."
                            name="checkbox"
                            type="checkbox"
                            id="isChecked"
                            onChange={(e) =>
                              setPembelianFormData((prev) => ({ ...prev, isChecked: e.target.checked }))
                            }
                          />
                      </div>
                    ))}
                  </Form>
                  </Row>

                  
                </Col>
                {/* Gap */}
                <Col md='auto'></Col>

                {/* Pemesanan */}
              <Col xs lg="4.5" style={{ marginBottom: '40px' }}>
                {/* Total Pesanan */}
                <Row style={{ backgroundColor: '#FFF', padding: '16px 16px', borderRadius: '8px', marginBottom: '24px' }}>
                  {/* Title */}
                  <Row style={{ paddingBottom: '16px' }}>
                    <div className="benefit_title" style={{ padding: '0px' }}>
                      <div className="line_1"></div>
                      Total Pesanan Anda
                    </div>
                  </Row>

                  {/* Daftar Pesanan */}
                  {Object.entries(productQuantities).map(([id, quantity]) => {
                    const product = productsData.find((p) => p.id === parseInt(id));
                    if (!product || quantity === 0) return null;

                    return (
                      <Row key={id} style={{ padding: '0px', margin: '0px' }}>
                        <Col style={{ padding: '0px' }}>
                          <p style={{ fontSize: '18px' }}>{product.name}</p>
                        </Col>
                        <Col className="text-end" style={{ padding: '0px' }}>
                          <p style={{ fontSize: '18px' }}>
                            {quantity} x Rp{product.price.toLocaleString('id-ID')}
                          </p>
                        </Col>                        
                      </Row>
      
                    );
                  })}

                  <Row style={{ padding: '0px', margin: '0px' }}>
                    <div style={{ borderTop: '2px solid #f2f2f2', width: '100%' }}></div>
                  </Row>

                  {/* Total Calculation */}
                  <Row className="total_bayar_wrap" style={{ padding: '16px 0px', margin: '0px' }}>
                    <Row style={{ padding: '0px', margin: '0px' }}>
                      <Col style={{ padding: '0px' }}>
                        <p style={{ fontSize: '18px', color: '#828282' }}>Subtotal:</p>
                      </Col>
                      <Col className="text-end p-0" style={{ fontSize: '18px' }}>
                        Rp{subtotal.toLocaleString('id-ID')}
                      </Col>
                    </Row>
                    <Row style={{ padding: '0px', margin: '0px' }}>
                      <Col style={{ padding: '0px' }}>
                        <p style={{ fontSize: '18px', color: '#828282' }}>Biaya Layanan:</p>
                      </Col>
                      <Col className="text-end p-0" style={{ fontSize: '18px' }}>
                        Rp{serviceFee.toLocaleString('id-ID')}
                      </Col>
                    </Row>
                    <Row style={{ padding: '0px', margin: '0px' }}>
                      <Col style={{ padding: '0px' }}>
                        <p style={{ fontSize: '18px', color: '#828282' }}>Total Bayar:</p>
                      </Col>
                      <Col className="text-end p-0">
                        <h4 style={{ fontSize: '24px', fontWeight: 'bold' }}>
                          Rp{totalPayment.toLocaleString('id-ID')}
                        </h4>
                      </Col>
                    </Row>
                  </Row>
                </Row>

                {/* Metode Pembayaran */}
                <div style={{ pointerEvents: isDataDiriComplete ? 'auto' : 'none', opacity: isDataDiriComplete ? 1 : 0.5 }}>
                  <PaymentMethods
                    subtotal={totalPayment}
                    productData={Object.entries(productQuantities).map(([id, qty]) => ({
                      id,
                      name: productsData.find((p) => p.id === parseInt(id))?.name || 'Unknown',
                      price: productsData.find((p) => p.id === parseInt(id))?.price || 0,
                      quantity: qty,
                    }))}
                    email={pembelianFormData.email}
                  />
                </div>

                
              </Col>
              </Row>
            </section>
          </Container>
        </section>
      </>
  )
}

export default ProdukPembelian
