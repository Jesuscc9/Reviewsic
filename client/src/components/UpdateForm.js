import React,{ useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/UpdateForm.css';
import ReactStars from "react-rating-stars-component";

const UpdateForm = (props) =>{

  const data = props.data;
  
  const [reviewState, setReviewState] = useState(data.songReview)
  const [spotifyUrlState, setSpotifyUrlState] = useState(data.spotifyUrl)
  
  useEffect(() => {
    props.onCommentChange(reviewState)
    props.onSpotifyUrlChange(spotifyUrlState)
    props.setSong(data.songName)
    props.setNewImage(data.image)
    props.setArtist(data.artist)
    props.setUpdateId(data.id)
    props.ratingChanged(data.calification)
  })

  const stars = {
    size: 50,
    value: data.calification,
    isHalf: true,
  }


  const review = React.useRef(null)
  const reviewAlert = React.useRef(null)

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

    if((review.current.value).length <= 1){
      reviewAlert.current.style.opacity = '1';
      reviewAlert.current.textContent = 'Please, make a longer comment!';
      review.current.classList.add('wrong-input');
      return false;
    }else{
      review.current.classList.remove('wrong-input');
      reviewAlert.current.style.opacity = '0';
    }

    if((review.current.value).length >= 150){
      reviewAlert.current.textContent = 'Please, make a smaller comment!';
      reviewAlert.current.style.opacity = '1';
      review.current.classList.add('wrong-input');
      return false;
    }else{
      reviewAlert.current.style.opacity = '0';
      review.current.classList.remove('wrong-input');
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

        <input type="text" className="swal2-input" value={reviewState} placeholder="A little review..." onChange={(e)=> {
          setReviewState(e.target.value)
        }} ref={review}/>

        
        <p className="alert-label" ref={reviewAlert}>Please fill out this field.</p>


        <p className="input-label">Rating: </p>

        <ReactStars {...stars} className="stars-calification" onChange={(e) => {
          props.ratingChanged(e)
        }}/>

        <button type="submit" className="submit-button">UPDATE</button>

      </form>
    </React.Fragment>
  )
}

export default UpdateForm;