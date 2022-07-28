import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="responsive-container">
          <h1 className="head">Your Flexibility,Our Excellence</h1>
          <div className="card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Home