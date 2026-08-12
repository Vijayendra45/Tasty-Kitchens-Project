import { Link } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const CartEmpty = () => (
  <div className="cart-empty-page">
    <Header activeTab="CART" />
    <div className="cart-empty-container">
      <img
        src="https://res.cloudinary.com/dyt32ms4f/image/upload/v1633502824/cooking_1_vj2tyq.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-text">Your cart is empty. Add something from the menu.</p>
      <Link to="/">
        <button type="button" className="shop-now-btn">Order Now</button>
      </Link>
    </div>
  </div>
)

export default CartEmpty