import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Card.css";
import ReactStars from "react-rating-stars-component";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (props) => {
  const data = props.data;

  const song_name = useRef(null);

  const [liked, setLiked] = useState(false);
  const [pos, setPos] = useState(0);
  const [uri, setUri] = useState("");

  useEffect(() => {
    let i = 0;
    props.likedSongs.forEach((e) => {
      i++;
      if (e.track.name == data.song) {
        setUri(e.track.uri);
        setLiked(true);
        setPos(i);
        handleHeartClick();
        return;
      }
    });
  }, []);

  var rating = {
    size: 20,
    value: data.qualification,
    edit: false,
  };

  let calc;

  const card_options = React.useRef(null);
  const card = React.useRef(null);
  const heart = React.useRef(null);
  const span = React.useRef(null);

  const handleMouseOver = () => {
    card_options.current.classList.add("card-options-visible");

    if (song_name.current) {
      if (!calc) {
        calc = song_name.current.scrollWidth - song_name.current.offsetWidth;
      }
      if (isElementOverflowing(song_name.current)) {
        if (calc > 50) {
          span.current.style.transition = `${(calc / 100) * 2}s`;
        }

        span.current.style.transform = `translateX(${calc * -1}px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    card_options.current.classList.remove("card-options-visible");
    span.current.style.transform = `translateX(${0}px)`;
  };

  const handleHeartClick = () => {
    if (!heart.current.classList.contains("clicked_heart")) {
      heart.current.classList.add("is_animating");
      heart.current.addEventListener("animationend", () => {
        heart.current.classList.remove("is_animating");
        heart.current.classList.add("clicked_heart");
      });
    } else {
      heart.current.classList.remove("clicked_heart");
      handleMouseLeave();
    }
  };

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth;
  }

  return (
    <React.Fragment>
      <div
        className="card-custom"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-header" ref={card}>
          <div className="image-container">
            <a href={data.spotifyUrl} target="_blank">
              <img alt="" src={data.image} className="song-img" loading="lazy"/>
            </a>
          </div>
        </div>
        <div className="card-body">
          <div className="song-name" ref={song_name}>
            <span ref={span}>{data.song}</span>
          </div>

          <h5 className="artist-name">{data.artist}</h5>
          <p className="comment">{data.review}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification" />{" "}
          <p className="autor">By: {data.author}</p>
          <div className="card-options" ref={card_options}>
            {data.author_id === props.user ? (
              <React.Fragment>
                <div
                  className="edit-option option-container"
                  onClick={() => {
                    props.update();
                  }}
                >
                  <FontAwesomeIcon icon={faPen} className="faPen" />
                </div>
                <div
                  className="edit-option option-container"
                  onClick={(e) => {
                    props.delete({ id: data.id });
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className="faTrash" />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            <div className="edit-option option-container">
              <button href={props.spotifyUrl} target="_blank"></button>
              <div
                className="heart"
                ref={heart}
                onClick={() => {
                  handleHeartClick();

                  if (liked) {
                    props.deleteSong(data.song_id, uri, pos);
                  } else {
                    props.addSong(data.song_id);
                  }

                  setLiked(!liked);
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
