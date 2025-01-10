import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const BlogUpdate = () => {
  // State untuk ID Blog
  const [blogId, setBlogId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    post_text: "",
    username: "",
  });
  const [isBlogFound, setIsBlogFound] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch data blog berdasarkan ID
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`http://localhost:5174/api/getFromId/${blogId}`);
      const data = response.data[0];
      setFormData({
        title: data.title || "",
        subTitle: data.sub_title || "",
        post_text: data.post_text || "",
        username: data.username || "",
      });
      setIsBlogFound(true); // Tandai bahwa blog ditemukan
    } catch (error) {
      console.error("Error fetching blog data:", error);
      alert("Blog dengan ID tersebut tidak ditemukan.");
      setIsBlogFound(false);
    }
  };

  // Handle submit form untuk update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5174/api/update/${blogId}`, formData);
      alert("Blog berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Gagal memperbarui blog.");
    }
  };

  return (
    <Container className="mt-5" style={{paddingTop:'150px'}}>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Update Blog</h2>
          
          {/* Input ID Blog */}
          <Form.Group className="mb-3" controlId="formBlogId">
            <Form.Label>Masukkan ID Blog</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan ID blog untuk di-update"
              value={blogId}
              onChange={(e) => setBlogId(e.target.value)}
              required
            />
            <Button
              variant="primary"
              className="mt-2 w-100"
              onClick={fetchBlogData}
            >
              Cari Blog
            </Button>
          </Form.Group>

          {/* Form untuk update blog (muncul jika ID ditemukan) */}
          {isBlogFound && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Judul Blog</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Masukkan judul blog"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubTitle">
                <Form.Label>Sub Judul</Form.Label>
                <Form.Control
                  type="text"
                  name="subTitle"
                  placeholder="Masukkan sub judul"
                  value={formData.subTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Isi Blog</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="post_text"
                  placeholder="Tulis konten blog di sini"
                  value={formData.post_text}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nama Penulis</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Masukkan nama penulis"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Update Blog
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogUpdate;
