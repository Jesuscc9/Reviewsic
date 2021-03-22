import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";

import openSocket from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import RegisterForm from "../components/RegisterForm";
import SmartRegisterForm from "../components/SmartRegisterForm";
import UpdateForm from "../components/UpdateForm";
import Contacts from "../components/Contacts";
import Login from "../components/Login";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
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
  const [song, setSong] = useState("");
  const [image, setImage] = useState("");
  const [review, setReview] = useState("");
  const [artist, setArtist] = useState("");
  const [spotifyURL, setSpotifyURL] = useState("");
  const [calification, setCalification] = useState(0);
  const [songList, setSongList] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [likedSongs, setlikedSongs] = useState([])
  const [token, setToken] = useState("");

  useEffect(async () => {
    let res = await Axios.get(`${API_ENDPOINT}/api/get`);

    setSongList(res.data);

    setToken(Cookies.get("spotifyAuthToken"));

    if (token) fetchSpotifyData()
  }, [token]);

  const submitReview = () => {
    const formData = new FormData();

    formData.append("songName", song);
    formData.append("image", image);
    formData.append("artist", artist);
    formData.append("spotifyUrl", spotifyURL);
    formData.append("songReview", review);
    formData.append("calification", calification);
    formData.append("author", user);
    formData.append("author_id", userId);
    toast.success("🚀 Successfully Added!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    Axios.post(`${API_ENDPOINT}/api/insert`, formData).then((res) => {
      const newSongList = songList;
      res.data.calification = calification;
      newSongList.push(res.data);
      setSongList(newSongList);
      socket.emit("updateReviews", newSongList);
    });
  };

  const deleteReview = (id, image) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newSongList = songList.filter((e) => {
          return e.id != id;
        });

        setSongList(newSongList);
        socket.emit("updateReviews", newSongList);

        Axios.delete(`${API_ENDPOINT}/api/delete/${id}/`);
        toast.success("🚀 Your review has been deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const updateReview = () => {
    Axios.put(`${API_ENDPOINT}/api/update/${updateId}`, {
      image: image,
      songName: song,
      artist: artist,
      songReview: review,
      spotifyUrl: spotifyURL,
      calification: calification,
      author_id: userId,
    }).then((res) => {
      let index = 0;

      for (let i = 0; i < songList.length; i++) {
        if (songList[i].id == updateId) {
          index = i;
          break;
        }
      }

      const newSongList = songList;
      res.data.author = songList[index].author;
      newSongList[index] = res.data;
      setSongList(newSongList);
      socket.emit("updateReviews", newSongList);

      toast.success("🚀 Your review has been updated!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const smartRegister = () => {
    MySwal.fire({
      html: (
        <React.Fragment>
          <SmartRegisterForm
            onSongChange={(e) => {
              setSong(e);
            }}
            selectImage={(e) => {
              setImage(e);
            }}
            onArtistChange={(e) => {
              setArtist(e);
            }}
            onCommentChange={(e) => {
              setReview(e);
            }}
            onSpotifyUrlChange={(e) => {
              setSpotifyURL(e);
            }}
            ratingChanged={(e) => {
              setCalification(e);
            }}
            onSubmit={(e) => {
              document.getElementById("button").click();
              MySwal.close();
            }}
          />
        </React.Fragment>
      ),

      showConfirmButton: false,
    }).then(() => {});
  };

  const alertUpdateForm = (data) => {
    MySwal.fire({
      html: (
        <UpdateForm
          data={data}
          setSong={(e) => {
            setSong(e);
          }}
          setArtist={(e) => {
            setArtist(e);
          }}
          setUpdateId={(e) => {
            setUpdateId(e);
          }}
          setNewImage={(e) => {
            setImage(e);
          }}
          onCommentChange={(e) => {
            setReview(e);
          }}
          onSpotifyUrlChange={(e) => {
            setSpotifyURL(e);
          }}
          ratingChanged={(e) => {
            setCalification(e);
          }}
          onSubmit={(e) => {
            document.getElementById("update-button").click();
            MySwal.close();
          }}
        />
      ),

      showConfirmButton: false,
    });
  };

  let playlistId = 0;

  const fetchSpotifyData = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    }


    if (userId == "") {
      let spotifyData = await Axios.get(
        "https://api.spotify.com/v1/me",
        config
      );

      let user_image = spotifyData.data.images.length
        ? spotifyData.data.images[0].url
        : "http://dissoftec.com/NicePng_user-png_730154.jpeg";

      setProfileImage(user_image);
      setUserId(spotifyData.data.id);
      setUser(spotifyData.data.display_name);

      const newUser = {
        nickname: spotifyData.data.display_name,
        followers: spotifyData.data.followers.total,
        url: spotifyData.data.href,
        type: spotifyData.data.product,
        image: user_image,
        id: spotifyData.data.id,
      };

      socket.emit("new user", newUser);

      socket.on("usernames", (data) => {
        setUsers(data);
      });

      socket.on("updateReviews", (data) => {
        setSongList(data);
      })


      const playlists = await Axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        config
      );

      const reviewsicExists = () => {
        const playlists_ = playlists.data.items

        for(let i = 0; i < playlists_.length; i++){
          if(playlists_[i].name === 'Reviewsic'){
            playlistId = playlists_[i].id
            return true
          }
        }

        return false;
      }

      if(reviewsicExists()){

        setlikedSongs(await getAllSongs(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, []))

      }else{

        const createPlaylist = await Axios.post(
          `https://api.spotify.com/v1/users/${spotifyData.data.id}/playlists`,
          {
            name: "Reviewsic",
          },
          config
        );
    
        playlistId = createPlaylist.data.id;
      }


      async function getAllSongs(url, items) {
        const songs = await Axios.get(url, config);
  
        songs.data.items.forEach((e) => {
          items.push(e);
        });
  
        if (songs.data.next === null) return items;
  
        return getAllSongs(songs.data.next, items);
      }

      const songs = await getAllSongs(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, [])

      setlikedSongs(songs)

    }
  };

  const onLikeClick = async (song_name, song_id) => {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // }

    // async function getAllSongs(url, items) {
    //   const songs = await Axios.get(url, config);

    //   songs.data.items.forEach((e) => {
    //     items.push(e);
    //   });

    //   console.log(items)

    //   if (songs.data.next === null) return items;

    //   return getAllSongs(songs.data.next, items);
    // }

    // async function songExists() {
    //   const songs = await getAllSongs(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, [])

    //   setlikedSongs(songs)

    //   songs.forEach((e) => {
    //     if (e.track.name === song_name) {
    //       return true
    //     }
    //   })

    //   return false;
    // }

    // if (await songExists()) {
    //   let songUri = `spotify:track:${song_id}`;

    //   const addSong = await Axios.post(
    //     `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    //     {
    //       uris: [songUri],
    //     },
    //     config
    //   )

    //   toast("🎵 Song added to your playlist!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   })
    // }

  }

  return (
    <React.Fragment>
      <Navbar
        onAddClick={() => {
          smartRegister();
        }}
        profileImage={profileImage}
        token={token}
      ></Navbar>
      <button onClick={submitReview} id="button"></button>
      <button onClick={updateReview} id="update-button"></button>

      <ToastContainer />

      {token ? (
        <SpotifyApiContext.Provider value={token}>
          <div className="main-container">
            <div className="card-container">
              {songList.length && likedSongs.length ? (
                songList.map((item) => {
                  return (
                    <Card
                      props={item}
                      user={userId}
                      key={item.id}
                      update={() => {
                        alertUpdateForm(item);
                      }}
                      delete={(e) => {
                        deleteReview(e.id, e.image);
                      }}
                      onLikeClick={(e, id) => {
                        onLikeClick(e, id);
                      }}
                      likedSongs={likedSongs}
                    />
                  );
                })
              ) : (
                <div>Not reviews registered yet 😕.</div>
              )}
            </div>
            <div className="contact-container">
              <Contacts users={users} />
            </div>
          </div>
        </SpotifyApiContext.Provider>
      ) : (
        <Login></Login>
      )}
    </React.Fragment>
  );
};

export default Register;
