import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { SpotifyApiContext } from "react-spotify-api";
import { AnimatePresence, motion } from "framer-motion";

import "../assets/animate.css";
import "react-spotify-auth/dist/index.css?v=2";

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
import ReviewsicSVG from "../assets/img/reviewsicFilled.svg";

import { Scene, GlobalStyle } from "./styles/Home.style";

const Home = () => {
  const [showSvg, setShowSvg] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  let endedAnim = false;

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 0.5,
        duration: 2.3,
        ease: "easeInOut",
      },
      transitionEnd: () => {
        if (!endedAnim) {
          setTimeout(() => {
            if (svgRef.current) {
              svgRef.current.style.opacity = 0;
              setShowSvg(false);
            }
            endedAnim = true;
          }, 300);
        }
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const svgVariants = {
    visible: {
      opacity: [0.1, 1, 0.5],
    },
    hidden: {
      opacity: 0.5,
    },
    transition: {
      duration: 0.1,
    },
  };

  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));

  const sceneEl = useRef(null);
  const stars = useRef(null);
  const clairo = useRef(null);
  const slash = useRef(null);
  const login = useRef(null);
  const svgRef = useRef(null);

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
    setToken(Cookies.get("spotifyAuthToken"));
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
      precision: 0.1,
    });

    parallaxInstance.enable();

    return () => parallaxInstance.disable();
  }, []);

  const handleClick = (e) => {
    setShowLogin(true);
    e.preventDefault();
    elements.off();

    setTimeout(() => {
      login.current.style.display = "flex";
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
      <AnimatePresence>
        <motion.div
          className="header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          style={{ display: !showLogin ? "block" : "none" }}
        >
          <motion.button
            className="try-button"
            id="try-button"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 0.7,
            }}
            transition={{ delay: 3.15 }}
            whileHover={{
              opacity: 1,
            }}
          >
            Try it now!
          </motion.button>
          {showSvg ? (
            <motion.svg
              version="1.0"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/motion.svg"
              x="0px"
              y="0px"
              className="svg"
              viewBox="0 0 667 121"
              ref={svgRef}
            >
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                }}
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                strokeDasharray="500, 200"
                d="M26.8,112.1H7.2v-98h39.2c3.6,0,7.1,0.5,10.4,1.4c3.3,0.9,6.4,2.3,9.3,4c2.9,1.7,5.5,3.8,7.9,6.2
                c2.4,2.4,4.4,5,6.2,8c1.7,2.9,3,6,4,9.4c0.9,3.3,1.4,6.8,1.4,10.4c0,3.4-0.4,6.7-1.3,9.8c-0.8,3.2-2.1,6.2-3.6,9.1
                c-1.6,2.9-3.5,5.5-5.8,7.9c-2.3,2.4-4.8,4.5-7.7,6.3l10.9,25.6H57.3l-8.5-19.8l-21.9,0.1V112.1z M26.8,33.7v39.2h19.6
                c2.7,0,5.2-0.5,7.6-1.5c2.4-1,4.4-2.4,6.2-4.2c1.8-1.8,3.2-3.9,4.2-6.3c1-2.4,1.5-4.9,1.5-7.6c0-2.7-0.5-5.2-1.5-7.6
                c-1-2.4-2.4-4.5-4.2-6.3s-3.9-3.2-6.2-4.2c-2.4-1-4.9-1.5-7.6-1.5H26.8z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                strokeDasharray="0 0"
                d="M124.8,94.2c0.7,0.2,1.5,0.4,2.2,0.4c0.7,0.1,1.5,0.1,2.2,0.1c1.8,0,3.6-0.3,5.3-0.8c1.7-0.5,3.3-1.2,4.8-2.2
                c1.5-0.9,2.8-2.1,4-3.4c1.2-1.3,2.1-2.8,2.8-4.5l13.7,13.7c-1.7,2.5-3.7,4.7-6,6.6c-2.3,2-4.7,3.6-7.3,5c-2.6,1.4-5.4,2.4-8.3,3.1
                c-2.9,0.7-5.9,1.1-8.9,1.1c-5.2,0-10-1-14.5-2.9c-4.5-1.9-8.5-4.6-11.9-8c-3.4-3.4-6.1-7.5-8-12.2c-2-4.7-2.9-9.9-2.9-15.6
                c0-5.8,1-11.1,2.9-15.9c2-4.8,4.6-8.9,8-12.2c3.4-3.4,7.4-6,11.9-7.9c4.5-1.9,9.4-2.8,14.5-2.8c3.1,0,6,0.4,9,1.1
                c2.9,0.7,5.7,1.8,8.3,3.1c2.6,1.4,5.1,3,7.3,5c2.3,2,4.3,4.2,6,6.7L124.8,94.2z M134.4,55.7c-0.9-0.3-1.7-0.5-2.6-0.6
                c-0.8-0.1-1.7-0.1-2.6-0.1c-2.6,0-5,0.5-7.2,1.4c-2.3,0.9-4.2,2.3-5.9,4c-1.7,1.7-3,3.8-3.9,6.3c-1,2.4-1.4,5.2-1.4,8.2
                c0,0.7,0,1.5,0.1,2.3c0.1,0.9,0.2,1.7,0.3,2.6c0.2,0.9,0.4,1.7,0.6,2.6c0.2,0.8,0.5,1.6,0.9,2.2L134.4,55.7z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M189,112.1l-27.9-73.2h21.3l16,45.7l15.9-45.7h21.3l-27.9,73.2H189z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M264.7,19c0,1.7-0.3,3.3-1,4.9c-0.7,1.5-1.6,2.8-2.7,3.9c-1.1,1.1-2.5,2-4,2.7c-1.5,0.7-3.2,1-4.9,1
                c-1.7,0-3.4-0.3-4.9-1c-1.5-0.7-2.8-1.5-4-2.7c-1.1-1.1-2-2.4-2.7-3.9c-0.7-1.5-1-3.1-1-4.9c0-1.7,0.3-3.3,1-4.8
                c0.7-1.5,1.5-2.8,2.7-4c1.1-1.1,2.4-2,4-2.7c1.5-0.7,3.2-1,4.9-1c1.7,0,3.4,0.3,4.9,1c1.5,0.7,2.9,1.5,4,2.7c1.1,1.1,2,2.4,2.7,4
                C264.4,15.7,264.7,17.3,264.7,19z M261.5,112.1h-18.8V38.9h18.8V112.1z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M304.8,94.2c0.7,0.2,1.5,0.4,2.2,0.4c0.7,0.1,1.5,0.1,2.2,0.1c1.8,0,3.6-0.3,5.3-0.8c1.7-0.5,3.3-1.2,4.8-2.2
                c1.5-0.9,2.8-2.1,4-3.4c1.2-1.3,2.1-2.8,2.8-4.5l13.7,13.7c-1.7,2.5-3.7,4.7-6,6.6c-2.3,2-4.7,3.6-7.3,5c-2.6,1.4-5.4,2.4-8.3,3.1
                c-2.9,0.7-5.9,1.1-8.9,1.1c-5.2,0-10-1-14.5-2.9c-4.5-1.9-8.5-4.6-11.9-8c-3.4-3.4-6.1-7.5-8-12.2c-2-4.7-2.9-9.9-2.9-15.6
                c0-5.8,1-11.1,2.9-15.9c2-4.8,4.6-8.9,8-12.2c3.4-3.4,7.4-6,11.9-7.9c4.5-1.9,9.4-2.8,14.5-2.8c3.1,0,6,0.4,9,1.1
                c2.9,0.7,5.7,1.8,8.3,3.1c2.6,1.4,5.1,3,7.3,5c2.3,2,4.3,4.2,6,6.7L304.8,94.2z M314.4,55.7c-0.9-0.3-1.7-0.5-2.6-0.6
                c-0.8-0.1-1.7-0.1-2.6-0.1c-2.6,0-5,0.5-7.2,1.4c-2.3,0.9-4.2,2.3-5.9,4c-1.7,1.7-3,3.8-3.9,6.3c-1,2.4-1.4,5.2-1.4,8.2
                c0,0.7,0,1.5,0.1,2.3c0.1,0.9,0.2,1.7,0.3,2.6c0.2,0.9,0.4,1.7,0.6,2.6c0.2,0.8,0.5,1.6,0.9,2.2L314.4,55.7z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M441.6,85.7c0,3.8-0.7,7.4-2.2,10.8c-1.5,3.4-3.5,6.3-6,8.9c-2.5,2.5-5.5,4.5-8.9,5.9c-3.4,1.5-7,2.2-10.9,2.2
                c-3.5,0-6.8-0.6-10-1.8c-3.2-1.2-6.1-3-8.7-5.3c-2.6,2.3-5.4,4.1-8.6,5.3c-3.2,1.2-6.5,1.8-10,1.8c-3.9,0-7.5-0.7-10.9-2.2
                c-3.4-1.5-6.3-3.4-8.9-5.9c-2.5-2.5-4.5-5.5-6-8.9c-1.5-3.4-2.2-7-2.2-10.8V39h18.7v46.6c0,1.3,0.2,2.5,0.7,3.6
                c0.5,1.1,1.1,2.1,2,2.9c0.8,0.8,1.8,1.5,2.9,2c1.1,0.5,2.3,0.7,3.6,0.7c1.3,0,2.5-0.2,3.6-0.7c1.1-0.5,2.1-1.1,3-2
                c0.9-0.8,1.5-1.8,2-2.9c0.5-1.1,0.7-2.3,0.7-3.6V39h18.6v46.6c0,1.3,0.3,2.5,0.8,3.6c0.5,1.1,1.2,2.1,2,2.9c0.8,0.8,1.8,1.5,2.9,2
                c1.1,0.5,2.3,0.7,3.6,0.7c1.3,0,2.5-0.2,3.6-0.7c1.1-0.5,2.1-1.1,3-2c0.8-0.8,1.5-1.8,2-2.9c0.5-1.1,0.8-2.3,0.8-3.6V39h18.6V85.7z
                "
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M495.4,112.1h-42.7V93.5h42.7c1.3,0,2.4-0.5,3.3-1.4c0.9-0.9,1.4-2,1.4-3.3c0-1.3-0.5-2.2-1.4-2.6
                c-0.9-0.4-2-0.6-3.3-0.6h-19.4c-3.2,0-6.3-0.6-9.1-1.8c-2.8-1.2-5.3-2.9-7.4-5c-2.1-2.1-3.7-4.6-5-7.4c-1.2-2.8-1.8-5.9-1.8-9.1
                c0-3.2,0.6-6.3,1.8-9.1c1.2-2.8,2.9-5.3,5-7.4c2.1-2.1,4.6-3.7,7.4-5c2.8-1.2,5.9-1.8,9.1-1.8h37.8v18.6h-37.8
                c-1.3,0-2.4,0.5-3.3,1.4c-0.9,0.9-1.4,2-1.4,3.3c0,1.3,0.5,2.5,1.4,3.4c0.9,0.9,2,1.4,3.3,1.4h19.4c3.2,0,6.2,0.5,9,1.6
                c2.8,1.1,5.3,2.6,7.4,4.5c2.1,1.9,3.8,4.2,5,6.9c1.2,2.7,1.8,5.6,1.8,8.8c0,3.2-0.6,6.3-1.8,9.1c-1.2,2.8-2.9,5.3-5,7.4
                c-2.1,2.1-4.6,3.8-7.4,5C501.5,111.5,498.5,112.1,495.4,112.1z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M550.5,19c0,1.7-0.3,3.3-1,4.9c-0.7,1.5-1.6,2.8-2.7,3.9c-1.1,1.1-2.5,2-4,2.7c-1.5,0.7-3.2,1-4.9,1
                c-1.7,0-3.4-0.3-4.9-1c-1.5-0.7-2.8-1.5-4-2.7c-1.1-1.1-2-2.4-2.7-3.9c-0.7-1.5-1-3.1-1-4.9c0-1.7,0.3-3.3,1-4.8
                c0.7-1.5,1.6-2.8,2.7-4c1.1-1.1,2.4-2,4-2.7c1.5-0.7,3.2-1,4.9-1c1.7,0,3.4,0.3,4.9,1c1.5,0.7,2.9,1.5,4,2.7c1.1,1.1,2,2.4,2.7,4
                C550.2,15.7,550.5,17.3,550.5,19z M547.3,112.1h-18.8V38.9h18.8V112.1z"
              />
              <motion.path
                style={{
                  fill: "none",
                  stroke: "rgba(255, 255, 255, 0.6)",
                  strokeWdith: 30,
                }}
                strokeWidth="2"
                stroke-linecap="round"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                class="st0"
                d="M625.5,53.5l-13.7,13.7c-0.7-1.9-1.6-3.6-2.8-5.2c-1.2-1.5-2.5-2.8-4-3.9c-1.5-1-3.1-1.8-4.8-2.4
                c-1.7-0.5-3.5-0.8-5.3-0.8c-2.6,0-5,0.5-7.2,1.6c-2.3,1-4.2,2.5-5.9,4.4c-1.7,1.9-3,4.1-3.9,6.7c-1,2.6-1.4,5.5-1.4,8.6
                c0,2.6,0.5,4.9,1.4,7.2c1,2.2,2.3,4.2,3.9,5.9c1.7,1.7,3.6,3,5.9,4c2.3,1,4.7,1.4,7.2,1.4c1.8,0,3.6-0.3,5.3-0.8
                c1.7-0.5,3.3-1.2,4.8-2.2c1.5-0.9,2.8-2.1,4-3.4c1.2-1.3,2.1-2.8,2.8-4.5l13.7,13.7c-1.7,2.5-3.7,4.7-6,6.6c-2.3,2-4.7,3.6-7.3,5
                c-2.6,1.4-5.4,2.4-8.3,3.1c-2.9,0.7-5.9,1.1-8.9,1.1c-5.2,0-10-1-14.5-2.9c-4.5-1.9-8.5-4.6-11.9-8c-3.4-3.4-6.1-7.3-8-11.8
                c-2-4.5-2.9-9.3-2.9-14.5c0-5.6,1-10.8,2.9-15.7c2-4.9,4.6-9.1,8-12.7c3.4-3.6,7.4-6.5,11.9-8.6c4.5-2.1,9.4-3.1,14.5-3.1
                c3.1,0,6,0.4,9,1.2c2.9,0.8,5.7,1.9,8.4,3.4c2.7,1.5,5.1,3.3,7.4,5.4C621.9,48.2,623.9,50.7,625.5,53.5z"
              />
            </motion.svg>
          ) : (
            <motion.img
              src={ReviewsicSVG}
              alt=""
              variants={svgVariants}
              initial="hidden"
              animate="visible"
              className="reviewsic-svg"
              name="element"
            />
          )}
        </motion.div>

        <div
          className="login-form "
          ref={login}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ display: showLogin ? "block" : "none" }}
        >
          {token ? (
            <SpotifyApiContext.Provider value={token}>
              <Redirect to="/home" />
            </SpotifyApiContext.Provider>
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
                Scopes.appRemoteControl,
                Scopes.streaming,
                Scopes.userReadCurrentlyPlaying,
                Scopes.userReadPlaybackState,
                Scopes.userModifyPlaybackState,
                Scopes.userReadPlaybackPosition,
                Scopes.userReadPrivate,
                Scopes.userReadEmail,
              ]}
              onAccessToken={() => {
                window.location = "/home";
              }}
            />
          )}
        </div>
      </AnimatePresence>
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
        animate={{
          opacity: 1,
        }}
        transition={{ delay: 3.2 }}
      >
        <motion.img
          style={{ position: "absolute", top: "21%", left: "64%" }}
          name="element"
          className="planet planet1"
          width="100"
          height="100"
          src={Planet1}
          drag={true}
          dragMomentum={false}
        ></motion.img>
        <motion.img
          style={{ position: "absolute", top: "15%", left: "20%" }}
          name="element"
          className="planet planet2"
          width="150"
          height="150"
          src={Planet3}
          drag={true}
          dragMomentum={true}
        ></motion.img>
        <motion.img
          style={{ position: "absolute", top: "50%", left: "35%" }}
          name="element"
          className="planet planet3"
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
