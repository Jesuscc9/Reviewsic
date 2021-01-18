import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import { SpotifyAuth, Scopes } from "react-spotify-auth"
import { SpotifyApiContext } from "react-spotify-api"

import "../assets/animate.css"
import "react-spotify-auth/dist/index.css"
import "./styles/Home.css"

import Parallax from "parallax-js"
import Stars from "../assets/img/star.svg"
import Moonlight from "../assets/img/moonlight.png"
import Clairo from "../assets/img/clairo.png"
import Slash from "../assets/img/slash.png"
import StarBackground from "../assets/img/stars-back.png"
import Cookies from "js-cookie"

const Home = () => {
  
  const [token, setToken] = useState("")

  const sceneEl = useRef(null)
  const stars = useRef(null)
  const header = useRef(null)
  const login = useRef(null)

  const elements = {
    objects: document.getElementsByName("element"),
    on: function () {
      this.objects.forEach((el) => {
        el.style.opacity = "1"
      })

      stars.current.classList.add("star-shadow")
      stars.current.style.opacity = "1"
    },
    off: function () {
      this.objects.forEach((el) => {
        el.style.opacity = "0.7"
      })

      stars.current.classList.remove("star-shadow")
      stars.current.style.opacity = "0.2"
    },
  }

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
    })

    parallaxInstance.enable()

    setTimeout(() => {
      header.current.style.display = "block"
      header.current.classList.add("animate__fadeIn")
    }, 1500)

    setToken(Cookies.get("spotifyAuthToken"))

    return () => parallaxInstance.disable()
  }, [])

  const handleClick = (e) => {
    elements.on()
    e.preventDefault()

    header.current.style.display = "block"
    header.current.classList.remove("animate__fadeIn")
    header.current.classList.add("animate__fadeOut")

    setTimeout(() => {
      login.current.style.display = "flex"
      elements.on()
    }, 500)
  }

  const onMouseEnter = (e) => {
    e.preventDefault()
    elements.on()
  }

  const onMouseLeave = (e) => {
    e.preventDefault()
    elements.off()
  }


  return (
    <React.Fragment>
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
        <h1 className="title">Reviewsic</h1>
      </div>

      <div
        className="login-form animate__animated animate__fadeIn"
        ref={login}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
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
            redirectUri="http://localhost:3000/"
            clientID="9751c1f85b2a4684a8cc0a02f6942b91"
            scopes={[Scopes.userReadPrivate, "user-read-email"]}
          />
        )}
      </div>

      <Link to="/home" id="link"></Link>

      <div id="container">
        <div id="scene" ref={sceneEl} data-scalar-x="10" data-scalar-y="10">
          <div data-depth="0.2">
            <img src={Stars} className="stars" />
          </div>

          <div data-depth="0.1">
            <img src={StarBackground} ref={stars} className="star" />
          </div>

          <div data-depth="0.3">
            <img className="moonlight" src={Moonlight} />
          </div>

          <div data-depth="1" className="clairo-container">
            <img className="clairo" name="element" src={Clairo} />
          </div>

          <div data-depth="1" className="slash-container">
            <img name="element" className="slash" src={Slash} />
          </div>
        </div>
      </div>

      <style>
        {
          "\
        body{\
          background: rgb(7,33,64) !important;\
          background: linear-gradient(90deg, rgba(7,33,64,1) 0%, rgba(8,33,57,1) 100%);\
          overflow-y: hidden !important;\
          overflow-x: hidden !important;\
        }\
      "
        }
      </style>
    </React.Fragment>
  )
}

export default Home
