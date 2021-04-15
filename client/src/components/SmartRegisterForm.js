import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/RegisterForm.css";
import "../components/styles/SmartRegisterForm.css";
import ReactStars from "react-rating-stars-component";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyApi } from "../data/spotifyApi";
import Axios from "axios";
import Cookies from "js-cookie";

const SmartRegisterForm = (props) => {
  const [token, setToken] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [genres, setGenres] = useState([]);

  const stars = {
    size: 50,
    value: 0,
    isHalf: true,
  };

  useEffect(() => {
    setToken(Cookies.get("spotifyAuthToken"));
  });

  const review = React.useRef(null);
  const reviewAlert = React.useRef(null);
  const spotifyURL = React.useRef(null);
  const spotifyURLAlert = React.useRef(null);

  const spotifyInputStatus = {
    check: React.useRef(null),
    loader: React.useRef(null),
    container: React.useRef(null),
    loading: function () {
      spotifyURL.current.style.width = "85%";
      this.loader.current.style.display = "block";
      this.container.current.style.display = "block";
      this.check.current.style.display = "none";
      setTimeout(() => {
        this.loader.current.style.opacity = "1";
      }, 700);
    },
    sucess: function () {
      this.loader.current.style.opacity = "0";
      let spotifyInputAux = spotifyURL.current;
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
      let spotifyInputAux = spotifyURL.current;
      let spotifyAlertAux = spotifyURLAlert.current;
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

  const validateUrl = (spotifyUrl) => {
    const url = document.createElement("a");
    url.href = spotifyUrl;

    if (url.protocol != "https:") {
      return false;
    }

    if (url.hostname != "open.spotify.com") {
      return false;
    }

    if (!url.pathname.includes("/track/")) {
      return false;
    }

    return true;
  };

  function validation() {
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

    if (!validateUrl(spotifyURL.current.value)) {
      spotifyURLAlert.current.textContent = "Please, enter a valid URL!";
      spotifyURLAlert.current.style.opacity = "1";
      spotifyURL.current.classList.add("wrong-input");
      return false;
    } else {
      spotifyURLAlert.current.style.opacity = "0";
      spotifyURL.current.classList.remove("wrong-input");
    }

    return true;
  }

  const handleChange = (e) => {
    setDisableButton(true);
    if (e.length > 0) {
      spotifyInputStatus.loading();
      spotifyURLAlert.current.style.opacity = "0";
      spotifyURL.current.classList.remove("wrong-input");

      setTimeout(async () => {
        if (validateUrl(spotifyURL.current.value)) {
          const track_id = e.slice(31, 53);

          spotifyApi.setConfig(token);

          try {
            const data = await spotifyApi.song.get(track_id);
            props.onSongChange(data.name);
            props.onArtistChange(data.artists[0].name);
            props.selectImage(data.album.images[0].url);

            spotifyInputStatus.sucess();

            const genres = await spotifyApi.song.getGenres(data.artists[0].id);

            if (genres.length > 0) {
              setGenres(genres);
              props.onGenreChange(genres[0]);
            } else {
              setGenres([
                "country",
                "electronic",
                "hip-hop",
                "jazz",
                "metal",
                "pop",
                "k-pop",
                "indie pop",
                "bedroom pop",
                "dance pop",
                "rock pop",
                "Rap",
                "blues",
                "eock",
                "indie rock",
                "hard rock",
                "soft rock",
                "dance rock",
                "alternative rock",
                "rock en espanol",
                "trova",
                "alternative",
              ]);
              props.onGenreChange('country');
            }
          } catch (err) {
            console.log(err);
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
            props.onSubmit();
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
              props.onSpotifyUrlChange(e.target.value);
            }}
            ref={spotifyURL}
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

        <p className="alert-label" ref={spotifyURLAlert}>
          Please fill out this field.
        </p>

        <div
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
          <p className="alert-label">Please</p>
        </div>

        <p className="input-label">Review: </p>

        <input
          type="text"
          className="swal2-input"
          placeholder="A little commentary..."
          onChange={(e) => {
            props.onCommentChange(e.target.value);
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
            props.ratingChanged(e);
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

export default SmartRegisterForm;
