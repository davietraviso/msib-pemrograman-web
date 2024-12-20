import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import '../css/sdg.css'
import sdg from '../assets/img/sdg.png'
import styles from '../css/jasa.module.css';
 
export const SDG = () => {
  return (
    <div style={{margin:'108px 0px'}}>
      <Container className={styles.faq}>
          <div className={`${styles.faq_wrap} d-flex align-items-center`}>
            <img src={sdg} alt="" className='sdg_img'/>            
          </div>
      </Container>
    </div>
  )
}
{/* <img src={sdg} alt="" className='sdg_img'/> */}