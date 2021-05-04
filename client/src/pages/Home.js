import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import { motion } from "framer-motion";

import "../assets/animate.css";
import "react-spotify-auth/dist/index.css";
import "./styles/Home.css";

import Parallax from "parallax-js";
import Stars from "../assets/img/star.svg";
import Moonlight from "../assets/img/moonlight.png";
import Reviewsic from "../assets/img/reviewsic.svg";
import Clairo from "../assets/img/clairo.png";
import Clairo2 from "../assets/img/clairo2.png";
import Clairo3 from "../assets/img/clairo3.png";
import Slash from "../assets/img/slash.png";
import StarBackground from "../assets/img/stars-back.png";
import Cookies from "js-cookie";
import Planet1 from "../assets/img/planet1.png";
import Planet2 from "../assets/img/planet2.png";
import Planet3 from "../assets/img/planet3.png";

import { Scene, GlobalStyle } from "./styles/Home.style";

const Home = () => {
  const [token, setToken] = useState("");

  const sceneEl = useRef(null);
  const stars = useRef(null);
  const clairo = useRef(null);
  const slash = useRef(null);
  const header = useRef(null);
  const login = useRef(null);

  const elements = {
    objects: document.getElementsByName("element"),
    on: function () {
      this.objects.forEach((el) => {
        if (el.className.includes("clairo")) el.style.opacity = "0.8";
        else el.style.opacity = "1";
      });

      stars.current.classList.add("star-shadow");
      stars.current.style.opacity = "1";
    },
    off: function () {
      this.objects.forEach((el) => {
        if (el.className.includes("clairo")) el.style.opacity = "0.5";
        else el.style.opacity = "0.7";
      });

      stars.current.classList.remove("star-shadow");
      stars.current.style.opacity = "0.2";
    },
  };

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
      precision: 0.1,
    });

    parallaxInstance.enable();

    setTimeout(() => {
      if (header.current) {
        header.current.style.display = "block";
        header.current.classList.add("animate__fadeIn");
      }
    }, 1500);

    setToken(Cookies.get("spotifyAuthToken"));

    return () => parallaxInstance.disable();
  }, []);

  const handleClick = (e) => {
    elements.on();
    e.preventDefault();

    header.current.style.display = "block";
    header.current.classList.remove("animate__fadeIn");
    header.current.classList.add("animate__fadeOut");

    setTimeout(() => {
      login.current.style.display = "flex";
      elements.on();
    }, 500);
  };

  const onMouseEnter = (e) => {
    e.preventDefault();
    elements.on();
  };

  const onMouseLeave = (e) => {
    e.preventDefault();
    elements.off();
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="header animate__animated" ref={header}>
        <button
          className="try-button"
          id="try-button"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
        >
          Try it now!
        </button>
        {/* <h1 className="title">Reviewsic</h1> */}
        <img className="title" src={Reviewsic} name="element"></img>
      </div>

      <div
        className="login-form animate__animated animate__fadeIn"
        ref={login}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {token ? (
          <div>
            <SpotifyApiContext.Provider value={token}>
              <Redirect to="/home"></Redirect>
            </SpotifyApiContext.Provider>
          </div>
        ) : (
          <SpotifyAuth
            className="spotify-auth"
            // redirectUri="https://reviewsic.herokuapp.com/"
            redirectUri="http://localhost:3000/"
            clientID="9751c1f85b2a4684a8cc0a02f6942b91"
            scopes={[
              Scopes.playlistModifyPrivate,
              Scopes.userReadPrivate,
              Scopes.playlistReadCollaborative,
              Scopes.playlistModifyPublic,
            ]}
          />
        )}
      </div>

      <Link to="/home" id="link"></Link>

      <div id="container">
        <Scene id="scene" ref={sceneEl} data-scalar-x="10" data-scalar-y="10">
          <div data-depth="0.2">
            <img src={Stars} className="stars" />
          </div>

          <div data-depth="0.1">
            <img src={StarBackground} ref={stars} className="star" />
          </div>

          <div data-depth="0.5">
            <img className="moonlight" src={Moonlight} />
          </div>

          <div data-depth="1" className="slash-container">
            <img className="slash" name="element" src={Slash} ref={slash} />
          </div>

          <div data-depth="1" className="clairo-container">
            <img className="clairo" name="element" src={Clairo2} ref={clairo} />
          </div>
        </Scene>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.img
          style={{ position: "absolute", top: "15%", left: "25%" }}
          name="element"
          className="planet"
          width="100"
          height="100"
          src={Planet1}
          drag={true}
          dragMomentum={false}
        ></motion.img>
        <motion.img
          style={{ position: "absolute", top: "21%", left: "64%" }}
          name="element"
          className="planet"
          width="150"
          height="150"
          src={Planet3}
          drag={true}
          dragMomentum={true}
        ></motion.img>
        <motion.img
          style={{ position: "absolute", top: "50%", left: "35%" }}
          name="element"
          className="planet"
          width="100"
          height="100"
          src={Planet2}
          drag={true}
          dragMomentum={true}
        ></motion.img>
      </motion.div>
    </React.Fragment>
  );
};

export default Home;
