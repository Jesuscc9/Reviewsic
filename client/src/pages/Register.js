import React, { useState, useEffect, Component } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { api } from "../data/api";
import { spotifyApi } from "../data/spotifyApi";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import userActions from "../redux/user/actions";

import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardsList from "../components/CardsList";
import CompleteCard from "../components/CompleteCard";
import CardsCarousel from "../components/CardsCarousel";
import Loader from "react-loader-spinner";
import RegisterForm from "../components/RegisterForm";
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
import { useParams } from "react-router";

const API_ENDPOINT = "http://localhost:3001";
// const API_ENDPOINT = "";
const socket = openSocket(API_ENDPOINT);
// const socket = openSocket("/")

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
  const [showCards, setShowCards] = useState(false);

  const [likedSongs, setlikedSongs] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(undefined);
  const [cardView, setCardView] = useState("categories");

  const dispatch = useDispatch();

  const sortArray = () => {
    let sorted = [];
    if (sortType === "song")
      sorted = [...songList].sort((a, b) =>
        a[sortType].localeCompare(b[sortType], "en", { sensitivity: "base" })
      );
    else sorted = [...songList].sort((a, b) => b[sortType] - a[sortType]);
    return sorted;
  };

  useEffect(async () => {
    setToken(
      !Cookies.get("spotifyAuthToken") ? "" : Cookies.get("spotifyAuthToken")
    );

    if (token && token.length) {
      setSongList(await api.get());

      spotifyApi.setConfig(token);

      await spotifyApi.get();

      setSongData((prevState) => ({
        ...prevState,
        author: spotifyApi.songData.author,
        author_id: spotifyApi.songData.author_id,
      }));

      dispatch(userActions.setUser(spotifyApi.songData.author_id));

      setSpotifyData({
        profileImage: spotifyApi.data.profileImage,
        playlistId: await spotifyApi.playlist.create(),
      });

      const songsLiked = await spotifyApi.playlist.get(
        `https://api.spotify.com/v1/playlists/${await spotifyApi.playlist.create()}/tracks`
      );

      setlikedSongs(songsLiked);
      dispatch(userActions.setLikedSongs([...songsLiked]));

      socket.emit("new user", spotifyApi.user);

      socket.on("usernames", (data) => {
        setUsers(data);
      });

      socket.on("updateReviews", (data) => {
        setSongList(data);
      });

      setLoaded(true);
      setShowCards(true);
    }
  }, [token]);

  api.endpoint = API_ENDPOINT;
  api.data = songData;
  api.songList = songList;

  const submitReview = async () => {
    socket.emit("updateReviews", [...songList, await api.insert()]);
  };

  const updateReview = async (id) => {
    socket.emit("updateReviews", [...(await api.update(id, songList))]);
  };

  const deleteReview = async (id) => {
    socket.emit("updateReviews", [...(await api.delete(id, songList))]);
  };

  const handleLikeSong = async (songId, item) => {
    spotifyApi.playlist.add(songId);
    // socket.emit(
    //   "updateReviews",
    //   await api.setLikes(item.id, songList, item.likes + 1)
    // );
  };

  const handleDeleteSong = async (songId, uri) => {
    spotifyApi.playlist.delete(songId, uri, token);
    // socket.emit(
    //   "updateReviews",
    //   await api.setLikes(item.id, songList, item.likes - 1)
    // );
  };

  const registerForm = () => {
    MySwal.fire({
      html: (
        <React.Fragment>
          <RegisterForm
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

  const updateModal = (data) => {
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
    setShowCards(false);
    setTimeout(() => {
      setShowCards(true);
    }, 300);
  };

  const params = useParams();

  const CardActions = {
    update: (data) => {
      updateModal(data);
    },
    delete: (data) => {
      deleteReview(data);
    },
    addSong: (songId, data) => {
      handleLikeSong(songId, data);
    },
    deleteSong: (songId, uri) => {
      handleDeleteSong(songId, uri);
    },
  };

  // const CardCustom = ({ data }) => {
  //   return <Card data={data} />;
  // };

  const CardCompleteCustom = ({ data }) => {
    return (
      <CompleteCard
        data={data}
        user={songData.author_id}
        key={data.id}
        update={() => {
          updateModal(data);
        }}
        delete={(e) => {
          deleteReview(e.id);
        }}
        likedSongs={likedSongs}
        addSong={async (songId, data) => {
          handleLikeSong(songId, data);
        }}
        deleteSong={async (songId, uri, pos) => {
          handleDeleteSong(songId, uri, pos, data);
        }}
      />
    );
  };

  return (
    <React.Fragment>
      <Navbar
        onAddClick={() => {
          registerForm();
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

      <AnimatePresence>
        {token != undefined ? (
          <React.Fragment>
            {token.length > 0 ? (
              <React.Fragment>
                <SpotifyApiContext.Provider value={token}>
                  <div className="page-container">
                    <div className="main-container" style={{ marginTop: 10 }}>
                      <motion.div
                        className="card-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <AnimatePresence>
                          {!loaded ? (
                            <motion.div
                              key="loader"
                              initial={{ y: -200 }}
                              animate={{ y: 0 }}
                              exit={{ y: -200 }}
                              style={{ position: "absolute" }}
                            >
                              <Loader
                                type="Audio"
                                color="#6c22cdc7"
                                height={70}
                                width={70}
                                className="mt-5"
                              />
                            </motion.div>
                          ) : (
                            <React.Fragment>
                              {songList.length ? (
                                <React.Fragment>
                                  <DropdownMenu
                                    onSelect={(value) => handleDropdown(value)}
                                    onCardViewChange={(value) =>
                                      setCardView(value)
                                    }
                                  />

                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                    }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                      maxWidth: "100%",
                                      display: "flex",
                                      justifyContent: "space-around",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {cardView != "categories" ? (
                                      <CardsCarousel
                                        user={songData.author_id}
                                        likedSongs={likedSongs}
                                        songList={sortArray()}
                                        update={(item) => {
                                          updateModal(item);
                                        }}
                                        delete={(e) => {
                                          deleteReview(e.id);
                                        }}
                                        addSong={async (songId, item) => {
                                          handleLikeSong(songId, item);
                                        }}
                                        deleteSong={async (
                                          songId,
                                          uri,
                                          pos,
                                          item
                                        ) => {
                                          handleDeleteSong(
                                            songId,
                                            uri,
                                            pos,
                                            item
                                          );
                                        }}
                                        sortType={sortType}
                                      />
                                    ) : (
                                      <AnimatePresence>
                                        <CardsList
                                          songList={songList}
                                          {...CardActions}
                                        />
                                        {params.id && (
                                          <AnimatePresence>
                                            <CardCompleteCustom
                                              data={songList}
                                            />
                                          </AnimatePresence>
                                        )}
                                      </AnimatePresence>
                                    )}
                                  </motion.div>
                                </React.Fragment>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  Not reviews registered yet 😕.
                                </motion.div>
                              )}
                            </React.Fragment>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <div className="contact-container">
                        <Contacts users={users} />
                      </div>
                    </div>
                    <Footer token={token} />
                  </div>
                </SpotifyApiContext.Provider>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Login />
                <Footer token={token} />
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Register;
