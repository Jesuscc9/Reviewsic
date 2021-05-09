import React, { useState, useEffect, useRef, useCallback } from "react";
import "tailwindcss/tailwind.css";
import ReactStars from "react-rating-stars-component";

import {
  faEraser,
  faPause,
  faPen,
  faPlay,
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
          console.log(colors);
        }}
      />
      <CustomCard onClick={() => {}}>
        <div className="card-content-container open" key={data.id} ref={node}>
          {/* {showBg && (
            <div
              className="white-background"
              layoutId={`card-white-background-${data.id}`}
            />
          )} */}
          <motion.div
            className="card-content"
            layoutId={`card-container-${data.id}`}
            style={{
              backgroundColor:
                colors.length && showBg && false
                  ? `#1DB954
                  `
                  : "#fff",
            }}
          >
            <div className="card-header" ref={card}>
              <div
                className="image-container"
                layoutId={`card-image-container-${data.id}`}
              >
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
              <button
                className="play-button"
                style={{
                  backgroundColor: colors.length
                    ? `#1DB954
                    `
                    : "rgb(255, 255, 255)",
                }}
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
              <ReactStars {...rating} className="stars-calification" />{" "}
              <p className="autor">By: {data.author}</p>
              <div className="card-options" ref={card_options}>
                {data.author_id === author_id ? (
                  <React.Fragment>
                    <div
                      className="edit-option option-container"
                      onClick={() => {
                        props.update(props.data);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} className="faPen" />
                    </div>
                    <div
                      className="edit-option option-container"
                      onClick={(e) => {
                        props.delete(data.id);
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
