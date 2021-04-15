import Reat from "react";
import "../components/styles/Footer.css";
import { faGithub } from "@fortawesome/fontawesome-free-brands";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Cookies from 'js-cookie';

const handleLogOut = () => {
  Cookies.remove('spotifyAuthToken')
  window.location.href = '/'
}


const Footer = (props) => {

  return (
    <Reat.Fragment>
      <footer>
        <div className="footer-section">
          <p>Inspired by <a href="https://www.clairo.com/" target="_blank">Clairo</a></p>
        </div>
        <div className="footer-section flex justify-center">
          <a href="https://github.com/Jesuscc9/Reviewsic" target="_blank">
            <FontAwesomeIcon icon={faGithub} className="fa-lg"/>
          </a>
        </div>
        <div className="footer-section">
          {props.token ? 
          <div className="logout-button-container">
            <button 
              className="logout-button" 
              onClick={() => {
                handleLogOut()
              }}>
              Log Out&#160;&#160;
              <FontAwesomeIcon icon={faSignOutAlt}/>
              
            </button>
          </div> : <div />}
        </div>
      </footer>
    </Reat.Fragment>
  );
};

export default Footer;
