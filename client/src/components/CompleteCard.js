import React, { useState, useEffect, useRef, useCallback } from "react";
import "tailwindcss/tailwind.css";
import ReactStars from "react-rating-stars-component";

import {
  faCheck,
  faPause,
  faPen,
  faPlay,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faSpotify } from "@fortawesome/fontawesome-free-brands";
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
import { useDispatch } from "react-redux";
import userActions from "../redux/user/actions";
import { spotifyApi } from "../data/spotifyApi";
import { Palette } from "react-palette";
import Clairo from "../assets/img/clairo.png";

const Card = (props) => {
  const { likedSongs, author_id, playlist_id } = useSelector(
    (state) => state.user
  );

  console.log(likedSongs);
  console.log(author_id);
  console.log(playlist_id);

  var { data, uri = "" } = props;

  const song_name = useRef(null);

  const [liked, setLiked] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [pause, setPause] = useState(true);
  const [addAnim, setAddAnim] = useState(false);
  const [isInPlaylist, setIsInPlaylist] = useState(
    likedSongs.findIndex((item) => {
      return item.track.id == data.song_id;
    })
  );

  const dispatch = useDispatch();

  console.log(likedSongs);

  if (isInPlaylist > -1) uri = likedSongs[isInPlaylist].track.uri;

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setRedirect(true);
    }
  }, []);

  const handleOutsideClick = (e) => {
    if (node.current.innerHTML == e.target.innerHTML) {
      setRedirect(true);
      return;
    }
  };

  useEffect(() => {
    if (isInPlaylist > -1) {
      setLiked(true);
      heartActions.like();
      return;
    }

    heartActions.dislike();
    handleMouseLeave();
  }, [liked]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
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

  const addToPlaylist = async () => {
    if (isInPlaylist > -1) {
      setIsInPlaylist(-1);
    } else {
      if (!addAnim) {
        setAddAnim(true);
        setTimeout(async () => {
          setAddAnim(false);
          dispatch(
            userActions.setLikedSongs(
              await spotifyApi.playlist.add(data.song_id, playlist_id)
            )
          );
          // setIsInPlaylist(await props.addSong(data.song_id, data));
        }, 1000);
      }
    }
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

  const handleLikeSong = async () => {
    // if (liked) {
    //   await props.deleteSong(data.song_id, uri, isInPlaylist);
    //   heartActions.dislike();
    // } else {
    //   await props.addSong(data.song_id, data);
    //   heartActions.like();
    // }
    // setLiked(!liked);
  };

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth;
  }

  const node = useRef();

  const imageUrl = data.image;

  const hexToRgb = (hex = "fff") => {
    hex = hex.substring(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
  };

  return (
    <React.Fragment>
      {redirect && <Redirect to="/home" />}
      <GlobalStyles />
      <CustomCard onClick={() => {}}>
        <div className="card-content-container open" key={data.id} ref={node}>
          <motion.div
            className="card-content"
            layoutId={`card-container-${data.id}`}
          >
            <div className="card-header" ref={card}>
              <Palette src={data.image}>
                {({ data, loading, error }) => {
                  console.log(data);
                  return (
                    <motion.div
                      className="image-container"
                      layoutId={`card-image-container-${props.data.id}`}
                      style={{
                        boxShadow: `rgba(${hexToRgb(
                          data.vibrant
                        )},0.5) 2px 4px 40px 1px`,
                      }}
                    >
                      <a href={props.data.spotifyUrl} target="_blank">
                        <img
                          alt=""
                          src={imageUrl}
                          className="song-img"
                          loading="lazy"
                        />
                      </a>
                    </motion.div>
                  );
                }}
              </Palette>
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
                  <Link to={`/user/${data.author_id}`} target="_blank">
                    <u>{data.author}</u>
                  </Link>
                </p>
                <p className="author date">2 minutes ago</p>
              </div>
              <div className="card-options">
                <div className="card-actions">
                  <div
                    className="likes-container"
                    onClick={() => {
                      handleLikeSong();
                    }}
                  >
                    <p>21 </p>
                    <div className="heart-container">
                      <div className="heart" ref={heart}></div>
                    </div>
                  </div>
                  <div
                    className="playlist-container"
                    onClick={() => {
                      addToPlaylist();
                    }}
                  >
                    <AnimatePresence>
                      {addAnim && isInPlaylist < 0 ? (
                        <motion.div
                          key="success"
                          initial={{ scale: 0, display: "none" }}
                          animate={{ scale: 1, display: "flex" }}
                          exit={{ scale: 0, display: "none" }}
                          transition={{
                            type: "spring",
                            bounce: 0.7,
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} className="check" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="spotify"
                          initial={{ opacity: 0, display: "none" }}
                          animate={{ opacity: 1, display: "flex" }}
                          exit={{ opacity: 0, display: "none" }}
                          className="playlist-add-container"
                        >
                          {isInPlaylist < 0 ? (
                            <>
                              <p>Add</p>
                              <FontAwesomeIcon
                                icon={faSpotify}
                                className="spotify"
                              />
                            </>
                          ) : (
                            <>
                              <p style={{ width: "100%", textAlign: "center" }}>
                                Saved!
                              </p>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {data.author_id === author_id && (
                  <div className="card-actions register-options">
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
