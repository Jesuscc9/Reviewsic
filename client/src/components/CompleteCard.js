import React, { useState, useEffect, useRef, useCallback } from "react";
import "tailwindcss/tailwind.css";
import ReactStars from "react-rating-stars-component";

import {
  faEraser,
  faPause,
  faPen,
  faPlay,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  Card as CustomCard,
  Overlay,
  GlobalStyles,
} from "./styles/CompleteCard.style";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ColorExtractor } from "react-color-extractor";
import PlaylistIcon from "../assets/img/PlaylistIcon.png";

const Card = (props) => {
  const author_id = useSelector((state) => state.user.author_id);

  const { data, isInPlaylist, uri } = props;

  const song_name = useRef(null);

  const [liked, setLiked] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [colors, setColors] = useState([]);
  const [pause, setPause] = useState(true);
  const [showBg, setShowBg] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (isInPlaylist > -1) {
      setLiked(true);
      heartActions.like();
      return;
    }

    heartActions.dislike();
    handleMouseLeave();
    setTimeout(() => {
      setShowBg(true);
    }, 500);
  }, [liked]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  const handleClick = (e) => {
    if (node.current.innerHTML == e.target.innerHTML) {
      setRedirect(true);
      return;
    }
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  var rating = {
    size: 25,
    value: data.qualification,
    edit: false,
  };

  let calc;

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
    span.current.style.transform = `translateX(${0}px)`;
  };

  const handleHeartClick = async () => {
    if (liked) {
      await props.deleteSong(data.song_id, uri, isInPlaylist);
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

  const node = useRef();

  return (
    <React.Fragment>
      {redirect && <Redirect to="/home" />}
      <GlobalStyles />
      <ColorExtractor
        rgb
        src={data.image}
        maxColors={3}
        getColors={(colors) => {
          setColors(colors);
        }}
      />
      <CustomCard onClick={() => {}}>
        <div className="card-content-container open" key={data.id} ref={node}>
          <motion.div
            className="card-content"
            layoutId={`card-container-${data.id}`}
          >
            <div className="card-header" ref={card}>
              <motion.div
                className="image-container"
                layoutId={`card-image-container-${data.id}`}
              >
                <a href={data.spotifyUrl} target="_blank">
                  <img
                    alt=""
                    src={data.image}
                    className="song-img"
                    loading="lazy"
                  />
                </a>
              </motion.div>
            </div>
            <div className="card-body">
              <button
                className={`play-button ${pause ? "shine" : ""}`}
                onClick={() => {
                  setPause(!pause);
                }}
              >
                <AnimatePresence>
                  {pause ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                    >
                      <FontAwesomeIcon icon={faPlay} className="play-icon" />
                    </motion.div>
                  ) : (
                    <motion.div>
                      <FontAwesomeIcon icon={faPause} className="play-icon" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <div
                className="song-name"
                ref={song_name}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              >
                <span ref={span}>{data.song}</span>
              </div>
              <h5 className="artist-name">{data.artist}</h5>
              <p className="comment">{data.review}</p>
            </div>
            <div className="card-footer">
              <div className="ratings">
                <div className="rating-container">
                  <p className="author-rate">Author Rating</p>
                  <ReactStars {...rating} className="stars-calification" />
                </div>

                <div className="rating-container average">
                  <p className="author-rate users-rate">Average Rating</p>
                  <ReactStars
                    {...rating}
                    className="stars-calification"
                    value="3"
                  />
                </div>
                <button className="rate-button">
                  <FontAwesomeIcon icon={faStar} className="star" />
                  &nbsp;&nbsp;Rate it!
                </button>
              </div>
              <div className="card-data">
                <p className="author">
                  By:{" "}
                  <Link to={`/user/${data.author}`} target="_blank">
                    <u>{data.author}</u>
                  </Link>
                </p>
                <p className="author date">2 minutes ago</p>
              </div>
              <div className="card-options">
                <div className="card-actions">
                  <div
                    className="heart"
                    ref={heart}
                    onClick={() => {
                      handleHeartClick();
                    }}
                  ></div>
                  <div
                    className="playlist"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <img src={PlaylistIcon} alt="" />
                  </div>
                </div>

                {data.author_id === author_id && (
                  <div className="card-actions">
                    <div
                      className="edit-option option-container"
                      onClick={() => {
                        props.update(props.data);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} className="faPen" />
                    </div>
                    <div
                      className="delete-option option-container"
                      onClick={(e) => {
                        props.delete(data.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="faTrash" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </CustomCard>
      <Overlay
        onClick={() => {
          setRedirect(true);
          setShowBg(false);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{
          pointerEvents: "auto",
        }}
      />
    </React.Fragment>
  );
};

export default Card;
