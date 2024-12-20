import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import gimiheader from '../assets/img/produk/gimi_kelengkapan.png'
import panah from '../assets/img/footer/arrow.png'
import ColorBlock from '../components/MapComponen';
import productsData from '../data/produkData';
import FormField from '../components/ProductFormField';
import PaymentMethods from '../components/ProductPayments';
import MapComponent2 from '../components/MapComponent2';
import { ProductContext } from '../components/ProductContext';
import axios from 'axios';
import gimikonfirm from "../assets/img/gimikonfirm.png"
import gimigagal from "../assets/img/gimikonfirm.png"
import gimisukses from "../assets/img/gimisukses.png" 

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

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleNavigateToPenjemputan = () => navigate("/produk-pembelian");
  const handleNavigateToHomepage = () => navigate("/"); // Return to homepage
  const handleNavigateToChat = () => window.location.href = "https://wa.me/6287772033527"; // Replace with your chat link

  // Email
  const [emailError, setEmailError] = useState(''); // State to hold email validation error

  const handleFormChangeEmail = (e) => {
    const { id, value } = e.target;

    // Update form data
    setPembelianFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Check if the field is the email field
    if (id === "email") {
      // Validate email format using a regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
      if (!emailRegex.test(value)) {
        setEmailError("Email format is invalid.");
      } else {
        setEmailError(''); // Clear error if the format is correct
      }
    }
  };

  const [phoneError, setPhoneError] = useState(''); // To track phone number validation error


  const handleFormChangePhone = (e) => {
  const { id, value } = e.target;

  if (id === "phone") {
    // Validate phone number format
    if (!/^[0-9]+$/.test(value)) {
      setPhoneError("Nomor telepon hanya boleh angka."); // Check for numbers only
    } else if (!value.startsWith("08")) {
      setPhoneError("Nomor telepon harus dimulai dengan '08'."); // Check if starts with "08"
    } else if (value.length < 10) {
      setPhoneError("Nomor telepon harus minimal 10 angka."); // Check for minimum length
    } else {
      setPhoneError(""); // Clear error if valid
    }
  }

  setPembelianFormData((prevData) => ({
    ...prevData,
    [id]: value,
  }));
};



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Coordinates submitted: Lat: ${location.lat}, Lng: ${location.lng}`);
  //   // You can also send this data to your server or handle it as needed
  // };

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

  // Update pembelianFormData when form inputs change
  const handleFormChange = (e) => {
    const { id, value, checked, type } = e.target;
    setPembelianFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value, // Handle checkbox and text inputs
    }));
  };

  // Update pembelianFormData when coordinates are selected
  const handleLocationSelect = (location) => {
    setPembelianFormData((prevData) => ({
      ...prevData,
      coordinate: location, // Update coordinates
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
      isChecked && // Ensure checkbox is checked
      !emailError &&
      !phoneError
    ) {
      setIsDataDiriComplete(true);
    } else {
      setIsDataDiriComplete(false);
    }
  }, [pembelianFormData, emailError, phoneError]);

  // Email

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true); // Loading state
    try {
      const pembelianFormData = {
        nama: nama,
        phone: phone,
        email: email,
        address: address,
        coordinate: coordinate?.lat && coordinate?.lng,
      };

 
      await axios.post("http://localhost:5174/api/send-email2", {
        pembelianFormData
      });
      setShowConfirmModal(false); // Close confirmation modal
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      setShowFailureModal(true); // Jika gagal
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };
  
  const handleRetry = () => {
    setShowFailureModal(false);
    // setShowConfirmModal(true); // Kembali ke konfirmasi
  };

  const handleFormSubmit = () => {
    console.log(formData); // Check if the data is correct
    if (!formData.paymentOption || !formData.userEmail) {
        console.error("Missing required fields");
        return;
    }
    sendFormData();
};


  // Payment


  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null); // Unique order ID
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  // WebSocket Connection
  useEffect(() => {
    if (!orderId) return;

    const ws = new WebSocket("ws://localhost:5174"); // Update with your WebSocket URL

    ws.onopen = () => {
      console.log("WebSocket connected.");
      // Register the frontend for updates with the orderId
      ws.send(JSON.stringify({ type: "register", orderId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket message:", data);

      if (data.orderId === orderId) {
        setPaymentStatus(data.status);

        if (data.status === "settlement") {
          setIsPaymentCompleted(true); // Mark payment as completed
        }
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close(); // Cleanup WebSocket on component unmount
    };
  }, [orderId]);

  useEffect(() => {
    createTransaction(); // Generate Snap Token when the page loads
  }, [selectedPaymentMethod]);

  // Create Transaction
  const createTransaction = async () => {
    try {
      const items = Object.entries(productQuantities).map(([id, quantity]) => ({
        id,
        price: productsData.find((p) => p.id === parseInt(id))?.price || 0,
        quantity,
      }));

      if (!selectedPaymentMethod) {
        console.error("No payment method selected.");
        return; // Ensure a payment method is selected before proceeding
      }

      const generatedOrderId = `ORDER-${Date.now()}`;
      setOrderId(generatedOrderId);

      const response = await axios.post("http://localhost:5174/api/create-transaction", {
        orderId: generatedOrderId,
        totalPrice: totalPayment,
        items,
        email: pembelianFormData.email,
        paymentType: selectedPaymentMethod, // Pass the selected payment method here
      });

      if (response.data.paymentUrl) {
        window.open(response.data.paymentUrl, "_blank");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  
  

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
            <section className='pembelian_data_diri' style={{marginBottom:'0px'}}>
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
                        value={pembelianFormData.nama || ""}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="phone">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        type="text"
                        value={pembelianFormData.phone}
                        onChange={handleFormChangePhone}
                        isInvalid={!!phoneError} // Add Bootstrap's invalid styling
                      />
                      {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>} {/* Display error */}
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={pembelianFormData.email}
                        onChange={handleFormChangeEmail}
                        isInvalid={!!emailError} // Mark field invalid if there's an error
                      />
                      <Form.Control.Feedback type="invalid">
                        {emailError} {/* Show the error message */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="address">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        type="text"
                        value={pembelianFormData.address || ""}
                        onChange={handleFormChange}
                      />
                    </Form.Group>
                  </Form>
 
                  {/* Titik Koordinat */}
                  <Form.Group controlId="formCoordinates" className="mb-4">
                    <Form.Label>Titik Koordinat</Form.Label>
                    <Form.Control
                      type="text"
                      value={`${pembelianFormData.coordinate?.lat || ""}, ${pembelianFormData.coordinate?.lng || ""}`}
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
                        name="radioGroup"
                        type="radio"
                        value="yes"
                        checked={pembelianFormData.radioOption === "yes"} // Bind checked state
                        onChange={(e) =>
                          setPembelianFormData((prev) => ({ ...prev, radioOption: e.target.value }))
                        }
                      />
                      <Form.Check
                        inline
                        label="Tidak, Terima Kasih"
                        name="radioGroup"
                        type="radio"
                        value="no"
                        checked={pembelianFormData.radioOption === "no"} // Bind checked state
                        onChange={(e) =>
                          setPembelianFormData((prev) => ({ ...prev, radioOption: e.target.value }))
                        }
                      />
                    </Form>
                  </Row>

                  <Row>
                    <div
                      style={{
                        borderTop: "2px solid #f2f2f2",
                        margin: "0px 16px",
                        width: "100%",
                      }}
                    ></div>
                    <Form style={{ paddingTop: "16px" }}>
                      <Form.Check
                        inline
                        label="Dengan mengklik “Lanjut”, kamu menyetujui Syarat dan Ketentuan."
                        name="isChecked"
                        type="checkbox"
                        id="isChecked"
                        checked={pembelianFormData.isChecked || false} // Bind checked state
                        onChange={(e) =>
                          setPembelianFormData((prev) => ({
                            ...prev,
                            isChecked: e.target.checked,
                          }))
                        }
                      />
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
                    onSelectPaymentMethod={setSelectedPaymentMethod} // Pass setter to PaymentMethods
                  />
                  <Row style={{paddingTop:'16px ', backgroundColor:'#fff', paddingBottom:'20px', borderRadius:'10px', marginTop:'-30px'}}>
                    <Col xs={4} className='align-items-center' style={{padding:'0px 20px 0px 16px'}}>
                        <Button variant="light" style={{backgroundColor:'#fff', border:'none'}}>
                            <p className='m-0 ' style={{padding:'8px 8px', color:'#0C70FF'}}>Kembali</p>
                        </Button>
                    </Col>
                    <Col xs={8} className='align-items-center'>
                        <Button variant="primary" onClick={() => setShowConfirmModal(true)}>
                            <p className='m-0 ' style={{padding:'8px 8px', fontWeight:'bold'}}>Konfirmasi Pembayaran</p>
                        </Button>
                    </Col>
                  </Row>

                  {/* Confirmation Modal */}
              <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                {/* <Modal.Header closeButton>
                  <Modal.Title>Konfirmasi Pengiriman?</Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{textAlign:'center'}}>
                  <img src={gimikonfirm} style={{width:"153px", height:'auto', paddingBottom:'10px'}} alt="konfirm" />
                  <strong><br />Konfirmasi Pengiriman?</strong> <br />
                  <p style={{paddingTop:'10px'}}>
                    Apakah kamu yakin konfirmasi pemesanan sudah sesuai? Driver akan segera diarahkan untuk jemput sampahmu segera <br />               
                  </p>
                  <Button style={{backgroundColor:'white', color:'#2971fd', border:'none', paddingRight:'20px'}} onClick={() => setShowConfirmModal(false)}>
                    Kembali
                  </Button>
                  <Button variant="primary" onClick={handleSubmit} style={{padding:'10px'}} disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Ya, Saya Yakin"}
                  </Button>
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
              </Modal>

              {/* Success Modal */}
              <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                {/* <Modal.Header>
                  <Modal.Title>Yeay, Pemesanan Berhasil!</Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{textAlign:'center'}}>
                  <img src={gimisukses} style={{width:"153px", height:'auto', paddingBottom:'10px'}} alt="konfirm" />
                  <strong><br />Yeay, Pemesanan Berhasil!</strong> <br />
                  <p style={{paddingTop:'10px'}}>
                  Sekarang kamu tinggal cek lokasi driver melalui platform Whatsapp <br />               
                  </p>
                  <Button style={{backgroundColor:'white', color:'#2971fd', border:'none', paddingRight:'20px'}} onClick={handleNavigateToHomepage}>
                    Halaman Awal
                  </Button>
                  <Button variant="primary" onClick={handleNavigateToChat}>
                    Lanjut Whatsapp
                  </Button>
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
              </Modal>

              {/* Failure Modal */}
              <Modal show={showFailureModal} onHide={() => setShowFailureModal(false)} centered>
                <Modal.Body style={{ textAlign: "center" }}>
                  <img src={gimigagal} style={{ width: "153px", height: "auto", paddingBottom: "10px" }} alt="gagal" />
                  <strong><br />Oops, Pemesanan Gagal!</strong> <br />
                  <p style={{ paddingTop: "10px" }}>
                    Sepertinya ada kendala. Mohon periksa koneksi internet atau coba beberapa saat lagi. <br />
                  </p>
                  <Button
                    style={{ backgroundColor: "white", color: "#2971fd", border: "none", paddingRight: "20px" }}
                    onClick={() => setShowFailureModal(false)}
                  >
                    Tutup
                  </Button>
                  <Button variant="danger" onClick={handleRetry}>
                    Coba Lagi
                  </Button>
                </Modal.Body>
              </Modal>

                

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
