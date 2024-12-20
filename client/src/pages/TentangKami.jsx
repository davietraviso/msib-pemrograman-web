import { Container, Row, Col } from 'react-bootstrap';

import FotoMaggot from '../assets/img/Foto Maggot.png';
import Gimi6Image from '../assets/img/gimi6.png';
import Gimi7Image from '../assets/img/gimi7.png';

import gimi1 from "../assets/img/tentangkami/gimi1.png";
import gimi2 from "../assets/img/tentangkami/gimi2.png";
import gimi3 from "../assets/img/tentangkami/gimi3.png";
import gimi4 from "../assets/img/tentangkami/gimi4.png";
import gimi5 from "../assets/img/tentangkami/gimi5.png";

import Photo1 from "../assets/img/people/fanny.png";
import Photo2 from "../assets/img/people/fakhri.png";
import Photo3 from "../assets/img/people/suci.png";
import Photo4 from "../assets/img/people/dave.png";
import Photo5 from "../assets/img/people/fifah.png";
import Photo6 from "../assets/img/people/nisa.png";

const TentangKami = () => {
  return (
    <div className="tentangkami">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container className='position-relative text-center'>
          <Row className="tentangkami-header-box d-flex align-items-center">
              <img src={FotoMaggot} alt="Background rectangle" className='w-100 bg-image' />
              <Col xs={12} md={6} className='text-center'>
              <h1 style={{color:'#303030', fontSize:'40px'}}>
                Kami Menjadi Jembatan <br /> <span>Antara <span className="thin-text" style={{color:'#828282'}}>Peternak Maggot dan</span></span> <span className="thin-text" style={{color:'#828282'}}>Penghasilan Sampah Organik</span>
              </h1>
            </Col>
            <Col xs={12} md={6} className='text-center text-md-start'>
              <h4 style={{color:'#828282', fontSize:'20px'}}>
                Kami menghubungkan peternak maggot dengan sumber sampah organik untuk memastikan pasokan yang stabil dengan cara menjual sampah organik anda kepada kami. Kami mempermudah distribusi sampah organik agar dapat diolah secara efektif dan berkelanjutan. Dengan cara ini, kami berkontribusi dalam mengurangi sampah di TPA dan mendukung budidaya maggot yang ramah lingkungan.
              </h4>
            </Col>
          </Row> 
        </Container>
      </header>

      <div className="visi-misi w-100 min-vh-100 bg-primary text-white pt-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-white">Visi Kami</h1>
              <p className="text-center">
              Menjadi solusi terdepan dalam pengolahan sampah organik di Indonesia melalui budidaya maggot (BSF larvae), memberikan manfaat bagi masyarakat, lingkungan, dan perekonomian.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="text-center fw-700 text-white">Misi Kami</h1>
              <div className="d-flex justify-content-center flex-wrap">
                <div className="tentangkami-misi-item">
                  <img src={gimi1} alt="Icon 1" />
                  <h4>Meningkatkan kesadaran masyarakat tentang pentingnya pengolahan sampah organik.</h4>
                </div>

                <div className="tentangkami-misi-item">
                  <img src={gimi2} alt="Icon 2" />
                  <h4>Mengumpulkan sampah organik dari rumah tangga dan bisnis.</h4>
                </div>

                <div className="tentangkami-misi-item">
                  <img src={gimi3} alt="Icon 3" />
                  <h4>Mengembangkan produk baru yang bernilai tambah dari hasil budidaya maggot.</h4>
                </div>

                <div className="tentangkami-misi-item">
                  <img src={gimi4} alt="Icon 4" />
                  <h4>Membangun kemitraan untuk mengembangkan solusi inovatif dalam pengelolaan sampah organik dan budidaya maggot.</h4>
                </div>

                <div className="tentangkami-misi-item">
                  <img src={gimi5} alt="Icon 5" />
                  <h4>Menjangkau lebih banyak komunitas untuk memberikan akses layanan pengelolaan sampah organik.</h4>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="tentangkami-team w-100 min-vh-100 pt-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md={6} className="text-start d-flex justify-content-start">
              <img src={Gimi7Image} alt="Teamwork" className="gambar-kiri" />
            </Col>
            <Col md={6}>
              <h1 className='text-end'>Maggo <span className="text-berinovatif">berinovatif</span> untuk mengolah sampah organik</h1>
              <h4 className="mt-3">Maggo sebagai pionir dalam dunia pengolahan sampah organik selalu bersemangat untuk menggali ide-ide baru dan teknologi terkini untuk menemukan cara-cara yang lebih efisien dan efektif dalam mengolah sampah organik melalui budidaya maggot.</h4>
            </Col>
          </Row>
          <Row className="align-items-center mb-5 tentangkami-layout">
          <Col md={6} className="text-center order-1 order-md-2">
              <img src={Gimi6Image} alt="gimi6.png" className=""/>
            </Col>
            <Col md={6} className='order-2 order-md-1'>
              <div className='mengedepankan'>
                <h1 className='text-center text-md-start'>
                  Maggo mengedepankan <span className="text-kualitas">kualitas</span>
                </h1>

              </div>
              <h4 className="mt-3 text-center text-md-start">
                Maggo tidak hanya fokus pada kuantitas, tetapi juga pada kualitas produk dan layanan yang kami berikan. Setiap produk Maggo dibuat dengan bahan-bahan berkualitas tinggi dan melalui proses produksi yang terstandarisasi.
              </h4>
            </Col>
            
          </Row>
        </Container>
      </div>

      <div className="tentangkami-person w-100 pt-5">
        <Container>
          <Row className="mb-5">
            <Col className='fw-bold'>
              <h1 style={{color:'#828282'}}>Tim yang Menginspirasi <br /> Lahirnya Ide Kreatif <span className='fw-bolder' style={{color:'#303030'}}>Maggo</span></h1>
            </Col>
          </Row>
          <Row className="tentangkami-team-images">
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo1} alt="org 1" />
              <h3>Husniyyah Luthfiany</h3>
            </Col>
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo2} alt="org 2" />
              <h3>Muhammad Fakhri R.</h3>
            </Col>
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo3} alt="org 3" />
              <h3>Suci Amalia</h3>
            </Col>
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo4} alt="org 4" />
              <h3>Dave Travis</h3>
            </Col>
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo5} alt="org 5" />
              <h3>Khofifah</h3>
            </Col>
            <Col md={4} className="tentangkami-people text-center">
              <img src={Photo6} alt="org 6" />
              <h3>Annisa</h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TentangKami;

