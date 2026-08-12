import { BsFilterLeft } from 'react-icons/bs'
import { sortByOptions } from '../../App'
import './index.css'

const RestaurantsHeader = ({ selectedSortBy, onChangeSortBy }) => (
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
        onChange={e => onChangeSortBy(e.target.value)}
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
)

export default RestaurantsHeader