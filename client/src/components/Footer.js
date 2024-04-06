import '../components/styles/Footer.css'
import { faGithub } from '@fortawesome/fontawesome-free-brands'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import Cookies from 'js-cookie'

const handleLogOut = () => {
  Cookies.remove('spotifyAuthToken')
  window.location.href = '/'
}

const Footer = ({ token }) => {
  return (
    <React.Fragment>
      <footer>
        <div className='footer-section'>
          <p>
            Inspired by{' '}
            <a href='https://www.clairo.com/' target='_blank' rel='noreferrer'>
              Clairo
            </a>
          </p>
        </div>
        <div className='footer-section flex justify-center'>
          <a
            href='https://github.com/Jesuscc9/Reviewsic'
            target='_blank'
            rel='noreferrer'
          >
            <FontAwesomeIcon icon={faGithub} className='fa-lg' />
          </a>
        </div>
        <div className='footer-section'>
          {token && token.length && (
            <div className='logout-button-container'>
              <button
                className='logout-button'
                onClick={() => {
                  handleLogOut()
                }}
              >
                Log Out&#160;&#160;
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          )}
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer
