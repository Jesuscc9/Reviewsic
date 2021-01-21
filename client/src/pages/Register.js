import React, { useState, useEffect } from "react";
import { SpotifyApiContext } from "react-spotify-api";

import socketIOClient from "socket.io-client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Axios from "axios";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import RegisterForm from "../components/RegisterForm";
import UpdateForm from "../components/UpdateForm";
import Contacts from "../components/Contacts";
import Login from "../components/Login"
import Cookies from "js-cookie";

import "tailwindcss/tailwind.css";
import "../assets/main.css";
import "../pages/styles/Register.css";

const ENDPOINT = "http://127.0.0.1:3001";

const Register = () => {
  const MySwal = withReactContent(Swal);
  const [song, setSong] = useState("");
  const [image, setImage] = useState([]);
  const [review, setReview] = useState("");
  const [artist, setArtist] = useState("");
  const [spotifyURL, setSpotifyURL] = useState("");
  const [calification, setCalification] = useState(0);
  const [songList, setSongList] = useState([]);
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState(0);
  const [newImage, setNewImage] = useState("");
  const [profileImage, setProfileImage] = useState('')
  const [userId, setUserId] = useState('')

  const [token, setToken] = useState("");

  useEffect(async () => {

    const socket = socketIOClient(ENDPOINT);


    let res = await Axios.get("http://localhost:3001/api/get");

    setSongList(res.data);

    socket.on("usernames", (data) => {
      setUsers(data);
    });

    socket.on("updateReviews", (data) => {
      setSongList(data);
    });

    setToken(Cookies.get("spotifyAuthToken"));
  }, []);

  const submitReview = () => {
    const formData = new FormData();

    formData.append("songName", song);
    formData.append("image", image.name);
    formData.append("file", image);
    formData.append("artist", artist);
    formData.append("spotifyUrl", spotifyURL);
    formData.append("songReview", review);
    formData.append("calification", calification);

    Axios.post("http://localhost:3001/api/insert", formData).then((res) => {
      const newSongList = songList;
      newSongList.push(res.data);
      setSongList(newSongList);
      const socket = socketIOClient(ENDPOINT);
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
        const socket = socketIOClient(ENDPOINT);
        socket.emit("updateReviews", newSongList);

        Axios.delete(
          `http://localhost:3001/api/delete/${id}/${image}`
        )
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      }
    });
  };

  const updateReview = () => {
    Axios.put(`http://localhost:3001/api/update/${updateId}`, {
      image: newImage,
      songName: song,
      artist: artist,
      songReview: review,
      spotifyUrl: spotifyURL,
      calification: calification,
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
      const socket = socketIOClient(ENDPOINT);
      socket.emit("updateReviews", newSongList);
    });
  };

  const alert = () => {
    MySwal.fire({
      html: (
        <RegisterForm
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
            setNewImage(e);
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

  const fetchSpotifyData = async() => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
     }
    }

    if(userId == ''){
      let spotifyData = await Axios.get('https://api.spotify.com/v1/me', config)


      if((spotifyData.data.images).length > 0){
  
        setProfileImage(spotifyData.data.images[0].url)
        setUserId(spotifyData.data.id)
  
        const newUser = {
          nickname: spotifyData.data.display_name,
          followers: spotifyData.data.followers.total,
          url: spotifyData.data.href,
          type: spotifyData.data.product,
          image: spotifyData.data.images[0].url,
          id: spotifyData.data.id,
        }
  
        Axios.post(`http://localhost:3001/api/newUser`, newUser).then((res) => {
          setUsers([newUser])
        })
      }else{
        setProfileImage('')
      }
    }
  }

  return (
    <React.Fragment>
      <Navbar
        onAddClick={() => {
          alert();
        }}
        profileImage={profileImage}
        token={token}
      ></Navbar>
      <button onClick={submitReview} id="button"></button>
      <button onClick={updateReview} id="update-button"></button>

      {token ? (
      <SpotifyApiContext.Provider value={token}>
        {(() => {fetchSpotifyData()})()}
      <div className="main-container">
        <div className="card-container">
          {songList.length ? (
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
                />
              );
            })
          ) : (
            <div>Not reviews registered yet 😕</div>
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
