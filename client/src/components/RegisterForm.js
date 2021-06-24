import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/SmartRegisterForm.css";
import ReactStars from "react-rating-stars-component";

import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyApi } from "../data/spotifyApi";
import { AnimatePresence, motion } from "framer-motion";
import { validateUrl, defaultGenres } from "../data/formValidation";
import { GlobalStyles } from "./styles/RegisterForm.style";
import { useDetectClickOutside } from "react-detect-click-outside";

const RegisterForm = ({ submit }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [songData, setSongData] = useState({
    image: "",
    song: "",
    artist: "",
    review: "",
    genre: "",
    qualification: 0,
    spotifyId: "",
    spotifyUrl: "",
    spotifyUri: "",
    date: "",
  });

  const stars = {
    size: 50,
    value: songData.qualification,
    isHalf: true,
  };

  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);
  const spotifyUrl = React.useRef(null);
  const spotifyUrlAlert = React.useRef(null);

  const spotifyInputStatus = {
    check: React.useRef(null),
    loader: React.useRef(null),
    container: React.useRef(null),
    loading: function () {
      spotifyUrl.current.style.width = "85%";
      this.loader.current.style.display = "block";
      this.container.current.style.display = "block";
      this.check.current.style.display = "none";
      setTimeout(() => {
        this.loader.current.style.opacity = "1";
      }, 700);
    },
    sucess: function () {
      this.loader.current.style.opacity = "0";
      let spotifyInputAux = spotifyUrl.current;
      this.check.current.style.display = "none";

      setTimeout(() => {
        this.loader.current.style.display = "none";
        this.check.current.style.display = "block";
        setTimeout(() => {
          this.check.current.style.opacity = "1";
          setDisableButton(false);
          setTimeout(() => {
            this.check.current.style.opacity = "0";
            this.container.current.style.display = "none";
            spotifyInputAux.style.width = "100%";
          }, 800);
        }, 100);
      }, 200);
    },
    error: function () {
      this.loader.current.style.opacity = "0";
      let spotifyInputAux = spotifyUrl.current;
      let spotifyAlertAux = spotifyUrlAlert.current;
      this.check.current.style.display = "none";

      setTimeout(() => {
        this.loader.current.style.display = "none";
        this.check.current.style.display = "block";

        spotifyAlertAux.textContent = "Please, enter a valid URL!";
        spotifyAlertAux.style.opacity = "1";
        spotifyInputAux.classList.add("wrong-input");

        setTimeout(() => {
          this.check.current.style.opacity = "0";
          this.container.current.style.display = "none";
          spotifyInputAux.style.width = "100%";
        }, 800);
      }, 500);
    },
  };

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setSearchList([]);
    },
  });

  const validation = () => {
    if (review.current.value.length <= 0) {
      reviewAlert.current.style.opacity = "1";
      review.current.classList.add("wrong-input");
      reviewAlert.current.textContent = "Please fill out this field.";
      return false;
    } else {
      review.current.classList.remove("wrong-input");
      reviewAlert.current.style.opacity = "0";
    }

    if (review.current.value.length <= 1) {
      reviewAlert.current.style.opacity = "1";
      reviewAlert.current.textContent = "Please, make a longer comment!";
      review.current.classList.add("wrong-input");
      return false;
    } else {
      review.current.classList.remove("wrong-input");
      reviewAlert.current.style.opacity = "0";
    }

    if (review.current.value.length >= 150) {
      reviewAlert.current.textContent = "Please, make a smaller comment!";
      reviewAlert.current.style.opacity = "1";
      review.current.classList.add("wrong-input");
      return false;
    } else {
      reviewAlert.current.style.opacity = "0";
      review.current.classList.remove("wrong-input");
    }

    return true;
  };

  const handleSelectSong = async (song) => {
    const artists = song.artists
      .map((e) => {
        return e.name;
      })
      .join(", ");

    const genres = await spotifyApi.song.getGenres(song.artists[0].id);

    setSongData((prevState) => ({
      ...prevState,
      image: song.album.images[0].url,
      song: song.name,
      artist: artists,
      genre: defaultGenres[0],
      spotifyId: song.id,
      spotifyUrl: song.external_urls.spotify,
      spotifyUri: song.uri,
    }));

    if (genres.length > 0) {
      setGenres(genres);
      setSongData((prevState) => ({
        ...prevState,
        genre: genres[0],
      }));
    } else {
      setGenres(defaultGenres);
    }

    setSearch("");
  };

  useEffect(async () => {
    if (!songData.song.length) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [songData]);

  useEffect(async () => {
    if (search.length) {
      setSearchList([...(await spotifyApi.song.search(search))]);
    } else {
      setSearchList([]);
    }
  }, [search]);

  return (
    <React.Fragment>
      <GlobalStyles />
      <div className="display-flex justify-start"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validation()) {
            submit(songData);
          }
        }}
        className="register-form"
      >
        <p className="input-label">Song: </p>

        <div className="spotify-link-container">
          <AnimatePresence>
            {songData.song.length ? (
              <motion.div
                className="selected-song swal2-input spotify-link-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                key="selected-song"
              >
                <div className="image-container">
                  <img src={songData.image} alt="" />
                </div>
                <div className="track-data">
                  <p className="track-name">{songData.song}</p>
                  <p className="track-artist">{songData.artist}</p>
                </div>

                <button
                  className="close-button"
                  type="button"
                  onClick={() => {
                    setSongData((prevState) => ({
                      ...prevState,
                      song: "",
                    }));
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} className="close-icon" />
                </button>
              </motion.div>
            ) : (
              <input
                type="text"
                className="swal2-input spotify-link-input"
                placeholder="Name of the song..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
                ref={ref}
              />
            )}
          </AnimatePresence>

          <div
            className="spotify-link-status"
            ref={spotifyInputStatus.container}
          >
            <div ref={spotifyInputStatus.check} className="check-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>

            <div class="lds-ring" ref={spotifyInputStatus.loader}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        {searchList.length ? (
          <div className="search-list-container">
            <div className="search-list">
              {searchList.map((song) => {
                const artists = song.artists
                  .map((e) => {
                    return e.name;
                  })
                  .join(", ");

                const image = song.album.images[2]?.url
                  ? song.album.images[2].url
                  : "http://dissoftec.com/NotFoundImage.jpg";
                return (
                  <>
                    <div
                      className="search-result"
                      onClick={() => {
                        handleSelectSong(song);
                      }}
                    >
                      <div className="image-container">
                        <img src={image} alt="" />
                      </div>
                      <div className="track-data">
                        <p className="track-name">{song.name}</p>
                        <p className="track-artist">{artists}</p>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        <p className="alert-label" ref={spotifyUrlAlert}>
          Please fill out this field.
        </p>

        <AnimatePresence>
          {genres.length && songData.song.length && (
            <motion.div
              className={`genre-container show-genre`}
              initial={{
                scale: 0.3,
              }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <p className="input-label">Genre: </p>

              <select
                className={`swal2-input genre-input`}
                onChange={(e) => {
                  setSongData((prevState) => ({
                    ...prevState,
                    genre: e.target.value,
                  }));
                }}
              >
                {genres.length ? (
                  genres.map((genre) => {
                    return (
                      <option value={genre} className="genre-option">
                        {genre}
                      </option>
                    );
                  })
                ) : (
                  <div />
                )}
              </select>
              <p className="alert-label">s</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="input-label">Review: </p>

        <input
          type="text"
          className="swal2-input"
          placeholder="A little commentary..."
          onChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              review: e.target.value,
            }));
          }}
          ref={review}
        />

        <p className="alert-label" ref={reviewAlert}>
          Please fill out this field.
        </p>

        <p className="input-label">Rating: </p>

        <ReactStars
          {...stars}
          className="stars-calification"
          onChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              qualification: e,
            }));
          }}
        />

        {disableButton ? (
          <button disabled={true} className="submit-button disabled-button">
            UPLOAD
          </button>
        ) : (
          <button type="submit" className="submit-button">
            UPLOAD
          </button>
        )}
      </form>
    </React.Fragment>
  );
};

export default RegisterForm;
