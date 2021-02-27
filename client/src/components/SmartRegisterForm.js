import React, { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/RegisterForm.css';
import '../components/styles/SmartRegisterForm.css';
import ReactStars from "react-rating-stars-component";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import Cookies from "js-cookie";

const SmartRegisterForm = (props) =>{

  const [token, setToken] = useState("");

  const stars = {
    size: 50,
    value: 0,
    isHalf: true,
  }

  useEffect(() => {
    setToken(Cookies.get("spotifyAuthToken"))
  })

  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);
  const spotifyURL = React.useRef(null);
  const spotifyURLAlert = React.useRef(null);

  const spotifyInputStatus = {
    check: React.useRef(null),
    loader: React.useRef(null),
    container: React.useRef(null),
    loading: function(){
      spotifyURL.current.style.width = '85%'
      this.loader.current.style.display = 'block'
      this.container.current.style.display = 'block'
      this.check.current.style.display = 'none'
      setTimeout(() => {
        this.loader.current.style.opacity = '1'
      }, 700)
    },
    sucess: function(){
      this.loader.current.style.opacity = '0'
      let spotifyInputAux = spotifyURL.current
      this.check.current.style.display = 'none'

      setTimeout(() => {
        console.log(this.check)
        this.loader.current.style.display = 'none'
        this.check.current.style.display = 'block'
        setTimeout(()=>{
          this.check.current.style.opacity = '1'
          setTimeout(() => {
            this.check.current.style.opacity = '0'
            this.container.current.style.display = 'none'
            spotifyInputAux.style.width = '100%'
          }, 1300)
        }, 100)
      }, 500)
    },
    error: function(){
      this.loader.current.style.opacity = '0'
      let spotifyInputAux = spotifyURL.current
      let spotifyAlertAux = spotifyURLAlert.current
      this.check.current.style.display = 'none'

      setTimeout(() => {
        console.log(this.check)
        this.loader.current.style.display = 'none'
        this.check.current.style.display = 'block'

        spotifyAlertAux.textContent = 'Please, enter a valid URL!'
        spotifyAlertAux.style.opacity = '1'
        spotifyInputAux.classList.add('wrong-input')

          setTimeout(() => {
            this.check.current.style.opacity = '0'
            this.container.current.style.display = 'none'
            spotifyInputAux.style.width = '100%'
          }, 800)
      }, 500)
    }
  }

  const validateUrl = (spotifyUrl) =>{

    const url = document.createElement('a');
    url.href = spotifyUrl;

    if(url.protocol != 'https:'){
      return false
    }
    
    if(url.hostname != 'open.spotify.com'){
      return false
    }
    
    if(!(url.pathname).includes('/track/')){
      return false
    }
  
    return true;
  }

  function validation(){
    
    if((review.current.value).length <= 0){
      reviewAlert.current.style.opacity = '1';
      review.current.classList.add('wrong-input');
      reviewAlert.current.textContent = 'Please fill out this field.';
      return false;
    }else{
      review.current.classList.remove('wrong-input');
      reviewAlert.current.style.opacity = '0';
    }

    if((review.current.value).length <= 10){
      reviewAlert.current.style.opacity = '1';
      reviewAlert.current.textContent = 'Please, make a longer comment!';
      review.current.classList.add('wrong-input');
      return false;
    }else{
      review.current.classList.remove('wrong-input');
      reviewAlert.current.style.opacity = '0';
    }

    if((review.current.value).length >= 85){
      reviewAlert.current.textContent = 'Please, make a smaller comment!';
      reviewAlert.current.style.opacity = '1';
      review.current.classList.add('wrong-input');
      return false;
    }else{
      reviewAlert.current.style.opacity = '0';
      review.current.classList.remove('wrong-input');
    }

    if(!validateUrl(spotifyURL.current.value)){
      spotifyURLAlert.current.textContent = 'Please, enter a valid URL!'
      spotifyURLAlert.current.style.opacity = '1'
      spotifyURL.current.classList.add('wrong-input')
      return false
    }else{
      spotifyURLAlert.current.style.opacity = '0'
      spotifyURL.current.classList.remove('wrong-input')
    }

    return true;
  }

  const handleChange = (e) => {

    spotifyURLAlert.current.style.opacity = '0'
    spotifyURL.current.classList.remove('wrong-input')

      setTimeout(async () => {
        if(validateUrl(spotifyURL.current.value)){
          const track_id = e.slice(31, 53)

          const config = {
            headers: {
              'Authorization': 'Bearer ' + token
           }
          }

          try{
            const data = await Axios.get(`https://api.spotify.com/v1/tracks/${track_id}`, config)
            spotifyInputStatus.sucess()
          } catch(err){
            console.log('Hubo un error')
            console.log(err)
            spotifyInputStatus.error()
          }

        }else{
          spotifyInputStatus.error()
          console.log('EL URl no es valido')
        }
      }, 1500) 
    
  }

  return(
    <React.Fragment>
      <form onSubmit={(e) => {
        e.preventDefault()
        if(validation()){
          props.onSubmit()
        }
      }} className="register-form">


        <p className="input-label">Spotify URL: </p>

        <div className="spotify-link-container">
          <input type="text" className="swal2-input spotify-link-input" placeholder="Spotify link of the song..." onChange={(e)=> {
            spotifyInputStatus.loading()
            handleChange(e.target.value)
            props.onSpotifyUrlChange(e.target.value);
          }} ref={spotifyURL}/>

          <div className="spotify-link-status" ref={spotifyInputStatus.container}>
            <div ref={spotifyInputStatus.check} className="check-icon">
              <FontAwesomeIcon icon={faCheck}/>
            </div>

            <div class="lds-ring" ref={spotifyInputStatus.loader}><div></div><div></div><div></div><div></div></div>
          </div>
        </div>


        <p className="alert-label" ref={spotifyURLAlert}>Please fill out this field.</p>

        <p className="input-label">Review: </p>

        <input type="text" className="swal2-input" placeholder="A little commentary..." onChange={(e)=> {
          props.onCommentChange(e.target.value);
        }} ref={review}/>

        
        <p className="alert-label" ref={reviewAlert}>Please fill out this field.</p>

        <p className="input-label">Rating: </p>

        <ReactStars {...stars} className="stars-calification" onChange={(e) => {
          props.ratingChanged(e)
        }}/>

        <button type="submit" className="submit-button">UPLOAD</button>

      </form>
    </React.Fragment>
  )
}

export default SmartRegisterForm;