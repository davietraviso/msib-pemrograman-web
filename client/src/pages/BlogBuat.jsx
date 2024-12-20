import { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Axios from 'axios';

const BlogBuat = () => {

  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [text, setText] = useState("");

  const submitPost = () => {
    Axios.post("http://localhost:5174/api/create", {
      userName: userName, 
      title: title, 
      subTitle: subTitle, 
      text: text
    })
    .catch((error) => {
      console.error("Error submitting post:", error);
    })    .finally(() => {
        // Clear the form inputs
        setUserName("");
        setTitle("");
        setSubTitle("");
        setText("");
    });
  }

  return (
    <>
      <section className='blog_section' style={{backgroundColor:'#f4f4f4', width:'100%'}}>
          <Container className='blog_container d-flex align-items-center justify-content-center' 
          style={{paddingTop:'109px', paddingBottom:'50px'}}>

            <section className='blog_buat_utama' 
                style={{
                  display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', height: 'calc(100vh - 109px)'
                }}>

                <label style={{
                    fontSize:'30px', fontWeight:'bold', paddingBottom:'20px'
                }}>Form Inputan Blog</label>

                <div className="blog_buat_post" style={{
                    display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center',  width:'500px', border: '2px solid var(--primary-color)', borderRadius:'30px'
                    }}>

                    <div className="blog_upload" style={{
                        display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'30px'
                         }}>

                        <Row style={{ 
                            justifyContent:'center', alignItems:'center'
                            }}>
                            <label style={{textAlign:'center'}}>Username</label>
                            <input type='text' 
                            style={{
                                width:'80%', height:'50px', margin:'10px', borderRadius:'10px', border:'2px solid var(--secondary-color)'
                            }} 
                            value={userName} // Set value to userName state
                            onChange={(e) => {setUserName(e.target.value)}}/>
                        </Row>

                        <Row style={{ 
                            justifyContent:'center', alignItems:'center'
                            }}>
                            <label style={{textAlign:'center'}}>Judul Berita</label>
                            <input type='text' 
                            style={{
                                width:'80%', height:'50px', margin:'10px', borderRadius:'10px', border:'2px solid var(--secondary-color)'
                            }}
                            value={title} // Set value to title state
                            onChange={(e) => {setTitle(e.target.value)}}/>
                        </Row>

                        <Row style={{ 
                            justifyContent:'center', alignItems:'center'
                            }}>
                            <label style={{textAlign:'center'}}>Sub Judul</label>
                            <input type='text'
                            style={{
                                width:'80%', height:'50px', margin:'10px', borderRadius:'10px', border:'2px solid var(--secondary-color)'
                            }}
                            value={subTitle} // Set value to subTitle state
                            onChange={(e) => {setSubTitle(e.target.value)}}/>
                        </Row>

                        <Row style={{ 
                            justifyContent:'center', alignItems:'center'
                            }}>
                            <label style={{textAlign:'center'}}>Teks Utama</label>
                            <textarea
                            style={{
                                width:'80%', height:'50px', margin:'10px', borderRadius:'10px', border:'2px solid var(--secondary-color)'
                            }}
                            value={text} // Set value to text state
                            onChange={(e) => {setText(e.target.value)}}/>
                        </Row>

                        <Button onClick={submitPost}>Submit</Button>
                    </div>
                </div>
            </section>
          </Container>
        </section>
    </>
  );
}

export default BlogBuat;
