import React from 'react'
import { Link } from 'react-router-dom'
import '../components/styles/Login.css'

const Login = () => {
  return(
    <React.Fragment>
      <div className="login-first-container">
        <h2 className="login-title">Oops... You are not logged in.</h2>

          <Link className="login-button" to="/">LOGIN</Link>
      </div>
    </React.Fragment>
  )
}

export default Login