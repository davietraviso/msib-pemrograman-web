import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState} from 'react'
import '../css/blog.css';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Blog = () => {

  const [postList, setPostList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    Axios.get('http://localhost:5174/api/get').then((data) => {
      setPostList(data.data)
      console.log(data.data)
    })
  }, [])

  return (
    <>
        {/* Berita Utama */}
        <Container className="top_produkpembelian d-flex  align-items-center ">
          <div className="produk_pembelian">
            <header className="produk_pembelian_header w-100 d-flex align-items-center">
              <Container className='produk_pembelian_container'>
                <Row className='align-items-center'>
                  <Col>
                    
                      
                      {postList
                      .filter((val) => val.id === 13)
                      .map((val, key) => {
                        return (
                          <div className="blog_header"
                            style={{width:'100%', height:'394px',  borderRadius:'12px',
                            backgroundImage: `url(data:image/png;base64,${val.image})`, // Background image from db
                            backgroundSize: 'cover',        // Adjust size (cover, contain, or specific size)
                            backgroundPosition: 'center',   // Center the image within the div
                            backgroundRepeat: 'no-repeat',
                            
                            }}>
                            <div className="blog_header_wrap" style={{
                              padding:'40px 40px', width:'100%', height:'100%'}} 
                              key={key} onClick={() => navigate(`/post/${val.id}`)}>

                              <Row className='tombol_blog'>
                                <Button className='tombol_tombol_blog' >
                                  <p className='tombol_p_blog' style={{color:'#fff', fontWeight:'bold', fontSize:'20px', margin:'0'}}>
                                    Berita Utama
                                  </p>
                                </Button>
                              </Row>
                              <Row>
                                <h1 className='header_h_blog' style={{ color:'#fff', fontSize:'48px', fontWeight:'bold', paddingTop:'20px'}}>
                                  {val.title}
                                </h1>
                              </Row>
                              <Row>
                                <p className='tombol_p_blog' style={{ color:'#fff', fontSize:'18px', paddingTop:'20px'}}>
                                  {val.post_text.length > 100 ? val.post_text.substring(0,100) + '...' : val.post_text}
                                </p>
                              </Row>

                            </div>
                        </div>
                      )
                    })}

                  </Col>
                </Row>
              </Container>
            </header>
          </div>
        </Container>

        {/* Berita Body */}
        <section className='berita_section ' style={{backgroundColor:'#fff', width:'100%', paddingBottom:'100px'}}>
          <Container className='d-flex  align-items-center flex-column' style={{backgroundColor:'white', width:'100%', padding:'20px'}}>

            {/* Berita Terbaru */}
             <section className='berita_terbaru' style={{width:'100%'}}>
                <Container style={{width:'100%'}}>
                  <Row style={{  width:'100%'}}>
                    <div>
                      <h2 className='terbaru_header' style={{fontSize:'32px', fontWeight:'bold', paddingBottom:'24px', paddingTop:'4px'}}>Berita Terbaru</h2>
                    </div>

                    {/* Kolom Kiri */}

                    
                    <Col xs lg="5" className='berita_terbaru_col' style={{backgroundColor:'#FFF', maxHeight:'800px', height:'auto', overflow:'clip'}}>
                      <Row style={{paddingBottom:'16px', padding:'0px', width:'100%'}}>
                        <div className="berita_terbaru" style={{padding:'0px', width:'100%'}}>

                          {postList
                          .filter((val) => val.id === 14)
                          .map((val, key) => {
                            return (
                              <>
                                <div className="berita_terbaru_wrap" key={key} onClick={() => navigate(`/post/${val.id}`)}>
                                  <div className="berita_terbaru_img" style={{
                                     height:'100%'
                                  }}>
                                    <img  className="berita_terbaru_img_top"
                                      src={`data:image/png;base64,${val.image}`} 
                                      alt="Post image"    style={{
                                        width: '100%',      // Adjust width to fit its container
                                        height: '100%',     // Adjust height as needed
                                        objectFit: 'cover',
                                        borderTopLeftRadius: '12px',    // Adjust to your desired radius
                                        borderTopRightRadius: '12px',}}
                                    />
                                  </div>
                                  <div className="berita_terbaru_deskripsi" style={{padding:'25px 10px'}}>
                                      <h3 className="deskripsi_h" style={{fontSize:'24px', fontWeight:'bold'}}>{val.title}</h3>
                                      <p className="deskripsi_p" style={{fontSize:'16px', color:'#929292'}}>{val.post_text.length > 100 ? val.post_text.substring(0,100) + '...' : val.post_text}</p>
                                  </div>                              
                                </div>
                              </>
                            )
                          })}
                        </div>
                        
                      </Row>

                    
                    </Col>
                    {/* Gap */}
                    <Col md='auto'></Col>

                    {/* Kolom Kanan */} 
                    <Col xs lg="7.5" style={{marginBottom:'40px', padding:'0px', overflow:'clip'}}>

                      {/* Row 1 */}
                       
                      <Col
                        xs
                        lg="7.5"
                        style={{
                          backgroundColor: '#FFF',
                          maxHeight: '800px',
                          height: 'auto',
                          overflow: 'clip',
                          display:'flex'
                        }}
                      >
                        
                        <div className="berita_terbaru" style={{ padding: '0px', width: '100%' }}>
                          {postList
                            .filter((val) => val.id === 15)
                            .map((val, key) => {
                              return (
                                <div
                                  className="berita_terbaru_wrap"
                                  key={key}
                                  onClick={() => navigate(`/post/${val.id}`)}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row', // Use row layout on larger screens
                                    flexWrap: 'nowrap',
                                    marginBottom: '16px',
                                    // backgroundColor: '#f9f9f9', // Optional for better contrast
                                    borderRadius: '8px',
                                  }}
                                >
                                  {/* Image */}
                                  <div
                                    className="berita_terbaru_img"
                                    style={{
                                      width: '300px',
                                      height: '220px',
                                      flexShrink: 0, // Prevents the image from shrinking
                                      borderTopLeftRadius: '8px',    // Adjust to your desired radius
                                      borderBottomLeftRadius: '8px',
                                    }}
                                  >
                                    <img
                                      src={`data:image/png;base64,${val.image}`}
                                      alt="Post image"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px 0 0 8px',
                                      }}
                                    />
                                  </div>

                                  {/* Description */}
                                  <div
                                    className="berita_terbaru_deskripsi"
                                    style={{
                                      padding: '15px 10px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      // justifyContent: 'center',
                                    }}
                                  >
                                    <h3
                                      className="deskripsi_h"
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {val.title}
                                    </h3>
                                    <p
                                      className="deskripsi_p"
                                      style={{
                                        fontSize: '14px',
                                        color: '#929292',
                                      }}
                                    >
                                      {val.post_text.length > 100
                                        ? val.post_text.substring(0, 100) + '...'
                                        : val.post_text}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        
                      </Col>
                        

                      {/* Row 2 */}
                      <Col
                        xs
                        lg="7.5"
                        style={{
                          backgroundColor: '#FFF',
                          maxHeight: '800px',
                          height: 'auto',
                          overflow: 'clip',
                          display:'flex'
                        }}
                      >
                        
                        <div className="berita_terbaru" style={{ padding: '0px', width: '100%' }}>
                          {postList
                            .filter((val) => val.id === 16)
                            .map((val, key) => {
                              return (
                                <div
                                  className="berita_terbaru_wrap"
                                  key={key}
                                  onClick={() => navigate(`/post/${val.id}`)}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row', // Use row layout on larger screens
                                    flexWrap: 'nowrap',
                                    marginBottom: '16px',
                                    // backgroundColor: '#f9f9f9', // Optional for better contrast
                                    borderRadius: '8px',
                                  }}
                                >
                                  {/* Image */}
                                  <div
                                    className="berita_terbaru_img"
                                    style={{
                                      width: '300px',
                                      height: '220px',
                                      flexShrink: 0, // Prevents the image from shrinking
                                      borderTopLeftRadius: '8px',    // Adjust to your desired radius
                                      borderBottomLeftRadius: '8px',
                                    }}
                                  >
                                    <img
                                      src={`data:image/png;base64,${val.image}`}
                                      alt="Post image"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px 0 0 8px',
                                      }}
                                    />
                                  </div>

                                  {/* Description */}
                                  <div
                                    className="berita_terbaru_deskripsi"
                                    style={{
                                      padding: '15px 10px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      // justifyContent: 'center',
                                    }}
                                  >
                                    <h3
                                      className="deskripsi_h"
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {val.title}
                                    </h3>
                                    <p
                                      className="deskripsi_p"
                                      style={{
                                        fontSize: '14px',
                                        color: '#929292',
                                      }}
                                    >
                                      {val.post_text.length > 100
                                        ? val.post_text.substring(0, 100) + '...'
                                        : val.post_text}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        
                      </Col>

                      {/* Row 3 */}
                      <Col
                        xs
                        lg="7.5"
                        style={{
                          backgroundColor: '#FFF',
                          maxHeight: '800px',
                          height: 'auto',
                          overflow: 'clip',
                          display:'flex'
                        }}
                      >
                        
                        <div className="berita_terbaru" style={{ padding: '0px', width: '100%' }}>
                          {postList
                            .filter((val) => val.id === 14)
                            .map((val, key) => {
                              return (
                                <div
                                  className="berita_terbaru_wrap"
                                  key={key}
                                  onClick={() => navigate(`/post/${val.id}`)}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row', // Use row layout on larger screens
                                    flexWrap: 'nowrap',
                                    marginBottom: '16px',
                                    // backgroundColor: '#f9f9f9', // Optional for better contrast
                                    borderRadius: '8px',
                                  }}
                                >
                                  {/* Image */}
                                  <div
                                    className="berita_terbaru_img"
                                    style={{
                                      width: '300px',
                                      height: '220px',
                                      flexShrink: 0, // Prevents the image from shrinking
                                      borderTopLeftRadius: '8px',    // Adjust to your desired radius
                                      borderBottomLeftRadius: '8px',
                                    }}
                                  >
                                    <img
                                      src={`data:image/png;base64,${val.image}`}
                                      alt="Post image"
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px 0 0 8px',
                                      }}
                                    />
                                  </div>

                                  {/* Description */}
                                  <div
                                    className="berita_terbaru_deskripsi"
                                    style={{
                                      padding: '15px 10px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      // justifyContent: 'center',
                                    }}
                                  >
                                    <h3
                                      className="deskripsi_h"
                                      style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      {val.title}
                                    </h3>
                                    <p
                                      className="deskripsi_p"
                                      style={{
                                        fontSize: '14px',
                                        color: '#929292',
                                      }}
                                    >
                                      {val.post_text.length > 100
                                        ? val.post_text.substring(0, 100) + '...'
                                        : val.post_text}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        
                      </Col>
                    </Col>
                  </Row>
                </Container>
            </section>

            {/* Berita Lainnya */}
            <section className="berita_terbaru" style={{ width: '100%' }}>
              <Container style={{ width: '100%' }}>
                <Row style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h2
                      style={{
                        margin: '0',
                        padding: '24px 0px',
                        fontSize: '32px',
                        fontWeight: 'bold',
                      }}
                    >
                      Berita Lainnya
                    </h2>
                  </div>

                  {postList
                    .filter((val) => val.id === 17)
                    .map((val, key) => {
                      return (
                        <div
                          className="berita_lainnya_konten"
                          style={{
                            border: '2px solid #ccc',
                            borderRadius: '12px',
                          }}
                          onClick={() => navigate(`/post/${val.id}`)}
                          key={key} // Added a key prop for React's reconciliation
                        >
                          <Col
                            style={{
                              backgroundColor: '#FFF',
                              maxHeight: '200px',
                              height: 'auto',
                              overflow: 'clip',
                            }}
                          >
                            <div
                              className="berita_terbaru_wrap d-flex flex-row"
                              style={{ padding: '0px 15px', alignItems:'center' }}
                            >
                              {/* Image */}
                              <div
                                className="berita_terbaru_img"
                                style={{
                                  height: '164px',
                                  width: '300px',
                                  margin: '15px 0px',
                                  backgroundImage: `url(data:image/png;base64,${val.image})`, // Background image from db
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  borderTopLeftRadius: '8px',
                                  borderBottomLeftRadius: '8px',
                                  display: 'flex'
                                }}
                              ></div>

                              {/* Description */}
                              <div
                                className="berita_terbaru_deskripsi berita_lainnya_deskripsi"
                                style={{ padding: '25px 15px',   }}
                              >
                                <h3
                                  style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {val.title}
                                </h3>
                                <p
                                  style={{
                                    fontSize: '14px',
                                    color: '#929292',
                                  }}
                                >
                                  {val.post_text.length > 100
                                    ? val.post_text.substring(0, 100) + '...'
                                    : val.post_text}
                                </p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      );
                    })}
                </Row>
              </Container>
            </section>



          </Container>
        </section>

      
    </>
  )
}

export default Blog