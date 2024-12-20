import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";  // Using React-Bootstrap for UI components
import questionmark from "../assets/img/icon/message-question.png"

function SupportChatWidget() {
  const [showModal, setShowModal] = useState(false);  // To toggle the modal visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log(formData);
    // After submitting, close the modal
    setShowModal(false);
  };

  return (
    <div>
      {/* Floating button */}
      <Button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "16px",
          display:"flex",
          borderRadius:'16px',
          border:'none',
          backgroundColor: "var(--secondary-color)"
        }}
        onClick={() => setShowModal(true)}
      >
        <p className="align-content-center" style={{marginBottom:'0px', paddingRight:'10px', fontWeight:'bold'}}>Ruang Tanya  </p> <img src={questionmark} style={{width:'40px', height:'auto'}} alt="questionmark" />
      </Button>

      {/* Modal for the form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered
        style={{
            display: 'flex',
            alignItems: 'flex-start',  // Aligns to the top of the screen, overriding the default centering
            justifyContent: 'center',
            marginTop: '40px',  // Move it down by 20% of the viewport height
          }}
          >
        <Modal.Header closeButton>
          <Modal.Title style={{  width:'100%', paddingTop:'20px'}}> 
            <h4 style={{fontSize:'40px', textAlign:'center', width:'100%', fontWeight:'bold'}}>
                <span style={{color:'var(--secondary-color)'}}>
                    Ruang 
                </span> &nbsp;
                <span style={{color:'var(--primary-color)'}}>
                    Tanya
                </span>
                 
            </h4>
            <p style={{fontSize:'14px', textAlign:'center'}}>
                Jam Operasional : Hari Senin - Jumat, Pukul 09.00 - 18.00
            </p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" >  
              <Form.Label>Nama Lengkap Anda</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email" style={{paddingTop:'10px'}}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="question" style={{paddingTop:'10px'}}>
              <Form.Label>Perihal Pertanyaan</Form.Label>
              <Form.Control
                as="textarea"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group controlId="file" style={{paddingTop:'10px'}}>
              <Form.Label>Dokumen Pendukung (Jika Ada)</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button
            style={{backgroundColor: "var(--secondary-color)", border:'none', width:'100%', marginTop:'20px'}}
            type="submit">
              Kirim Pertanyaan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SupportChatWidget;
