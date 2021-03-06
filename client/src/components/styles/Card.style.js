import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";

export const GlobalStyles = createGlobalStyle`
  body {
    background: #e6edff !important;
    scroll-behavior: smooth;
  }
`;

export const Card = styled.div`
  position: relative;
  flex: 0 0 40%;
  max-width: 190px;
  min-width: 190px;
  height: 330px;
  position: relative;
  background: none;
  border-radius: 30px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 20px 20px;
  padding: 0px;
  transition: all 0.2s;
  z-index: 1 !important;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 5px 7px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
  position: relative;

  .card-content-container {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    pointer-events: none;
  }

  .card-content-container.open {
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    overflow: hidden;
    padding: 40px 0;
  }

  .card-content {
    pointer-events: auto;
    position: relative;
    border-radius: 20px;
    background: #fff;
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  .open .card-content {
    height: auto;
    max-width: 700px;
    overflow: hidden;
    pointer-events: none;
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
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 110px;
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    overflow: hidden;
  }

  .song-img {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    border-radius: 20px;
    height: auto;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    transition: all 0.3s;
    cursor: pointer;
  }

  .card-body {
    margin: 15px auto;
    width: 90%;
  }

  .card-footer {
    margin: 6px auto;
    width: 90%;
    height: 60px;
    margin-bottom: 0px !important;
  }

  .song-name {
    font-family: "Hind", sans-serif;
    font-size: 20px !important;
    color: rgb(36, 36, 36);
    font-weight: 600;
    padding: 0px;
    line-height: 20px;
    text-transform: capitalize;

    max-width: 171px;
    overflow: hidden;
    height: 20px;
    position: relative;
  }

  .song-name span {
    position: absolute;
    white-space: nowrap;
    transform: translateX(0);
    transition: 1s;
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
    position: relative;
    left: 180px;
    bottom: 90px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: white;
    transition: left 0.25s linear, opacity 0.3s ease-in-out;
    opacity: 0;
    pointer-events: none;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
  }

  .card-options-visible {
    left: 180px;
    opacity: 1;
    pointer-events: visible;
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
