import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

export const sortByOptions = [
  { id: '0', displayText: 'Highest', value: 'Highest' },
  { id: '1', displayText: 'Lowest', value: 'Lowest' },
]

function App() {
  const [cartList, setCartList] = useState(() => {
    const savedCart = localStorage.getItem('cartData')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }, [cartList])

  const addCartItem = foodItem => {
    setCartList(prevList => {
      const itemExists = prevList.find(each => each.id === foodItem.id)
      if (itemExists) {
        return prevList.map(each =>
          each.id === foodItem.id ? { ...each, quantity: each.quantity + 1 } : each
        )
      }
      return [...prevList, { ...foodItem, quantity: 1 }]
    })
  }

  const incrementCartItemQuantity = id => {
    setCartList(prevList =>
      prevList.map(each =>
        each.id === id ? { ...each, quantity: each.quantity + 1 } : each
      )
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prevList =>
      prevList
        .map(each =>
          each.id === id ? { ...each, quantity: each.quantity - 1 } : each
        )
        .filter(each => each.quantity > 0)
    )
  }

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/restaurant/:id',
      element: (
        <ProtectedRoute>
          <RestaurantDetails
            addCartItem={addCartItem}
            cartList={cartList}
            incrementQuantity={incrementCartItemQuantity}
            decrementQuantity={decrementCartItemQuantity}
          />
        </ProtectedRoute>
      ),
    },
    {
      path: '/cart',
      element: (
        <ProtectedRoute>
          <Cart
            cartList={cartList}
            incrementQuantity={incrementCartItemQuantity}
            decrementQuantity={decrementCartItemQuantity}
          />
        </ProtectedRoute>
      ),
    },
    {
      path: '/not-found',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <Navigate to="/not-found" replace />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App