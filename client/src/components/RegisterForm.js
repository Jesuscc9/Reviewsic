import React from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/RegisterForm.css';
import ReactStars from "react-rating-stars-component";

const RegisterForm = (props) =>{

  const stars = {
    size: 50,
    value: 0,
    isHalf: true,
  }

  return(
    <React.Fragment>
      <form onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }} className="register-form">
        <p class="input-label">Song: </p>
        <input type="text" id="swal-input1" className="swal2-input" placeholder="Name of the song..." onChange={(e) => {props.onSongChange(e.target.value);
        }}/>

        <p class="input-label">Image: </p>
        <input type="file" accept=".png, .jpg, .jpeg" aria-label="Upload your profile picture" className="swal2-file" placeholder="" style={{display: 'flex'
         }} onChange={(e) => {
           
           props.selectImage(e.target.files[0]);
          }}/> 

        <p class="input-label">Artist: </p>
        <input type="text" id="swal-input1" className="swal2-input" placeholder="Author of the song..." 
        onChange={(e)=> {
          props.onArtistChange(e.target.value);
        }}/>

        <p class="input-label">Commentary: </p>
        <input type="text" id="swal-input2" className="swal2-input" placeholder="A little review"         onChange={(e)=> {
          props.onCommentChange(e.target.value);
        }}/>

        <p class="input-label">Rating: </p>
        <ReactStars {...stars} className="stars-calification" onChange={(e) => {
          props.ratingChanged(e)
        }}/>

        <button type="submit" class="submit-button">UPLOAD</button>
      </form>
    </React.Fragment>
  )
}

export default RegisterForm;