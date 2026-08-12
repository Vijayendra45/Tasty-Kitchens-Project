import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    navigate('/', { replace: true })
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-form-container">
      <div className="login-card">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dgikp3wey/image/upload/v1786500211/Frame_274_ynikj6.png"
            alt="website logo"
            className="login-logo"
          />
          <h1 className="login-title">Tasty Kitchens</h1>
        </div>
        <form className="form-container" onSubmit={submitForm}>
          <h2 className="login-heading">Login</h2>
          <div className="input-container">
            <label className="input-label" htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
      <div className="login-landing-image-container">
        <img
           src="https://res.cloudinary.com/dgikp3wey/image/upload/v1786500213/Rectangle_1456_laleew.png"
          alt="website login"
          className="login-landing-img"
        />
      </div>
    </div>
  )
}

export default LoginForm