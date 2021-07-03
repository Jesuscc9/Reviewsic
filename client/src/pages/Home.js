import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/img/music.png";
import Phone from "../assets/img/3DPhoneWithNoDecoTrim2.png";
import Hands from "../assets/img/3DHands.png";
import "../assets/animate.css";
import Features from "../assets/img/3DFeatures.png";
import Music from "../assets/img/3DMusic.png";
import VioleteSphere from "../assets/img/3DShapes/VioleteSphere.png";
import GreenSphere from "../assets/img/3DShapes/GreenSphere.png";
import OrangeSphere from "../assets/img/3DShapes/OrangeSphere.png";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import Cookies from "js-cookie";
import { SpotifyApiContext } from "react-spotify-api";
import { AnimatePresence, motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import Footer from "../components/Footer";
import { watchViewport, unwatchViewport, getViewportState } from "tornis";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import Bounce from "react-reveal/Bounce";
import Slide from "react-reveal/Flip";

import {
  GlobalStyles,
  Navbar,
  MainContainer,
  DecorationSquare,
} from "./styles/Home.style";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const token = Cookies.get("spotifyAuthToken");
  const scopes = [
    Scopes.playlistModifyPrivate,
    Scopes.userReadPrivate,
    Scopes.playlistModifyPublic,
    Scopes.appRemoteControl,
    Scopes.streaming,
    Scopes.userReadCurrentlyPlaying,
    Scopes.userReadPlaybackState,
    Scopes.userModifyPlaybackState,
    Scopes.userReadPlaybackPosition,
    Scopes.userReadPrivate,
    Scopes.userReadEmail,
  ];

  const [scrolled, setScrolled] = useState(false);
  const [actualSection, setActualSection] = useState("");

  const updateValues = ({ scroll }) => {
    if (scroll.changed && scroll.velocity.x == 0 && scroll.velocity.y == 0) {
      if (scroll.top > 1) {
        if (!scrolled) {
          setScrolled(true);
        }
      } else {
        if (scrolled) {
          setScrolled(false);
        }
      }

      if (scroll.top <= 900) {
        if (actualSection != "") {
          setActualSection("");
        }
      }
    }
  };

  watchViewport(updateValues);

  const featuresRef = React.useRef(null);
  const popularRef = React.useRef(null);

  return (
    <>
      {!token ? (
        <SpotifyApiContext.Provider value={token}>
          <GlobalStyles />

          <Navbar shadowed={scrolled}>
            <Link className="title" to="/">
              <img src={Logo} alt="" />
              <h1>Reviewsic</h1>
            </Link>
            <div className="menu">
              <div className="link">
                <Link
                  onClick={() => {
                    featuresRef.current.scrollIntoView();
                    setActualSection("features");
                  }}
                >
                  Features
                </Link>
                <div
                  className={`line ${
                    actualSection == "features" && "selected-line"
                  }`}
                ></div>
              </div>
              <div className="link">
                <Link
                  onClick={() => {
                    popularRef.current.scrollIntoView();
                    setActualSection("popular");
                  }}
                >
                  Popular
                </Link>
                <div
                  className={`line ${
                    actualSection == "popular" && "selected-line"
                  }`}
                ></div>
              </div>
              <div
                className="link signin-button"
                onClick={() => {
                  document.getElementsByClassName("loginbutton")[0].click();
                }}
              >
                <Link to="/register">Log In</Link>
                <div className="line"></div>
              </div>
            </div>
          </Navbar>
          <MainContainer>
            <div className="first-container">
              <div className="content">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h1>Discover NEW music</h1>
                </motion.div>
                <div className="line"></div>
                <p>
                  Share your toughts about your favorite music, and be part of
                  worlwide communities with common music interest!
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <SpotifyAuth
                    noLogo={true}
                    title={"Get Started!"}
                    redirectUri="http://localhost:3000/"
                    // redirectUri="https://reviewsic.herokuapp.com/"
                    clientID="9751c1f85b2a4684a8cc0a02f6942b91"
                    btnClassName="loginbutton"
                    scopes={scopes}
                    onAccessToken={() => {
                      window.location = "/home";
                    }}
                  >
                    <p>Get Started!</p>
                  </SpotifyAuth>
                </motion.div>
              </div>

              <div className="image-container">
                <div className="background-image">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <DecorationSquare />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ y: -3000 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <img className="phone" src={Phone} alt="" />
                </motion.div>
              </div>
            </div>
            <div className="second-container container" ref={featuresRef}>
              <h1>Features</h1>

              <div className="features">
                <Bounce duration={700}>
                  <section>
                    <div className="feature first">
                      <div className="header">
                        <img src={Features} alt="" />
                      </div>
                      <div className="body">
                        Interact with your own and others reviews! Like, rate
                        and save all the music you want.
                      </div>
                    </div>
                  </section>
                </Bounce>

                <Bounce duration={700}>
                  <section>
                    <div className="feature second">
                      <div className="header">
                        <img src={Music} alt="" />
                      </div>
                      <div className="body">
                        Use the spotify incorporated player as any other device
                        with your spotify account!
                      </div>
                    </div>
                  </section>
                </Bounce>

                <Bounce duration={700}>
                  <section>
                    <div className="feature third">
                      <div className="coming-soon-container">
                        <div className="coming-soon">
                          <p>Coming Soon!</p>
                        </div>
                      </div>
                      <div className="header">
                        <img src={Hands} alt="" />
                      </div>
                      <div className="body">
                        Create and join to groups to share music about a
                        specific genre, artist, album or whatever you want!
                      </div>
                    </div>
                  </section>
                </Bounce>
              </div>
            </div>

            <div className="third-container container" ref={popularRef}>
              <h1>Popular on Reviewsic</h1>
              <div className="releases">
                <div className="release-container">
                  <div className="ball-decoration">
                    <img src={VioleteSphere} alt="" className="ball" />
                  </div>
                  <Slide left>
                    <section>
                      <a
                        className="release"
                        href="https://open.spotify.com/track/5mIOsPuQdXchVY0jB5NO9Q?si=9babbe31b2214403"
                        target="_blank"
                      >
                        <div className="image-container">
                          <img src="https://i.scdn.co/image/ab67616d00001e0271179dd3ac3cba1d14920469" />
                        </div>
                        <div className="song-data">
                          <p className="song">4EVER</p>
                          <p className="artist">Clairo</p>
                          <div className="stars">
                            <ReactStars
                              count="5"
                              size="30"
                              value="5"
                              edit={false}
                            />
                          </div>
                        </div>
                      </a>
                    </section>
                  </Slide>
                </div>
                <div className="release-container second-release">
                  <div className="ball-decoration">
                    <img src={GreenSphere} alt="" className="ball ballsecond" />
                  </div>
                  <Slide right>
                    <section>
                      <a
                        className="release second"
                        href="https://open.spotify.com/track/6z6Nd3M3D38XJMnkEC0GZh?si=e39c0117661d47b0"
                        target="_blank"
                      >
                        <div className="image-container">
                          <img src="https://i.scdn.co/image/ab67616d00001e02e11f1ac4d5dce1bc5fec6703" />
                        </div>
                        <div className="song-data">
                          <p className="song">Last man on the earth</p>
                          <p className="artist">Wolf Alice</p>
                          <div className="stars">
                            <ReactStars
                              count="5"
                              size="30"
                              value="4.5"
                              edit={false}
                            />
                          </div>
                        </div>
                      </a>
                    </section>
                  </Slide>
                </div>
                <div className="release-container third-release">
                  <div className="ball-decoration">
                    <img src={OrangeSphere} alt="" className="ball ballthird" />
                  </div>
                  <Slide left>
                    <section>
                      <a
                        className="release third"
                        href="https://open.spotify.com/track/0t1WPoT5kNNIyNyUbOBOsV?si=76e424b0051440d8"
                        target="_blank"
                      >
                        <div className="image-container">
                          <img src="https://i.scdn.co/image/ab67616d00001e021f028a147500800d81ac1b32" />
                        </div>
                        <div className="song-data">
                          <p className="song">Slide</p>
                          <p className="artist">Jake Bugg</p>
                          <div className="stars">
                            <ReactStars
                              count="5"
                              size="30"
                              value="5"
                              edit={false}
                            />
                          </div>
                        </div>
                      </a>
                    </section>
                  </Slide>
                </div>
              </div>
            </div>
            <br />
          </MainContainer>
          <Footer token="" />
        </SpotifyApiContext.Provider>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default Home;
