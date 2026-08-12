import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Oval } from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import './index.css'

const RestaurantDetails = () => {
  const { id } = useParams()
  const [restaurantData, setRestaurantData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setIsLoading(true)
      const token = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/restaurants-list/${id}`
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        const formattedData = {
          id: data.id,
          name: data.name,
          imageUrl: data.image_url,
          cuisine: data.cuisine,
          location: data.location,
          rating: data.rating,
          costForTwo: data.cost_for_two,
          foodItems: data.food_items.map(item => ({
            id: item.id,
            name: item.name,
            cost: item.cost,
            imageUrl: item.image_url,
            rating: item.rating,
          })),
        }
        setRestaurantData(formattedData)
      }
      setIsLoading(false)
    }
    getRestaurantDetails()
  }, [id])

  return (
    <div className="restaurant-details-page">
      <Header />
      {isLoading ? (
        <div testid="restaurant-details-loader" className="loader-container">
          <Oval color="gold" height={40} width={50} />
        </div>
      ) : (
        restaurantData && (
          <>
            <div className="restaurant-banner">
              <div className="banner-content">
                <img src={restaurantData.imageUrl} alt="restaurant" className="banner-image" />
                <div className="banner-info">
                  <h1 className="banner-name">{restaurantData.name}</h1>
                  <p className="banner-cuisine">{restaurantData.cuisine}</p>
                  <p className="banner-location">{restaurantData.location}</p>
                  <div className="banner-meta">
                    <div>
                      <p className="meta-value">⭐ {restaurantData.rating}</p>
                      <p className="meta-label">Rating</p>
                    </div>
                    <hr className="vertical-rule" />
                    <div>
                      <p className="meta-value">₹ {restaurantData.costForTwo}</p>
                      <p className="meta-label">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="food-items-list-container">
              {restaurantData.foodItems.map(item => (
                <FoodItems key={item.id} foodItem={item} />
              ))}
            </ul>
          </>
        )
      )}
      <Footer />
    </div>
  )
}

export default RestaurantDetails