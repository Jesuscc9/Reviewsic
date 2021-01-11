import React,{ useEffect } from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/UpdateForm.css';
import ReactStars from "react-rating-stars-component";
import { protocol } from 'socket.io-client';

const UpdateForm = (props) =>{

  const data = props.data;

  useEffect(() => {
    props.setSong(data.songName)
    props.setNewImage(data.image)
    props.setArtist(data.artist)
    props.setUpdateId(data.id)
  })

  const stars = {
    size: 50,
    value: data.calification,
    isHalf: true,
  }


  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);
  const spotifyURL = React.useRef(null);
  const spotifyURLAlert = React.useRef(null);

  const validateUrl = (spotifyUrl) =>{

    const url = document.createElement('a');
    url.href = spotifyUrl;

    if(url.protocol != 'https:'){
      console.log('es falso')
      return false
      
    }
    
    if(url.hostname != 'open.spotify.com'){
      console.log('es falso')
      return false
    }
    
    if(!(url.pathname).includes('/track/')){
      console.log('es falso')
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

    return true
  }

  return(
    <React.Fragment>
      <form onSubmit={(e) => {
        e.preventDefault()
        if(validation()){
          props.onSubmit()
        }
      }} className="register-form">

        <p className="input-label">Song: </p>

        <input type="text" className="swal2-input input-disabled" placeholder="Name of the song..." onChange={(e) => {props.onSongChange(e.target.value);
        }} value={data.songName} disabled/>

        <p className="alert-label">Please fill out this field.</p>

        <p className="input-label">Artist: </p>

        <input type="text" className="swal2-input input-disabled" placeholder="Author of the song..." value={data.artist} disabled/>

        <p className="alert-label">Please fill out this field.</p>

        <p className="input-label">Commentary: </p>

        <input type="text" className="swal2-input" placeholder={data.songReview} onChange={(e)=> {
          props.onCommentChange(e.target.value);
        }} ref={review}/>

        
        <p className="alert-label" ref={reviewAlert}>Please fill out this field.</p>

        <p className="input-label">Spotify URL: </p>

        <input type="text" className="swal2-input" placeholder={data.spotifyUrl} onChange={(e)=> {
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

export default UpdateForm;