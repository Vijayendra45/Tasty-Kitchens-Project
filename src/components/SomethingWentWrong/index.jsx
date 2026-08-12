import './index.css'

const SomethingWentWrong = ({ retryFunction }) => (
  <div className="error-view-container">
    <img
      src="https://res.cloudinary.com/dyt32ms4f/image/upload/v1633502820/erroring_1_et7cbq.png"
      alt="something went wrong"
      className="error-image"
    />
    <h1 className="error-heading">Something Went Wrong</h1>
    <p className="error-text">
      We are having some trouble processing your request. Please try again.
    </p>
    {retryFunction && (
      <button type="button" className="retry-btn" onClick={retryFunction}>
        Retry
      </button>
    )}
  </div>
)

export default SomethingWentWrong