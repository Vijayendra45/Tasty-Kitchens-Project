import { FaPinterestSquare, FaInstagram, FaTwitter, FaFacebookSquare } from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dgikp3wey/image/upload/v1786501870/Frame_275_mkndmf.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-title">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare testid="pintrest-social-icon" className="social-icon" />
      <FaInstagram testid="instagram-social-icon" className="social-icon" />
      <FaTwitter testid="twitter-social-icon" className="social-icon" />
      <FaFacebookSquare testid="facebook-social-icon" className="social-icon" />
    </div>
  </footer>
)

export default Footer