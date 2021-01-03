import React from 'react';
import "tailwindcss/tailwind.css";
import '../components/styles/RegisterForm.css';
import ReactStars from "react-rating-stars-component";

const RegisterForm = () =>{

  const stars = {
    size: 30,
    value: 0,
    isHalf: true,
  }

  return(
    <React.Fragment>
      <div className="register-form">
        <input type="text" id="swal-input1" class="swal2-input" placeholder="Song" />

        <input type="file" accept=".png, .jpg, .jpeg" aria-label="Upload your profile picture" class="swal2-file" placeholder="" style="display: flex;" /> 

        <input type="text" id="swal-input1" class="swal2-input" placeholder="Artist" />

        <input type="text" id="swal-input2" class="swal2-input" placeholder="Commentary" />

        <ReactStars {...stars} className="stars-calification"/>
      </div>
    </React.Fragment>
  )
}

export default RegisterForm;