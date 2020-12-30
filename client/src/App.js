import React, {useState, useEffect } from 'react';
import './App.css';
import './assets/main.css'
import "tailwindcss/tailwind.css";
import musicIcon from './assets/img/music.png';
import Axios from 'axios';

const App = () =>{

  const [song, setSong] = useState('');
  const [review, setReview] = useState('');

  useEffect(() =>{
    Axios.get('http://localhost:3001/api/get').then(res => {
      console.log(res.data);
    })
  },[]) 

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      songName: song,
      songReview: review,
    }).then(() => {
      alert('success');
    })
  }

  return (
    <React.Fragment>
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
        </div>
      </div>
    </React.Fragment> 
  );
}

export default App;
