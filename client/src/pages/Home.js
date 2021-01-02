import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import '../assets/animate.css';
import Parallax from 'parallax-js';
import Stars from '../assets/img/star.svg';
import Moonlight from '../assets/img/moonlight.png';
import Clairo from '../assets/img/clairo.png';
import Slash from '../assets/img/slash.png';
import StarBackground from '../assets/img/stars-back.png';
import Axios from 'axios';

import './styles/Home.css';

const Home = () => {

  const [nickname, setNickname] = useState('');

  const sceneEl = useRef(null);

  const elements = {
    objects: document.getElementsByName('element'),
    on: function(){
      this.objects.forEach((el) =>{
        el.style.opacity = '1';
      })
  
      const stars = document.getElementById('stars');
      stars.classList.add('star-shadow');
      stars.style.opacity = '1';
    }, off: function(){
      this.objects.forEach((el) =>{
        el.style.opacity = '0.7';
      })
  
      const stars = document.getElementById('stars');
      stars.classList.remove('star-shadow');
      stars.style.opacity = '0.2';
    }
  }

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
    })
    
    parallaxInstance.enable();


    const header = document.getElementById('header');
    setTimeout(() => {
      header.style.display = 'block';
      header.classList.add('animate__fadeIn');
    }, 1500)


    return () => parallaxInstance.disable();

  }, [])

  const handleClick = (e) =>{
    elements.on();
    e.preventDefault();
    const header = document.getElementById('header');
    
    header.style.display = 'block';
    header.classList.remove('animate__fadeIn');
    header.classList.add('animate__fadeOut');

    setTimeout(() =>{
      const login = document.getElementById('login-form');
      login.style.display = 'flex';
      elements.on();
    }, 500)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    Axios.get('http://localhost:3001/api/newUser', {
      nickname,
    }).then((res) => {
      if(!res.length){
        document.getElementById('link').click();
      }
    }).catch(error => {
      console.log('Hubo un error: ');
      console.log(error);
    })
  }

  const onMouseEnter = (e) =>{
    e.preventDefault();
    elements.on();
  }

  const onMouseLeave = (e) =>{
    e.preventDefault();
    elements.off();
  }

  return (
    <React.Fragment>
      <div className="header animate__animated" id="header"> 
        <button className="try-button" id="try-button" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={handleClick}>
          Try it now!  
        </button>       
        <h1 className="title">Reviewsic</h1>        
      </div>

      <form className="login-form animate__animated animate__fadeIn" id="login-form" onSubmit={handleSubmit}>
        <h1 class="nickname">Nickname: </h1>
        <input type="text" class="nickname-input" onChange={(e) => setNickname(e.target.value)}/>
      </form>

      <Link to="/home" id="link"></Link>

      <div id="container">
        <div id="scene" ref={sceneEl} data-scalar-x="10" data-scalar-y="10">

          <div data-depth="0.2"><img src={Stars} className="stars" /></div>

          <div data-depth="0.1"><img src={StarBackground} id="stars"  className="star"/></div>

          <div data-depth="0.3"><img className="moonlight" src={Moonlight} /></div>

          <div data-depth="1" className="clairo-container"><img className="clairo" name="element" src={Clairo} /></div>

          <div data-depth="1" className="slash-container"><img name="element" className="slash" src={Slash} /></div>

                    

        </div>
      </div>
    </React.Fragment>
  )
}

export default Home;