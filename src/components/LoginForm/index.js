import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const userId = `142420`
    const pin = `231225`
    const userDetails = {userId, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {pin} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PIN
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={pin}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUserIdField = () => {
    const {userId} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          UserID
        </label>
        <input
          type="number"
          id="username"
          className="username-input-filed"
          value={userId}
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-website-logo-mobile-image"
            alt="website login"
          />
          <div className="forms">
            <h1 className="name">Welcome Back!</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <div className="input-container">
                {this.renderUserIdField()}
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>

              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
