import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import ReactStars from "react-rating-stars-component";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { CardCustom, GlobalStyles } from "./styles/CompleteCard.style";

const CompleteCard = (props) => {
  const { data, likedSongs } = props;

  const song_name = useRef(null);

  const [liked, setLiked] = useState(false);
  const [pos, setPos] = useState(0);
  const [uri, setUri] = useState("");
  const [sortType, setSortType] = useState(props.sortType);

  const isInPlaylist = (song) => {
    return song.track.name === props.data.song;
  };

  useEffect(() => {
    const index = likedSongs.findIndex(isInPlaylist);

    if (index > -1) {
      setUri(likedSongs[index].track.uri);
      setLiked(true);
      setPos(index);
      heartActions.like();
      return;
    }

    heartActions.dislike();
    handleMouseLeave();
  }, [liked, sortType]);

  if (sortType != props.sortType) {
    setSortType(props.sortType);
  }

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

  const heartActions = {
    like: () => {
      heart.current.classList.add("is_animating");
      heart.current.addEventListener("animationend", () => {
        heart.current.classList.remove("is_animating");
        heart.current.classList.add("clicked_heart");
      });
    },
    dislike: () => {
      heart.current.classList.remove("clicked_heart");
      handleMouseLeave();
    },
  };

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

  const handleHeartClick = async () => {
    if (liked) {
      await props.deleteSong(data.song_id, uri, pos);
      heartActions.dislike();
    } else {
      await props.addSong(data.song_id, data);
      heartActions.like();
    }

    setLiked(!liked);
  };

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth;
  }

  return (
    <React.Fragment>
      <GlobalStyles />
      <CardCustom onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="card-header" ref={card}>
          <div className="image-container">
            {/* <a href={data.spotifyUrl} target="_blank">
              <img
                alt=""
                src={data.image}
                className="song-img"
                loading="lazy"
              />
            </a> */}
            <Link to={`/home/${data.id}`}>
              <img
                alt=""
                src={data.image}
                className="song-img"
                loading="lazy"
              />
            </Link>
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
              <div
                className="heart"
                ref={heart}
                onClick={() => {
                  handleHeartClick();
                }}
              ></div>
            </div>
          </div>
        </div>
      </CardCustom>
    </React.Fragment>
  );
};

export default CompleteCard;
