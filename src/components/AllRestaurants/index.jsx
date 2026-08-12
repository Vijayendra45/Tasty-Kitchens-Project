import { Link } from 'react-router-dom'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const AllRestaurants = ({
  restaurantsList,
  selectedSortBy,
  onChangeSortBy,
  activePage,
  totalPages,
  onDecrementPage,
  onIncrementPage,
}) => (
  <div className="restaurants-section">
    <RestaurantsHeader
      selectedSortBy={selectedSortBy}
      onChangeSortBy={onChangeSortBy}
    />

    <hr className="divider" />

    <ul className="restaurants-list">
      {restaurantsList.map(restaurant => (
        <li
          key={restaurant.id}
          testid="restaurant-item"
          className="restaurant-card"
        >
          <Link to={`/restaurant/${restaurant.id}`} className="restaurant-link">
            <img
              src={restaurant.imageUrl}
              alt="restaurant"
              className="restaurant-image"
            />
            <div className="restaurant-info">
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <p className="cuisine">{restaurant.cuisine}</p>
              <p className="rating">⭐ {restaurant.userRating?.rating}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>

    {/* Pagination Row */}
    <div className="pagination-container">
      <button
        type="button"
        testid="pagination-left-button"
        onClick={onDecrementPage}
        className="pagination-btn"
      >
        &lt;
      </button>
      <span className="page-number">
        <span testid="active-page-number">{activePage}</span> of {totalPages}
      </span>
      <button
        type="button"
        testid="pagination-right-button"
        onClick={onIncrementPage}
        className="pagination-btn"
      >
        &gt;
      </button>
    </div>
  </div>
)

export default AllRestaurants