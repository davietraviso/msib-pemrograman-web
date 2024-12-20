import logo from '../assets/img/logo_white.png'
import panah from '../assets/img/footer/arrow.png'
import main from "../assets/img/footer/phone.png";
import ig from "../assets/img/footer/instagram.png";
import email from "../assets/img/footer/mail.png";

const FooterComponents = () => {
  return (
    <div>
      <footer className="text-center text-lg-start pt-4">
       
        <div className="container p-4">
         
          <div className="row">
         
            <div className="footer_text col-lg-3 col-md-6 mb-4 mb-lg-0">
              <img src={logo} alt="" />

              <ul className="text-white list-unstyled mt-4 mb-4">
                <li>
                  <p>Jl. Pattimura, Sumatera Selatan, Palembang</p>
                </li>
                <li>
                  <img src={main} alt="" />
                  <img src={ig} alt="" className='pt-20' />
                  <img src={email} alt="" />
                </li>

              </ul>
            </div>
         

         
            <div className="footer_text col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-white mb-4">Product</h5>

              <ul className="list-unstyled">
                <li>
                  <p className="text-white">Larva BSF Kering</p>
                </li>
                <li>
                  <p className="text-white">Protein BSF Larva</p>
                </li>
                <li>
                  <p className="text-white">BSF Larva Hidup</p>
                </li>
                <li>
                  <p className="text-white">Pupuk BSF</p>
                </li>
              </ul>
            </div>
         

         
            <div className="footer_text col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-white mb-4">Services</h5>

              <ul className="list-unstyled">
                <li>
                  <p className="text-white">Jual Sampah</p>
                </li>
                <li>
                  <p className="text-white">Beli Produk</p>
                </li>
              </ul>
            </div>
         

         
            <div className="footer_text col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-white mb-4 text-bold">Newsletter</h5>

              <p className="text-white">Kirimkan pesan dan dukungan</p>
              
              <div className="input-group w-51">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Masukkan Email.." 
                  aria-label="Email" 
                  aria-describedby="button-addon2" 
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button" 
                  id="button-addon2"
                  style={{ backgroundColor: 'white', border: 'none' }}
                >
                  <img src={panah} alt="Send Icon" style={{ width: '24px', height: '24px' }} />
                </button>
              </div>
            </div>
          </div>
         
        </div>
       

        
        
      </footer>
    </div>
  )
}

export default FooterComponents