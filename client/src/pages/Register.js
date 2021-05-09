import React, { useState, useEffect, Component } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { api } from "../data/api";
import { spotifyApi } from "../data/spotifyApi";
import { useDispatch } from "react-redux";
import userActions from "../redux/user/actions";
import { AnimatePresence, motion } from "framer-motion";

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

  return (
    <>
      <GlobalStyles />
      <Navbar
        onAddClick={() => {
          registerForm();
        }}
        profileImage={spotifyData.profileImage}
        token={token}
      ></Navbar>
      <br />

      <ToastContainer />

      {token && token.length ? (
        <SpotifyApiContext.Provider value={token}>
          <PageContainer>
            <MainContainer>
              <>
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
                          {cardView != "categories" ? (
                            <ContentContainer
                              initial={{ x: -200 }}
                              animate={{ x: 0 }}
                              exit={{ x: -200 }}
                            >
                              <DropdownMenu
                                onSelect={(value) => handleDropdown(value)}
                                onCardViewChange={(value) => setCardView(value)}
                              />
                              <CardsCarousel
                                {...CardActions}
                                songList={songList}
                                sortType={sortType}
                              />
                            </ContentContainer>
                          ) : (
                            <ContentContainer
                              initial={{ x: -200 }}
                              animate={{ x: 0 }}
                              exit={{ x: -200 }}
                            >
                              <DropdownMenu
                                onSelect={(value) => handleDropdown(value)}
                                onCardViewChange={(value) => setCardView(value)}
                              />
                              <CardsList songList={songList} {...CardActions} />
                              <AnimatePresence>
                                {params.id && (
                                  <CompleteCard
                                    data={songList.find((song) => {
                                      return song.id == params.id;
                                    })}
                                    {...CardActions}
                                    key="item"
                                  />
                                )}
                              </AnimatePresence>
                            </ContentContainer>
                          )}
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
              </>

              <Contacts users={users} />
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
