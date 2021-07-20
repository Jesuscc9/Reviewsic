import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pages/styles/Register.css";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "../data/api";
import { DEVELOPMENT } from "../data/utils";
import Loader from "react-loader-spinner";
import CardsList from "../components/CardsList";
import CompleteCard from "../components/CompleteCard";
import LoadMore from "../components/LoadMore";
import DropdownMenu from "../components/DropdownMenu";
import Player from "../components/Player";
import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdateForm from "../components/UpdateForm";
import { useSelector, useDispatch } from "react-redux";
import { spotifyApi } from "../data/spotifyApi";
import userActions from "../redux/user/actions";

import {
  GlobalStyles,
  PageContainer,
  MainContainer,
  ContentContainer,
} from "./styles/Register.style";

import { UserPresentation } from "./styles/User.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/fontawesome-free-brands";

const API_ENDPOINT = DEVELOPMENT ? "http://localhost:3001" : "";
const socket = openSocket(API_ENDPOINT);

const UserPage = () => {
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal);
  const [userData, setUserData] = useState({});

  const [redirect, setRedirect] = useState(undefined);
  const [cardsLimit, setCardsLimit] = useState(12);

  const [playingSong, setPlayingSong] = useState();

  const [token, setToken] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);

  const [likes, setLikes] = useState([]);
  const [songList, setSongList] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const params = useParams();

  const reviewExists =
    songList.length &&
    songList.filter((e) => {
      return e.id == params.id;
    }).length;

  useEffect(async () => {
    setToken(
      !Cookies.get("spotifyAuthToken") ? "" : Cookies.get("spotifyAuthToken")
    );

    if (!params.id) {
      setRedirect("home");
    }

    if (token && token.length) {
      await spotifyApi.get();
      dispatch(userActions.setUser(spotifyApi.user));
      setUserData(spotifyApi.user);

      api.endpoint = API_ENDPOINT;
      setSongList(await api.getByUser(params.id));

      socket.on("updateLikes", (data) => {
        setLikes(data);
      });

      socket.on("updateQualifications", (data) => {
        setQualifications([...data]);
      });

      setLoaded(true);
    }
  }, [token]);

  var listened = false;

  useEffect(() => {
    if (songList.length > 0 && !listened) {
      listened = true;
      socket.on("newReview", (data) => {
        setSongList([...songList, data]);
      });

      socket.on("updateReview", ({ data, id }) => {
        console.log("se actualiza opa");
        setSongList(
          [...songList].map((e) => {
            return e.id == id ? { ...e, ...data } : e;
          })
        );
      });

      socket.on("deleteReview", (id) => {
        setSongList(
          songList.filter((e) => {
            return e.id != id;
          })
        );
      });
    }
  }, [songList]);

  const updateReview = async (data, id) => {
    socket.emit("updateReviews", [...(await api.update(data, id, songList))]);
  };

  const deleteReview = async (id) => {
    socket.emit("updateReviews", [...(await api.delete(id, songList))]);
    setRedirect("user");
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

  const updateActivity = (activity) => {
    socket.emit("updateActivity", { userId: userData.userId, activity });
  };

  return (
    <>
      {redirect && <Redirect to={`/${redirect}`} />}
      <GlobalStyles />
      <Navbar token={token}></Navbar>
      <br />
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
                          <UserPresentation>
                            <div className="user-data">
                              {" "}
                              <div className="image">
                                <img src={userData.image} alt="" />
                              </div>
                              <div className="data">
                                <h1 className="username">{userData.user}</h1>
                                <p className="followers">
                                  {userData.followers} follower
                                  {userData.followers > 1 && "s"}
                                </p>
                              </div>
                            </div>
                            <button className="spotify-button">
                              <a href={userData.spotifyUrl} target="_blank">
                                <FontAwesomeIcon icon={faSpotify} />
                              </a>
                            </button>
                          </UserPresentation>

                          <CardsList
                            songList={songList}
                            likes={likes}
                            qualifications={qualifications}
                            sortType={sortType}
                            filters={filters}
                            search={search}
                            limit={cardsLimit}
                            redirect="user"
                            {...CardActions}
                          />
                          {cardsLimit < songList.length &&
                            !search.length &&
                            !filters.length && (
                              <LoadMore
                                onLoadMore={() => {
                                  setCardsLimit(cardsLimit + 4);
                                }}
                              />
                            )}
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
                                userType={userData.type}
                                page="user"
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
                <div
                  className="player-container"
                  style={{
                    transform: playingSong ? "scale(1)" : "scale(0.6)",
                    opacity: playingSong ? 1 : 0,
                  }}
                >
                  {userData.type == "premium" && (
                    <Player
                      token={token}
                      song={playingSong}
                      setInitialSong={(song) => {
                        setPlayingSong(song);
                      }}
                      updateActivity={(activity) => {
                        updateActivity(activity);
                      }}
                    />
                  )}
                </div>
              </div>
            </MainContainer>
            <Footer token={token} />
          </PageContainer>
        </SpotifyApiContext.Provider>
      ) : (
        <>
          {token != undefined && !token.length && <Redirect to="/" />}
          <Footer />
        </>
      )}
    </>
  );
};

export default UserPage;
