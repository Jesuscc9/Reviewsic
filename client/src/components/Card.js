import React, { useState, useEffect, useRef} from "react";
import "tailwindcss/tailwind.css";
import '../components/styles/Card.css';
import ReactStars from "react-rating-stars-component";
import {faSpotify} from '@fortawesome/fontawesome-free-brands'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = (data) => {

  const props = data.props;

  const stars = {
    size: 30,
    value: props.calification,
    edit: false,
    isHalf: true,
  }

  const card_options = React.useRef(null);
  const card = React.useRef(null);

  const handleMouseOver = () =>{
    card_options.current.classList.add('card-options-visible');
  }
  
  const handleMouseLeave = () =>{
    card_options.current.classList.remove('card-options-visible');
  }

  const images = require.context('../assets/img', true);
  let img = images('./' + props.image);

  return (
    <React.Fragment>
      <div className="card-custom shadow-lg" onMouseLeave={handleMouseLeave}>
        <div className="card-header" onMouseOver={handleMouseOver} ref={card}>
          <div className="image-container">
            <img alt="" src={img.default} className="song-img"/>          
          </div>
        </div>
        <div className="card-body">
          <h5 className="song-name">{props.songName}</h5>
          <h5 className="artist-name">{props.artist}</h5>
          {/*40 caracteres máximo*/}
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...stars} className="stars-calification"/>
          <p className="autor">By: {props.author}</p>
          <div className="card-options" ref={card_options}>
            <div className="edit-option option-container">
              <FontAwesomeIcon icon={faPen} className="faPen"/>
            </div>
            <div className="edit-option option-container">
              <FontAwesomeIcon icon={faTrash} className="faTrash"/>
            </div>
            <div className="edit-option option-container">
              <FontAwesomeIcon icon={faSpotify} className="faSpotify"/>
            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
};

export default Card;
