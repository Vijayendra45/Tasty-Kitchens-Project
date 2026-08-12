import { useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'
import './index.css'

const Cart = () => {
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem('cartData')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])

  const onIncrementQuantity = id => {
    setCartList(prevList =>
      prevList.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const onDecrementQuantity = id => {
    setCartList(prevList =>
      prevList
        .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    )
  }

  const totalAmount = cartList.reduce((acc, item) => acc + item.cost * item.quantity, 0)

  if (cartList.length === 0) {
    return <CartEmpty />
  }

  return (
    <div className="cart-page-container">
      <Header activeTab="CART" />
      <div className="cart-content">
        <ul className="cart-list">
          {cartList.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h1 className="cart-item-title">{item.name}</h1>
                <div className="quantity-controls">
                  <button type="button" onClick={() => onDecrementQuantity(item.id)} className="quantity-btn">-</button>
                  <span className="quantity-text">{item.quantity}</span>
                  <button type="button" onClick={() => onIncrementQuantity(item.id)} className="quantity-btn">+</button>
                </div>
                <p className="cart-item-price">₹ {item.cost * item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <hr className="divider" />
        <div className="order-summary">
          <h1 className="order-total-label">Order Total:</h1>
          <p className="order-total-amount">₹ {totalAmount}</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart