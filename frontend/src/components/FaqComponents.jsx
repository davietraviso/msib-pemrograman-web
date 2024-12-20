import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import styles from '../css/jasa.module.css';
import gimifaq from "../assets/img/jasa/gimifaq.png";
 
const FaqComponents = () => {
  return (
    <div style={{width:'100%'}}>
        <Container className={styles.faq}>
          <div className={`${styles.faq_wrap} d-flex align-items-center`}>
            <Row className="faq_row d-flex align-items-center" style={{width:'100%'}}>
              <Col xs={3} className="d-flex align-items-center" >
                <img src={gimifaq} alt="FAQ illustration" className={`${styles.faq_image}`} />
              </Col>
              <Col xs={7} className="d-flex flex-column justify-content-center" style={{ flex: 1 }}>
                <div className="d-flex flex-column align-items-start">
                  <span className={styles.judul_faq} style={{display:'flex'}}>
                    <div className="line_1"></div>
                    <p className="justify-content-center" style={{marginBottom:'0px', fontSize:'20px', fontWeight:'lighter'}}>
                    Frequently Asked Questions
                    </p></span>
                  <h1 className={styles.penjelasan_faq2} style={{fontSize:'48px', fontWeight:'bold'}}>Pertanyaan dan Jawaban Relevan</h1>
                </div>
              </Col>
            </Row>


          </div>

          <Accordion defaultActiveKey="0">
            {[
              "Dalam jangka berapa lama sampah akan diambil oleh driver Maggo?",
              "Apakah saya perlu memisahkan jenis sampah sebelum diambil?",
              "Apakah saya akan mendapatkan imbalan dari sampah organik yang saya kumpulkan?",
              "Di mana saja area layanan Maggo?",
              "Bagaimana cara saya melacak status penjemputan sampah?",
            ].map((question, index) => (
              <Accordion.Item eventKey={index.toString()} key={index} className="accordion-card">
                <Accordion.Header className="d-flex justify-content-between align-items-center">
                  {question}
                  {/* <img src={kanan} className="accordion-arrow" alt="custom arrow icon" style={{ width: '16px', height: '16px' }} /> */}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  {/* Replace with actual answer or content here */}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Accordion.Body>
              </Accordion.Item>
            ))} 
            
          </Accordion>
          
        </Container>
    </div>
  )
}

export default FaqComponents