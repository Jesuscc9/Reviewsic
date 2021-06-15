import styled from "styled-components";

export const Player = styled.div`
  .PlayerRSWP {
    background-color: #ffffff !important;
    border-radius: 10px;
    max-width: 280px;
    min-width: 280px;
    padding: 10px;
    height: 350px;
    /*     img {
      min-width: 100px;
      min-height: 100px;
    } */
  }

  button {
    outline: none !important;
  }

  ._SliderRSWP {
    position: relative;
    top: 200px;
    opacity: 1;
    z-index: 4;
  }

  ._ContentRSWP {
    display: block;
    margin-top: 10px;

    ._InfoRSWP {
      display: block !important;
      border-bottom: 0px !important;
    }

    .rswp__active {
      width: 260px;
      height: auto;
      //border: 1px solid;

      img {
        width: 100px;
        height: 100px;
        margin: auto;
        border-radius: 0.25rem;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }

      .__nnvdcq {
        text-align: center;
        width: 260px;
        padding: 0px;
        //border: 1px solid;
        margin-top: 15px !important;

        p {
          font-family: "Montserrat", sans-serif;
          font-size: 12px;

          span {
            font-family: "Hind", sans-serif;
            font-size: 18px !important;
            font-weight: 600;
            color: #252525 !important;
            margin: auto;
          }
        }
      }
    }

    ._ControlsRSWP {
      margin-top: 60px;
      //border: 1px solid;
      width: 100%;
    }

    ._ActionsRSWP {
      //border: 1px solid;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0px 15px;

      div {
        //border: 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ._VolumeRSWP {
        z-index: 4;
      }

      ._DevicesRSWP {
        z-index: 4;
      }
    }
  }

  .player-overlay-container {
    position: absolute;
  }

  .player-overlay {
    position: relative;
    top: -300px;
    border-radius: 10px;
    max-width: 300px;
    min-width: 300px;
    padding: 10px;
    height: 300px;
    pointer-events: none;
    background-color: black;
    opacity: 0.5;
    z-index: 4;
  }

  .slider {
    height: 4px;
  }

  .content {
    width: 280px;
    height: 150px;
    border: 2px solid;
  }

  .controls {
    width: 45px;
    height: 48px;
    //border: 1px solid;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .play {
      //border: 1px solid;
      min-width: 45px;
      height: 45px;
      background-color: #d29fff;
      color: white;
      border-radius: 15px;
      font-size: 14px;
      outline: none;
      pointer-events: all;
    }
  }
`;
