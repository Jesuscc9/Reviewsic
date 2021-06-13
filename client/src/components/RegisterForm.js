import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/RegisterForm.css";
import "../components/styles/SmartRegisterForm.css";
import ReactStars from "react-rating-stars-component";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyApi } from "../data/spotifyApi";
import { AnimatePresence, motion } from "framer-motion";
import { validateUrl, defaultGenres } from "../data/formValidation";

const RegisterForm = ({ submit }) => {
  const [disableButton, setDisableButton] = useState(true);
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

    if (!validateUrl(spotifyUrl.current.value)) {
      spotifyUrlAlert.current.textContent = "Please, enter a valid URL!";
      spotifyUrlAlert.current.style.opacity = "1";
      spotifyUrl.current.classList.add("wrong-input");
      return false;
    } else {
      spotifyUrlAlert.current.style.opacity = "0";
      spotifyUrl.current.classList.remove("wrong-input");
    }

    return true;
  };

  const handleChange = (e) => {
    setDisableButton(true);
    if (validateUrl(spotifyUrl.current.value)) {
      spotifyInputStatus.loading();
      spotifyUrlAlert.current.style.opacity = "0";
      spotifyUrl.current.classList.remove("wrong-input");

      setTimeout(async () => {
        if (validateUrl(spotifyUrl.current.value)) {
          const track_id = e.slice(31, 53);

          try {
            const data = await spotifyApi.song.get(track_id);

            spotifyInputStatus.sucess();

            const genres = await spotifyApi.song.getGenres(data.artists[0].id);

            const artists = data.artists
              .map((e) => {
                return e.name;
              })
              .join(", ");

            console.log(data);

            setSongData((prevState) => ({
              ...prevState,
              image: data.album.images[0].url,
              song: data.name,
              artist: artists,
              genre: defaultGenres[0],
              spotifyId: data.id,
              spotifyUrl: data.external_urls.spotify,
              spotifyUri: data.uri,
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
          } catch (err) {
            console.error(err);
            spotifyInputStatus.error();
          }
        } else {
          spotifyInputStatus.error();
        }
      }, 1500);
    }
  };

  return (
    <React.Fragment>
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
        <p className="input-label">Spotify URL: </p>

        <div className="spotify-link-container">
          <input
            type="text"
            className="swal2-input spotify-link-input"
            placeholder="Spotify link of the song..."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            ref={spotifyUrl}
          />

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

        <p className="alert-label" ref={spotifyUrlAlert}>
          Please fill out this field.
        </p>

        {/* <div
          className={`genre-container ${
            genres.length ? "show-genre" : "hide-genre"
          }`}
        >
          <p className="input-label">Genre: </p>

          <select
            className={`swal2-input ${
              genres.length ? "genre-input" : "genre-input-hidden"
            }`}
            onChange={(e) => {
              props.onGenreChange(e.target.value);
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
          <p className="alert-label">.</p>
        </div> */}
        <AnimatePresence>
          {genres.length && (
            <motion.div
              className={`genre-container show-genre`}
              initial={{
                scale: 0.3,
              }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.7,
                type: "spring",
                bounce: 0.5,
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
