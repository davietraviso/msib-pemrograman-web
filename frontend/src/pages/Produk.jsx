import { Container, Row, Col, Accordion } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import panah from '../assets/img/footer/arrow.png'
import headimg from '../assets/img/produk/produk_header.png'
import ProductBox from '../components/ProductComponents';
import productsData from '../data/produkData';
import { useNavigate } from "react-router-dom";
import FaqComponents from '../components/FaqComponents';
import React, { useState, useContext } from 'react';
import { ProductContext } from '../components/ProductContext';


const Produk = () => {

  const navigate = useNavigate();
  const handleNavigation = () => {
      navigate("/produk-pembelian"); 
  };

  

  const { productQuantities, setProductQuantities, subtotal, setSubtotal } = useContext(ProductContext); // Use context
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  
  

  const handleQuantityChange = (productId, quantityChange, price) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max((prevQuantities[productId] || 0) + quantityChange, 0),
      };
  
      // Recalculate subtotal
      const newSubtotal = Object.entries(updatedQuantities).reduce((total, [id, qty]) => {
        const product = productsData.find((product) => product.id === parseInt(id));
        return total + (product ? product.price * qty : 0);
      }, 0);
  
      setSubtotal(newSubtotal);
      return updatedQuantities;
    });
  }; 
  

  // Filter products based on the search query
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

 

 

  

  return (
    <>
      <Container fluid="md" className="top_produk d-flex justify-content-center align-items-center mb-4 ">
        <div className="produk d-flex" style={{width:'100%'}}>
          <header className="produk_header w-100  d-flex align-items-center">
            <Container className='produk_container'>
              <Row className='row-1 justify-content-center'>
                <img src={headimg} alt="img_header"  />
              </Row>
              <Row>
                <div className="produk_header_text">
                  <h1 style={{fontSize:'48px', fontWeight:'bold', marginTop:'44px'}}>
                    Produk Kami
                  </h1>
                  <p style={{fontSize:'18px', color:'#828282', margin:'0'}}>
                  Kami menawarkan berbagai produk maggot langsung dari petani. <br />
                  Produk-produk ini diproduksi secara berkelanjutan melalui budidaya maggot. <br />
                  Dukung petani lokal sambil mendapatkan solusi ramah lingkungan
                  </p>
                </div>
              </Row>
            </Container>
          </header>
        </div>
      </Container>

      <section>
        <Container style={{ width: '100%' }}>
          <Row className="justify-content-end" style={{ width: '100%' }}>
            <div className="input-group" style={{ maxWidth: '405px', height: '51px', marginTop: '40px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Cari Produk"
                aria-label="Cari Produk"
                aria-describedby="button-addon2"
                style={{ backgroundColor: '#f4f4f4', border: 'none' }}
                value={searchQuery} // Bind input value to state
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
              />
              <button
                className="btn"
                type="button"
                id="button-addon2"
                style={{ backgroundColor: '#f4f4f4', borderRadius: '0 10px 10px 0' }}
              >
                <img src={panah} alt="Send Icon" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </Row>
        </Container>
      </section>
           
      <section>
        <Container className="produk_list">
          <Row>
            {filteredProducts.map((product) => (
              <Row  >
                <ProductBox
                  key={product.id}
                  productId={product.id}
                  image={product.image}
                  name={product.name}
                  stok={product.stok}
                  desc_title={product.desc_title}
                  description={product.description}
                  price={product.price}
                  quantity={productQuantities[product.id] || 0} // Pass quantity from state
                  onQuantityChange={handleQuantityChange}
                />
              </Row>
            ))}
          </Row>
        </Container>
      </section>

      {/* Original Subtotal Section */}
      {subtotal === 0 && (
        <section>
          <Container>
            <Row style={{ marginTop: '35px', marginBottom: '40px' }}>
              <Col className="product_total d-flex flex-row justify-content-start align-content-center">
                <div className="product_total d-flex flex-row align-items-center">
                  <p className="mb-0">Subtotal Belanja</p>
                </div>
              </Col>
              <Col>
                <div className="product_total_tombol d-flex flex-row justify-content-end align-items-center">
                  <h1
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      marginBottom: '0',
                      paddingRight: '5px',
                    }}
                  >
                    Rp {subtotal.toLocaleString('id-ID')}
                  </h1>
                  <Button
                    variant="success"
                    style={{ fontWeight: 'bold', maxWidth: '312px', width: '100%' }}
                    onClick={handleNavigation}
                    disabled={subtotal === 0} // Disable button when subtotal is 0
                  >
                    Bayar
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Pinned Subtotal Section */}
      {subtotal > 0 && (
        <div className="pinned-subtotal">
          <Container>
            <Row className="d-flex align-items-center">
              <Col className="text-start">
                <p className="mb-0">Subtotal Belanja</p>
              </Col>
              <Col>
                <div className="product_total_tombol d-flex flex-row justify-content-end align-items-center">
                  <h1
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      marginBottom: '0',
                      paddingRight: '5px',
                    }}
                  >
                    Rp {subtotal.toLocaleString('id-ID')}
                  </h1>
                  <Button
                    variant="success"
                    style={{ fontWeight: 'bold', maxWidth: '312px', width: '100%' }}
                    onClick={handleNavigation}
                  >
                    Bayar
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      <section>
        <Container className="d-flex align-content-center justify-content-center" style={{paddingTop:'64px'}}>
            <FaqComponents/>
        </Container>

      </section>         
    </>
        
  )
}

export default Produk