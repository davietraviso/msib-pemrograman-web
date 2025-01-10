import { useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Axios from 'axios';

const BlogDelete = () => {
  const [id, setId] = useState("");

  const deletePost = () => {
    Axios.delete(`http://localhost:5174/api/delete/${id}`)
    .catch((error) => {
      console.error("Error deleting post:", error);
    })
    .finally(() => {
        setId("");
    });
  };

  return (
    <>
      <section className='blog_section' style={{backgroundColor:'#f4f4f4', width:'100%'}}>
        <Container className='blog_container d-flex align-items-center justify-content-center' 
          style={{paddingTop:'109px', paddingBottom:'50px'}}>

          <section className='blog_delete_utama' 
            style={{
              display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', height: 'calc(100vh - 109px)'
            }}>

            <label style={{
                fontSize:'30px', fontWeight:'bold', paddingBottom:'20px'
            }}>Form Delete Blog</label>

            <div className="blog_delete_post" style={{
                display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center',  width:'500px', border: '2px solid var(--primary-color)', borderRadius:'30px'
                }}>

              <div className="blog_upload" style={{
                  display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'30px'
                   }}>

                <Row style={{ 
                    justifyContent:'center', alignItems:'center'
                    }}>
                    <label style={{textAlign:'center'}}>Post ID</label>
                    <input type='text' 
                    style={{
                        width:'80%', height:'50px', margin:'10px', borderRadius:'10px', border:'2px solid var(--secondary-color)'
                    }} 
                    value={id}
                    onChange={(e) => {setId(e.target.value)}}/>
                </Row>

                <Button onClick={deletePost}>Delete</Button>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}

export default BlogDelete;