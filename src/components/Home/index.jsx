import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import { Oval } from 'react-loader-spinner'
import { BsFilterLeft } from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import { sortByOptions } from '../../App'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Home = () => {
  const [offersList, setOffersList] = useState([])
  const [offersLoading, setOffersLoading] = useState(true)

  const [restaurantsList, setRestaurantsList] = useState([])
  const [restaurantsLoading, setRestaurantsLoading] = useState(true)

  const [selectedSortBy, setSelectedSortBy] = useState(sortByOptions[1].value) // Default Lowest
  const [activePage, setActivePage] = useState(1)
  const LIMIT = 9
  const TOTAL_PAGES = 4

  useEffect(() => {
    const getOffers = async () => {
      setOffersLoading(true)
      const token = Cookies.get('jwt_token')
      const response = await fetch('https://apis.ccbp.in/restaurants-list/offers', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        const formattedOffers = data.offers.map(each => ({
          id: each.id,
          imageUrl: each.image_url,
        }))
        setOffersList(formattedOffers)
      }
      setOffersLoading(false)
    }
    getOffers()
  }, [])

  useEffect(() => {
    const getRestaurants = async () => {
      setRestaurantsLoading(true)
      const token = Cookies.get('jwt_token')
      const offset = (activePage - 1) * LIMIT
      const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}`

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        const formattedRestaurants = data.restaurants.map(each => ({
          id: each.id,
          name: each.name,
          imageUrl: each.image_url,
          userRating: each.user_rating,
          cuisine: each.cuisine,
        }))
        setRestaurantsList(formattedRestaurants)
      }
      setRestaurantsLoading(false)
    }
    getRestaurants()
  }, [activePage, selectedSortBy])

  const renderLoader = testId => (
    <div testid={testId} className="loader-container">
      <Oval color="gold" height={40} width={50} />
    </div>
  )

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <div className="home-container">
      <Header activeTab="HOME" />

      {offersLoading ? (
        renderLoader('restaurants-offers-loader')
      ) : (
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {offersList.map(offer => (
              <div key={offer.id}>
                <img src={offer.imageUrl} alt="offer" className="offer-image" />
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="restaurants-section">
        <div className="sort-header">
          <div>
            <h1 className="section-title">Popular Restaurants</h1>
            <p className="section-subtitle">
              Select Your Favourite Restaurant Number of Choice
            </p>
          </div>
          <div className="sort-by-container">
            <BsFilterLeft className="filter-icon" />
            <span className="sort-by-text">Sort By</span>
            <select
              value={selectedSortBy}
              onChange={e => setSelectedSortBy(e.target.value)}
              className="sort-select"
            >
              {sortByOptions.map(option => (
                <option key={option.id} value={option.value}>
                  {option.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr className="divider" />

        {restaurantsLoading ? (
          renderLoader('restaurants-list-loader')
        ) : (
          <ul className="restaurants-list">
            {restaurantsList.map(restaurant => (
              <li key={restaurant.id} testid="restaurant-item" className="restaurant-card">
                <Link to={`/restaurant/${restaurant.id}`} className="restaurant-link">
                  <img src={restaurant.imageUrl} alt="restaurant" className="restaurant-image" />
                  <div className="restaurant-info">
                    <h2 className="restaurant-name">{restaurant.name}</h2>
                    <p className="cuisine">{restaurant.cuisine}</p>
                    <p className="rating">⭐ {restaurant.userRating?.rating}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="pagination-container">
          <button
            type="button"
            testid="pagination-left-button"
            onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
            className="pagination-btn"
          >
            &lt;
          </button>
          <span className="page-number">
            <span testid="active-page-number">{activePage}</span> of {TOTAL_PAGES}
          </span>
          <button
            type="button"
            testid="pagination-right-button"
            onClick={() => setActivePage(prev => Math.min(prev + 1, TOTAL_PAGES))}
            className="pagination-btn"
          >
            &gt;
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home