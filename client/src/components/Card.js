import React, { useState, useEffect, useRef } from "react"
import "tailwindcss/tailwind.css"
import "../components/styles/Card.css"
import ReactStars from "react-rating-stars-component"

import { faSpotify } from "@fortawesome/fontawesome-free-brands"
import { faPen, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Card = (data) => {
  const props = data.props;

  const song_name = useRef(null)

  var rating = {
    size: 20,
    value: props.calification,
    edit: false,
  };

  const card_options = React.useRef(null);
  const card = React.useRef(null);
  const heart = React.useRef(null)

  const handleMouseOver = () => {
    card_options.current.classList.add("card-options-visible");
  };

  const handleMouseLeave = () => {
    card_options.current.classList.remove("card-options-visible");
  };

  const handleHeartClick = () => {
    heart.current.classList.add('is_animating')
    heart.current.addEventListener('animationend', () => {
      heart.current.classList.remove('is_animating')
      heart.current.classList.add('clicked_heart')
    })
  }

  return (
    <React.Fragment>
      <div className="card-custom" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="card-header" ref={card}>
          <div className="image-container">
            <a  href={props.spotifyUrl} target="_blank">
            <img alt="" src={`/images/${props.image}`} className="song-img"/>

            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="song-name" ref={song_name}>{props.songName}</div>
          <h5 className="artist-name">{props.artist}</h5>
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification" />{" "}
          <p className="autor">By: {props.author}</p>
          <div className="card-options" ref={card_options}>
            {props.author_id === data.user ? 
                (
                  <React.Fragment>
                    <div className="edit-option option-container" onClick={() => { 
                        data.update();
                      }}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="faPen"
                      />
                    </div>
                    <div className="edit-option option-container" onClick={(e) => {
                        data.delete({ id: props.id, image: props.image });
                      }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="faTrash"
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )
              }
            <div className="edit-option option-container">
              <button href={props.spotifyUrl} target="_blank">
                {/* <FontAwesomeIcon icon={faHeart} className="faHeart" /> */}
              </button>
                <div className="heart" ref={heart} onClick={handleHeartClick}></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
