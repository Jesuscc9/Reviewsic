import React,{ useEffect } from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/UpdateForm.css';
import ReactStars from "react-rating-stars-component";

const UpdateForm = (props) =>{

  const data = props.data;

  useEffect(() => {
    props.setSong(data.songName)
    props.setNewImage(data.image)
    props.setArtist(data.artist)
    props.setUpdateId(data.id)
  })

  console.log(data);

  const stars = {
    size: 50,
    value: data.calification,
    isHalf: true,
  }


  return(
    <React.Fragment>
      <form onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit()

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
        }}/>

        
        <p className="alert-label">Please fill out this field.</p>

        <p className="input-label">Spotify URL: </p>

        <input type="text" className="swal2-input" placeholder={data.spotifyUrl} onChange={(e)=> {
          props.onSpotifyUrlChange(e.target.value);
        }}/>


        <p className="alert-label">Please fill out this field.</p>

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