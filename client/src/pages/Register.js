import React, {useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import RegisterForm from '../components/RegisterForm';

import "tailwindcss/tailwind.css";
import "../assets/main.css";
import '../pages/styles/Register.css';


const Register = () =>{

  const MySwal = withReactContent(Swal)

  const [song, setSong] = useState('');
  const [image, setImage] = useState([]);
  const [review, setReview] = useState('');
  const [artist, setArtist] = useState('');
  const [calification, setCalification] = useState(0);
  const [songList, setSongList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useDeepCompareEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then(res => {
      setSongList(res.data);
    })
  },[songList]) 

  const submitReview = () =>{

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };

    Axios.post('http://localhost:3001/api/insert', {
      songName: song,
      image: image.name,
      file: image,
      artist: artist,
      songReview: review,
      calification: calification,
    }, config).then(() =>{
      console.log('Se sinsertaaa');
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
      }}>
         </RegisterForm>,
      showConfirmButton: false,
    })
  }

  return (
    <React.Fragment>
      <Navbar onAddClick={alert}></Navbar>
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
