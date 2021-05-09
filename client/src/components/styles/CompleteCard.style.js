import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion } from "framer-motion";

export const GlobalStyles = createGlobalStyle`
  body {
    background: #e6edff !important;
  }
`;

const slide = keyframes`
	0% {
    transform:translateX(-160%) scale(2);
  }
  10% {
    transform:translateX(-160%) scale(2);
  }
	20% {
    transform:translateX(160%) scale(2);
  }
	100% {
    transform:translateX(160%) scale(2);
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%; /* position the left edge of the element at the middle of the parent */
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100vw;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

export const Card = styled.div`
  .card-content-container {
    margin-top: 150px;
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    z-index: 22;
  }

  .card-content-container.open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 20;
    overflow: hidden;
  }

  .card-content,
  .white-background {
    pointer-events: auto;
    position: relative;
    border-radius: 15px;
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .open .card-content,
  .white-background {
    height: auto;
    max-width: 600px;
    overflow: hidden;
  }

  .card-content {
    transition: background-color 1s ease;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 13px;
    z-index: 23;
  }

  .white-background {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 365px;
  }

  .card-container-car {
    min-width: 250px;
    max-width: 250px;
    height: 330px;
    border: 1px solid;
  }

  .card-custom::-webkit-scrollbar {
    display: none;
  }

  .image-container {
    min-width: 130px;
    max-width: 130px;
    height: 130px;
    border-radius: 13px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  }

  .song-img {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: auto;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: all 0.3s;
    cursor: pointer;
  }

  .song-img:hover {
    transform: translateY(-50%) translateX(-50%) scale(1.06);
  }

  .card-header {
    min-width: 26%;
    flex-basis: 26%;
  }

  .card-body {
    flex-basis: 74%;
  }

  .card-footer {
    margin: 6px auto;
    width: 100%;
    height: 60px;
    margin-bottom: 0px !important;
  }

  .play-button {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 110px;
    top: 70px;
    background-color: #0cb431;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    overflow: hidden;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;

    &:hover {
      background-color: #0ca72e !important;
    }

    &:after {
      content: "";
      top: 0;
      transform: translateX(100%) rotate(190deg);
      width: 30px;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      opacity: 0.7;
      animation: ${slide} 10s infinite;

      /* 
  CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/ 
  */
      background: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(128, 186, 232, 0) 99%,
        rgba(125, 185, 232, 0) 100%
      ); /* FF3.6+ */
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0%, rgba(255, 255, 255, 0)),
        color-stop(50%, rgba(255, 255, 255, 0.8)),
        color-stop(99%, rgba(128, 186, 232, 0)),
        color-stop(100%, rgba(125, 185, 232, 0))
      ); /* Chrome,Safari4+ */
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(128, 186, 232, 0) 99%,
        rgba(125, 185, 232, 0) 100%
      ); /* Chrome10+,Safari5.1+ */
      background: -o-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(128, 186, 232, 0) 99%,
        rgba(125, 185, 232, 0) 100%
      ); /* Opera 11.10+ */
      background: -ms-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(128, 186, 232, 0) 99%,
        rgba(125, 185, 232, 0) 100%
      ); /* IE10+ */
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(128, 186, 232, 0) 99%,
        rgba(125, 185, 232, 0) 100%
      ); /* W3C */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 );
    }
  }

  .song-name {
    font-family: "Hind", sans-serif;
    font-size: 24px !important;
    color: rgb(36, 36, 36);
    color: rgb(36, 36, 36);
    font-weight: 600;
    padding: 0px;
    line-height: 20px;
    text-transform: capitalize;

    max-width: 100%;
    overflow: hidden;
    height: 20px;
    position: relative;
  }

  .song-name span {
    position: absolute;
    white-space: nowrap;
    transform: translateX(0);
    transition: all 1s;
    overflow: hidden;
  }

  .artist-name {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: rgb(134, 134, 134);
    overflow: hidden;
    text-transform: capitalize;
    text-overflow: ellipsis !important;
    white-space: nowrap;
    max-width: 170px;
  }

  .comment {
    margin-top: 15px;
    margin-right: 0px !important;
    margin: 0px !important;
    width: 100% !important;
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    height: 75px;
    text-align: justify;
    color: rgb(53, 53, 53);
    font-weight: 600;
    word-break: break-word;
    display: flex;
    overflow-x: auto;
  }

  .comment ::-webkit-scrollbar {
    width: 2px !important;
  }

  .autor {
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    font-weight: 600;
    font-style: italic;
    color: rgb(160, 160, 160);
    position: relative;
    bottom: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 170px;
  }

  .logo-title {
    font-family: "Open Sans", sans-serif;
    font-size: 22px;
    font-weight: 700;
    width: 130px;
    text-align: center;
    color: rgb(255, 255, 255);
  }

  .card-options {
    width: 30px;
    height: auto;
    position: absolute;
    right: 20px;
    bottom: 90px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: white;
    transition: left 0.25s linear, opacity 0.3s ease-in-out;
    opacity: 1;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
  }

  .card-options-visible {
    left: 180px;
    opacity: 1;
    cursor: pointer;
  }

  .option-container {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    z-index: 10;
  }

  .faPen {
    color: rgb(255, 203, 34);
    cursor: pointer;
  }

  .faTrash {
    color: rgb(199, 25, 25);
    cursor: pointer;
  }

  .faHeart {
    color: #7e22cd;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.4;
    transition: all 0.3s;
  }

  .faHeart:hover {
    color: #7e22cd;
    opacity: 0.6;
  }

  .heart {
    cursor: pointer;
    min-height: 50px;
    min-width: 50px;
    background-image: url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png");
    background-position: left;
    background-repeat: no-repeat;
    background-size: 2900%;
    outline: none !important;
  }

  .clicked_heart {
    background-position: right;
  }

  .heart:hover {
    background-position: right;
  }

  .is_animating {
    animation: heart-burst 0.8s steps(28) 1;
  }

  @keyframes heart-burst {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
`;

export const CardContent = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  background: #ffffff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
