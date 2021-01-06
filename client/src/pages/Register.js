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

const ENDPOINT = "http://127.0.0.1:3001";


const Register = () =>{

  const MySwal = withReactContent(Swal)

  const [song, setSong] = useState('');
  const [file, setFile] = useState('');
  const [image, setImage] = useState([]);
  const [review, setReview] = useState('');
  const [artist, setArtist] = useState('');
  const [calification, setCalification] = useState(0);
  const [songList, setSongList] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [response, setResponse] = useState("");

  useDeepCompareEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then(res => {
      setSongList(res.data);
    })
  },[songList]) 

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("usernames", data => {
      console.log('Se recbie esto: ');
      setResponse(data);
    });
  }, [])

  const submitReview = () =>{

    const formData = new FormData();

    formData.append('songName', song);
    formData.append('image', image.name);
    formData.append('file', image);
    formData.append('artist', artist);
    formData.append('songReview', review);
    formData.append('calification', calification);

    Axios.post('http://localhost:3001/api/insert', formData)
    .then((res) =>{
      setSongList([])
    })

  }

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
    setSongList([]);
  }

  const updateReview = (id) => {
    Axios.put('http://localhost:3001/api/update', {
      id: id,
      songReview : newReview,
    });
    setSongList([]);
    setNewReview("");
  }

  const alert = () => {

    MySwal.fire({
      html: <RegisterForm onSongChange={(e) => {
        setSong(e);
        console.log(song);
      }} selectImage={(e) =>{
          setImage(e)
      }} onArtistChange={(e) => {
          setArtist(e)
      }} onCommentChange={(e) => {
          setReview(e);
      }} ratingChanged={(e) => {
        setCalification(e)
      }} onSubmit={(e) => {
        document.getElementById('button').click();
        MySwal.close();
      }}/> ,

      showConfirmButton: false,
    }).then(() => {
    })
  }

  if(response == 'error') return <Redirect to="/"></Redirect>

  return (
    <React.Fragment>
      <Navbar onAddClick={() => {
        alert()
      }}></Navbar>
          <button onClick={submitReview} id="button"></button>

          <div className="card-container">
            {songList.map((song) => {
              return (
                <Card props={song} key={song.id}></Card>
              )
            })}
          </div>
    </React.Fragment> 
  );
}

export default Register;
