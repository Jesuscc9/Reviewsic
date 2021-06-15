import React, { useState, useEffect, Component } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { api } from "../data/api";
import { spotifyApi } from "../data/spotifyApi";
import { useDispatch } from "react-redux";
import userActions from "../redux/user/actions";
import { AnimatePresence, motion } from "framer-motion";
import { Redirect } from "react-router-dom";

import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
import Player from "../components/Player";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "tailwindcss/tailwind.css";
import "../assets/main.css";
import "../pages/styles/Register.css";
import {
  GlobalStyles,
  PageContainer,
  MainContainer,
  ContentContainer,
} from "./styles/Register.style";
import { useParams } from "react-router";

const API_ENDPOINT = "http://localhost:3001";
// const API_ENDPOINT = "";
const socket = openSocket(API_ENDPOINT);
// const socket = openSocket("/")

const Register = () => {
  const MySwal = withReactContent(Swal);

  const [userData, setUserData] = useState({});

  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [showCards, setShowCards] = useState(false);

  // const [playerStatus, setPlayerStatus] = useState({});
  const [playingSong, setPlayingSong] = useState();
  const [auxPlayingSong, setAuxPlayingSong] = useState();

  const [token, setToken] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(undefined);
  const [cardView, setCardView] = useState("categories");

  const [likes, setLikes] = useState([]);
  const [songList, setSongList] = useState([]);
  const [qualifications, setQualifications] = useState([]);

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
      setLikes(await api.getLikes());
      setQualifications(await api.getQualifications());

      dispatch(userActions.setToken(token));

      await spotifyApi.get();

      const playlistId = await spotifyApi.playlist.create();

      dispatch(userActions.setUser(spotifyApi.user));
      dispatch(userActions.setPlaylistId(playlistId));

      setUserData(spotifyApi.user);

      const songsLiked = await spotifyApi.playlist.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      );

      dispatch(userActions.setLikedSongs([...songsLiked]));

      socket.emit("new user", spotifyApi.user);

      socket.on("users", (data) => {
        setUsers(data);
      });

      socket.on("updateReviews", (data) => {
        setSongList(data);
      });

      socket.on("updateLikes", (data) => {
        setLikes(data);
      });

      socket.on("updateQualifications", (data) => {
        setQualifications([...data]);
      });

      setLoaded(true);
      setShowCards(true);
    }
  }, [token]);

  api.endpoint = API_ENDPOINT;
  api.songList = songList;

  const submitReview = async (data) => {
    socket.emit("updateReviews", [
      ...songList,
      await api.insert({ ...userData, ...data }),
    ]);
  };

  const updateReview = async (data, id) => {
    socket.emit("updateReviews", [...(await api.update(data, id, songList))]);
  };

  const deleteReview = async (id) => {
    socket.emit("updateReviews", [...(await api.delete(id, songList))]);
    setRedirect(true);
  };

  const registerForm = () => {
    MySwal.fire({
      html: (
        <React.Fragment>
          <RegisterForm
            submit={(data) => {
              submitReview(data);
              MySwal.close();
            }}
          />
        </React.Fragment>
      ),

      showConfirmButton: false,
    });
  };

  const updateModal = (id) => {
    MySwal.fire({
      html: (
        <UpdateForm
          data={songList.find((e) => {
            return e.id == id;
          })}
          submit={async (data) => {
            updateReview(data, id);
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

  const CardActions = {
    update: (id) => {
      updateModal(id);
    },
    delete: (data) => {
      deleteReview(data);
    },
    like: async (data) => {
      socket.emit("updateLikes", [...(await api.setLikes(data))]);
    },
    qualify: async (data) => {
      socket.emit("updateQualifications", [
        ...(await api.setQualifications(data)),
      ]);
    },
    playSong: (song) => {
      setPlayingSong((prevState) => ({
        ...prevState,
        ...song,
        paused: false,
      }));
    },
    pause: () => {
      setPlayingSong((prevState) => ({
        ...prevState,
        paused: true,
      }));
    },
  };

  const params = useParams();

  const reviewExists =
    songList.length &&
    songList.filter((e) => {
      return e.id == params.id;
    }).length;

  return (
    <>
      {redirect && <Redirect to="/home" />}
      <GlobalStyles />
      <Navbar
        onAddClick={() => {
          registerForm();
        }}
        profileImage={userData.image}
        token={token}
      ></Navbar>
      <br />

      <ToastContainer />

      {token && token.length ? (
        <SpotifyApiContext.Provider value={token}>
          <PageContainer>
            <MainContainer>
              <AnimatePresence>
                {!loaded ? (
                  <ContentContainer
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
                  </ContentContainer>
                ) : (
                  <React.Fragment>
                    {songList.length ? (
                      <AnimatePresence>
                        <ContentContainer
                          initial={{ x: -200 }}
                          animate={{ x: 0 }}
                          exit={{ x: -200 }}
                        >
                          <DropdownMenu
                            onSelect={(value) => handleDropdown(value)}
                            onCardViewChange={(value) => setCardView(value)}
                          />
                          <CardsList
                            songList={songList}
                            likes={likes}
                            {...CardActions}
                          />
                          <AnimatePresence>
                            {params.id && reviewExists && (
                              <CompleteCard
                                data={songList.find((song) => {
                                  return song.id == params.id;
                                })}
                                likes={likes}
                                qualifications={qualifications}
                                {...CardActions}
                                key="item"
                                song={playingSong}
                              />
                            )}
                          </AnimatePresence>
                        </ContentContainer>
                      </AnimatePresence>
                    ) : (
                      <ContentContainer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Not reviews registered yet 😕.
                        </p>
                      </ContentContainer>
                    )}
                  </React.Fragment>
                )}
              </AnimatePresence>

              <div className="sidebar">
                <Contacts data={users} />
                <div
                  className="player-container"
                  style={{
                    transform: playingSong ? "scale(1)" : "scale(0.6)",
                    opacity: playingSong ? 1 : 0,
                  }}
                >
                  <Player
                    token={token}
                    song={playingSong}
                    setInitialSong={(song) => {
                      setPlayingSong(song);
                    }}
                  />
                </div>
              </div>
            </MainContainer>
            <Footer token={token} />
          </PageContainer>
        </SpotifyApiContext.Provider>
      ) : (
        <>
          {token != undefined && !token.length && <Login />}
          <Footer />
        </>
      )}
    </>
  );
};

export default Register;
