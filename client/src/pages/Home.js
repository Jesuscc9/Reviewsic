import React, {useEffect, useRef} from 'react';
// @ts-ignore
import Parallax from 'parallax-js';
import BackgroundIMG from '../assets/img/background.jpg';
import Guitar from '../assets/img/guitar.png';
import Layer1 from '../assets/img/layer1.png';
import Layer2 from '../assets/img/layer2.png';
import Layer3 from '../assets/img/layer3.png';
import Layer4 from '../assets/img/layer4.png';
import Layer5 from '../assets/img/layer5.png';
import Layer6 from '../assets/img/layer6.png';
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

  return (
    <div id="container">
      <div id="scene" ref={sceneEl}>
        <div dataDepth="1.00"><img src={Layer1} /></div>
        <div dataDepth="0.80"><img src={Layer2} /></div>
        <div dataDepth="0.60"><img src={Layer3} /></div>
        <div dataDepth="0.40"><img src={Layer4} /></div>
        <div dataDepth="0.20"><img src={Layer5} /></div>
        <div dataDepth="0.00"><img src={Layer6} /></div>
      </div>
    </div>
  )
}

export default Home;