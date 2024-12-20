const LandingPage = () => {

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/penjemputan"); 
    };
      
  return (
    <>
    
        <Container fluid="md" className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="landingpage">
                <header className="w-100 min-vh-100 d-flex align-items-center">
                    <Container className='landingpage-container'>
                        <Row className='header-box d-flex align-items-center'>
                            <Col lg="6">
                                <h1 className='mb-4' >
                                    Bersama <span>Maggo</span> <br /> Ubah Sampahmu <br />Jadi <span className='cuan'>CUAN!</span>
                                </h1>
                                <p className='mb-4' >
                                    Solusi Menguntungkan dan <br />Mudah Membangun Kebiasaan Memuang sampah
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

        <section>
            <div className="hitungan w-100 h-100">
                    <Container className='hitungan-cont'>
                        <div className="hitungan-container">
                            <div className='box-1'>
                                <div className='box-2 box-2-2'>
                                    <h1>
                                        300+
                                    </h1>
                                    <p>
                                        Kontributor
                                    </p>
                                </div>
                            </div>
                            <div className='box-1'>
                                <div className='box-2'>
                                    <h1>
                                        45 Ton
                                    </h1>
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

        <section>
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
            <div className="yuk">
                <Container className='yuk_container'>
                    <div className="yuk_wrap">
                        <div className="yuk_text">
                            <h1>
                                Yuk Kenal Lebih Dekat!
                            </h1>
                            <p>
                                Platform kami menghubungkan masyrakat, petani, dan peternak maggot untuk pengelolaan sampah organik yang efisien serta memberikan imbalan atas pengumpulan sampah. Selain itu, kami menyediakan marketplace untuk produk berbasis maggot dan ruang tanya serta blog kepada pengguna seputar maggo.
                            </p>
                        </div>
                        <div className="yuk_gambar">
                            <img src={yuk} alt="" />
                        </div>
                    </div>
                </Container>
            </div>
        <section>

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
                                                <p>
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
                                                <p>
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
                        </div>
                        <img src={gimi2} alt="gimi_testimoni" className='testimoni_img' />
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
