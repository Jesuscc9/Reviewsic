import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/UpdateForm.css";
import { GlobalStyles } from "./styles/RegisterForm.style";
import { motion } from "framer-motion";

import ReactStars from "react-rating-stars-component";

const UpdateForm = ({ data, submit }) => {
  const [songData, setSongData] = useState({
    review: data.review,
    qualification: data.qualification,
  });

  const stars = {
    size: 50,
    value: songData.qualification,
    isHalf: true,
  };

  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);

  function validation() {
    if (review.current.value.length <= 0) {
      reviewAlert.current.style.opacity = "1";
      review.current.classList.add("wrong-input");
      reviewAlert.current.textContent = "Please fill out this field.";
      return false;
    } else {
      review.current.classList.remove("wrong-input");
      reviewAlert.current.style.opacity = "0";
    }

    if (review.current.value.length <= 1) {
      reviewAlert.current.style.opacity = "1";
      reviewAlert.current.textContent = "Please, make a longer comment!";
      review.current.classList.add("wrong-input");
      return false;
    } else {
      review.current.classList.remove("wrong-input");
      reviewAlert.current.style.opacity = "0";
    }

    if (review.current.value.length >= 150) {
      reviewAlert.current.textContent = "Please, make a smaller comment!";
      reviewAlert.current.style.opacity = "1";
      review.current.classList.add("wrong-input");
      return false;
    } else {
      reviewAlert.current.style.opacity = "0";
      review.current.classList.remove("wrong-input");
    }
    return true;
  }

  return (
    <React.Fragment>
      <GlobalStyles />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validation()) {
            submit(songData);
          }
        }}
        className="register-form"
      >
        <motion.div
          className="selected-song swal2-input spotify-link-input"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          key="selected-song"
        >
          <div className="image-container">
            <img src={data.image} alt="" />
          </div>
          <div className="track-data">
            <p className="track-name">{data.song}</p>
            <p className="track-artist">{data.artist}</p>
          </div>
        </motion.div>
        <br />
        <br />
        <p className="input-label">Review: </p>

        <input
          type="text"
          className="swal2-input"
          value={songData.review}
          placeholder="A little commentary..."
          onChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              review: e.target.value,
            }));
          }}
          ref={review}
        />

        <p className="alert-label" ref={reviewAlert}>
          Please fill out this field.
        </p>

        <p className="input-label">Rating: </p>

        <ReactStars
          {...stars}
          className="stars-calification"
          onChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              qualification: e,
            }));
          }}
        />

        <button type="submit" className="submit-button">
          UPDATE
        </button>
      </form>
    </React.Fragment>
  );
};

export default UpdateForm;
