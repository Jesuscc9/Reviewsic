import React, { useState, useEffect, Component } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { api } from "../data/api";
import { spotifyApi } from "../data/spotifyApi";

import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import CardsCarousel from "../components/CardsCarousel";
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
  const [cardView, setCardView] = useState("categories");

  const sortArray = () => {
    let sorted = [];
    if (sortType === "song") sorted = [...songList].sort((a, b) =>a[sortType].localeCompare(b[sortType], "en", { sensitivity: "base" }));
    else sorted = [...songList].sort((a, b) => b[sortType] - a[sortType]);
    return sorted;
  };

  useEffect(async () => {
    setToken(
      !Cookies.get("spotifyAuthToken") ? "" : Cookies.get("spotifyAuthToken")
    );

    if (token && token.length && !sortType) {
      setSongList((await Axios.get(`${API_ENDPOINT}/api/get`)).data);

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
      });

      setLoaded(true);
    }
  }, [token]);

  api.endpoint = "http://localhost:3001";
  api.data = songData;
  api.songList = songList;

  const submitReview = async () => {
    const aux = songList;
    aux.push(await api.insert());
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

  const handleAddSong = async(songId, item) => {
    spotifyApi.playlist.add(songId, token);
    api.data = item;
    socket.emit("updateReviews", await api.setLikes(
      item.id,
      songList,
      item.likes + 1
    ));
  };

  const handleDeleteSong = async(songId, uri, pos, item) => {
    spotifyApi.playlist.delete(songId, uri, pos, token);
    api.data = item;
    socket.emit("updateReviews", await api.setLikes(
      item.id,
      songList,
      item.likes - 1
    ))
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
            onGenreChange={(e) => {
              setSongData((prevState) => ({
                ...prevState,
                genre: e,
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
          token={token}
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

  const handleDropdown = (value) => {
    setSortType(value);
    setSongList([...songList]);
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
                    {!loaded ? (
                      <Loader />
                    ) : (
                      <div className="card-container">
                        {songList.length && likedSongs != undefined ? (
                          <React.Fragment>
                            <DropdownMenu
                              onSelect={(value) => handleDropdown(value)}
                              onCardViewChange={(value) => setCardView(value)}
                            />
                            {cardView == "categories" ? (
                              <CardsCarousel
                                user={songData.author_id}
                                likedSongs={likedSongs}
                                songList={sortArray()}
                                update={(item) => {
                                  alertUpdateForm(item);
                                }}
                                delete={(e) => {
                                  deleteReview(e.id);
                                }}
                                addSong={async (songId, item) => {
                                  handleAddSong(songId, item)
                                }}
                                deleteSong={async (songId, uri, pos, item) => {
                                  handleDeleteSong(songId, uri, pos, item)
                                }}
                              />
                            ) : (
                              <React.Fragment>
                                {sortArray().map((item) => {
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
                                      addSong={async (songId, item) => {
                                        handleAddSong(songId, item)
                                      }}
                                      deleteSong={async (songId, uri, pos) => {
                                        handleDeleteSong(songId, uri, pos, item)
                                      }}
                                    />
                                  );
                                })}
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                          <div>Not reviews registered yet 😕.</div>
                        )}
                      </div>
                    )}
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
      <Footer token={token}/>
    </React.Fragment>
  );
};

export default Register;
