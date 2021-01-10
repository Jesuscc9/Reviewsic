import React, { useState, useEffect, useRef} from "react";
import "tailwindcss/tailwind.css";
import '../components/styles/Card.css';


import ReactStars from 'react-rating-stars-component';


import {faSpotify} from '@fortawesome/fontawesome-free-brands'
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Card = (data) => {

  const props = data.props;

  console.log('Se recibe: ' + props.id)
  console.log(props.calification)

  const [stars, setStars] = useState(4);

  var rating = {
    size: 30,
    value: stars,
    onChange: (newValue) => {
      setStars(newValue);
    }
  }

  useEffect(() =>{
    console.log('Se pone: ')
    console.log(props.calification)
    setStars(props.calification);
  }, [])

  const card_options = React.useRef(null);
  const card = React.useRef(null);

  const handleMouseOver = () =>{
    card_options.current.classList.add('card-options-visible');
  }
  
  const handleMouseLeave = () =>{
    card_options.current.classList.remove('card-options-visible');
  }


  return (
    <React.Fragment>
      <button onClick={() => setStars(5)}>Setear</button>
      <div className="card-custom shadow-lg" onMouseLeave={handleMouseLeave}>
        <div className="card-header" onMouseOver={handleMouseOver} ref={card}>
          <div className="image-container">
          <img alt="" src={`/images/${props.image}`} className="song-img"/>             
          </div>
        </div>
        <div className="card-body">
          <h5 className="song-name">{props.songName}</h5>
          <h5 className="artist-name">{props.artist}</h5>
          {/*40 caracteres máximo*/}
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification"/> {// This component is not updated
          }
          <p className="autor">By: {props.author}</p>
          <div className="card-options" ref={card_options}>
            <div className="edit-option option-container">
              <FontAwesomeIcon icon={faPen} className="faPen" onClick={() => {
                data.update();
              }}/>
            </div>
            <div className="edit-option option-container">
              <FontAwesomeIcon icon={faTrash} className="faTrash" onClick={ (e)=> {
                
                data.delete({id: props.id, image: props.image})
              }}/>
            </div>
            <div className="edit-option option-container">
              <a href={props.spotifyUrl} target="_blank">
                <FontAwesomeIcon icon={faSpotify} className="faSpotify"/>
              </a>
            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  );
};

export default Card;
