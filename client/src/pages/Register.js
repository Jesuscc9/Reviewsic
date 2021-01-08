import React, {useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import useDeepCompareEffect from 'use-deep-compare-effect';
import socketIOClient from "socket.io-client";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import RegisterForm from '../components/RegisterForm';

import "tailwindcss/tailwind.css";
import "../assets/main.css";
import '../pages/styles/Register.css';
import UpdateForm from '../components/UpdateForm';

const ENDPOINT = "http://127.0.0.1:3001";


const Register = () =>{

  const MySwal = withReactContent(Swal)

  const [song, setSong] = useState('');
  const [image, setImage] = useState([]);
  const [review, setReview] = useState('');
  const [artist, setArtist] = useState('');
  const [spotifyURL, setSpotifyURL] = useState('');
  const [calification, setCalification] = useState(0);
  const [songList, setSongList] = useState([]);
  const [response, setResponse] = useState("");
  const [updateId, setUpdateId] = useState(0);
  const [newImage, setNewImage] = useState('');
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {

    console.log('Se ejecuta el effect');

    Axios.get('http://localhost:3001/api/get').then(res => {
      setSongList(res.data);


      socket.on('usernames', data => {
        setResponse(data);
      });
  
      socket.on('updateReviews', data => {
        setSongList(data);
      });
    })

  }, [])

  const submitReview = () =>{

    const formData = new FormData();

    formData.append('songName', song);
    formData.append('image', image.name);
    formData.append('file', image);
    formData.append('artist', artist);
    formData.append('spotifyUrl', spotifyURL);
    formData.append('songReview', review);
    formData.append('calification', calification);

    Axios.post('http://localhost:3001/api/insert', formData)
    .then((res) =>{

      const newSongList = songList;
      newSongList.push(res.data)
      setSongList(newSongList)
      socket.emit('updateReviews', newSongList)
    })

  }

  const deleteReview = (id, image) => {
    const newSongList = songList.filter((e) => {
      return e.id != id;
    })

    setSongList(newSongList);

    socket.emit('updateReviews', newSongList)


    Axios.delete(`http://localhost:3001/api/delete/${id}/${image}`).then((data) => {

    })
  }

  const updateReview = () => {

    Axios.put(`http://localhost:3001/api/update/${updateId}`, {
      image: newImage,
      songName: song,
      artist: artist,
      songReview: review,
      spotifyUrl: spotifyURL,
      calification: calification,
    }).then((res => {

      let index = 0;

      for(let i = 0;i<songList.length;i++){
        if(songList[i].id == updateId){
          index = i;
          break;
        }
      }
      console.log(res.data);

      const newSongList = songList;
      newSongList[index] = res.data;
      setSongList(newSongList);
      socket.emit('updateReviews', newSongList)
    }))
  }

  const alert = () => {

    MySwal.fire({
      html: <RegisterForm onSongChange={(e) => {
        setSong(e);
      }} selectImage={(e) =>{
          setImage(e)
      }} onArtistChange={(e) => {
          setArtist(e)
      }} onCommentChange={(e) => {
          setReview(e);
      }} onSpotifyUrlChange={(e) => {
          setSpotifyURL(e);
      }}ratingChanged={(e) => {
        setCalification(e)
      }} onSubmit={(e) => {
        document.getElementById('button').click();
        MySwal.close();
      }}/> ,

      showConfirmButton: false,
    }).then(() => {
    })
  }
  
  const alertUpdateForm = (data) => {
    MySwal.fire({
      html: <UpdateForm data={data} setSong={(e) => {
        setSong(e)
      }} setArtist={(e) => {
        setArtist(e)
      }} setUpdateId={(e) => {
        setUpdateId(e)
      }} setNewImage={(e) => {
        setNewImage(e)
      }}
      onCommentChange={(e) => {
          setReview(e);
      }} onSpotifyUrlChange={(e) => {
          setSpotifyURL(e);
      }} ratingChanged={(e) => {
          setCalification(e)
      }} onSubmit={(e) => {
        document.getElementById('update-button').click();
        MySwal.close()
      }}/> ,

      showConfirmButton: false,
    })
  }

  if(response == 'error') return <Redirect to="/"></Redirect>

  return (
    <React.Fragment>
      <Navbar onAddClick={() => {
        alert()
      }}></Navbar>
          <button onClick={submitReview} id="button"></button>
          <button onClick={updateReview} id="update-button"></button>

          <div className="card-container">
            {songList.map((item) => {
              return (
                <Card props={item} key={item.id} update={() => {
                  alertUpdateForm(item)
                }} delete={(e) => {
                  deleteReview(e.id, e.image);
                }}></Card>
              )
            })}
          </div>
    </React.Fragment> 
  );
}

export default Register;
