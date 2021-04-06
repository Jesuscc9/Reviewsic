import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { api } from "../data/api";
import { spotifyApi } from "../data/spotifyApi";

import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SmartRegisterForm from "../components/SmartRegisterForm";
import UpdateForm from "../components/UpdateForm";
import Contacts from "../components/Contacts";
import Login from "../components/Login";
import DropdownMenu from "../components/DropdownMenu";
import Cookies from "js-cookie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "tailwindcss/tailwind.css";
import "../assets/main.css";
import "../pages/styles/Register.css";

const ENDPOINT = "/";
const API_ENDPOINT = "http://localhost:3001";
// const socket = openSocket(ENDPOINT)
const socket = openSocket("http://localhost:3001");

const Register = () => {
  const MySwal = withReactContent(Swal);

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
    date: "",
  });

  const [spotifyData, setSpotifyData] = useState({
    profileImage: undefined,
    playlistId: "",
  });

  const [songList, setSongList] = useState([]);
  const [users, setUsers] = useState([]);

  const [likedSongs, setlikedSongs] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(undefined);

  const sortArray = (array) => {
    let sorted = []
    if(array) {
      sorted = array.sort((a, b) => b[sortType] - a[sortType]);
    }else{
      sorted = [...songList].sort((a, b) => b[sortType] - a[sortType]);
    }
    setSongList(sorted);
  };

  useEffect(async () => {
    const songs = await Axios.get(`${API_ENDPOINT}/api/get`);
    setSongList(songs.data);

    setToken(
      !Cookies.get("spotifyAuthToken") ? "" : Cookies.get("spotifyAuthToken")
    );

    if (token && token.length && !sortType) {
      spotifyApi.setConfig(token);
      let fetch = await spotifyApi.get();

      setSongData((prevState) => ({
        ...prevState,
        author: spotifyApi.songData.author,
        author_id: spotifyApi.songData.author_id,
      }));

      setSpotifyData({
        profileImage: spotifyApi.data.profileImage,
        playlistId: await spotifyApi.playlist.create(),
      });

      setlikedSongs(
        await spotifyApi.playlist.get(
          `https://api.spotify.com/v1/playlists/${await spotifyApi.playlist.create()}/tracks`
        )
      );

      socket.emit("new user", spotifyApi.user);

      socket.on("usernames", (data) => {
        setUsers(data);
      });

      socket.on("updateReviews", (data) => {
        setSongList(data);
        sortArray(data)
      });

      setLoaded(true);
    }

    sortArray();
  }, [token, sortType]);

  api.endpoint = "http://localhost:3001";
  api.data = songData;
  api.songList = songList;

  const submitReview = async () => {
    const aux = songList
    aux.push(await api.insert())
    setSongList(aux);
    socket.emit("updateReviews", aux);
  };

  const updateReview = async (id) => {
    setSongList(await api.update(id, songList));
    socket.emit("updateReviews", songList);
  };

  const deleteReview = async (id) => {
    const data = await api.delete(id, songList);
    setSongList(data);
    socket.emit("updateReviews", data);
  };

  const smartRegister = () => {
    MySwal.fire({
      html: (
        <React.Fragment>
          <SmartRegisterForm
            onSongChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                song: e,
              }));
            }}
            selectImage={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                image: e,
              }));
            }}
            onArtistChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                artist: e,
              }));
            }}
            onCommentChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                review: e,
              }));
            }}
            onSpotifyUrlChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                spotifyUrl: e,
              }));

              if (e.length >= 52) {
                setSongData((prevState) => ({
                  ...prevState,
                  song_id: e.slice(31, 53),
                }));
              }
            }}
            ratingChanged={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                qualification: e,
              }));
            }}
            onSubmit={(e) => {
              submitReview();
              MySwal.close();
            }}
          />
        </React.Fragment>
      ),

      showConfirmButton: false,
    });
  };

  const alertUpdateForm = (data) => {
    setSongData(data);

    MySwal.fire({
      html: (
        <UpdateForm
          data={data}
          onCommentChange={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              review: e,
            }));
          }}
          ratingChanged={(e) => {
            setSongData((prevState) => ({
              ...prevState,
              qualification: e,
            }));
          }}
          onSubmit={async (e) => {
            updateReview(data.id);
            MySwal.close();
          }}
        />
      ),

      showConfirmButton: false,
    });
  };

  return (
    <React.Fragment>
      <Navbar
        onAddClick={() => {
          smartRegister();
        }}
        profileImage={
          spotifyData.profileImage
            ? spotifyData.profileImage
            : "http://dissoftec.com/NicePng_user-png_730154.jpeg"
        }
        token={token}
      ></Navbar>
      <br />

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
                          <React.Fragment>
                            <DropdownMenu
                              onDateSort={() => {
                                sortArray(songList);
                                setSortType('date')
                              }}
                              onLikesSort={() => {
                                sortArray(songList);
                                setSortType('likes')
                              }}
                            />
                            {(songList.sort((a, b) => b[sortType] - a[sortType])).map((item) => {
                              return (
                                <Card
                                  data={item}
                                  user={songData.author_id}
                                  key={item.id}
                                  update={() => {
                                    alertUpdateForm(item);
                                  }}
                                  delete={(e) => {
                                    deleteReview(e.id);
                                  }}
                                  likedSongs={likedSongs}
                                  addSong={async (songId) => {
                                    spotifyApi.playlist.add(songId, token);
                                    api.data = item;
                                    setSongList(await api.setLikes(item.id, songList, item.likes + 1));
                                    sortArray()
                                  }}
                                  deleteSong={async (songId, uri, pos) => {
                                    spotifyApi.playlist.delete(songId, uri, pos, token);
                                    api.data = item;
                                    setSongList(await api.setLikes(item.id, songList, item.likes - 1));
                                    sortArray()
                                  }}
                                />
                              );
                            })}
                          </React.Fragment>
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
  );
};

export default Register;
