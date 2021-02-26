import React from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/RegisterForm.css';
import ReactStars from "react-rating-stars-component";
import Tabs from '../components/Tabs';

const RegisterForm = (props) =>{

  const stars = {
    size: 50,
    value: 0,
    isHalf: true,
  }

  const song = React.useRef(null);
  const songAlert = React.useRef(null);
  const image = React.useRef(null);
  const imageAlert = React.useRef(null);
  const artist = React.useRef(null);
  const artistAlert = React.useRef(null);
  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);
  const spotifyURL = React.useRef(null);
  const spotifyURLAlert = React.useRef(null);

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
    if((song.current.value).length <= 1){
      songAlert.current.style.opacity = '1';
      song.current.classList.add('wrong-input');
      return false;
    }else{
      songAlert.current.style.opacity = '0';
      song.current.classList.remove('wrong-input');
    }

    if((image.current.value).length <= 0){
      imageAlert.current.style.opacity = '1';
      image.current.classList.add('wrong-input');
      return false;
    }else{
      imageAlert.current.style.opacity = '0';
      image.current.classList.remove('wrong-input');
    }

    if((artist.current.value).length <= 0){
      artistAlert.current.style.opacity = '1';
      artist.current.classList.add('wrong-input');
      return false;
    }else{
      artistAlert.current.style.opacity = '0';
      artist.current.classList.remove('wrong-input');
    }

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

  return(
    <React.Fragment>
      <form onSubmit={(e) => {
        e.preventDefault()
        if(validation()){
          props.onSubmit()
        }
      }} className="register-form">
        <Tabs />
        <p className="input-label">Song: </p>

        <input type="text" className="swal2-input" placeholder="Name of the song..." onChange={(e) => {props.onSongChange(e.target.value);
        }} ref={song}/>

        <p className="alert-label" ref={songAlert}>Please fill out this field.</p>

        <p className="input-label">Image: </p>

        <input type="file" accept=".png, .jpg, .jpeg" className="swal2-file" placeholder="" style={{display: 'flex'
         }} onChange={(e) => {
           props.selectImage(e.target.files[0]);
          }} ref={image}/> 

          
        <p className="alert-label" ref={imageAlert}>Please select an image.</p>

        <p className="input-label">Artist: </p>

        <input type="text" className="swal2-input" placeholder="Author of the song..." onChange={(e)=> {
          props.onArtistChange(e.target.value);
        }} ref={artist}/>

        <p className="alert-label" ref={artistAlert}>Please fill out this field.</p>

        <p className="input-label">Commentary: </p>

        <input type="text" className="swal2-input" placeholder="A little review..." onChange={(e)=> {
          props.onCommentChange(e.target.value);
        }} ref={review}/>

        
        <p className="alert-label" ref={reviewAlert}>Please fill out this field.</p>

        <p className="input-label">Spotify URL: </p>

        <input type="text" className="swal2-input" placeholder="Spotify link of the song..." onChange={(e)=> {
          props.onSpotifyUrlChange(e.target.value);
        }} ref={spotifyURL}/>


        <p className="alert-label" ref={spotifyURLAlert}>Please fill out this field.</p>

        <p className="input-label">Rating: </p>

        <ReactStars {...stars} className="stars-calification" onChange={(e) => {
          props.ratingChanged(e)
        }}/>

        <button type="submit" className="submit-button">UPLOAD</button>

      </form>
    </React.Fragment>
  )
}

export default RegisterForm;