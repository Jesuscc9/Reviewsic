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
import ReactTooltip from "react-tooltip";
import { hexToRgb, timeAgo } from "../data/utils";

const Card = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { likedSongs, userId, playlistId } = useSelector((state) => state.user);
  var { data, uri = "" } = props;

  const song_name = useRef(null);

  const likes = props.likes.reduce((sum, like) => {
    return like.reviewId == data.id && like.isLike ? sum + 1 : sum;
  }, 0);

  const qualification =
    data.userId == userId
      ? {
          reviewId: data.id,
          qualification: data.qualification,
        }
      : props.qualifications.find((e) => {
          return e.reviewId == data.id && e.userId == userId;
        });

  let qual_cant = 0;

  const average =
    [
      ...props.qualifications,
      {
        reviewId: data.id,
        qualification: data.qualification,
      },
    ].reduce((sum, e) => {
      if (e && e.reviewId == data.id) {
        qual_cant++;
        return sum + e.qualification;
      } else {
        return sum;
      }
    }, 0) / qual_cant;

  const [liked, setLiked] = useState(false);
  const [qualificated, setQualificated] = useState(qualification);
  const [pause, setPause] = useState(true);
  const [addAnim, setAddAnim] = useState(false);

  useEffect(() => {
    if (props.song?.paused == false) {
      if (props.song.spotifyId == data.spotifyId) {
        setPause(false);
      }
    } else {
      setPause(true);
    }
  }, [props.playerStatus]);

  const [isInPlaylist, setIsInPlaylist] = useState(
    likedSongs.findIndex((item) => {
      return item.track.id == data.spotifyId;
    })
  );

  const dispatch = useDispatch();

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
    const userLiked = props.likes.find((like) => {
      return like.reviewId == data.id && like.userId == userId;
    })?.isLike
      ? true
      : false;
    if (userLiked) {
      heartActions.clicked();
    } else {
      heartActions.dislike();
    }
    setLiked(userLiked);
  }, [likes]);

  useEffect(() => {}, [props.qualifications]);

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
    clicked: () => {
      heart.current.classList.add("clicked_heart");
    },
  };

  const addToPlaylist = async () => {
    if (isInPlaylist > -1) {
      setIsInPlaylist(-1);
      const songs = await spotifyApi.playlist.delete(
        data.spotifyUri,
        playlistId,
        isInPlaylist
      );
      dispatch(userActions.setLikedSongs([...songs]));
    } else {
      if (!addAnim) {
        setAddAnim(true);
        setTimeout(async () => {
          const { songs, insertedId } = await spotifyApi.playlist.add(
            data.spotifyUri,
            playlistId,
            data.spotifyId
          );
          setAddAnim(false);
          dispatch(userActions.setLikedSongs(songs));
          setIsInPlaylist(insertedId);
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
    if (liked) {
      await props.like({ userId, reviewId: data.id, like: 0 });
      heartActions.dislike();
    } else {
      await props.like({ userId, reviewId: data.id, like: 1 });
      heartActions.like();
    }
    setLiked(!liked);
  };

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth;
  }

  const node = useRef();

  const imageUrl = data.image;

  return (
    <React.Fragment>
      <ReactTooltip effect="solid" />

      {redirect && <Redirect to="/home" />}
      <CustomCard onClick={() => {}}>
        <div className="card-content-container open" key={data.id} ref={node}>
          <motion.div
            className="card-content"
            layoutId={`card-container-${data.id}`}
          >
            <div className="card-header" ref={card}>
              <Palette src={data.image}>
                {({ data, loading, error }) => {
                  return (
                    <motion.div
                      className="image-container"
                      layoutId={`card-image-container-${props.data.id}`}
                      style={{
                        boxShadow: `rgba(${hexToRgb(
                          data.vibrant
                        )}) 2px 4px 40px 0px`,
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
              <div className="play-button-container">
                <button
                  className={`play-button ${pause ? "shine" : ""}`}
                  onClick={() => {
                    if (pause) {
                      props.playSong(data);
                    } else {
                      props.pause();
                    }
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
              </div>
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
                    value={average}
                    className="stars-calification"
                  />
                </div>

                {qualificated?.qualification ? (
                  <div className="rating-container average">
                    <ReactTooltip effect="solid" />
                    <button
                      className="rate-button rated-button"
                      data-tip="Your rating"
                    >
                      <span className="qualification">
                        &nbsp;{qualificated.qualification}
                      </span>
                      &nbsp;&nbsp;
                      <FontAwesomeIcon icon={faStar} className="star" />
                      &nbsp;
                    </button>
                  </div>
                ) : (
                  <div className="rate-container">
                    <div className="rate-stars-container">
                      <ReactStars
                        {...rating}
                        value={qualification?.qualification}
                        size="30"
                        edit="true"
                        className="stars-calification rate-stars"
                        onChange={(e) => {
                          const qualificationData = {
                            userId,
                            reviewId: data.id,
                            qualification: e,
                          };
                          setQualificated(qualificationData);
                          props.qualify(qualificationData);
                        }}
                      />
                    </div>
                    <button className="rate-button">
                      <FontAwesomeIcon icon={faStar} className="star" />
                      &nbsp;&nbsp;Rate it!
                    </button>
                  </div>
                )}
              </div>
              <div className="card-data">
                <p className="author">
                  By:{" "}
                  {/* <Link to={`/user/${data.userId}`} target="_blank">
                    <u>{data.user}</u>
                    {data.user}
                  </Link> */}
                  {data.user}
                </p>
                <p className="author date">{timeAgo(data.date)}</p>
              </div>
              <div className="card-options">
                <div className="card-actions">
                  <div
                    className="likes-container"
                    onClick={() => {
                      handleLikeSong();
                    }}
                  >
                    <p>{likes}</p>
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

                {data.userId === userId && (
                  <div className="card-actions register-options">
                    <div
                      className="edit-option option-container"
                      onClick={() => {
                        props.update(data.id);
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
