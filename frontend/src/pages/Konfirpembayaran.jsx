import { Container, Button } from 'react-bootstrap';
import gimibayar from "../assets/img/konfirpembayaran/gimibayar.png";
import { useNavigate } from "react-router-dom";

const KonfirmasiPembayaran = () => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    // Add logic for confirming the payment, e.g., API call or state update.
    console.log("Payment confirmed");
    // Redirect or perform another action after confirmation
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  }; 

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'#ddd'}}>
      <div className="p-4 text-center" style={{ backgroundColor: '#fff', borderRadius: '10px', maxWidth: '400px' }}>
        <img src={gimibayar} alt="Confirmation Illustration" className="mb-3" style={{ width: '60px' }} />
        <h4 className="text-black">Konfirmasi Pembayaran?</h4>
        <p className="text-dark">
          Apakah kamu yakin konfirmasi pemesanan sudah sesuai? Driver akan segera diarahkan untuk jemput sampahmu segera.
        </p>
        <div className="d-flex justify-content-between">
          <Button variant="link" onClick={handleBack} className="text-decoration-none text-dark">
            Kembali
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Ya, Saya Yakin
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default KonfirmasiPembayaran;
