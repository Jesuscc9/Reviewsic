import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion } from "framer-motion";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const slide = keyframes`
	0% {
    transform:translateX(-160%) scale(2);
  }
  10% {
    transform:translateX(-160%) scale(2);
  }
	15% {
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
    border-radius: 17px;
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

    @media (max-width: 650px) {
      max-width: 90%;
    }
  }

  .card-content {
    transition: background-color 1s ease;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    z-index: 23;
  }

  .card-container-car {
    min-width: 250px;
    max-width: 250px;
    height: 330px;
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
    /* transform: scale(1.06); */
    transition: all 0.3s;
    cursor: pointer;

    @media (max-width: 650px) {
      position: initial;
      transform: none;
    }
  }

  .song-img:hover {
    transform: translateY(-50%) translateX(-50%) scale(1.06);
  }

  .card-header {
    min-width: 29%;
    flex-basis: 29%;

    @media (max-width: 650px) {
      min-width: 130px;
      margin-right: 20px;
    }

    @media (max-width: 500px) {
      min-width: 130px;
      margin-right: 30px;
    }
  }

  .card-body {
    flex-basis: 55%;
    border-radius: 10px;
    position: relative;

    @media (max-width: 440px) {
      margin-top: 20px;
      margin-left: 5px;
    }
  }

  .card-footer {
    margin: 20px auto;
    padding-left: 3px;
    width: 100%;
    height: 70px;
    margin-bottom: 0px !important;
  }

  .play-button-container {
    position: absolute;
  }

  .play-button {
    min-width: 50px;
    max-width: 50px;
    min-height: 50px;
    max-height: 50px;
    position: relative;
    left: -65px;
    top: 55px;
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

    @media (max-width: 440px) {
      top: -90px;
      left: 97px;
    }
  }

  .shine {
    &:after {
      content: "";
      top: 0;
      transform: translateX(130%) rotate(190deg);
      width: 30px;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      z-index: 1;
      opacity: 0.7;
      animation: ${slide} 20s infinite;

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
    padding-top: 1px;
    line-height: 20px;
    text-transform: capitalize;
    overflow: hidden;
    max-width: 100%;
    height: 25px;
    position: relative;
    padding: 5px 0px;
  }

  .song-name span {
    position: absolute;
    white-space: nowrap;
    transform: translateX(0);
    transition: all 1s;
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

  .ratings {
    width: 100%;

    display: flex;
    align-items: center;

    @media (max-width: 440px) {
      justify-content: space-between;
    }

    .average {
      margin-left: 30px;
    }

    @media (max-width: 500px) {
      .rating-container {
        transform: scale(0.9);
      }

      .rate-container {
        transform: scale(0.9);
      }

      .average {
        margin-left: 0px;
        width: 110px;
      }

      .author-rate {
        width: 100px;
        margin: 0px !important;
      }

      .users-rate {
        width: 110px;
      }

      .stars-calification {
        width: 100px;
      }

      .rate-container {
        margin-left: 0px !important;
      }
    }
  }

  .card-data {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .star {
    transition: all 0.3s;
  }

  .rate-stars-container {
    position: relative;
    bottom: 55px;
    left: -20px;
    opacity: 0;
    transition: all 0.2s;
  }

  .rate-container {
    width: 85px;
    height: 30px;
    margin-left: 30px;

    &:hover {
      .rate-stars-container {
        opacity: 1;
        transform: scale(1.1);

        .rate-stars {
          pointer-events: auto;
        }
      }
      .star {
        animation: ${rotate} 2s linear infinite;
      }

      .rate-button {
        transform: scale(1.03);
      }
    }
  }

  .rate-stars {
    position: absolute !important;
    min-height: 60px;
    pointer-events: none;
  }

  .rate-button {
    width: 85px;
    height: 30px;
    background: rgba(255, 215, 0, 1);
    padding: 3px;
    border-radius: 5px;
    font-size: 12px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: rgb(87, 87, 87);
    transition: all 0.3s;
    cursor: pointer;
    outline: none;
  }

  .rated-button {
    width: auto;
    padding: 0 5px;
    font-size: 14px;
    background-color: rgba(255, 203, 34, 0.2);
    color: #f5c800;

    @media (max-width: 500px) {
      position: relative;
      left: 10px;
    }

    &:hover {
      background-color: rgba(255, 203, 34, 0.2);
    }
  }

  .comment ::-webkit-scrollbar {
    width: 2px !important;
  }

  .author {
    font-family: "Open Sans", sans-serif;
    font-size: 13px;
    font-weight: 600;
    font-style: italic;
    color: rgb(160, 160, 160);
    text-overflow: ellipsis;
    white-space: nowrap;
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
    width: 75px;
    min-height: 71%;
    margin: auto;
    height: auto;
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: transparent;
    transition: left 0.25s linear, opacity 0.3s ease-in-out;
    opacity: 1;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: space-between;

    @media (max-width: 440px) {
      min-height: 53%;
    }
  }

  .card-actions {
    overflow: hidden;
    height: 70px;

    flex-basis: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    div {
      border-radius: 5px;
      max-width: 30px;
    }

    .likes-container {
      min-width: 100%;
      background: rgba(199, 25, 25, 0.1);
      display: flex;
      justify-content: space-around;
      padding: 0px 2px;
      align-items: center;
      cursor: pointer;

      p {
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        color: #e24867;
        margin-left: 3px;
        font-size: 15px;
        width: 50%;
        text-align: center;
      }

      &:hover {
        .heart {
          background-position: right;
        }
      }

      .heart-container {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        overflow: hidden;

        .heart {
          position: relative;
          bottom: 10px;
          width: 50%;
        }
      }
    }

    .playlist-container {
      min-width: 100%;
      height: 30px;
      background: rgba(12, 180, 49, 0.1);
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: space-around;

      img {
        width: 26px;
        height: 26px;
        transform: scale(0.65);
      }

      .playlist-add-container {
        min-width: 100%;
        display: flex;
      }

      p {
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        color: #0cb431;
        margin-left: 3px;
        font-size: 13px;
        width: 50%;
        text-align: center;
      }

      .spotify {
        color: rgb(170, 184, 193);
        width: 50%;
      }

      &:hover {
        .spotify {
          color: rgb(12, 180, 49);
        }
      }

      .check {
        color: rgb(12, 180, 49);
        border: 10px solid !important;
      }
    }

    .delete-option {
      background-color: rgba(199, 25, 25, 0.1);
    }

    .edit-option {
      background-color: rgba(255, 203, 34, 0.2);
    }
  }

  .card-actions.register-options {
    max-width: 30px;
  }

  .author-rate {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: rgb(87, 87, 87);
    font-size: 13px;
    text-shadow: 1px 1px 4px #d4d4d4;
    position: relative;
    left: 3px;
    margin-bottom: 5px;
  }

  .users-rate-container {
    position: relative;
    bottom: 45px;
    left: 150px;
  }

  .stars-calification {
    font-size: 12px;
    height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 120px;
    padding: 0px;
    position: relative;
    top: -5px;
    text-shadow: 0.5px 0.5px 4px #cfcfcf;
  }

  .option-container {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    z-index: 10;
    cursor: pointer;
  }

  .faPen {
    color: rgb(255, 203, 34);
    cursor: pointer;
  }

  .faTrash {
    color: rgb(199, 25, 25);
    cursor: pointer;
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

  @media (max-width: 650px) {
    max-width: 90%;
  }
`;
