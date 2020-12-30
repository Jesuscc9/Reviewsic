import React, {useState, useEffect } from 'react';
import './App.css';
import './assets/main.css'
import "tailwindcss/tailwind.css";
import musicIcon from './assets/img/music.png';

const App = () =>{

  return (
    <React.Fragment>
      <div className="App">
        <h1>Music APP 😎</h1>
        
        <div className="form">
          <label htmlFor="Song Name: "></label>
          <input type="text" name="songName"/>
          <label htmlFor="Review: "></label>
          <input type="text" name="review"/>
        </div>
      </div>
    </React.Fragment> 
  );
}

export default App;
