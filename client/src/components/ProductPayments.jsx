import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Collapse, Tab, Nav, Spinner } from 'react-bootstrap';
import qris from '../assets/img/produk/qris.png'
import sp from '../assets/img/produk/sp.png'
import ovo from '../assets/img/produk/ovo.png'
import gopay from '../assets/img/produk/gopay.png'
import dana from '../assets/img/produk/dana.png'
import bni from '../assets/img/produk/bni.png'
import mandiri from '../assets/img/produk/mandiri.png'
import bca from '../assets/img/produk/bca.png'
import axios from 'axios';


function PaymentMethods({ subtotal, productData, email, onSelectPaymentMethod }) {
  const [activeTab, setActiveTab] = useState('emoney');
  const [openOption, setOpenOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({}); // To store dynamic payment details
  const [isLoading, setIsLoading] = useState(false);

  // Calculate deadline (24 hours from now)
  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = deadline - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft('Expired');
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}j ${minutes}m ${seconds}d`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const paymentOptions = {
    emoney: [
      { id: 1, image:qris, name: 'QRIS', details: 'QRIS details here' },
      { id: 2, image:gopay, name: 'Gopay', details: 'Gopay details here' },
      { id: 3, image:dana, name: 'DANA', details: 'DANA details here' },
      { id: 4, image:sp, name: 'ShopeePay', details: 'ShopeePay details here' },
      { id: 5, image:ovo, name: 'OVO', details: 'OVO details here' },
    ],
    va: [
      { id: 6, image:bca, name: 'BCA', details: 'BCA VA details here' },
      { id: 7, image:mandiri, name: 'Mandiri', details: 'Mandiri VA details here' },
      { id: 8, image:bni, name: 'BNI', details: 'BNI VA details here' },
      // Add more banks as needed
    ],
  };

  const handleSelectPayment = (paymentType) => {
    onSelectPaymentMethod(paymentType); // Notify parent about the selected payment method
  };

  // Midtrans
 
  // Fetch Snap Token for a specific payment type
  const fetchPaymentDetails = async (paymentType) => {
    try {
      setIsLoading(true);
  
      const filteredItems = productData.filter((item) => item.quantity > 0);
  
      const response = await axios.post("http://localhost:5174/api/create-transaction", {
        orderId: `ORDER-${Date.now()}`,
        totalPrice: subtotal,
        items: filteredItems,
        email: email || "example@email.com",
        paymentType, // Add the selected payment type
      });
  
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        [paymentType]: response.data, // Save the response data for the specific paymentType
      }));
    } catch (error) {
      console.error("Failed to fetch payment details:", error);
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <Row style={{ backgroundColor: '#FFF', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
      {/* Section Title */}
      <Row style={{ paddingBottom: '16px' }}>
        <div className="benefit_title" style={{ padding: '0px' }}>
          <div className="line_1"></div>
          Metode Pembayaran
        </div>
      </Row>
      
      {/* Countdown Timer */}
      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <div
            style={{
              backgroundColor: '#FF8800',
              color: '#FFF',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '12px'
            }}
          >
            Mohon selesaikan pemesanan sebelum:  {timeLeft}
          </div>
        </Col>
      </Row>

      {/* Tabs for Payment Methods */}
      <Row style={{ paddingBottom: '16px' }}>
        <Nav variant="tabs" defaultActiveKey="emoney" className='payment-nav justify-content-around'>
          <Nav.Item >
            <Nav.Link
              eventKey="emoney"
              onClick={() => setActiveTab('emoney')}
              style={{ 
                marginLeft: '20px',
                fontWeight: activeTab === 'emoney' ? 'bold' : 'normal', 
                color:  activeTab === 'emoney' ? '#0C70FF' : '#777',
                borderBottom: activeTab == 'emoney' ? '4px solid #0C70FF' :  'none' }}
            >
              Uang Elektronik
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="va"
              onClick={() => setActiveTab('va')}
              style={{ 
                fontWeight: activeTab === 'va' ? 'bold' : 'normal', 
                color: activeTab === 'va' ? '#0C70FF' : '#777',
                borderBottom: activeTab == 'va' ? '4px solid #0C70FF' :  'none' }}
            >
              Virtual Account
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>

      {/* Payment Options */}
      <Row>
        {paymentOptions[activeTab].map((option) => (
          <Col key={option.id} xs={12} className="mb-2">
            <Button
              variant="light"
              onClick={() => {
                setOpenOption(openOption === option.id ? null : option.id);
                fetchPaymentDetails(option.name.toLowerCase()); // Pass payment type dynamically
                handleSelectPayment(option.name.toLowerCase()); // Pass the selected payment type
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                border: "1px solid #ddd",
                padding: "12px",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.image}
                  alt="img_here"
                  style={{
                    width: "100%",
                    height: "30px",
                    marginRight: "8px",
                  }}
                />
                <span>{option.name}</span>
              </div>
              <span>&gt;</span>
            </Button>

            <Collapse in={openOption === option.id}>
              <div style={{ padding: "10px", backgroundColor: "#fff" }}>
                {isLoading ? (
                  <p>Fetching payment details...</p>
                ) : paymentDetails[option.name.toLowerCase()] ? (
                  <>
                    {option.name.toLowerCase() === "qris" && (
                      <>
                        {/* <p>Scan this QR Code to pay:</p> */}
                        <img
                          src={paymentDetails[option.name.toLowerCase()].paymentUrl}
                          alt="QR Code"
                          style={{ width: "200px", height: "200px", paddingTop:'10px' }}
                        />
                        <p style={{fontSize:'16px', fontWeight:'bold', paddingTop:'20px'}}>Cara Melakukan Pembayaran:</p>
                        <p style={{fontSize:'16px', color:'#828282'}}>
                          <ol>
                            <li> 
                            Buka Aplikasi Dompet Digital atau Mobile Banking <br />Pastikan Anda menggunakan aplikasi yang mendukung QRIS dan saldo Anda mencukupi.
                            </li>
                            <li>
                            Pilih Menu "Scan" atau "Bayar dengan QR" <br />
                            Pada halaman utama, cari dan pilih menu untuk melakukan scan QR atau pembayaran QR.
                            </li>
                            <li>
                            Pindai Kode QRIS <br /> Arahkan kamera ponsel ke kode QRIS yang ada di tempat pembayaran atau yang diberikan oleh merchant.
                            </li>
                            <li>
                            Masukkan Jumlah Pembayaran <br /> Setelah kode QRIS berhasil dipindai, masukkan jumlah nominal yang akan dibayarkan.
                            </li>
                            <li>
                            Konfirmasi Pembayaran <br /> Periksa kembali detail transaksi. Jika sudah sesuai, pilih "Konfirmasi" atau "Lanjut".
                            </li>
                            <li>
                            Selesaikan Pembayaran <br /> Masukkan PIN atau autentikasi sesuai yang diminta oleh aplikasi untuk menyelesaikan pembayaran.
                            </li>
                            <li>
                            Transaksi Selesai <br /> Notifikasi akan muncul sebagai tanda pembayaran berhasil, dan Anda dapat menunjukkan bukti pembayaran jika diperlukan.
                            </li>
                          </ol>
                        </p>
                      </>
                    )}
                    {option.name.toLowerCase() === "gopay" && (
                      <>
                        <p>Scan this QR Code to pay:</p>
                        <img
                          src={paymentDetails[option.name.toLowerCase()].paymentUrl}
                          alt="QR Code"
                          style={{ width: "200px", height: "200px" }}
                        />
                        <a
                          href={paymentDetails[option.name.toLowerCase()].paymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in new tab
                        </a>
                      </>
                    )}
                    {option.name.toLowerCase() === "bca" && (
                      <>
                        <p>BCA Virtual Account Number:</p>
                        <h3>{paymentDetails[option.name.toLowerCase()].vaNumber}</h3>
                      </>
                    )}
                    {option.name.toLowerCase() === "mandiri" && (
                      <>
                        <p>Virtual Account Number for Mandiri:</p>
                        <h3>{paymentDetails[option.name.toLowerCase()].permataVaNumber}</h3>
                      </>
                    )}

                  </>
                ) : (
                  <p>Untuk saat ini, metode pembayaran ini masih tidak didukung. <br />Mohon untuk memilih opsi pembayaran lainnya. <br />Terima kasih.</p>
                )}
              </div>
            </Collapse>


          </Col>
        ))}
        
      </Row>

      
    </Row>
  );
}

export default PaymentMethods;
