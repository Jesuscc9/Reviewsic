import React, { useState, useEffect } from "react"
import { SpotifyApiContext } from "react-spotify-api"
import { api } from '../data/api'

import openSocket from "socket.io-client"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Axios from "axios"

import Navbar from "../components/Navbar"
import Card from "../components/Card"
import Loader from "../components/Loader"
import SmartRegisterForm from "../components/SmartRegisterForm"
import UpdateForm from "../components/UpdateForm"
import Contacts from "../components/Contacts"
import Login from "../components/Login"
import Cookies from "js-cookie"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "tailwindcss/tailwind.css"
import "../assets/main.css"
import "../pages/styles/Register.css"

const ENDPOINT = "/"
const API_ENDPOINT = "http://localhost:3001"
// const socket = openSocket(ENDPOINT)
const socket = openSocket("http://localhost:3001")

const Register = () => {
  const MySwal = withReactContent(Swal)

  const [songData, setSongData] = useState({
    song: "",
    image: "",
    review: "",
    artist: "",
    genre: "",
    likes: 0,
    qualification: 0,
    song_id: "",
    updateId: 0,
    author: "",
    author_id: "",
    spotifyUrl: "",
  })

  const [spotifyData, setSpotifyData] = useState({
    profileImage: "",
    playlistId: "",
  })

  const [songList, setSongList] = useState([])
  const [users, setUsers] = useState([])

  const [likedSongs, setlikedSongs] = useState(undefined)
  const [token, setToken] = useState(undefined)
  const [loaded, setLoaded] = useState(false)

  useEffect(async () => {
    let res = await Axios.get(`${API_ENDPOINT}/api/get`)

    console.log(res.data)

    setSongList(res.data)

    setToken(
      Cookies.get("spotifyAuthToken") == undefined
        ? ""
        : Cookies.get("spotifyAuthToken")
    )

    if (token) fetchSpotifyData()
  }, [token])

  api.endpoint = 'http://localhost:3001'
  api.data = songData
  api.songList = songList

  const submitReview = async () => {
    setSongList(songList.push(await api.insert()))
    socket.emit("updateReviews", songList)
  }

  const deleteReview = async (id) => {
    setSongList(await api.delete(id, songList))
    socket.emit("updateReviews", songList)
  }

  const updateReview = async (id) => {
    setSongList(await api.update(id, songList))
    socket.emit("updateReviews", songList)
  }

  const smartRegister = () => {
    MySwal.fire({
      html: (
        <React.Fragment>
          <SmartRegisterForm
            onSongChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                song: e,
              }))
            }}
            selectImage={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                image: e,
              }))
            }}
            onArtistChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                artist: e,
              }))
            }}
            onCommentChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                review: e,
              }))
            }}
            onSpotifyUrlChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                spotifyUrl: e,
              }))

              if(e.length >= 52){
                setSongData(prevState => ({
                  ...prevState,
                  song_id: e.slice(31, 53)
                }))
              }
            }}
            ratingChanged={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                qualification: e,
              }))
            }}
            onSubmit={(e) => {
              document.getElementById("button").click()
              MySwal.close()
            }}
          />
        </React.Fragment>
      ),

      showConfirmButton: false,
    })
  }

  const alertUpdateForm = (data) => {
    console.log(data)
    setSongData(data)
    
    MySwal.fire({
      html: (
        <UpdateForm
          data={data}
          onCommentChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              review: e,
            }))
          }}
          ratingChanged={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              qualification: e,
            }))
          }}
          onSubmit={async (e) => {
            updateReview(data.id)
            MySwal.close()
          }}
        />
      ),

      showConfirmButton: false,
    })
  }

  var playlistId = ""

  const fetchSpotifyData = async () => {

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    }

    if (songData.author_id == "") {
      let userSpotifyData = await Axios.get(
        "https://api.spotify.com/v1/me",
        config
      )

      let user_image = userSpotifyData.data.images.length
        ? userSpotifyData.data.images[0].url
        : "http://dissoftec.com/NicePng_user-png_730154.jpeg"

      setSpotifyData((prevState) => ({
        ...prevState,
        image: user_image,
      }))

      setSongData((prevState) => ({
        ...prevState,
        author_id: userSpotifyData.data.id,
        author: userSpotifyData.data.display_name
      }))

      const newUser = {
        nickname: userSpotifyData.data.display_name,
        followers: userSpotifyData.data.followers.total,
        url: userSpotifyData.data.href,
        type: userSpotifyData.data.product,
        image: user_image,
        id: userSpotifyData.data.id,
      }

      socket.emit("new user", newUser)

      socket.on("usernames", (data) => {
        setUsers(data)
      })

      socket.on("updateReviews", (data) => {
        setSongList(data)
      })

      const playlists = await Axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        config
      )

      const reviewsicExists = () => {
        const playlists_ = playlists.data.items

        for (let i = 0; i < playlists_.length; i++) {
          if (playlists_[i].name === "Reviewsic") {
            setSpotifyData((prevState) => ({
              ...prevState,
              playlistId: playlists_[i].id,
            }))
            playlistId = playlists_[i].id
            return true
          }
        }

        return false
      }

      if (reviewsicExists()) {
        setlikedSongs(
          await getAllSongs(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            []
          )
        )
      } else {
        const createPlaylist = await Axios.post(
          `https://api.spotify.com/v1/users/${userSpotifyData.data.id}/playlists`,
          {
            name: "Reviewsic",
          },
          config
        )
        spotifyData.playlistId = createPlaylist.data.id
      }

      setLoaded(true)

      async function getAllSongs(url, items) {
        const songs = await Axios.get(url, config)

        songs.data.items.forEach((e) => {
          items.push(e)
        })

        if (songs.data.next === null) return items

        return getAllSongs(songs.data.next, items)
      }

      const songs = await getAllSongs(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        []
      )

      setlikedSongs(songs)
    }
  }

  return (
    <React.Fragment>
      <Navbar
        onAddClick={() => {
          smartRegister()
        }}
        profileImage={spotifyData.image}
        token={token}
      ></Navbar>
      <button onClick={submitReview} id="button"></button>
      <button onClick={updateReview} id="update-button"></button>

      <ToastContainer />

      {token != undefined ? (
        <React.Fragment>
          {token.length > 0 ? (
            <React.Fragment>
              <SpotifyApiContext.Provider value={token}>
                <div className="main-container">
                  <div className="card-container">
                    {!loaded ? (
                      <Loader />
                    ) : (
                      <React.Fragment>
                        {songList.length && likedSongs != undefined ? (
                          songList.map((item) => {
                            return (
                              <Card
                                data={item}
                                user={songData.author_id}
                                key={item.id}
                                update={() => {
                                  alertUpdateForm(item)
                                }}
                                delete={(e) => {
                                  deleteReview(e.id)
                                }}
                                likedSongs={likedSongs}
                              />
                            )
                          })
                        ) : (
                          <div>Not reviews registered yet 😕.</div>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                  <div className="contact-container">
                    <Contacts users={users} />
                  </div>
                </div>
              </SpotifyApiContext.Provider>
            </React.Fragment>
          ) : (
            <Login />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  )
}

export default Register
