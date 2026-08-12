import { useState, useEffect } from 'react'
import './index.css'

const FoodItems = ({ foodItem }) => {
  const { id, name, cost, imageUrl, rating } = foodItem
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const cartData = localStorage.getItem('cartData')
    if (cartData) {
      const parsedCart = JSON.parse(cartData)
      const existingItem = parsedCart.find(item => item.id === id)
      if (existingItem) {
        setQuantity(existingItem.quantity)
      }
    }
  }, [id])

  const updateLocalStorage = newQuantity => {
    const cartData = localStorage.getItem('cartData')
    let parsedCart = cartData ? JSON.parse(cartData) : []

    if (newQuantity === 0) {
      parsedCart = parsedCart.filter(item => item.id !== id)
    } else {
      const existingItemIndex = parsedCart.findIndex(item => item.id === id)
      if (existingItemIndex > -1) {
        parsedCart[existingItemIndex].quantity = newQuantity
      } else {
        parsedCart.push({ id, name, cost, imageUrl, quantity: newQuantity })
      }
    }
    localStorage.setItem('cartData', JSON.stringify(parsedCart))
  }

  const onClickAdd = () => {
    setQuantity(1)
    updateLocalStorage(1)
  }

  const onClickIncrement = () => {
    setQuantity(prev => {
      const next = prev + 1
      updateLocalStorage(next)
      return next
    })
  }

  const onClickDecrement = () => {
    setQuantity(prev => {
      const next = prev - 1
      updateLocalStorage(next)
      return next
    })
  }

  return (
    <li testid="foodItem" className="food-item-card">
      <img src={imageUrl} alt="food item" className="food-item-image" />
      <div className="food-item-details">
        <h1 className="food-item-title">{name}</h1>
        <p className="food-item-cost">₹ {cost}</p>
        <p className="food-item-rating">⭐ {rating}</p>
        {quantity === 0 ? (
          <button type="button" className="add-button" onClick={onClickAdd}>
            Add
          </button>
        ) : (
          <div className="quantity-controller">
            <button type="button" testid="decrement-count" className="qty-btn" onClick={onClickDecrement}>-</button>
            <span testid="active-count" className="qty-text">{quantity}</span>
            <button type="button" testid="increment-count" className="qty-btn" onClick={onClickIncrement}>+</button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItems