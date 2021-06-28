import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .react-stars {
    outline: none !important;
    z-index: 0;
  }

  .swal2-input {
    margin: 5px 0px 0px 0px !important;
    -webkit-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
  }

  .swal2-file {
    margin: 5px 0px 0px 0px !important;
    align-items: center;
    -webkit-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
  }

  .submit-button {
    width: 160px;
    height: 50px;
    border: 1px solid;
    border-radius: 0.5rem;
    background-color: rgb(0, 132, 255);
    color: white;
    margin: 30px 0px 10px 0px;
    font-family: "Roboto";
    font-weight: 700;
    transition: all 0.2s;
    outline: none !important;
  }

  .disabled-button {
    opacity: 0.6 !important;
    cursor: default !important;
  }

  .disabled-button:hover {
    background-color: rgb(0, 132, 255) !important;
  }

  .submit-button:hover {
    background-color: rgb(0, 107, 207);
  }

  .input-label {
    text-align: start;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 5px;
  }

  .alert-label {
    color: rgb(255, 0, 0);
    font-size: 14px;
    text-align: start;
    font-style: italic;
    margin-bottom: 10px;
    opacity: 0;
    transition: all 0.5s;
  }

  .wrong-input {
    border: 1.3px solid rgb(255, 0, 0);
    -webkit-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    -moz-box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.09);
  }

  .search-list-container{
    position: relative;

    .search-list{
      position: absolute;
      top: 10px;
      border-radius: 5px;
      width: 100%;
      height: 400px;
      background-color: white;
      overflow-y: scroll;
      z-index: 10;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      overflow-x: auto;

      ::-webkit-scrollbar {
        width: 11px;
        padding: 5px;
        cursor: pointer;
        height: 80%;
        opacity: 0;
      }

      ::-webkit-scrollbar-track {
        opacity: 0;
        background-color: rgba(0, 132, 255, 0.459);
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: transparent;
        opacity: 0;
      }

      /* Handle */


      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #9c9c9c;
        border-radius: 10px;
        transition: all 0.4s;
      }

      .search-result{
        padding: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;

        img{
          margin-right: 10px;
          border-radius: 3px;
          min-width: 50px;
          max-width: 50px;
          min-height: 50px;
          max-height: 50px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        p{
          width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-name{
          font-family: "Hind", sans-serif;
          font-size: 18px;
          color: rgb(36, 36, 36);
          font-weight: 600;
        }

        .track-artist{
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: rgb(134, 134, 134);
        }

        &:hover{
          background-color: #f6f8ff;
          cursor: pointer;
        }
      }
    }
  }

  .close-button{
    width: 50px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  }

  .selected-song{
    border-radius: 5px;
    background-color: #f0f3ff;
    width: 100%;
    min-height: 56px;
    height: auto;
    z-index: 10;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    cursor: pointer;

    img{
      margin-right: 10px;
      border-radius: 3px;
      min-width: 43px;
      max-width: 43px;
      min-height: 43px;
      max-height: 43px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }

    p{
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-button{
      color: #7e7e7e;
      transition: all 0.2s;
      outline: none;
      position: absolute;
      right: 60px;

      &:hover{
        color: #575757;
      }
    }

    .track-name{
      font-family: "Hind", sans-serif;
      font-size: 18px;
      color: rgb(36, 36, 36);
      font-weight: 600;
    }

    .track-artist{
      font-family: "Montserrat", sans-serif;
      font-size: 12px;
      font-weight: 700;
      color: rgb(134, 134, 134);
    }
  }
`;
