import styled from "styled-components";

export const Player = styled.div`
  .PlayerRSWP {
    background-color: #ffffff !important;
    border-radius: 10px;
    max-width: 300px;
    min-width: 300px;
    padding: 10px;
    height: 300px;
    /*     img {
      min-width: 100px;
      min-height: 100px;
    } */
  }

  ._SliderRSWP {
    position: relative;
    top: 160px;
    z-index: 4;
  }

  ._ContentRSWP {
    display: block;

    ._InfoRSWP {
      display: block !important;
      margin-bottom: 20px;
    }

    .rswp__active {
      width: 280px;
      height: 150px;
      border: 1px solid;

      img {
        width: 100px;
        height: 100px;
        margin: auto;
        border-radius: 0.25rem;
      }

      .__nnvdcq {
        text-align: center;
        width: 280px;
        margin: 0px !important;
        padding: 0px;
        p {
          span {
            margin: auto;
          }
        }
      }
    }

    ._ControlsRSWP {
      margin: 0px;
      border: 1px solid;
      width: 100%;
    }

    ._ActionsRSWP {
      border: 1px solid;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0px 15px;

      div {
        border: 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .player-overlay-container {
    position: absolute;
  }

  .player-overlay {
    position: relative;
    top: -300px;
    background-color: red !important;
    opacity: 0.6;
    border-radius: 10px;
    max-width: 300px;
    min-width: 300px;
    padding: 10px;
    height: 300px;
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
    width: 100%;
    height: 48px;
  }
`;
