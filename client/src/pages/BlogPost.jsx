import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

export default function BlogPost() {

  let {postId} = useParams()

  const [post, setPost] = useState({})

  useEffect(() => {
    Axios.get(`http://localhost:5174/api/getFromId/${postId}`)
        .then((data) => {
            setPost({title: data.data[0].title, postText: data.data[0].post_text, username: data.data[0].username, image: data.data[0].image})
    })
  }, [postId])

  const navigate = useNavigate();

  return (
    <>
        <section>
            <Container style={{marginBottom:'108px'}}>
                <div style={{
                    paddingTop:'124px'
                }}>
                    <div className="berita_terbaru_top">
                        <p>
                            <Row>
                            <Col className='konten_blog' xs={1} style={{ cursor: 'pointer', width:'fit-content'}} onClick={() => navigate('/Blog')} >
                                Blog
                            </Col>
                            <Col className='konten_blog' xs={1} style={{ width:'fit-content'}}> &gt;</Col>
                            <Col className='konten_blog_title' xs={7} style={{fontWeight:'bold'}}>
                                {post.title}
                            </Col>
                            </Row>
                             
                        </p>
                    </div>

                    <div className="berita_konten_deskripsi">
                        <h3 style={{fontSize:'48px', fontWeight:'bold', paddingTop:'24px'}}>
                            {post.title}
                        </h3>
                        <h4 style={{fontSize:'24px', paddingTop:'24px'}}>
                            Dibuat oleh {post.username} Maggo
                        </h4>
                    </div>
                    <div className="berita_konten_img" style={{
                        borderRadius:'10px', height:'600px', width:'100%',  marginTop:'52px',
                        backgroundImage: `url(${post.image})`, // Background image from db
                                backgroundSize: 'cover',        // Adjust size (cover, contain, or specific size)
                                backgroundPosition: 'center',   // Center the image within the div
                                backgroundRepeat: 'no-repeat', 
                                borderTopLeftRadius: '8px',    // Adjust to your desired radius
                                borderBottomLeftRadius: '8px',
                    }}>
                        <img src="" alt="" />
                    </div>
                    <p className='berita_konten_text' style={{paddingTop:'52px', fontSize:'20px', color:'#303030'}}>
                        {post.postText}
                    </p>

                </div>

            </Container>
        </section>
    </>
  )
}
