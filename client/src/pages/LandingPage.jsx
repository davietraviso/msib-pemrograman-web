import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useRef } from "react";
import MainImage from '../assets/img/hero_page1.png'
import gimi1 from '../assets/img/landingpage/gimi_1.png'
import mengapa1 from '../assets/img/landingpage/mengapa_1.png'
import mengapa2 from '../assets/img/landingpage/mengapa_2.png'
import yuk from '../assets/img/landingpage/yuk.png'
import trash from '../assets/img/landingpage/trash.png'
import money from '../assets/img/landingpage/money-change.png'
import quote from '../assets/img/landingpage/quote-up.png'
import quote1 from '../assets/img/landingpage/quote1.png'
import quote2 from '../assets/img/landingpage/quote2.png'
import gimi2 from '../assets/img/landingpage/gimi_testimoni.png'
import { SDG } from '../components/SDG'
import { useNavigate } from "react-router-dom";
import sosmed from '../assets/img/sosmed.png'
 



const LandingPage = () => {

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/penjemputan"); 
    };

    const toggleForm = () => {
        navigate("/PusatBantuan");
    };

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const count1Ref = useRef();
    const count2Ref = useRef();

    const targetCount1 = 300;
    const targetCount2 = 45;
    const duration = 2000; // 2 seconds

    useEffect(() => {
        const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            if (entry.target === count1Ref.current) startCounter(setCount1, targetCount1);
            if (entry.target === count2Ref.current) startCounter(setCount2, targetCount2);
            } else {
            if (entry.target === count1Ref.current) setCount1(0);
            if (entry.target === count2Ref.current) setCount2(0);
            }
        });
        };

        const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });

        if (count1Ref.current) observer.observe(count1Ref.current);
        if (count2Ref.current) observer.observe(count2Ref.current);

        return () => {
        if (count1Ref.current) observer.unobserve(count1Ref.current);
        if (count2Ref.current) observer.unobserve(count2Ref.current);
        };
    }, []);

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const startCounter = (setCounter, target) => {
        let start = 0;
        const startTime = Date.now();

        const counter = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress); // Apply easing
        const currentValue = Math.ceil(easedProgress * target);

        setCounter(currentValue);

        if (progress === 1) {
            clearInterval(counter);
        }
        }, 16); // Approximately 60fps
    }; 

      
  return (
    <>
        <Container fluid="md" className="cont_main d-flex justify-content-center align-items-center min-vh-100">
            <div className="landingpage">
                <header className="w-100 min-vh-100 d-flex align-items-center">
                    <Container className='landingpage-container'>
                        <Row className='header-box d-flex align-items-center'>
                            <Col lg="6">
                                
                                <img src={sosmed} style={{width: '128px', height:'auto', paddingBottom:'24px'}} alt="" />
                                <h1 className='mb-4' >
                                    Bersama <span>Maggo</span> <br /> Ubah Sampahmu <br />Jadi <span className='cuan'>CUAN!</span>
                                </h1>
                                <p className='mb-4' >
                                    Solusi Menguntungkan dan <br />Mudah Membangun Kebiasaan Membuang sampah
                                </p>
                                <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleNavigation}> 
                                    <p>
                                        Jemput Sampahku
                                    </p>
                                </button>
                            </Col>
                            <Col lg="6" className='text-end pt-lg-0 pt-5' >
                                <img src={MainImage} alt="foto-gimi" />
                            </Col>
                        </Row>
                    </Container>
                </header>
                {/* Here lies Ton */}
                {/* Here lies penjelasan */}
                {/* Here lies Yuk */}
                {/* Here lies benefit */}
                {/* Here lies testimoni */}
                
            </div>
        </Container>
                <div className="scrolling-text"> 
                    <h1>UBAH SAMPAH JADI CUAN! ✷ UBAH SAMPAH JADI CUAN! ✷ UBAH SAMPAH JADI CUAN! ✷ UBAH SAMPAH JADI CUAN! ✷ UBAH SAMPAH JADI CUAN! ✷ UBAH SAMPAH JADI CUAN! ✷ </h1>
                </div>

        
        
        <section className='cont_main'>
            <div className="hitungan w-100 h-100">
                <Container fluid="md" className="hitungan-cont d-flex justify-content-center align-items-center mb-4 "> 
                    <div className="hitungan-container">
                        <div className='box-1'>
                            <div className='box-2 box-2-2'>
                                <h1 ref={count1Ref}>{count1}+</h1>
                                <p>
                                    Kontributor
                                </p>
                            </div>
                        </div>
                        <div className='box-1'>
                            <div className='box-2'>
                                <h1 ref={count2Ref}>{count2} Ton</h1>
                                <p>
                                    Total Sampah
                                </p>
                            </div>
                        </div>
                        <div className="hitungan-text">
                            <p>
                                “Dipercaya oleh banyak orang di Indonesia <br />dengan kontribusi terbanyak dari peternak <br /> maggot terbaik”
                            </p>
                        </div>
                        <div className="gimi_1">
                            <img src={gimi1} alt="gambar_gimi" />
                        </div>
                    </div>
                </Container>
            </div>
        </section>

        
        <section className='cont_main'>
            <div className="penjelasan w-100 min-vh-100 ">
                <Container className='penjelasan_container'>
                    <div className="penjelasan_wrap">
                        <div className="penjelasan_title">
                            <div className="line_1"></div>
                            Pilih Maggo!
                        </div>
                        <div className="penjelasan_big">
                            <h1>
                                Mengapa Maggo Berbeda?
                            </h1>
                        </div>
                        <div className="penjelasan_sub">
                            <p>
                                Kami menyediakan cara mudah dan berkelanjutan untuk mengubah limbah organik <br />menjadi keuntungan, dengan menghubungkan Anda langsung kepada peternak maggot.
                            </p>
                        </div>
                        <div className="penjelasan_gambar">
                            <img src={mengapa1} alt="" />
                            <img src={mengapa2} alt="" />
                        </div>
                    </div>
                </Container>
            </div>
            
        </section>

        <section>
            <div className="yuk">
                <Container className='yuk_container'>
                    <div className="yuk_wrap">
                        <Row className='d-flex align-items-center' style={{width:'100%'}}>
                            <Col className="d-flex align-items-center justify-content-center">
                                <div className="yuk_text  ">
                                    <h1>
                                        Yuk Kenal Lebih Dekat!
                                    </h1>
                                    <p>
                                        Platform kami menghubungkan masyrakat, petani, dan peternak maggot untuk pengelolaan sampah organik yang efisien serta memberikan imbalan atas pengumpulan sampah. Selain itu, kami menyediakan marketplace untuk produk berbasis maggot dan ruang tanya serta blog kepada pengguna seputar maggo.
                                    </p>
                                </div>
                            
                            </Col>
                            <Col>
                                <div className="yuk_gambar" style={{width:'100%'}}>
                                    <img src={yuk} alt=""  style={{width:'100%'}}/>
                                </div>                            
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </section>

        <section>
            <div className="benefit">
                <Container className='benefit_container'>
                    <div className="benefit_wrap">
                        <div className="benefit_title">
                            <div className="line_1"></div>
                            Benefit Maggo!
                        </div>
                        <div className="benefit_big">
                            <h1>
                                Jasa Apa Yang Kami Tawarkan?
                            </h1>
                        </div>
                        <div className="benefit_sub">
                            <p>
                            Kami menyediakan layanan pengumpulan limbah organik dan marketplace untuk produk maggot, memberikan nilai tambah baik dari limbah maupun produk yang dihasilkan.
                            </p>
                        </div>
                        <div className="benefit_jasa">
                            <div className="jasa_box">
                                <div className="jasa_box_wrap">
                                    <img src={trash} alt="" className='jasa_trash'/>
                                    <Row className='jasa_box_detail d-flex align-items-center'>
                                        <Col className='jasa_col'>
                                            <h1 className='mb-10' >
                                                Jual Sampah
                                            </h1>
                                            <p className='mb-10' >
                                                Hubungi kami dan petugas akan tiba dirumahmu segera
                                            </p>
                                            <button className="btn btn_lihat btn-primary d-flex align-items-center justify-content-center"> 
                                                <p style={{color:'#fff'}}>
                                                    Lihat Lebih Lanjut
                                                </p>
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="jasa_box">
                                <div className="jasa_box_wrap">
                                    <img src={money} alt="" className='jasa_trash'/>
                                    <Row className='jasa_box_detail d-flex align-items-center'>
                                        <Col className='jasa_col'>
                                            <h1 className='mb-10' >
                                                Beli Produk
                                            </h1>
                                            <p className='mb-10' >
                                                Pilih berbagai produk Maggot yang dibutuhkan hanya dalam satu platform
                                            </p>
                                            <button className="btn btn_lihat btn-primary d-flex align-items-center justify-content-center"> 
                                                <p style={{color:'#fff'}}>
                                                    Lihat Lebih Lanjut
                                                </p>
                                            </button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
        
        <section>
            <div className="testimoni">
                <Container className='testimoni_container'>
                    <div className="testimoni_wrap">
                        
                        <div className="testimoni_title">
                            <div className="line_2"></div>
                            Testimoni Maggo!
                        </div>
                        <div className="testimoni_big">
                            <h1>
                                Apa Kata Mereka?
                            </h1>
                        </div>
                        <div className="quote_wrap">
                            <Row>
                                <Col>
                                    <div className="quote_box">
                                        <div className="quote_box_wrap">
                                            <img src={quote} alt="" className='quote_icon'/>
                                            <p className='quote_box_p'> "Sejak menggunakan Maggo, pengelolaan sampah rumah tangga kami jadi lebih mudah. 
                                                Tidak hanya membantu lingkungan, kami juga merasa senang karena limbah yang 
                                                dihasilkan keluarga bisa dimanfaatkan untuk sesuatu yang bermanfaat."</p>
                                            <div className="quote_nama">    
                                                <img src={quote1} alt="" />
                                                <div className="quote_nama_wrap">
                                                    <h4>Mariana Hartanti</h4>
                                                    <p>Ibu Rumah Tangga</p>
                                                </div>
                                            </div>
                                        </div>     
                                    </div>
                                </Col>
                                <Col>
                                    <div className="quote_box">
                                        <div className="quote_box_wrap">
                                            <img src={quote} alt="" className='quote_icon'/>
                                            <p className='quote_box_p'> "Saya tidak lagi kesulitan mendapatkan limbah organik berkualitas untuk budidaya maggot. 
                                                Maggo memastikan pasokan limbah saya selalu terjaga, sehingga bisnis saya semakin berkembang."</p>
                                            <div className="quote_nama">    
                                                <img src={quote2} alt="" />
                                                <div className="quote_nama_wrap">
                                                    <h4>Budi Gunawan</h4>
                                                    <p>Peternak Maggot</p>
                                                </div>
                                            </div>
                                        </div>   
                                    </div>
                                
                                </Col>
                                <Col>
                                    <img src={gimi2} alt="gimi_testimoni" className='testimoni_img' />
                                
                                </Col>
                            </Row>
                            

                        </div>
                    </div>
                </Container>
            </div>

        </section>
        <section>
            <Container className="d-flex align-content-center justify-content-center">
                <SDG />
            </Container>
        </section>
    </>
    
  )
}

export default LandingPage