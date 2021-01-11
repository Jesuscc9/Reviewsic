import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Card.css";

import ReactStars from "react-rating-stars-component";

import { faSpotify } from "@fortawesome/fontawesome-free-brands";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (data) => {
  const props = data.props;
  console.log(data.user)

  var rating = {
    size: 30,
    value: props.calification,
    edit: false,
  };

  const card_options = React.useRef(null);
  const card = React.useRef(null);

  const handleMouseOver = () => {
    card_options.current.classList.add("card-options-visible");
  };

  const handleMouseLeave = () => {
    card_options.current.classList.remove("card-options-visible");
  };

  return (
    <React.Fragment>
      <div className="card-custom shadow-lg" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="card-header" ref={card}>
          <div className="image-container">
            <img alt="" src={`/images/${props.image}`} className="song-img" />
          </div>
        </div>
        <div className="card-body">
          <h5 className="song-name">{props.songName}</h5>
          <h5 className="artist-name">{props.artist}</h5>
          {/*40 caracteres máximo*/}
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification" />{" "}
          <p className="autor">By: {props.author}</p>
          <div className="card-options" ref={card_options}>
            {data.user == props.author ? 
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
              <a href={props.spotifyUrl} target="_blank">
                <FontAwesomeIcon icon={faSpotify} className="faSpotify" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
