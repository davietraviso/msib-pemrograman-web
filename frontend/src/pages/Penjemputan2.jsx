import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import gimiheader from '../assets/img/jemput/gimi_jemput.png';
import { useNavigate } from "react-router-dom";
import { FormContext } from '../components/FormContext';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import gimikonfirm from "../assets/img/gimikonfirm.png"
import gimigagal from "../assets/img/gimikonfirm.png"
import gimisukses from "../assets/img/gimisukses.png"
 
const Penjemputan2 = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  // Navigation Handlers
  const handleNavigateToPenjemputan = () => navigate("/penjemputan");
  const handleNavigateToHomepage = () => navigate("/"); // Return to homepage
  const handleNavigateToChat = () => window.location.href = "https://wa.me/6287772033527"; // Replace with your chat link

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Update the specific field
    }));
  };

  const handleNavigateToKonfirmasi = () => {
    navigate("/Konfirpembayaran"); // Pastikan path ini benar
  };

  // Email

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true); // Loading state
    try {
      const penjemputanData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        coordinate: formData.coordinate,
      };

      const penjemputan2Data = {
        jenisSampah: formData.jenisSampah,
        volumeSampah: formData.volumeSampah,
        tanggal: formData.tanggal,
        metodeInsentif: formData.metodeInsentif,
        nomorRekening: formData.nomorRekening,
        notifikasi: formData.notifikasi,
      };
 
      await axios.post("http://localhost:5174/api/send-email", {
        penjemputanData,
        penjemputan2Data,
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
  
  return ( 
    <div>
      <Container className="top_produkpembelian d-flex align-items-center" >
        <div className="produk_pembelian">
          <header className="produk_pembelian_header w-100 d-flex align-items-center">
            <Container className="produk_pembelian_container">
              <Row className="align-items-center">
                <Col xs={8}>
                  <div>
                    <div className="benefit_title mb-4">
                      <div className="line_1"></div>
                      <p className="header_subtitle">Form Penjemputan Sampah</p>
                    </div>
                  </div>
                  <h1 className="header_title">Lengkapi Data Berikut!</h1>
                </Col>
                <Col>
                  <img src={gimiheader} alt="Illustration" className="header_image" />
                </Col>
              </Row>
            </Container>
          </header>
        </div>
      </Container>

      <section className="pembelian_data">
        <Container fluid>
          <section className="pembelian_data_diri_fullwidth">
            <Form>
              <div className="benefit_title mb-4">
                <div className="blue-line"></div>
                <p className="form_section_title">Form 2 - Penjemputan Sampah</p>
              </div>

              {/* Jenis Sampah Organik */}
              <Form.Group controlId="jenisSampah" className="mb-3 position-relative form_group">
                <Form.Label>Jenis Sampah Organik</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: Sayur Mayur"
                  className="form_input"
                  value={formData.jenisSampah}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Perkiraan Volume Sampah */}
              <Form.Group controlId="volumeSampah" className="mb-3 position-relative form_group">
                <Form.Label>Perkiraan Volume Sampah</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: 3 Kilogram"
                  className="form_input"
                  value={formData.volumeSampah}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Tanggal Penjemputan */}
              <Form.Group controlId="tanggal" className="mb-3 position-relative form_group">
                <Form.Label>Tanggal Penjemputan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DD/MM/YY"
                  className="form_input"
                  value={formData.tanggal}
                  onChange={handleChange}
                />
              </Form.Group>
              

              {/* Jam Penjemputan
              <Form.Group controlId="jam" className="mb-3 form_group">
                <Form.Label>Jam Penjemputan</Form.Label>
                <div className="d-flex flex-column">
                  <Form.Check type="radio" label="08.00 - 10.00 WIB" name="jamPenjemputan" className="mb-2" 
                    checked={formData.jam === '08.00 - 10.00 WIB'}
                    value={formData.jam}
                    onChange={() => setFormData({ ...formData, jam: '08.00 - 10.00 WIB' })}/>
                  <Form.Check type="radio" label="11.00 - 13.00 WIB" name="jamPenjemputan" className="mb-2" 
                    checked={formData.jam === '11.00 - 13.00 WIB'}
                    value={formData.jam}
                    onChange={() => setFormData({ ...formData, jam: '11.00 - 13.00 WIB' })}/>
                  <Form.Check type="radio" label="14.00 - 17.00 WIB" name="jamPenjemputan" className="mb-2" 
                    checked={formData.jam === '14.00 - 17.00 WIB'}
                    value={formData.jam}
                    onChange={() => setFormData({ ...formData, jam: '14.00 - 17.00 WIB' })}/>
                </div>
              </Form.Group> */}

              {/* Metode Insentif Penjualan Sampah */}
              <Form.Group controlId="metodeInsentif" className="mb-3 position-relative form_group">
                <Form.Label>Metode Insentif Penjualan Sampah</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.metodeInsentif}
                  onChange={(e) => setFormData({ ...formData, metodeInsentif: e.target.value })}
                  className="form_input" 
                >
                  <option value="">--Pilih Metode Insentif--</option>
                  <option>Transfer Bank</option>
                  <option>Dompet Digital</option>
                </Form.Control>
              </Form.Group>

              {/* Nomor Rekening / Virtual Account */}
              <Form.Group controlId="nomorRekening" className="mb-3 position-relative form_group">
                <Form.Label>Nomor Rekening / Virtual Account</Form.Label>
                <Form.Control type="text" placeholder="Contoh: John Doe / BCA 1231XXXX" className="form_input" 
                value={formData.nomorRekening}
                onChange={handleChange}/>
              </Form.Group>

              {/* Notifikasi via WhatsApp */}
              <Form.Group controlId="notifikasi" className="mb-3 form_group">
                <Form.Label>Saya setuju untuk menerima notifikasi terkait pengiriman melalui nomor WhatsApp saya</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    type="radio"
                    label="Ya, Setuju"
                    name="notifikasi"
                    className="me-3"
                    checked={formData.notifikasi === 'Ya, Setuju'}
                    onChange={() => setFormData({ ...formData, notifikasi: 'Ya, Setuju' })}
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak, Terima kasih"
                    name="notifikasi"
                    checked={formData.notifikasi === 'Tidak, Terima kasih'}
                    onChange={() => setFormData({ ...formData, notifikasi: 'Tidak, Terima kasih' })}
                  />
                </div>
              </Form.Group>


              {/* Terms and Conditions */}
              <Form.Group controlId="terms" className="mb-4 form_group">
                <Form.Check
                  type="checkbox"
                  label="Dengan mengklik 'Lanjut', kamu menyetujui Syarat dan Ketentuan."
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                />
              </Form.Group>


              {/* Action Buttons
              <Row>
                <Col className="d-flex justify-content-start">
                <Button variant="light" onClick={handleNavigateToPenjemputan} className="form_button button-kembali">Kembali</Button>
                <Button variant="primary" type="button" onClick={handleSubmit} className="form_button button-ajukan" style={{color:'#fff'}}>Ajukan Penjemputan</Button>
                </Col>
              </Row> */}

              {/* Action Buttons */}
              <Row>
                <Col className="d-flex justify-content-start">
                  <Button
                    variant="light"
                    onClick={handleNavigateToPenjemputan}
                    className="form_button button-kembali"
                  >
                    Kembali
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setShowConfirmModal(true)} // Open confirmation modal
                    className="form_button button-ajukan"
                    style={{ color: "#fff" }}
                  >
                    Ajukan Penjemputan
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
            </Form>
          </section>
        </Container>
      </section>
    </div>
  );
};

export default Penjemputan2;