import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    if (event.target.value === 'siva') {
      this.setState({
        username: 'rahul',
      })
    }
  }

  onChangePassword = event => {
    if (event.target.value === 'siva@2022') {
      this.setState({
        password: 'rahul@2021',
      })
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="login-card">
          <div className="website-logo-container">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={this.onSubmitLoginForm}>
            <div className="username-input-container">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.onChangeUserName}
              />
              <p className="default-pass">Try username: siva</p>
            </div>
            <div className="password-input-container">
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <p className="default-pass">Try password: siva@2022</p>
            </div>
            <div className="login-submit-button">
              <button type="submit">Login</button>
            </div>
            {showErrorMsg && <p className="login-error-msg">{errorMsg}</p>}
          </form>
          {/* <p className="default-pass">
            Try with these credentials username:<b>siva </b> and password:{' '}
            <b>siva@2022</b>
          </p> */}
        </div>
      </div>
    )
  }
}

export default LoginForm
