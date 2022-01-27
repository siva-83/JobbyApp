import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-logo-container">
        <Link to="/">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="header-logo-container-img"
          />
        </Link>
      </div>
      <div className="header-list-items">
        <ul className="header-unordered-list">
          <div className="name-container-kk">
            <Link to="/" className="link">
              <li className="header-unordered-list-item">Home</li>
            </Link>
            <Link to="/jobs" className="link">
              <li className="header-unordered-list-item">Jobs</li>
            </Link>
          </div>
          <li className="header-logout-button-container">
            <button type="button" onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
