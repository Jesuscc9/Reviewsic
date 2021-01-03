import React, {useState, useEffect } from 'react';
import "tailwindcss/tailwind.css";
import "../assets/main.css";
import useDeepCompareEffect from 'use-deep-compare-effect';
import Swal from 'sweetalert2';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import '../pages/styles/Register.css';


const Register = () =>{

  const [song, setSong] = useState('');
  const [review, setReview] = useState('');
  const [songList, setSongList] = useState([]);

  const [newReview, setNewReview] = useState('');

  useDeepCompareEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then(res => {
      setSongList(res.data);
    })
  },[songList]) 

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      songName: song,
      songReview: review,
    })

    setSongList([
      ...songList, {songName: song, songReview: review
    }])
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
    Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  return (
    <React.Fragment>
      <Navbar onAddClick={alert}></Navbar>
      <div className="App">
        <h1>Music APP 😎</h1>
        
        <div className="form">
          <label>Song Name:</label>
          <input type="text" name="songName" onChange={(e) => {
            setSong(e.target.value)
          }}/>
          <label>Review</label>
          <input type="text" name="review" onChange={(e) => {
            setReview(e.target.value)
          }}/>

          <button onClick={submitReview} className="btn btn-blue">Upload</button>

          {songList.map((song) => {
            return (
              <Card props={song} key={song.id}></Card>
            )
          })}
        </div>
      </div>
    </React.Fragment> 
  );
}

export default Register;
