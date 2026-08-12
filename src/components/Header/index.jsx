import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = ({ activeTab }) => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo-link">
          <img
            src="https://res.cloudinary.com/dyt32ms4f/image/upload/v1633502844/Group_7420_lsy1ms.png"
            alt="website logo"
            className="navbar-logo"
          />
          <span className="navbar-title">Tasty Kitchens</span>
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-link ${activeTab === 'HOME' ? 'active-tab' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className={`nav-link ${activeTab === 'CART' ? 'active-tab' : ''}`}>
              Cart
            </Link>
          </li>
          <li>
            <button type="button" className="logout-button" onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header