import styled, { createGlobalStyle, keyframes } from "styled-components";

const planetAnim1 = keyframes`
    0% { 
      transform: rotate(0deg) translateX(150px) rotate(0deg); 
    }
    50% { 
      transform: rotate(20deg) translateX(160px); 
    }
    100% { 
      transform: rotate(0deg) translateX(150px) rotate(0deg); 
    }
`;

const planetAnim2 = keyframes`
    0% { 
      transform: rotate(0deg) translateX(150px); 
    }
    50% { 
      transform: rotate(-5deg) translateX(130px); 
    }
    100% { 
      transform: rotate(0deg) translateX(150px); 
    }
`;

const planetAnim3 = keyframes`
    0% { 
      transform: rotate(0deg) translateY(150px); 
    }
    50% { 
      transform: rotate(-20deg) translateY(160px); 
    }
    100% { 
      transform: rotate(0deg) translateY(150px); 
    }

`;

export const GlobalStyle = createGlobalStyle`
  body {
    font-size: 18px;
    margin: 0;
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: hidden;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background: rgb(7,33,64) !important;
    background: linear-gradient(90deg, rgba(7,33,64,1) 0%, rgba(8,33,57,1) 100%);
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }

  .planet{
    transition: all 0.6s;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1000;
    opacity: 0.7;
  }

  .planet1{
    animation: ${planetAnim1} 20s linear infinite;
  }

  .planet2{
    animation: ${planetAnim2} 20s linear infinite;
  }

  .planet3{
    animation: ${planetAnim3} 20s linear infinite;
  }

  .stars {
    position: relative;
    left: 200px;
    top: 100px;
  }

  .header {
    width: 600px;
    height: 200px;
    position: absolute;
    top: 35%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .login-form {
    min-width: 250px !important;
    height: 60px !important;
    position: absolute;
    top: 20%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    display: none;
  }

  .login-container{
    width: 100%;
    height: 100%;
  }

  .login-form ::placeholder {
    color: rgba(255, 255, 255, 0.74);
  }

  .nickname {
    width: 100%;
    height: 50px;
    text-align: center;
    font-family: "Merriweather Sans", sans-serif;
    font-size: 35px;
    color: rgb(255, 255, 255);
  }

  .nickname-input {
    width: 300px;
    height: 50px;
    border-radius: 5px;
    padding: 0px 10px;
    outline: none;
    background: rgba(236, 251, 255, 0.294);
    color: white;
    font-family: "Merriweather Sans", sans-serif;
    transition: all 0.4s;
  }

  .title {
    text-align: center;
    font-family: "Righteous", cursive;
    font-size: 120px;
    color: #ffffff;
    opacity: 0.7;
    transition: all 0.2s;
    transition: opacity 0.4s !important;
    cursor: default;
    z-index: 1;
  }

  .reviewsic-svg{
    filter: drop-shadow( 3px 3px 2px rgba(106, 90, 205, .3));

    @media (max-width: 450px) {
      transform: scale(0.7);
    }
  }

  .try-button {
    position: relative;
    left: 300px;
    top: 220px;
    border-radius: 7px;
    border: 0px solid;
    width: 150px;
    height: 50px;
    background-color: rgb(3, 88, 207);
    color: #ffffff;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    transition: all 0.2s;
    outline: none !important;
    opacity: 0;
    pointer-events: none;

    @media (max-width: 450px) {
      transform: scale(0.85);
    }
    
    &:hover{
      opacity: 1 !important;
    }


  }
`;

export const Scene = styled.div`
  @media (max-width: 450px) {
    transform: scale(1.3) !important;
  }

  ._3xrlJ {
    width: 250px;
    height: 60px !important;
    border: 1px solid;
    color: white;
  }

  ._1JCP_ {
    transform: scale(1.5);
  }

  .slash {
    width: 500px;
    height: 850px;
    transform: scale(1.4) scaleX(-1) translateX(20);
    margin-top: auto;
    margin-left: auto;
    opacity: 0.7;
    transition: all 0.4s;
    position: relative;
    left: 100px;
    bottom: -200px !important;
  }

  .clairo {
    position: relative;
    right: 100px;
    opacity: 0.5;
    transition: all 0.4s;
    transform: scaleX(-1);
    z-index: 1000;
  }

  .slash-container {
    width: 100%;
    height: 100%;
    display: flex !important;
    justify-content: flex-end;
    align-content: flex-end;
    flex-direction: column;
  }

  .star {
    opacity: 0.2;
    cursor: pointer;
    transition: all 0.4s;
  }

  .guitar {
    width: 70px;
    opacity: 0.7;
    cursor: pointer;
    position: absolute;
    top: 200px;
    float: right;
  }

  .music-note {
    width: 50px;
    opacity: 0.7;
    cursor: pointer;
  }

  .star-shadow {
    -webkit-filter: drop-shadow(4px 4px 4px rgba(224, 220, 0, 0.527));
    filter: drop-shadow(4px 4px 4px rgba(224, 220, 0, 0.527));
  }

  @media (max-width: 1000px) {
    .clairo-container {
      height: 100vh;
    }
    .slash {
      display: none;
    }
  }

  @media (max-width: 820px) {
    .slash {
      display: none;
    }
    .clairo {
      transform: scale(1) scaleX(-1);
      position: relative;
      left: 20px;
      top: 10px;
    }
  }

  @media (max-width: 450px) {
    .slash {
      display: none;
    }

    .clairo {
      transform: scale(0.7) scaleX(-1);
      position: relative;
      left: -80px;
      top: 40px;
    }
  }
`;
