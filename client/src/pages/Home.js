import React, {useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import Parallax from 'parallax-js';
import Stars from '../assets/img/star.svg';
import Moonlight from '../assets/img/moonlight.png';
import Clairo from '../assets/img/clairo.png';
import Slash from '../assets/img/slash.png';
import StarBackground from '../assets/img/stars-back.png';

import './styles/Home.css';

const Home = () => {
  const sceneEl = useRef(null);

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
    })
    
    parallaxInstance.enable();

    return () => parallaxInstance.disable();

  }, [])

  const onMouseEnter = (e) =>{
    e.preventDefault();
    const elements = document.getElementsByName('element');

    elements.forEach((el) =>{
      el.style.opacity = '1';
    })

    const stars = document.getElementById('stars');
    console.log(stars);
    stars.classList.add('star-shadow');
    stars.style.opacity = '1';
  }

  const onMouseLeave = (e) =>{
    e.preventDefault();
    const elements = document.getElementsByName('element');

    elements.forEach((el) =>{
      el.style.opacity = '0.7';
    })

    const stars = document.getElementById('stars');
    console.log(stars);
    stars.classList.remove('star-shadow');
    stars.style.opacity = '0.2';
  }

  return (
    <React.Fragment>
      <div className="header"> 
        <button className="try-button" id="try-button" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Try it now!  
        </button>         
        <h1 className="title">Reviewsic</h1>           
      </div>
      <div id="container">
        <div id="scene" ref={sceneEl} data-scalar-x="10" data-scalar-y="10">

          <div data-depth="0.2"><img src={Stars} className="stars" /></div>

          <div data-depth="0.1"><img src={StarBackground} id="stars"  className="star"/></div>

          <div data-depth="0.3"><img className="moonlight" src={Moonlight} /></div>

          <div data-depth="1" class="clairo-container"><img className="clairo" name="element" src={Clairo} /></div>

          <div data-depth="1" class="slash-container"><img name="element" className="slash" src={Slash} /></div>

                    

        </div>
      </div>
    </React.Fragment>
  )
}

export default Home;